import { createArticle } from './articleFactory';

export const devopsArticles = [
  createArticle({
    id: 'harbor-container-registry-frontend',
    title: 'Harbor Container Registry for Frontend CI/CD Pipelines',
    excerpt: 'Managing Docker images for Angular/React banking apps with Harbor registry, vulnerability scanning, and RBAC.',
    category: 'DevOps',
    date: '2025-09-03',
    tags: ['Harbor', 'Docker', 'CI/CD', 'Containers'],
    context: 'Harbor is the enterprise container registry used alongside OpenShift and Jenkins in Intellect banking deployments. Frontend Docker images (nginx + Angular/React build) are pushed to Harbor with vulnerability scanning, image signing, and project-based RBAC — ensuring only approved images reach production banking environments.',
    problem: 'Without a managed container registry, frontend teams face:\n- Docker images stored on developer laptops without version control\n- No vulnerability scanning before production deployment\n- Untagged `:latest` images making rollbacks impossible\n- No access control — any developer pushing to production registry\n- Missing audit trail for compliance requirements',
    solution: '**Harbor registry** provides project-based organization, Trivy vulnerability scanning, image replication, retention policies, and RBAC integration with corporate LDAP/AD.',
    usage: '**Workflow:** Jenkins builds Docker image → pushes to Harbor → Trivy scans → OpenShift pulls approved image.\n**Tagging:** `{registry}/{project}/{app}:{version}-{build_number}`\n**Retention:** Keep last 10 tags per app; auto-delete untagged images.',
    useCases: '- CBX Angular frontend image storage and versioning\n- React mobility app container images for OpenShift deployment\n- Vulnerability gate blocking images with critical CVEs\n- Multi-environment image promotion (dev → staging → prod Harbor projects)',
    examples: `\`\`\`bash
# Jenkins pipeline push to Harbor
docker build -t harbor.bank.internal/cbx/frontend:\${BUILD_NUMBER} .
docker push harbor.bank.internal/cbx/frontend:\${BUILD_NUMBER}

# OpenShift deploy from Harbor
oc set image deployment/cbx-frontend cbx-app=harbor.bank.internal/cbx/frontend:\${BUILD_NUMBER}
oc rollout status deployment/cbx-frontend
\`\`\`

\`\`\`dockerfile
FROM node:18-alpine AS builder
WORKDIR /app && COPY . . && RUN npm ci && npm run build:prod
FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
HEALTHCHECK CMD curl -f http://localhost:8080/health || exit 1
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Pushing `:latest` only | Always tag with version and build number |\n| Skipping vulnerability scan results | Block deployment on critical/high CVEs |\n| Same Harbor project for dev and prod | Separate projects with promotion workflow |\n| Storing secrets in Docker image layers | Use runtime ConfigMaps/Secrets injection |',
    trends: '- **OCI artifacts:** Harbor storing Helm charts, SBOMs, and WASM modules\n- **Cosign signing:** Cryptographic image signature verification\n- **Harbor 2.10:** Improved Trivy integration and proxy cache\n- **GitOps pull:** ArgoCD pulling from Harbor instead of push-based deploy',
  }),

  createArticle({
    id: 'git-branching-banking-releases',
    title: 'Git Branching Strategies for Banking Release Management',
    excerpt: 'GitFlow and trunk-based development patterns for CBX banking applications with compliance requirements.',
    category: 'DevOps',
    date: '2025-08-15',
    tags: ['Git', 'Branching', 'Release Management', 'Banking'],
    context: 'Git branching strategy directly impacts how CBX banking applications move from development to production. With Jenkins CI/CD, OpenShift deployments, and regulatory change management requirements, choosing the right branching model prevents merge conflicts, enables hotfixes, and maintains audit trails.',
    problem: 'Poor Git practices in banking teams cause:\n- Long-lived feature branches diverging from main for weeks\n- Hotfixes breaking ongoing sprint development\n- No clear mapping between Git branches and deployment environments\n- Merge conflicts delaying critical regulatory deadline releases\n- Missing audit trail linking code changes to JIRA tickets',
    solution: '**GitFlow for banking:** `main` (production), `develop` (integration), `feature/*`, `release/*`, `hotfix/*` with mandatory PR reviews and JIRA ticket references in commit messages.',
    usage: '**Commit format:** `[JIRA-123] feat: add UPI payment validation`\n**PR rules:** 2 approvals, CI pass, no direct push to main/develop\n**Release branch:** Cut from develop, QA on release branch, merge to main + tag',
    useCases: '- Feature development in `feature/CBX-456-fund-transfer` branches\n- Release candidate testing in `release/2.1.0` branch\n- Production hotfix via `hotfix/session-timeout-fix` branch\n- Sprint integration merging features into `develop`',
    examples: `\`\`\`bash
# Start feature
git checkout develop && git pull
git checkout -b feature/CBX-789-bulk-payment

# Release cut
git checkout -b release/2.1.0 develop
# QA fixes on release branch
git checkout main && git merge release/2.1.0
git tag -a v2.1.0 -m "Release 2.1.0 - Bulk Payment Module"

# Hotfix
git checkout -b hotfix/auth-token-expiry main
# fix, test, merge to main AND develop
git checkout main && git merge hotfix/auth-token-expiry
git checkout develop && git merge hotfix/auth-token-expiry
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Direct commits to main | Protect main branch; require PR with reviews |\n| Feature branches living >2 weeks | Merge or rebase frequently; split large features |\n| No JIRA reference in commits | Enforce commit message format via git hooks |\n| Force push to shared branches | Never force push main/develop/release branches |',
    trends: '- **Trunk-based development:** Short-lived branches merging to main daily\n- **Feature flags:** Deploy incomplete features hidden behind toggles\n- **Conventional commits:** Automated changelog generation from commit messages\n- **GitHub/GitLab flow:** Simplified alternatives to GitFlow for smaller teams',
  }),

  createArticle({
    id: 'jira-frontend-sprint-workflows',
    title: 'JIRA Workflow Automation for Frontend Sprint Tracking',
    excerpt: 'Managing Angular/React banking development sprints with JIRA boards, automation, and SME collaboration.',
    category: 'DevOps',
    date: '2025-08-01',
    tags: ['JIRA', 'Agile', 'Sprint', 'Workflow'],
    context: 'JIRA is the project management backbone for CBX frontend teams at Intellect Design Arena — tracking user stories, bugs, code review tasks, and UAT sign-offs. Effective JIRA workflows connect frontend development activities to banking compliance requirements and SME review cycles.',
    problem: 'Disorganized JIRA usage in frontend teams causes:\n- Stories without acceptance criteria leading to rework\n- Bugs not linked to releases causing regression\n- No visibility into code review and QA status\n- Sprint velocity metrics not reflecting actual frontend complexity\n- SME review bottlenecks invisible until deadline pressure',
    solution: '**Structured JIRA workflow:** To Do → In Development → Code Review → QA → SME Review → UAT → Done, with automation rules triggering notifications and status updates.',
    usage: '**Story format:** User story + acceptance criteria + mockup link + API dependency flag.\n**Bug linking:** Link bugs to stories and releases for traceability.\n**Automation:** Auto-assign QA on PR merge, notify SME on QA pass.',
    useCases: '- Sprint planning with story point estimation for frontend complexity\n- Bug triage linking production ServiceNow incidents to JIRA bugs\n- Release tracking with fix-version mapping to Git tags\n- SME sign-off workflow for regulatory banking features',
    examples: `\`\`\`
JIRA Story Template:
Title: [CBX-123] Fund Transfer - Beneficiary Validation
Type: Story | Priority: High | Sprint: Sprint 24
Story Points: 5

Description:
As a corporate user, I want to validate beneficiary IFSC codes
before initiating a fund transfer, so that payments aren't sent
to invalid accounts.

Acceptance Criteria:
- [ ] IFSC format validated client-side (regex)
- [ ] Server-side IFSC lookup with bank name display
- [ ] Error message for invalid IFSC
- [ ] Loading state during API call
- [ ] Cross-browser tested (Chrome, Firefox, Edge)

Dependencies: Backend API /api/v2/ifsc/validate (CBX-120)
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Stories too large (>8 points) | Split into smaller deliverable stories |\n| Missing acceptance criteria | Require AC before sprint commitment |\n| Bugs not prioritized in sprint | Reserve 20% sprint capacity for bugs |\n| No link between JIRA and Git commits | Enforce JIRA ticket in commit/PR title |',
    trends: '- **JIRA Automation:** No-code rules replacing manual status updates\n- **GitHub/JIRA integration:** Automatic ticket updates from PR events\n- **Advanced roadmaps:** Cross-team dependency visualization\n- **AI sprint planning:** Copilot suggesting story breakdown from epics',
  }),

  createArticle({
    id: 'servicenow-incident-frontend',
    title: 'ServiceNow Integration for Production Incident Management',
    excerpt: 'How frontend teams handle production incidents, root cause analysis, and fixes through ServiceNow workflows.',
    category: 'DevOps',
    date: '2025-07-22',
    tags: ['ServiceNow', 'Incident Management', 'Production', 'Debugging'],
    context: 'ServiceNow manages production incidents for CBX banking applications deployed on OpenShift. Frontend developers receive P1/P2 incidents for UI crashes, payment flow failures, and performance degradation — requiring systematic debugging, hotfix deployment, and post-incident review.',
    problem: 'Unstructured incident handling causes:\n- Duplicate debugging efforts across team members\n- Missing root cause documentation for recurring issues\n- Hotfixes deployed without proper testing or rollback plan\n- No correlation between incidents and recent deployments\n- Frontend issues closed as "cannot reproduce" without investigation',
    solution: '**ServiceNow incident workflow:** Acknowledge → Investigate → Identify root cause → Develop fix → Deploy hotfix → Verify → Close with RCA document.',
    usage: '**P1 response:** Acknowledge within 15 minutes, war room call, hourly updates.\n**Debug checklist:** Recent deployments, browser console errors, API response changes, CDN issues.\n**RCA template:** Timeline, root cause, fix applied, prevention measures.',
    useCases: '- P1: Payment authorization screen blank after deployment\n- P2: Session timeout not redirecting to login on IE11\n- P3: Dashboard chart rendering incorrectly on Safari\n- Post-incident: RCA review identifying missing cross-browser test',
    examples: `\`\`\`
ServiceNow Incident RCA Template:

Incident: INC0012345 - Fund Transfer Page Blank Screen
Priority: P1 | Duration: 2h 15m | Impact: 500+ corporate users

Timeline:
14:00 - Deployment v2.1.0 to production OpenShift
14:30 - First user reports via helpdesk
14:45 - Incident created, frontend team notified
15:00 - Root cause: Missing polyfill for Array.at() in older Chrome
15:30 - Hotfix deployed with polyfill added
16:15 - Verified across Chrome 90+, Firefox, Edge

Root Cause: New code used Array.at() without polyfill
Fix: Added core-js polyfill import in polyfills.ts
Prevention: Added browserslist check in CI pipeline
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Closing incidents without RCA | Mandatory RCA for all P1/P2 incidents |\n| Hotfix without testing | Minimum smoke test on staging before prod hotfix |\n| Not checking recent deployments first | Always correlate incident timing with deployment log |\n| Frontend blaming backend without evidence | Capture network tab, console errors as evidence |',
    trends: '- **AIOps integration:** ServiceNow ML correlating incidents with changes\n- **Runbook automation:** Automated diagnostic steps before human escalation\n- **Observability integration:** Datadog/Splunk alerts auto-creating ServiceNow tickets\n- **Blameless postmortems:** Focus on system improvements, not individual fault',
  }),

  createArticle({
    id: 'docker-multistage-angular-spa',
    title: 'Docker Multi-Stage Builds for Angular SPA Deployment',
    excerpt: 'Optimizing Angular banking app Docker images from 1.2GB to 25MB with multi-stage build patterns.',
    category: 'DevOps',
    date: '2025-07-12',
    tags: ['Docker', 'Angular', 'Multi-Stage', 'OpenShift'],
    context: 'CBX Angular applications deployed on OpenShift use Docker multi-stage builds to separate the Node.js build environment from the lightweight nginx production container. This reduces image size by 98%, speeds up OpenShift pod startup, and eliminates Node.js from production attack surface.',
    problem: 'Single-stage Docker builds for Angular apps produce:\n- 1GB+ images including Node.js, node_modules, and source code\n- Slow pod startup times pulling large images on OpenShift\n- Expanded attack surface with build tools in production container\n- Wasted Harbor registry storage across 10+ environment tags\n- Security scan failures from dev dependencies in production image',
    solution: '**Multi-stage Dockerfile:** Stage 1 (builder) compiles Angular app; Stage 2 (production) copies only `/dist` output to nginx alpine image (~25MB).',
    usage: '**Builder stage:** `node:18-alpine` with npm ci + ng build.\n**Production stage:** `nginx:1.25-alpine` with custom nginx.conf for SPA routing.\n**Optimization:** .dockerignore excluding node_modules, .git, tests.',
    useCases: '- CBX Angular app containerization for OpenShift deployment\n- React SPA Docker images for mobility backend services\n- nginx configuration for Angular client-side routing (try_files)\n- Health check endpoint for OpenShift liveness/readiness probes',
    examples: `\`\`\`dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build:prod

# Stage 2: Production
FROM nginx:1.25-alpine
COPY --from=builder /app/dist/cbx-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /usr/share/nginx/html
EXPOSE 8080
USER nginx
HEALTHCHECK CMD wget -qO- http://localhost:8080/health || exit 1
\`\`\`

\`\`\`nginx
# nginx.conf for Angular SPA
server {
  listen 8080;
  root /usr/share/nginx/html;
  location / { try_files $uri $uri/ /index.html; }
  location /health { return 200 'OK'; add_header Content-Type text/plain; }
  location ~* \\.(js|css|png|jpg|woff2)$ { expires 1y; add_header Cache-Control "public, immutable"; }
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Running npm install instead of npm ci | Use npm ci for reproducible builds |\n| Copying entire project before npm ci | Copy package*.json first for layer caching |\n| Running nginx as root | Switch to nginx user in production stage |\n| No .dockerignore file | Exclude node_modules, .git, coverage, e2e |',
    trends: '- **Distroless images:** Google distroless for minimal attack surface\n- **BuildKit cache mounts:** Persistent npm cache across builds\n- **ko build tool:** Go-based container builder for Node.js apps\n- **WASM edge:** WebAssembly modules deployed alongside SPA containers',
  }),

  createArticle({
    id: 'vite-vs-webpack-angular-migration',
    title: 'Vite vs Webpack: Build Tool Migration for Angular Projects',
    excerpt: 'Performance comparison and migration guide from webpack to Vite/esbuild for Angular banking applications.',
    category: 'DevOps',
    date: '2025-06-30',
    tags: ['Vite', 'Webpack', 'Angular', 'Build Tools'],
    context: 'Angular 17+ offers the application builder powered by esbuild, dramatically reducing build times compared to webpack. The Web Performance Analyzer uses Vite for its React frontend, demonstrating the speed advantages that CBX Angular teams can achieve by migrating build tooling.',
    problem: 'Webpack-based Angular builds in banking CI/CD cause:\n- 8-12 minute build times blocking Jenkins pipeline slots\n- Slow HMR (Hot Module Replacement) during development (5+ second reloads)\n- High memory consumption (4GB+) causing CI agent failures\n- Long feedback loops reducing developer productivity\n- Complex webpack.config customization for banking-specific needs',
    solution: '**Angular application builder (esbuild)** or **Vite** provides 5-10x faster builds, instant HMR, and simpler configuration while maintaining compatibility with existing Angular codebases.',
    usage: '**Migration:** Update angular.json to use `@angular-devkit/build-angular:application` builder.\n**Vite (React):** Used in Web Performance Analyzer and ChatterJoy for sub-second dev server startup.\n**Verify:** Run full test suite after migration; check bundle output sizes.',
    useCases: '- CBX Angular app CI build time reduction from 10min to 2min\n- Web Performance Analyzer Vite dev server for instant feedback\n- ChatterJoy Next.js with Turbopack for development speed\n- Local development HMR under 200ms for banking form development',
    examples: `\`\`\`json
// angular.json — esbuild application builder
{
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:application",
      "options": {
        "outputPath": "dist/cbx-app",
        "index": "src/index.html",
        "browser": "src/main.ts",
        "tsConfig": "tsconfig.app.json"
      }
    }
  }
}
\`\`\`

\`\`\`javascript
// vite.config.js — React project
export default defineConfig({
  plugins: [react()],
  build: { target: 'es2020', rollupOptions: { output: { manualChunks: { vendor: ['react', 'react-dom'] } } } },
});
\`\`\`

| Metric | Webpack | esbuild/Vite |
|---|---|---|
| Cold build | 8-12 min | 1-2 min |
| HMR | 3-5 sec | <200ms |
| Memory | 4GB+ | 1-2GB |
| Config complexity | High | Low |`,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Migrating without running full test suite | Complete regression testing after build tool change |\n| Custom webpack plugins without esbuild equivalent | Find esbuild-compatible alternatives before migrating |\n| Ignoring bundle size differences | Compare output sizes; esbuild may produce different chunks |\n| Migrating during critical release period | Schedule migration in dedicated sprint |',
    trends: '- **Angular 19:** esbuild as default, webpack deprecated\n- **Turbopack:** Next.js/Vercel Rust-based bundler\n- **Rolldown:** Rust-based Rollup replacement from Vite team\n- **Persistent build cache:** CI agents caching esbuild output between runs',
  }),

  createArticle({
    id: 'nodejs-event-loop-banking-apis',
    title: 'Node.js Event Loop Patterns for Banking API Backends',
    excerpt: 'Understanding Node.js concurrency model for Express backends serving frontend banking applications.',
    category: 'Full-Stack',
    date: '2025-06-08',
    tags: ['Node.js', 'Event Loop', 'Express', 'Backend'],
    context: 'Node.js powers the Web Performance Analyzer backend and can serve as API middleware for banking frontend applications. Understanding the event loop — how Node handles concurrent I/O operations on a single thread — is essential for building responsive Express APIs that don\'t block during Puppeteer analysis or database queries.',
    problem: 'Misunderstanding Node.js concurrency causes:\n- Blocking the event loop with synchronous Puppeteer operations\n- CPU-intensive JSON parsing freezing all API responses\n- Not using clustering for multi-core server utilization\n- Memory leaks from uncleaned event listeners crashing the process\n- Timeout errors when multiple analysis requests queue up',
    solution: '**Non-blocking patterns:** Async/await for I/O, worker threads for CPU-intensive tasks, clustering for multi-core, and job queues for long-running operations.',
    usage: '**I/O bound (good for Node):** API calls, database queries, file reads, WebSocket connections.\n**CPU bound (move to workers):** Image processing, PDF generation, complex calculations.\n**Long running (use queues):** Puppeteer analysis, report generation, batch processing.',
    useCases: '- Web Performance Analyzer queuing Puppeteer jobs without blocking API\n- Express middleware logging without delaying response\n- WebSocket server for real-time banking notifications\n- Batch URL analysis with worker thread pool',
    examples: `\`\`\`javascript
const { Worker } = require('worker_threads');
const express = require('express');

// Non-blocking API handler
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// CPU-intensive work in worker thread
app.post('/api/analyze', async (req, res) => {
  const jobId = generateJobId();
  analysisQueue.add(jobId, req.body.url);

  const worker = new Worker('./analyzer-worker.js', { workerData: { url: req.body.url } });
  worker.on('message', (result) => saveReport(jobId, result));
  worker.on('error', (err) => markJobFailed(jobId, err));

  res.json({ jobId, status: 'processing' });
});

// Monitor event loop lag
setInterval(() => {
  const start = Date.now();
  setImmediate(() => {
    const lag = Date.now() - start;
    if (lag > 100) console.warn(\`Event loop lag: \${lag}ms\`);
  });
}, 5000);
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Synchronous file reads in request handlers | Use fs.promises.readFile or streams |\n| JSON.parse on massive payloads synchronously | Stream parse or limit payload size |\n| Single process on 8-core server | Use PM2 cluster mode or Node cluster module |\n| No graceful shutdown handling | Listen for SIGTERM; finish in-flight requests |',
    trends: '- **Node.js 22:** Native TypeScript support and improved watch mode\n- **Bun/Deno:** Alternative runtimes with faster startup and built-in APIs\n- **Worker threads maturity:** Stable for CPU-bound task offloading\n- **Diagnostic reports:** Node.js automatic heap dump on crash',
  }),

  createArticle({
    id: 'mysql-query-optimization-dashboards',
    title: 'MySQL Query Optimization for Banking Dashboard Reports',
    excerpt: 'SQL query patterns for frontend dashboard data — indexes, joins, and pagination for transaction analytics.',
    category: 'Full-Stack',
    date: '2025-05-20',
    tags: ['MySQL', 'SQL', 'Database', 'Performance'],
    context: 'While primarily a frontend developer, understanding MySQL query optimization helps when designing API contracts, pagination strategies, and dashboard data requirements for CBX banking applications. Frontend developers who understand SQL write better data fetching patterns and more efficient filter/pagination UI.',
    problem: 'Unoptimized database queries powering banking dashboards cause:\n- Dashboard load times exceeding 10 seconds for transaction history\n- Full table scans on million-row transaction tables\n- N+1 query patterns fetching related account data\n- Missing pagination loading entire result sets into memory\n- Frontend timeouts waiting for slow aggregation queries',
    solution: '**Query optimization fundamentals:** Proper indexing, EXPLAIN analysis, pagination with LIMIT/OFFSET or cursor-based, JOIN optimization, and materialized views for complex aggregations.',
    usage: '**Frontend impact:** Design pagination UI matching backend cursor pagination.\n**API design:** Request only needed columns; support date range filters server-side.\n**Caching:** Cache dashboard aggregations with TTL matching business needs.',
    useCases: '- Transaction history dashboard with date range filter and pagination\n- Account summary aggregation (total balance across accounts)\n- Monthly transaction volume charts for corporate banking reports\n- Authorization queue count queries for CBX header badge',
    examples: `\`\`\`sql
-- Optimized transaction query with index usage
SELECT t.id, t.amount, t.type, t.created_at, a.account_number
FROM transactions t
INNER JOIN accounts a ON t.account_id = a.id
WHERE t.customer_id = ? AND t.created_at BETWEEN ? AND ?
ORDER BY t.created_at DESC
LIMIT 20 OFFSET ?;

-- Index recommendation
CREATE INDEX idx_transactions_customer_date ON transactions(customer_id, created_at DESC);

-- Aggregation for dashboard widget
SELECT DATE(created_at) as date, SUM(amount) as total, COUNT(*) as count
FROM transactions
WHERE account_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(created_at)
ORDER BY date;
\`\`\`

\`\`\`javascript
// Frontend pagination matching SQL LIMIT/OFFSET
async function fetchTransactions(accountId, page = 1, pageSize = 20) {
  const offset = (page - 1) * pageSize;
  return api.get(\`/transactions?accountId=\${accountId}&limit=\${pageSize}&offset=\${offset}\`);
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| SELECT * in dashboard queries | Request only columns displayed in UI |\n| OFFSET pagination on large tables | Use cursor-based (WHERE id > lastId) for deep pages |\n| No EXPLAIN analysis before deploying | Run EXPLAIN on all new dashboard queries |\n| Client-side filtering of large datasets | Push filters to SQL WHERE clause |',
    trends: '- **Read replicas:** Frontend dashboards reading from replica databases\n- **GraphQL with DataLoader:** Batching N+1 queries automatically\n- **TimescaleDB:** Time-series optimization for transaction analytics\n- **Prisma/Drizzle ORM:** Type-safe SQL query builders for Node.js backends',
  }),

  createArticle({
    id: 'express-middleware-api-security',
    title: 'Express.js Middleware Patterns for API Security',
    excerpt: 'Authentication, validation, rate limiting, and CORS middleware for Node.js banking API backends.',
    category: 'Full-Stack',
    date: '2025-05-10',
    tags: ['Express', 'Middleware', 'Security', 'API'],
    context: 'Express middleware provides the security layer between frontend banking applications and backend services. Proper middleware chaining — authentication, input validation, rate limiting, CORS, and security headers — prevents common API vulnerabilities in tools like the Web Performance Analyzer and banking API gateways.',
    problem: 'Unprotected Express APIs expose:\n- Unauthenticated access to sensitive analysis reports\n- SQL injection via unvalidated query parameters\n- DDoS via unlimited API calls to expensive Puppeteer endpoints\n- CORS misconfiguration allowing cross-origin data theft\n- Missing security headers enabling XSS and clickjacking',
    solution: '**Middleware stack:** helmet (security headers) → cors (origin whitelist) → rateLimit → auth → validation → route handler → error handler.',
    usage: '**Order matters:** Security middleware first, auth before routes, error handler last.\n**Validation:** Joi/Zod schemas validating request body/query params.\n**Auth:** JWT verification middleware for protected routes.',
    useCases: '- Web Performance Analyzer API authentication with Firebase tokens\n- Rate limiting analysis endpoints (10 requests per 15 minutes)\n- Input validation rejecting malformed URLs before Puppeteer launch\n- CORS restricting API access to known frontend origins',
    examples: `\`\`\`javascript
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

app.use(helmet());
app.use(cors({ origin: ['https://analyzer.app.com', 'http://localhost:5173'] }));
app.use(express.json({ limit: '1mb' }));

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch { res.status(401).json({ error: 'Invalid token' }); }
};

app.post('/api/analyze', authMiddleware, analyzeLimiter, validate(schemas.analyze), analyzeHandler);
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| CORS origin: "*" in production | Whitelist specific frontend origins |\n| No request body size limit | Set express.json limit to prevent payload attacks |\n| Error middleware exposing stack traces | Return generic errors in production |\n| Auth check in route handler instead of middleware | Centralize auth in reusable middleware |',
    trends: '- **Express 5:** Built-in async error handling and improved router\n- **OWASP API Security Top 10:** Standard checklist for API security review\n- **API Gateway pattern:** Move security to Kong/Apigee instead of Express middleware\n- **Zero-trust APIs:** mTLS and service mesh for inter-service communication',
  }),

  createArticle({
    id: 'python-oop-frontend-developers',
    title: 'Python OOP Concepts Every Frontend Developer Should Know',
    excerpt: 'How Object-Oriented Programming principles apply to JavaScript/TypeScript frontend architecture.',
    category: 'JavaScript',
    date: '2025-04-28',
    tags: ['Python', 'OOP', 'JavaScript', 'Architecture'],
    context: 'Studying Object-Oriented Programming through Python provides frontend developers with architectural thinking that directly applies to JavaScript/TypeScript class patterns, Angular services, React component composition, and banking application design — even when the primary language is not Python.',
    problem: 'Frontend developers without OOP understanding struggle with:\n- Designing reusable service classes in Angular banking apps\n- Understanding inheritance vs composition trade-offs\n- Creating maintainable class hierarchies for CBX framework extensions\n- Applying SOLID principles to React component architecture\n- Communicating effectively with backend Java/Python developers',
    solution: '**Core OOP concepts mapped to frontend:** Encapsulation (private fields, closures), Inheritance (class extends, Angular component hierarchy), Polymorphism (interface implementations, strategy pattern), Abstraction (abstract classes, TypeScript interfaces).',
    usage: '**Encapsulation:** Private class fields (#balance), module scope in JavaScript.\n**Composition over inheritance:** React component composition, Angular service injection.\n**Interfaces:** TypeScript interfaces defining banking service contracts.',
    useCases: '- Angular service classes encapsulating API communication logic\n- TypeScript interfaces defining CBX module contracts\n- Strategy pattern for different payment method handlers\n- Factory pattern for creating banking form validators',
    examples: `\`\`\`python
# Python OOP — Payment strategy pattern
from abc import ABC, abstractmethod

class PaymentStrategy(ABC):
    @abstractmethod
    def validate(self, amount: float) -> bool: pass
    @abstractmethod
    def process(self, amount: float) -> dict: pass

class UPIPayment(PaymentStrategy):
    def validate(self, amount): return 0 < amount <= 100000
    def process(self, amount): return {"method": "UPI", "status": "initiated"}

class NEFTPayment(PaymentStrategy):
    def validate(self, amount): return amount >= 1
    def process(self, amount): return {"method": "NEFT", "status": "queued"}
\`\`\`

\`\`\`typescript
// Same pattern in TypeScript (Angular banking)
interface PaymentStrategy {
  validate(amount: number): boolean;
  process(amount: number): Promise<PaymentResult>;
}

class UPIPaymentStrategy implements PaymentStrategy {
  validate(amount: number) { return amount > 0 && amount <= 100000; }
  async process(amount: number) { return this.api.initiateUPI(amount); }
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Deep inheritance hierarchies | Prefer composition and interfaces |\n| God classes doing everything | Single Responsibility Principle — one class, one job |\n| Ignoring interfaces in TypeScript | Define interfaces for all service contracts |\n| OOP patterns where functions suffice | Use simple functions until complexity demands classes |',
    trends: '- **Functional programming rise:** Hooks and functions replacing class components in React\n- **TypeScript interfaces > classes:** Structural typing for flexible contracts\n- **Design patterns in JS:** Module, Observer, Factory patterns without class syntax\n- **Python for tooling:** Frontend build scripts, automation, and data analysis in Python',
  }),
];

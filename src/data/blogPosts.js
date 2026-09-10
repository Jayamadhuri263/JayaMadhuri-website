export const blogPosts = [
  {
    id: 'sdlc-best-practices-banking',
    title: 'SDLC Best Practices in Modern Banking IT',
    excerpt: 'How enterprise banking teams structure SDLC phases for compliance, velocity, and zero-defect releases in regulated environments.',
    category: 'Architecture',
    date: '2025-08-15',
    author: 'Jaya Madhuri',
    tags: ['SDLC', 'Banking', 'Agile', 'Compliance'],
    content: `## 1. Topic Title & Modern Context

Software Development Life Cycle (SDLC) in banking IT has evolved from waterfall-heavy processes to hybrid Agile-Waterfall models that satisfy both regulatory compliance (RBI, PCI-DSS) and modern DevOps velocity. In 2025, leading banks adopt **Shift-Left Security**, **Continuous Compliance**, and **Feature Flag-driven releases** within structured SDLC gates.

## 2. The Problem

Banking IT teams face a unique tension: regulators demand exhaustive documentation and audit trails, while business units demand weekly feature releases. Without a structured SDLC:

- Security vulnerabilities slip into production during rushed sprints
- Audit failures occur due to missing change management records
- Cross-team dependencies cause integration failures at UAT stage
- Rollback procedures are untested until a production incident forces them

## 3. The Solution

A **Phased SDLC with Embedded Quality Gates** resolves this by embedding compliance checkpoints into every sprint rather than treating them as post-development overhead.

\`\`\`javascript
const sdlcPhases = {
  planning: ['Requirements', 'Threat Modeling', 'Architecture Review'],
  development: ['TDD', 'Code Review', 'SAST Scan'],
  testing: ['Unit Tests', 'Integration Tests', 'UAT Sign-off'],
  deployment: ['Staging Validation', 'Change Advisory Board', 'Production Release'],
  maintenance: ['Monitoring', 'Incident Response', 'Retrospective']
};
\`\`\`

## 4. How, Where & Why to Use

**When to adopt:** Any banking project with regulatory oversight, multi-team dependencies, or production SLAs above 99.9%.

**Optimal setup:**
- Jira/Azure DevOps for sprint tracking with linked compliance tickets
- Confluence for architecture decision records (ADRs)
- Jenkins pipelines with mandatory quality gates (SonarQube, OWASP ZAP)
- Git branching: \`main\` → \`release/*\` → \`hotfix/*\`

**Benefits:** Predictable release cadence, audit-ready documentation, reduced production incidents.

## 5. Primary Industry Use Cases

- **Core Banking Modernization:** Migrating legacy mainframe modules to microservices while maintaining transaction integrity
- **Mobile Banking Launches:** Coordinating frontend, API, and security teams across 4-week sprint cycles
- **Regulatory Reporting Updates:** RBI-mandated changes with fixed deadlines and mandatory UAT sign-offs
- **Payment Gateway Integration:** NPCI/UPI compliance requiring penetration testing before go-live

## 6. Practical Code / Flow Examples

\`\`\`javascript
// Feature flag pattern for controlled banking releases
const FeatureGate = ({ flag, children, fallback }) => {
  const { isEnabled } = useFeatureFlag(flag);
  return isEnabled ? children : fallback;
};

// Usage in payment module
<FeatureGate flag="UPI_V2_ENABLED" fallback={<LegacyUPIFlow />}>
  <NewUPIFlow />
</FeatureGate>
\`\`\`

**Release flow diagram:**
\`\`\`
Dev → Code Review → SAST → Unit Tests → Integration Tests
  → Staging Deploy → UAT → CAB Approval → Production Deploy → Monitor
\`\`\`

## 7. Common Mistakes & Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| Skipping UAT for "small changes" | Mandatory regression suite for any production-bound code |
| Documentation as afterthought | ADRs written during design, not after deployment |
| Shared staging environments | Environment-per-feature with OpenShift namespaces |
| Manual deployment checklists | Automated Jenkins pipelines with human approval gates only |
| Ignoring rollback testing | Quarterly disaster recovery drills with timed rollbacks |

## 8. Latest Updates & Trends

- **2025 Trend:** AI-assisted code review (GitHub Copilot, Cursor) integrated into SDLC gates with human oversight
- **Regulatory:** RBI's updated IT governance framework mandates automated vulnerability scanning in CI/CD
- **Tooling:** OpenShift GitOps (ArgoCD) replacing manual deployment scripts in major Indian banks
- **Methodology:** "Continuous Compliance" replacing annual audit scrambles with real-time compliance dashboards`,
  },
  {
    id: 'jenkins-cicd-pipelines',
    title: 'Jenkins CI/CD Build Pipelines: Code Commit to Enterprise Production',
    excerpt: 'End-to-end Jenkins pipeline architecture for banking frontend deployments — from git push to OpenShift production pods.',
    category: 'DevOps',
    date: '2025-07-22',
    author: 'Jaya Madhuri',
    tags: ['Jenkins', 'CI/CD', 'OpenShift', 'DevOps'],
    content: `## 1. Topic Title & Modern Context

Jenkins remains the backbone of enterprise CI/CD in Indian banking IT, orchestrating everything from code compilation to OpenShift container deployment. Modern Jenkins pipelines use **Declarative Pipeline syntax**, **shared libraries**, and **multi-branch strategies** integrated with GitHub/GitLab webhooks for instant feedback.

## 2. The Problem

Manual deployment processes in banking lead to:
- 4+ hour deployment windows with human error risk
- Inconsistent builds across developer machines
- No automated rollback when production issues arise
- Missing audit trails required by compliance teams
- Frontend builds failing silently due to environment differences

## 3. The Solution

A **Jenkins Declarative Pipeline** with staged quality gates automates the entire journey from commit to production, with human approval only at critical checkpoints.

\`\`\`groovy
pipeline {
  agent { label 'nodejs-18' }
  environment {
    REGISTRY = 'registry.bank.internal'
    APP_NAME = 'cbx-frontend'
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install & Lint') {
      steps { sh 'npm ci && npm run lint' }
    }
    stage('Test') {
      steps { sh 'npm run test:ci' }
      post { always { junit 'coverage/junit.xml' } }
    }
    stage('Build') {
      steps { sh 'npm run build:prod' }
    }
    stage('Security Scan') {
      steps { sh 'npm audit --audit-level=high' }
    }
    stage('Deploy Staging') {
      steps { sh './deploy-openshift.sh staging' }
    }
    stage('Deploy Production') {
      when { branch 'main' }
      steps {
        input message: 'Deploy to Production?', ok: 'Deploy'
        sh './deploy-openshift.sh production'
      }
    }
  }
}
\`\`\`

## 4. How, Where & Why to Use

**Adopt when:** Team size > 3, deployment frequency > weekly, or compliance requires build reproducibility.

**Setup checklist:**
1. Jenkins agent with Node.js 18+, Docker, and oc CLI
2. Credentials stored in Jenkins Credential Store (never in Jenkinsfile)
3. Shared library for reusable deployment functions
4. Slack/Teams webhook for build notifications
5. Artifact repository (Nexus) for build outputs

## 5. Primary Industry Use Cases

- **Angular/React frontend builds** deployed as nginx containers on OpenShift
- **Multi-environment promotion:** DEV → SIT → UAT → PROD with automated smoke tests
- **Hotfix pipelines** triggered from \`hotfix/*\` branches bypassing full test suite with targeted tests
- **Scheduled nightly builds** for dependency vulnerability scanning

## 6. Practical Code / Flow Examples

\`\`\`bash
#!/bin/bash
# deploy-openshift.sh
ENV=$1
oc project cbx-frontend-\${ENV}
oc set image deployment/cbx-app cbx-app=\${REGISTRY}/\${APP_NAME}:\${BUILD_NUMBER}
oc rollout status deployment/cbx-app --timeout=300s
\`\`\`

\`\`\`javascript
// package.json scripts for CI integration
{
  "scripts": {
    "build:prod": "ng build --configuration=production",
    "test:ci": "ng test --watch=false --code-coverage",
    "lint": "eslint src/ --max-warnings=0"
  }
}
\`\`\`

## 7. Common Mistakes & Anti-Patterns

- **Hardcoding secrets in Jenkinsfile** → Use Jenkins Credentials + withCredentials block
- **No build artifact caching** → Cache node_modules with Jenkins cache step
- **Skipping failed test stages** → Use \`post { failure { ... } }\` for notifications
- **Monolithic pipeline for all branches** → Multi-branch pipeline with branch-specific stages
- **No rollback automation** → Store previous image tag and automate \`oc rollout undo\`

## 8. Latest Updates & Trends

- **Jenkins 2.4xx:** Built-in support for Kubernetes agents replacing static VMs
- **GitOps shift:** ArgoCD/Flux handling deployment while Jenkins handles build/test
- **Supply chain security:** SBOM generation and Sigstore signing in pipeline stages
- **AI integration:** Copilot-generated test cases triggered automatically on PR creation`,
  },
  {
    id: 'openshift-container-orchestration',
    title: 'OpenShift Container Orchestration for Frontend Engineers',
    excerpt: 'A frontend developer\'s guide to deploying, scaling, and monitoring Angular/React apps on OpenShift Container Platform.',
    category: 'DevOps',
    date: '2025-06-10',
    author: 'Jaya Madhuri',
    tags: ['OpenShift', 'Kubernetes', 'Containers', 'DevOps'],
    content: `## 1. Topic Title & Modern Context

OpenShift Container Platform (OCP) is the de facto deployment target for enterprise banking applications in India. Frontend engineers must understand containerization, ConfigMaps, Routes, and health probes — not just \`npm run build\`. OCP 4.x brings **Serverless (Knative)**, **GitOps**, and **Developer Catalog** for streamlined frontend deployments.

## 2. The Problem

Frontend developers often treat deployment as "someone else's job," leading to:
- Broken production builds due to missing environment variables
- Static assets served without proper cache headers
- No health checks causing traffic routed to crashed pods
- ConfigMap changes requiring full redeployment instead of rolling updates
- Inability to debug production issues without SSH access

## 3. The Solution

Containerize frontend apps with **multi-stage Docker builds** and deploy using OpenShift's DeploymentConfig with proper probes, ConfigMaps, and Routes.

\`\`\`dockerfile
# Multi-stage Dockerfile for Angular/React
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:prod

FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
HEALTHCHECK CMD curl -f http://localhost:8080/health || exit 1
\`\`\`

## 4. How, Where & Why to Use

**Use OpenShift when:** Enterprise requires RBAC, audit logging, multi-tenancy, and integrated CI/CD — standard in Indian banking IT.

**Key concepts for frontend devs:**
- **ConfigMap:** Runtime config (API URLs, feature flags) without rebuild
- **Route:** External HTTPS access with bank's SSL certificates
- **Liveness/Readiness probes:** Kubernetes restarts unhealthy pods automatically
- **HPA:** Auto-scale pods during peak banking hours (salary day, tax deadlines)

## 5. Primary Industry Use Cases

- Deploying CBX corporate banking portals with 99.99% uptime SLAs
- Blue-green deployments for zero-downtime frontend updates
- Multi-region deployment for disaster recovery compliance
- Environment isolation: DEV/SIT/UAT/PROD namespaces with RBAC

## 6. Practical Code / Flow Examples

\`\`\`yaml
# openshift-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cbx-frontend
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: cbx-app
        image: registry.bank.internal/cbx-frontend:latest
        ports:
        - containerPort: 8080
        envFrom:
        - configMapRef:
            name: cbx-config
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
\`\`\`

\`\`\`javascript
// Runtime config loading from ConfigMap-mounted env
const config = {
  apiUrl: window.__ENV__?.API_URL || import.meta.env.VITE_API_URL,
  featureFlags: window.__ENV__?.FEATURES || {},
};
\`\`\`

## 7. Common Mistakes & Anti-Patterns

- **Baking secrets into Docker images** → Use OpenShift Secrets mounted as env vars
- **Single replica in production** → Minimum 2 replicas with PodDisruptionBudget
- **No resource limits** → Set CPU/memory requests and limits to prevent noisy neighbor issues
- **Serving SPA without nginx fallback** → Configure \`try_files $uri /index.html\` for client-side routing
- **Ignoring pod logs** → Use \`oc logs -f\` and integrate with ELK/Splunk stack

## 8. Latest Updates & Trends

- **OpenShift 4.15:** Enhanced Developer perspective with one-click deployment from Git
- **WebAssembly:** Emerging option for running compute-heavy frontend logic in containers
- **eBPF monitoring:** Real-time performance metrics without application instrumentation
- **ConfigMap hot-reload:** Sidecar patterns for zero-restart configuration updates`,
  },
  {
    id: 'angular-vs-react-state-management',
    title: 'Angular vs. React: State Management & Microservice Integration',
    excerpt: 'Comparative analysis of state management patterns and microservice integration strategies in Angular and React for banking apps.',
    category: 'Frontend',
    date: '2025-05-18',
    author: 'Jaya Madhuri',
    tags: ['Angular', 'React', 'State Management', 'Microservices'],
    content: `## 1. Topic Title & Modern Context

In 2025, both Angular (with Signals) and React (with Server Components and Zustand) offer mature state management for enterprise banking apps. The choice impacts how frontend clients orchestrate calls across 15+ microservices via API Gateways. This article compares real-world patterns from CBX (Angular) and mobility apps (React).

## 2. The Problem

Banking frontends must manage:
- Complex multi-step transaction flows with rollback capability
- Real-time balance updates across multiple accounts
- Role-based UI rendering from authorization microservices
- Optimistic UI updates with server reconciliation
- Session timeout handling without data loss

Choosing the wrong state management approach leads to prop drilling hell (React) or over-engineered NgRx boilerplate (Angular).

## 3. The Solution

**Angular:** Signals + Services pattern for reactive state with minimal boilerplate.
**React:** Zustand/Context for global state + React Query for server state caching.

\`\`\`typescript
// Angular Signals approach
@Injectable({ providedIn: 'root' })
export class AccountStore {
  private accountsSignal = signal<Account[]>([]);
  accounts = this.accountsSignal.asReadonly();
  
  totalBalance = computed(() => 
    this.accountsSignal().reduce((sum, a) => sum + a.balance, 0)
  );

  async fetchAccounts(customerId: string) {
    const data = await this.api.get(\`/accounts/\${customerId}\`);
    this.accountsSignal.set(data);
  }
}
\`\`\`

\`\`\`javascript
// React + Zustand + React Query
const useAccountStore = create((set) => ({
  selectedAccount: null,
  setSelectedAccount: (account) => set({ selectedAccount: account }),
}));

function useAccounts(customerId) {
  return useQuery({
    queryKey: ['accounts', customerId],
    queryFn: () => api.get(\`/accounts/\${customerId}\`),
    staleTime: 30_000,
    retry: 3,
  });
}
\`\`\`

## 4. How, Where & Why to Use

| Criteria | Choose Angular | Choose React |
|---|---|---|
| Team expertise | Strong TypeScript, OOP background | JavaScript-first, functional style |
| App complexity | Large forms, dependency injection | Component-heavy, rapid prototyping |
| Microservice calls | HttpClient + Interceptors | Axios/Fetch + React Query |
| Enterprise tooling | Built-in CLI, testing, routing | Ecosystem choice (Vite, Next.js) |
| Long-term maintenance | Opinionated structure | Flexible but needs conventions |

## 5. Primary Industry Use Cases

- **Angular:** CBX corporate banking dashboards, complex authorization workflows, form-heavy modules
- **React:** Mobile banking apps, marketing portals, internal developer tools
- **Both:** API Gateway integration with OAuth2 token refresh, circuit breaker patterns

## 6. Practical Code / Flow Examples

\`\`\`typescript
// Microservice integration with circuit breaker (Angular Interceptor)
@Injectable()
export class CircuitBreakerInterceptor implements HttpInterceptor {
  private failures = new Map<string, number>();
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const service = new URL(req.url).pathname.split('/')[1];
    if ((this.failures.get(service) || 0) >= 3) {
      return throwError(() => new Error('Service unavailable'));
    }
    return next.handle(req).pipe(
      catchError(err => {
        this.failures.set(service, (this.failures.get(service) || 0) + 1);
        return throwError(() => err);
      })
    );
  }
}
\`\`\`

## 7. Common Mistakes & Anti-Patterns

- **NgRx for simple apps** → Use Signals/Services until complexity demands NgRx
- **Redux boilerplate in React** → Zustand or Jotai for 90% of use cases
- **Duplicating server state in client store** → React Query/SWR handles cache; don't mirror in Zustand
- **No request deduplication** → Multiple components fetching same account data simultaneously
- **Ignoring stale-while-revalidate** → Show cached data immediately, refresh in background

## 8. Latest Updates & Trends

- **Angular 19:** Signal-based components becoming default, zoneless change detection
- **React 19:** Server Components, use() hook, improved Suspense for data fetching
- **Micro-Frontends:** Module Federation enabling Angular + React coexistence in same banking portal
- **tRPC/gRPC-Web:** Type-safe API contracts replacing REST for internal microservice communication`,
  },
  {
    id: 'advanced-javascript-closures-event-loop',
    title: 'Advanced JavaScript: Closures, Event Loop, and Performance Hacks',
    excerpt: 'Deep dive into JavaScript internals that every banking frontend developer must master — closures, event loop, and optimization patterns.',
    category: 'JavaScript',
    date: '2025-04-05',
    author: 'Jaya Madhuri',
    tags: ['JavaScript', 'Performance', 'Event Loop', 'Closures'],
    content: `## 1. Topic Title & Modern Context

JavaScript powers every banking frontend — from React mobility apps to Angular CBX platforms. Understanding closures, the event loop, and V8 optimization patterns separates senior developers from those who merely write code. With ES2024 features like \`Array.groupBy\` and temporal API, modern JS continues evolving while core mechanics remain critical.

## 2. The Problem

Common production issues in banking apps caused by JS internals misunderstanding:
- Memory leaks from closures holding DOM references in transaction lists
- UI freezes during bulk payment processing (blocking the main thread)
- Race conditions in concurrent API calls for account balance updates
- Incorrect \`this\` binding in event handlers causing auth token loss
- setTimeout/setInterval drift causing session timeout miscalculations

## 3. The Solution

Master the **Event Loop model**, use **closures intentionally**, and apply **performance patterns** for high-concurrency banking UIs.

\`\`\`javascript
// Closure for secure session management
function createSessionManager(apiClient) {
  let token = null;
  let refreshTimer = null;

  return {
    getToken: () => token,
    setToken: (newToken, expiresIn) => {
      token = newToken;
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => refreshToken(), expiresIn - 60000);
    },
    destroy: () => {
      token = null;
      clearTimeout(refreshTimer);
    }
  };
}
\`\`\`

## 4. How, Where & Why to Use

**Closures:** Module patterns, event handler factories, memoization, partial application.
**Event Loop:** Understanding macrotask vs microtask ordering for predictable async behavior.
**Performance hacks:** Debouncing search inputs, virtual scrolling for transaction history, Web Workers for CSV parsing.

## 5. Primary Industry Use Cases

- **Debounced IFSC/beneficiary search** in fund transfer forms (300ms debounce)
- **Virtual scrolling** for account transaction history (10,000+ records)
- **Web Workers** for parsing bulk payment CSV files without UI freeze
- **RequestAnimationFrame** for smooth balance counter animations
- **WeakMap** for caching DOM-to-data associations without memory leaks

## 6. Practical Code / Flow Examples

\`\`\`javascript
// Event Loop: Microtask vs Macrotask ordering
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2

// Debounce for search input
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const searchBeneficiary = debounce(async (query) => {
  const results = await api.searchBeneficiaries(query);
  renderResults(results);
}, 300);

// Memoization for expensive calculations
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
\`\`\`

## 7. Common Mistakes & Anti-Patterns

- **Closure memory leaks** → Nullify references in cleanup/unmount handlers
- **Blocking main thread** → Offload heavy computation to Web Workers
- **await in loops** → Use \`Promise.all()\` for parallel API calls
- **Creating functions in render** → Memoize callbacks with useCallback (React) or bind once
- **Ignoring WeakMap/WeakSet** → Use for object-keyed caches that should GC automatically

## 8. Latest Updates & Trends

- **ES2024:** \`Array.groupBy()\`, \`Promise.withResolvers()\`, improved regex features
- **V8 optimizations:** Hidden classes — keep object shapes consistent for JIT optimization
- **React 19 Compiler:** Automatic memoization reducing need for manual useCallback/useMemo
- **Temporal API (Stage 3):** Replacing Date object for timezone-safe banking date calculations`,
  },
  {
    id: 'web-performance-chrome-devtools',
    title: 'Web Performance Tuning & Advanced Chrome DevTools Debugging',
    excerpt: 'Practical performance optimization techniques and Chrome DevTools workflows for enterprise banking web applications.',
    category: 'Performance',
    date: '2025-03-12',
    author: 'Jaya Madhuri',
    tags: ['Performance', 'DevTools', 'Core Web Vitals', 'Optimization'],
    content: `## 1. Topic Title & Modern Context

Core Web Vitals (LCP, INP, CLS) directly impact user retention in banking apps where trust and speed are paramount. Chrome DevTools in 2025 offers **Performance Insights**, **Memory profiling**, and **Network request blocking** — essential tools for frontend engineers optimizing enterprise applications deployed on OpenShift.

## 2. The Problem

Banking web apps commonly suffer from:
- LCP > 4s due to unoptimized hero images and render-blocking CSS
- INP > 200ms from heavy JavaScript during payment form interactions
- CLS > 0.1 from dynamically loaded account balance widgets shifting layout
- Memory leaks in long-running corporate banking sessions (8+ hours)
- Bundle sizes exceeding 2MB causing slow loads on 3G mobile networks

## 3. The Solution

Systematic performance optimization using the **RAIL model** (Response, Animation, Idle, Load) combined with Chrome DevTools profiling workflows.

\`\`\`javascript
// Performance monitoring utility
const perfObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      analytics.track('LCP', { value: entry.startTime });
    }
  }
});
perfObserver.observe({ type: 'largest-contentful-paint', buffered: true });
\`\`\`

## 4. How, Where & Why to Use

**DevTools Performance tab workflow:**
1. Record page load → Identify long tasks (> 50ms)
2. Analyze Main thread flame chart → Find expensive JS functions
3. Check Network waterfall → Optimize critical request chain
4. Memory tab → Take heap snapshots, compare for leaks
5. Coverage tab → Remove unused CSS/JS

**When to optimize:** Before every major release, after adding new modules, when Lighthouse score drops below 90.

## 5. Primary Industry Use Cases

- **Payment form optimization:** Reduce INP for amount input and beneficiary selection
- **Dashboard load time:** Lazy load widgets, prioritize above-the-fold account summary
- **Mobile banking on 3G:** Service worker caching, critical CSS inlining
- **Long session stability:** Memory profiling for corporate users with 8-hour sessions
- **Bulk upload UI:** Web Worker processing with progress indicators

## 6. Practical Code / Flow Examples

\`\`\`javascript
// Lazy load banking modules
const PaymentModule = lazy(() => import('./modules/PaymentModule'));
const ReportsModule = lazy(() => import('./modules/ReportsModule'));

// Image optimization
<img 
  src="account-icon.webp" 
  width="48" height="48"
  loading="lazy"
  decoding="async"
  alt="Account"
/>

// Prevent layout shift with skeleton
function BalanceWidget({ accountId }) {
  const { data, isLoading } = useAccountBalance(accountId);
  if (isLoading) return <Skeleton width={120} height={32} />;
  return <span className="balance">{formatCurrency(data.balance)}</span>;
}

// Bundle analysis command
// npx vite-bundle-visualizer
\`\`\`

**DevTools debugging checklist:**
\`\`\`
□ Performance → Record → Analyze long tasks
□ Network → Disable cache → Throttle to Fast 3G
□ Memory → Heap snapshot → Compare 3 snapshots over 30 min session
□ Application → Service Workers → Verify cache strategy
□ Lighthouse → Run audit → Fix flagged issues
\`\`\`

## 7. Common Mistakes & Anti-Patterns

- **Optimizing prematurely** → Profile first, optimize bottlenecks only
- **Loading all routes upfront** → Route-based code splitting is mandatory
- **Unoptimized images** → Use WebP/AVIF, explicit width/height, lazy loading
- **Synchronous third-party scripts** → Defer analytics, use facade pattern
- **Ignoring INP for interactions** → Test form submissions, dropdowns, not just page load

## 8. Latest Updates & Trends

- **INP replaces FID:** Interaction to Next Paint is the new Core Web Vital (March 2024)
- **Chrome DevTools AI:** Experimental AI-powered performance suggestions
- **Speculation Rules API:** Prerender likely next navigation in banking workflows
- **View Transitions API:** Smooth page transitions without performance penalty
- **React 19 Compiler:** Automatic memoization reducing unnecessary re-renders by 30-40%`,
  },
];

export const blogCategories = [
  'All',
  'Architecture',
  'Angular',
  'React',
  'Frontend',
  'JavaScript',
  'Performance',
  'DevOps',
  'Mobile',
  'Firebase',
  'Full-Stack',
  'Banking',
];

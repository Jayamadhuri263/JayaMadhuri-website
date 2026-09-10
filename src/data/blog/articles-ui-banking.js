import { createArticle } from './articleFactory';

export const uiBankingArticles = [
  createArticle({
    id: 'material-ui-data-grid-transactions',
    title: 'Material UI Data Grid for Banking Transaction Tables',
    excerpt: 'Building high-performance, sortable, filterable transaction tables with MUI DataGrid in CBX applications.',
    category: 'Frontend',
    date: '2025-09-02',
    tags: ['Material UI', 'DataGrid', 'Tables', 'Banking'],
    context: 'Banking applications display thousands of transactions in data tables requiring sorting, filtering, pagination, and export. Material UI DataGrid (MUI X) provides enterprise-grade table functionality used across CBX corporate banking modules for transaction history, authorization queues, and report grids.',
    problem: 'Basic HTML tables in banking apps fail because:\n- No sorting/filtering on 10,000+ transaction rows\n- Poor performance rendering large datasets without virtualization\n- Missing column customization expected by corporate users\n- No CSV/Excel export for audit and reconciliation\n- Inaccessible table navigation for keyboard users',
    solution: '**MUI X DataGrid** with server-side pagination, column sorting, filter panel, row selection, and CSV export — handling millions of rows via server-side data mode.',
    usage: '**Server mode:** Backend handles pagination/sort/filter; frontend sends params.\n**Columns:** Define typed columns with custom renderers for currency, status badges.\n**Export:** Built-in CSV export or custom Excel export handler.',
    useCases: '- CBX transaction history with date range filter and pagination\n- Authorization queue with approve/reject action columns\n- Bulk payment status grid with row selection for retry\n- Account statement view with running balance column',
    examples: `\`\`\`typescript
const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', width: 150, type: 'dateTime' },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'amount', headerName: 'Amount', width: 130, type: 'number',
    renderCell: (params) => formatCurrency(params.value, 'INR') },
  { field: 'status', headerName: 'Status', width: 120,
    renderCell: (params) => <StatusBadge status={params.value} /> },
];

<DataGrid
  rows={transactions} columns={columns}
  paginationMode="server" rowCount={totalCount}
  onPaginationModelChange={handlePageChange}
  onSortModelChange={handleSort}
  filterMode="server" onFilterModelChange={handleFilter}
  checkboxSelection pageSizeOptions={[20, 50, 100]}
  loading={loading}
/>
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Client-side mode with 10K+ rows | Switch to server-side pagination |\n| No loading skeleton during fetch | Show DataGrid loading overlay |\n| Hardcoded column widths | Use flex for responsive columns |\n| Missing empty state | Show "No transactions found" overlay |',
    trends: '- **MUI X Data Grid Premium:** Row grouping, tree data, Excel export\n- **TanStack Table:** Headless alternative with full customization\n- **AG Grid:** Enterprise grid for complex banking reporting\n- **Virtual scrolling:** Built-in virtualization handling 100K+ rows',
  }),

  createArticle({
    id: 'bootstrap-responsive-banking-ui',
    title: 'Bootstrap Responsive Patterns for Banking Web Applications',
    excerpt: 'Grid system, utility classes, and responsive breakpoints for cross-device banking UI with Bootstrap.',
    category: 'Frontend',
    date: '2025-08-18',
    tags: ['Bootstrap', 'CSS', 'Responsive', 'Banking'],
    context: 'Bootstrap remains a foundational CSS framework in many banking projects — including Cordova mobility apps and legacy CBX modules. Its grid system, utility classes, and responsive breakpoints provide reliable cross-device layouts for banking forms, dashboards, and navigation across the 320px-to-ultra-wide range.',
    problem: 'Non-responsive banking UIs cause:\n- Fund transfer forms unusable on mobile devices\n- Dashboard widgets overlapping on tablet screens\n- Navigation menus breaking on small viewports\n- Touch targets too small for mobile banking users\n- Horizontal scrolling on banking forms frustrating users',
    solution: '**Bootstrap 5 grid system** with responsive breakpoints (sm/md/lg/xl/xxl), utility classes for spacing/display, and responsive components (navbar collapse, modal, offcanvas).',
    usage: '**Mobile-first:** Design for 320px, enhance at md (768px) and lg (1024px).\n**Grid:** `col-12 col-md-6 col-lg-4` for responsive card layouts.\n**Utilities:** `d-none d-md-block` for responsive visibility.',
    useCases: '- Banking login page responsive across phone/tablet/desktop\n- Fund transfer form stacking fields vertically on mobile\n- Dashboard widget grid adapting from 1 to 3 columns\n- Collapsible navigation for mobile banking WebView',
    examples: `\`\`\`html
<!-- Responsive banking dashboard -->
<div class="container-fluid">
  <div class="row g-3">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100"><div class="card-body">
        <h5 class="card-title">Account Balance</h5>
        <p class="display-6 text-primary">₹2,45,000</p>
      </div></div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100"><div class="card-body">
        <h5 class="card-title">Pending Authorizations</h5>
        <span class="badge bg-warning fs-5">12</span>
      </div></div>
    </div>
  </div>
</div>

<!-- Responsive form -->
<div class="row">
  <div class="col-12 col-md-6 mb-3">
    <label class="form-label">From Account</label>
    <select class="form-select">...</select>
  </div>
  <div class="col-12 col-md-6 mb-3">
    <label class="form-label">Amount</label>
    <input class="form-control" type="number" inputmode="decimal">
  </div>
</div>
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Fixed pixel widths on containers | Use Bootstrap container/grid system |\n| Hiding critical actions on mobile | Ensure primary CTAs visible at all breakpoints |\n| Not testing at 320px width | Test smallest supported viewport |\n| Mixing Bootstrap 4 and 5 classes | Complete migration; don\'t mix versions |',
    trends: '- **Bootstrap 5.3:** Color modes (dark theme) built-in\n- **Tailwind CSS migration:** Many teams moving from Bootstrap to Tailwind utilities\n- **CSS Container Queries:** Component-level responsiveness beyond viewport breakpoints\n- **Bootstrap Icons:** Official icon set replacing Font Awesome dependency',
  }),

  createArticle({
    id: 'css-grid-flexbox-banking-dashboards',
    title: 'CSS Grid vs Flexbox for Responsive Banking Dashboards',
    excerpt: 'Choosing the right CSS layout system for CBX dashboard widgets, forms, and navigation patterns.',
    category: 'Frontend',
    date: '2025-08-05',
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    context: 'Modern banking dashboards combine CSS Grid for page-level layouts and Flexbox for component-level alignment. Understanding when to use each — Grid for two-dimensional layouts (dashboard widget grids), Flexbox for one-dimensional flows (navigation bars, form rows) — is essential for responsive CBX corporate banking interfaces.',
    problem: 'Layout confusion in banking CSS causes:\n- Dashboard widgets misaligned at different viewport sizes\n- Form labels and inputs not aligning consistently\n- Navigation items wrapping awkwardly on tablet screens\n- Over-reliance on Bootstrap grid for complex custom layouts\n- Fighting float-based legacy layouts in older CBX modules',
    solution: '**Decision rule:** Grid for page/dashboard layout (rows AND columns). Flexbox for component internals (nav bars, card headers, button groups, form rows).',
    usage: '**Grid:** `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));`\n**Flexbox:** `display: flex; justify-content: space-between; align-items: center;`\n**Combine:** Grid page layout containing Flexbox-styled components.',
    useCases: '- CSS Grid dashboard with auto-fit widget columns\n- Flexbox navigation bar with logo, links, and user menu\n- Grid form layout with label-input pairs\n- Flexbox transaction row with amount aligned right',
    examples: `\`\`\`css
/* Dashboard grid layout */
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

/* Widget card with flexbox internals */
.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

/* Responsive sidebar layout */
.app-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}
@media (max-width: 768px) {
  .app-layout { grid-template-columns: 1fr; }
  .sidebar { display: none; }
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Flexbox for two-dimensional grid layouts | Use CSS Grid for dashboard widget arrangements |\n| Grid for simple horizontal alignment | Flexbox is simpler for single-row/column layouts |\n| Fixed pixel grid tracks | Use fr units and minmax for responsive grids |\n| Not using gap property | Replace margin hacks with gap for grid/flex spacing |',
    trends: '- **Subgrid:** Nested grid alignment across parent/child grids\n- **CSS Grid Level 2:** Masonry layout for variable-height widgets\n- **Tailwind CSS Grid/Flex utilities:** Rapid layout prototyping\n- **Container queries:** Component layouts responding to container, not viewport',
  }),

  createArticle({
    id: 'html5-semantic-accessible-forms',
    title: 'HTML5 Semantic Markup for Accessible Banking Forms',
    excerpt: 'Building WCAG-compliant banking forms with semantic HTML, ARIA labels, and keyboard navigation.',
    category: 'Frontend',
    date: '2025-07-25',
    tags: ['HTML5', 'Accessibility', 'Forms', 'WCAG'],
    context: 'Banking applications must meet accessibility standards (WCAG 2.1 AA) for regulatory compliance and inclusive design. Semantic HTML5 elements, proper ARIA attributes, and keyboard-navigable forms ensure CBX corporate banking platforms are usable by all customers including those using screen readers and keyboard-only navigation.',
    problem: 'Inaccessible banking forms cause:\n- Screen reader users unable to complete fund transfers\n- Regulatory compliance failures in accessibility audits\n- Keyboard users trapped in custom dropdown components\n- Missing error announcements for form validation failures\n- Color-only status indicators invisible to colorblind users',
    solution: '**Semantic HTML + ARIA:** Use native form elements, associate labels with inputs, provide error messages via aria-describedby, ensure logical tab order, and test with screen readers.',
    usage: '**Labels:** Every input has `<label for="id">` or aria-label.\n**Errors:** `aria-invalid="true"` + `aria-describedby="error-id"` on invalid fields.\n**Groups:** `<fieldset>` + `<legend>` for related form sections.\n**Focus:** Visible focus indicators on all interactive elements.',
    useCases: '- Fund transfer form accessible to screen reader users\n- OTP input with individual digit fields and proper labeling\n- Error messages announced immediately on validation failure\n- Data tables with proper th/td scope attributes',
    examples: `\`\`\`html
<form aria-label="Fund Transfer">
  <fieldset>
    <legend>Transfer Details</legend>

    <div class="form-group">
      <label for="from-account">From Account</label>
      <select id="from-account" aria-required="true" aria-describedby="from-hint">
        <option value="">Select account</option>
      </select>
      <span id="from-hint" class="hint">Select the account to debit</span>
    </div>

    <div class="form-group">
      <label for="amount">Amount (INR)</label>
      <input type="number" id="amount" aria-required="true"
        aria-invalid="true" aria-describedby="amount-error">
      <span id="amount-error" role="alert" class="error">
        Amount exceeds available balance
      </span>
    </div>

    <button type="submit">Transfer Funds</button>
  </fieldset>
</form>
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Placeholder as only label | Always provide visible `<label>` elements |\n| div/span buttons instead of `<button>` | Use semantic button elements |\n| Removing focus outlines with CSS | Style focus indicators, never remove them |\n| Color-only error indicators | Add text/icon alongside color for errors |',
    trends: '- **WCAG 2.2:** Updated accessibility guidelines with new success criteria\n- **Accessibility testing in CI:** axe-core automated checks in Jenkins pipeline\n- **Inclusive design systems:** Banking UI kits with built-in accessibility\n- **Voice navigation:** Banking apps supporting voice commands for accessibility',
  }),

  createArticle({
    id: 'cross-browser-compatibility-enterprise',
    title: 'Cross-Browser Compatibility Testing for Enterprise Web Apps',
    excerpt: 'Ensuring CBX banking applications work flawlessly across Chrome, Firefox, Edge, and Safari.',
    category: 'Frontend',
    date: '2025-07-15',
    tags: ['Cross-Browser', 'Testing', 'Compatibility', 'QA'],
    context: 'CBX corporate banking users access applications through Chrome, Firefox, Edge, and occasionally Safari — often on IT-managed corporate laptops with restricted browser versions. Cross-browser compatibility is a daily responsibility for frontend developers at Intellect, ensuring zero-lag UI transitions and consistent behavior across all supported browsers.',
    problem: 'Browser inconsistencies in banking apps cause:\n- CSS Grid/Flexbox rendering differences between Chrome and Firefox\n- JavaScript API availability gaps (Array.at, structuredClone) in older browsers\n- Date/time formatting differences affecting transaction timestamps\n- File upload behavior varying between browsers in bulk payment modules\n- ServiceNow incidents from Safari-specific rendering bugs',
    solution: '**Compatibility strategy:** Define supported browser matrix, use Autoprefixer, polyfill modern APIs, test in BrowserStack, and maintain browser-specific CSS fixes in isolated files.',
    usage: '**browserslist config:** `> 0.5%, last 2 versions, not dead, not IE 11`\n**Polyfills:** core-js for ES202+ features in angular.json polyfills.\n**Testing:** BrowserStack/Sauce Labs automated cross-browser screenshots.',
    useCases: '- CBX dashboard verified on Chrome 90+, Firefox 88+, Edge 90+, Safari 15+\n- Polyfill for Array.at() preventing blank screen on older Chrome\n- CSS -webkit- prefixes for Safari sticky navigation\n- File input accept attribute behavior tested across browsers',
    examples: `\`\`\`json
// .browserslistrc
> 0.5%
last 2 versions
not dead
Chrome >= 90
Firefox >= 88
Edge >= 90
Safari >= 15
\`\`\`

\`\`\`javascript
// Feature detection over browser sniffing
if (!Array.prototype.at) {
  await import('core-js/actual/array/at');
}

if (!window.structuredClone) {
  window.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

// CSS @supports for progressive enhancement
@supports (display: grid) {
  .dashboard { display: grid; }
}
@supports not (display: grid) {
  .dashboard { display: flex; flex-wrap: wrap; }
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Browser sniffing user-agent strings | Feature detection with @supports and typeof checks |\n| Testing only in Chrome | Test all browsers in supported matrix |\n| Ignoring corporate managed browser versions | Check with IT teams for minimum supported versions |\n| CSS hacks instead of progressive enhancement | Build baseline experience, enhance progressively |',
    trends: '- **Baseline 2024:** W3C web standards baseline for feature availability\n- **Interop 2025:** Browser vendors collaborating on compatibility\n- **Progressive enhancement revival:** Core functionality without latest APIs\n- **Playwright cross-browser:** Automated testing across Chromium, Firefox, WebKit',
  }),

  createArticle({
    id: 'production-debugging-banking-frontend',
    title: 'Production Debugging Techniques for Banking Frontend Teams',
    excerpt: 'Systematic approaches to diagnosing and fixing production UI issues in CBX and mobility banking apps.',
    category: 'Frontend',
    date: '2025-07-01',
    tags: ['Debugging', 'Production', 'Chrome DevTools', 'Banking'],
    context: 'Production debugging is a core responsibility documented in 4+ years of banking frontend experience — contributing to code reviews, performance optimization, and production debugging at Intellect. When CBX users report blank screens, failed payments, or session issues, systematic debugging separates hours-long investigations from minutes-long fixes.',
    problem: 'Ad-hoc production debugging wastes time because:\n- Developers cannot reproduce issues on local environment\n- Missing source maps making minified code unreadable\n- No structured approach — random console.log everywhere\n- Unable to correlate frontend errors with backend API failures\n- Production data sensitivity preventing direct debugging access',
    solution: '**Systematic debugging workflow:** Reproduce → Isolate → Inspect (Network, Console, Application tabs) → Correlate (timestamps, API responses) → Fix → Verify → Document RCA.',
    usage: '**Tools:** Chrome DevTools (remote debugging for mobile WebView), Redux DevTools, Network tab with preserve log, Application tab for storage inspection.\n**Remote debug:** `chrome://inspect` for Cordova WebView debugging.',
    useCases: '- Blank payment screen: Console error → missing polyfill → hotfix\n- Session timeout loop: Application tab → expired token in storage → interceptor fix\n- Slow dashboard: Performance tab → long task in chart render → memoization fix\n- Mobile WebView crash: Remote debug → JavaScript error in Cordova plugin',
    examples: `\`\`\`javascript
// Production-safe debug logging
const debug = {
  log: (...args) => { if (environment.debug) console.log('[CBX]', ...args); },
  error: (context, error) => {
    console.error(\`[CBX:\${context}]\`, error);
    if (environment.production) {
      errorReporting.captureException(error, { tags: { context } });
    }
  },
};

// Network debugging checklist
// 1. Open DevTools → Network → Preserve log
// 2. Reproduce issue
// 3. Filter failed requests (red entries)
// 4. Check: Status code, Response body, Request headers, Timing
// 5. Compare with working request from staging environment
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| console.log left in production code | Use conditional debug utility |\n| Debugging without preserving network log | Enable Preserve log before reproduction |\n| Not checking Application tab storage | Inspect localStorage/sessionStorage/cookies |\n| Fixing symptoms without root cause | Always identify why, not just what |',
    trends: '- **Source map explorer:** Visualizing production bundle composition\n- **Session replay:** LogRocket/FullStory reproducing user sessions\n- **Error boundaries with reporting:** Automatic crash telemetry to ServiceNow\n- **AI-assisted debugging:** Copilot analyzing stack traces and suggesting fixes',
  }),

  createArticle({
    id: 'code-review-angular-enterprise',
    title: 'Code Review Best Practices in Enterprise Angular Teams',
    excerpt: 'Effective PR review checklist for maintaining high code quality in CBX banking development teams.',
    category: 'Frontend',
    date: '2025-06-18',
    tags: ['Code Review', 'Angular', 'Quality', 'Team'],
    context: 'Contributing to code reviews is a daily practice for CBX frontend developers at Intellect — ensuring high code quality and maintainability across Angular banking modules. Structured code reviews catch security issues, performance problems, and accessibility gaps before they reach production banking environments.',
    problem: 'Unstructured code reviews in banking teams result in:\n- Superficial "LGTM" approvals without real inspection\n- Security vulnerabilities (XSS, token exposure) reaching production\n- Performance regressions from unnecessary re-renders or API calls\n- Inconsistent coding patterns across CBX modules\n- Knowledge silos where only one developer understands a feature',
    solution: '**Structured review checklist:** Functionality → Security → Performance → Accessibility → Testing → Code style → Documentation.',
    usage: '**Review scope:** Max 400 lines per PR for effective review.\n**Turnaround:** Review within 4 business hours for banking sprint velocity.\n**Feedback:** Suggest alternatives, not just problems. Approve with minor comments.',
    useCases: '- Reviewing fund transfer component for XSS in user input display\n- Catching missing unsubscribe in authorization queue subscription\n- Ensuring new CBX module follows established folder structure\n- Validating API error handling in payment submission flow',
    examples: `\`\`\`markdown
## Frontend Code Review Checklist

### Functionality
- [ ] Feature matches JIRA acceptance criteria
- [ ] Edge cases handled (empty data, API errors, loading states)
- [ ] Form validation matches business rules

### Security
- [ ] No hardcoded credentials or API keys
- [ ] User input sanitized before display (XSS prevention)
- [ ] Auth tokens not logged or stored insecurely

### Performance
- [ ] OnPush change detection where appropriate
- [ ] No unnecessary API calls or duplicate fetches
- [ ] Lazy loading for new feature modules

### Accessibility
- [ ] Form labels and ARIA attributes present
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA

### Testing
- [ ] Unit tests for business logic
- [ ] Component tests for user interactions
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Reviewing 1000+ line PRs | Split into smaller, reviewable PRs |\n| Personal criticism instead of code feedback | Focus on code, suggest improvements |\n| Blocking PR for style preferences | Use ESLint/Prettier for automated style enforcement |\n| No review for "small" hotfixes | All production code changes require review |',
    trends: '- **AI-assisted review:** GitHub Copilot PR summaries and suggestions\n- **Automated review bots:** SonarQube, CodeQL for security scanning\n- **Pair programming:** Real-time review replacing async PR comments\n- **Review metrics:** Tracking review turnaround and defect escape rate',
  }),

  createArticle({
    id: 'sme-requirements-frontend-solutions',
    title: 'Translating SME Requirements into Frontend Technical Solutions',
    excerpt: 'Bridging business domain experts and frontend code — requirement analysis patterns from CBX banking experience.',
    category: 'Banking',
    date: '2025-06-05',
    tags: ['Requirements', 'SME', 'Banking', 'Analysis'],
    context: 'Collaborating closely with SMEs (Subject Matter Experts) and backend engineers to translate business requirements into technical solutions is a core skill from 4+ years at Intellect Design Arena. Banking SMEs understand regulations and business rules; frontend developers must bridge their domain language into Angular components, API contracts, and user workflows.',
    problem: 'Miscommunication between SMEs and frontend developers causes:\n- Built features that don\'t match actual banking business processes\n- Missing edge cases discovered only during UAT (regulatory deadline pressure)\n- Over-engineered UI for simple business requirements\n- Under-engineered UI missing mandatory compliance fields\n- Rework cycles consuming entire sprint capacity',
    solution: '**Structured requirement translation:** User story mapping → wireframe validation with SME → API contract definition → component breakdown → acceptance criteria sign-off before coding.',
    usage: '**Questions to ask SMEs:** What happens when this fails? Who can perform this action? What are the regulatory requirements? What\'s the happy path vs exception flows?\n**Document:** Decision records for ambiguous requirements.',
    useCases: '- SME explains NEFT cut-off times → frontend shows countdown timer and cutoff warning\n- Regulatory requirement for dual authorization → Maker-Checker UI workflow\n- SME describes bulk payment file format → frontend CSV upload with validation rules\n- Business rule for minimum transfer amount → client-side + server-side validation',
    examples: `\`\`\`
SME Requirement:
"Corporate users need to authorize pending payments. Only users with
Checker role can approve. Payments above 10 lakh need two checkers.
Authorization must happen before 6 PM for same-day processing."

Frontend Translation:
1. AuthorizationQueueComponent — lists pending payments for current user
2. RoleGuard — restricts route to CHECKER/AUTHORIZER roles
3. ApproveButtonComponent — disabled if user lacks permission
4. DualAuthorizationFlow — second checker modal for amount > 10,00,000
5. CutoffWarningBanner — shows after 5:30 PM warning about next-day processing
6. API: GET /pending-authorizations, POST /authorize/{id}
7. Acceptance criteria documented and signed by SME
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Starting code before SME sign-off | Validate understanding with wireframes first |\n| Assuming banking knowledge | Ask questions; document domain terms in glossary |\n| Building only happy path | Ask SME for every exception and error scenario |\n| No written acceptance criteria | Document AC before sprint commitment |',
    trends: '- **Event storming:** Collaborative domain modeling workshops with SMEs\n- **BDD/Gherkin:** Given-When-Then scenarios bridging business and tech language\n- **Figma collaboration:** SME reviewing interactive prototypes before development\n- **AI requirement analysis:** Copilot summarizing SME meeting notes into user stories',
  }),

  createArticle({
    id: 'zero-lag-ui-transitions-banking',
    title: 'Zero-Lag UI Transitions in High-Concurrency Banking Apps',
    excerpt: 'Achieving smooth 60fps animations and instant feedback in CBX and mobility banking interfaces.',
    category: 'Performance',
    date: '2025-05-25',
    tags: ['Performance', 'Animations', 'UX', 'Banking'],
    context: 'Ensuring cross-browser compatibility, smooth UI transitions, and application responsiveness with zero lag is a stated responsibility in banking frontend development. Corporate users processing hundreds of transactions daily expect instant feedback — laggy UI directly impacts productivity and customer satisfaction in CBX and mobility banking applications.',
    problem: 'Laggy banking UI causes:\n- Users double-clicking submit buttons causing duplicate transactions\n- Perceived slowness eroding trust in banking platform reliability\n- Scroll jank in transaction lists frustrating power users\n- Page transitions blocking interaction for 500ms+\n- Animation frame drops during dashboard widget loading',
    solution: '**Performance-first UI patterns:** CSS transforms over layout properties, will-change hints, skeleton screens, optimistic UI updates, and requestAnimationFrame for JavaScript animations.',
    usage: '**Animate:** transform and opacity only (GPU-accelerated).\n**Avoid animating:** width, height, top, left (triggers layout reflow).\n**Feedback:** Immediate visual response (< 100ms) on every user action.',
    useCases: '- Instant button press feedback on payment submission\n- Skeleton screens during account data loading\n- Smooth page transitions in Angular router with CSS animations\n- Optimistic UI showing success before API confirmation returns',
    examples: `\`\`\`css
/* GPU-accelerated transitions */
.btn-submit {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-submit:active { transform: scale(0.97); }
.btn-submit.loading { pointer-events: none; opacity: 0.7; }

.page-enter { animation: slideIn 0.3s ease-out; }
@keyframes slideIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
\`\`\`

\`\`\`javascript
// Optimistic UI update
async function approvePayment(paymentId) {
  setPayments(prev => prev.map(p =>
    p.id === paymentId ? { ...p, status: 'APPROVED' } : p
  ));
  try {
    await api.approvePayment(paymentId);
  } catch (err) {
    setPayments(prev => prev.map(p =>
      p.id === paymentId ? { ...p, status: 'PENDING' } : p
    ));
    showError('Approval failed. Please retry.');
  }
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| No loading feedback for 200ms+ operations | Show spinner/skeleton immediately on action |\n| Animating layout properties | Use transform/opacity for 60fps animations |\n| Blocking UI during API calls | Disable submit button, not entire page |\n| No optimistic updates for fast operations | Show success immediately, rollback on failure |',
    trends: '- **View Transitions API:** Native smooth page transitions in SPAs\n- **Framer Motion:** Declarative animations with layout animation support\n- **INP optimization:** Interaction to Next Paint as key responsiveness metric\n- **CSS @starting-style:** Entry animations for dynamically inserted elements',
  }),

  createArticle({
    id: 'responsive-design-multi-device-banking',
    title: 'Responsive Design Patterns for Multi-Device Banking (320px to Ultra-Wide)',
    excerpt: 'Complete responsive strategy for banking apps serving mobile, tablet, laptop, and ultra-wide corporate displays.',
    category: 'Frontend',
    date: '2025-05-15',
    tags: ['Responsive', 'Mobile-First', 'CSS', 'Banking'],
    context: 'Banking applications serve users across the full device spectrum — from 320px mobile screens (Cordova apps for IDFC/BoB) to ultra-wide corporate monitors displaying CBX dashboards with 10+ widgets. A mobile-first responsive strategy ensures consistent, usable experiences at every breakpoint.',
    problem: 'Incomplete responsive design in banking causes:\n- CBX dashboard wasting space on ultra-wide monitors\n- Mobile banking forms requiring horizontal scrolling\n- Touch targets too small on mobile (< 44px minimum)\n- Tablet users seeing phone layout with excessive whitespace\n- Print layouts broken for bank statement exports',
    solution: '**Mobile-first responsive system:** Base styles for 320px, progressive enhancement at md/lg/xl breakpoints, fluid typography with clamp(), CSS Grid auto-fit for dashboards, and container queries for component-level adaptation.',
    usage: '**Breakpoints:** 320px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop), 1920px+ (ultra-wide).\n**Strategy:** Mobile-first CSS, fluid typography, container queries for components.\n**Testing:** Chrome DevTools device mode + real device testing.',
    useCases: '- IDFC mobile banking app optimized for 320px-428px phones\n- CBX dashboard expanding widgets on 1920px+ ultra-wide monitors\n- Fund transfer form adapting layout at tablet breakpoint\n- Print stylesheet for account statement PDF generation',
    examples: `\`\`\`css
/* Mobile-first fluid typography */
html { font-size: clamp(14px, 1vw + 0.5rem, 18px); }

/* Responsive container */
.container {
  width: min(100% - 2rem, 1400px);
  margin-inline: auto;
}

/* Ultra-wide dashboard enhancement */
@media (min-width: 1920px) {
  .dashboard { grid-template-columns: repeat(4, 1fr); }
  .sidebar { width: 280px; }
}

/* Touch-friendly targets */
@media (max-width: 768px) {
  button, .clickable { min-height: 44px; min-width: 44px; }
  input, select { font-size: 16px; /* prevents iOS zoom */ }
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Desktop-first media queries | Write mobile styles first, enhance with min-width queries |\n| Fixed viewport meta disabling zoom | Never use user-scalable=no (accessibility violation) |\n| Same navigation for mobile and desktop | Collapsible nav/offcanvas for mobile, full nav for desktop |\n| Not testing on real devices | Chrome emulation is not sufficient; test real phones |',
    trends: '- **Container queries:** Components responding to container width, not viewport\n- **Responsive images:** srcset and picture element for optimal loading\n- **Foldable devices:** CSS viewport segments for dual-screen layouts\n- **Dynamic viewport units:** dvh/svh/lvh replacing vh for mobile browsers',
  }),

  createArticle({
    id: 'sql-joins-transaction-analytics',
    title: 'SQL Joins and Aggregations for Transaction Analytics',
    excerpt: 'Frontend developer\'s guide to SQL JOIN patterns powering banking dashboard and report APIs.',
    category: 'Full-Stack',
    date: '2025-05-05',
    tags: ['SQL', 'MySQL', 'Analytics', 'Database'],
    context: 'Understanding SQL JOIN and aggregation patterns helps frontend developers design efficient data fetching strategies for CBX dashboards — knowing what queries power transaction analytics enables better pagination, filter UI design, and API contract discussions with backend teams.',
    problem: 'Frontend developers unaware of SQL complexity cause:\n- UI designs requiring impossible real-time aggregations\n- Client-side joins of data that should be server-side\n- Pagination UI not matching backend query capabilities\n- Timeout errors from requesting unfiltered large datasets\n- Misaligned expectations on report generation time',
    solution: '**Essential SQL for frontend devs:** INNER JOIN (matching records), LEFT JOIN (include unmatched), GROUP BY aggregations, HAVING filters on aggregates, and understanding query performance implications.',
    usage: '**When discussing APIs with backend:** Ask whether joins happen server-side, what indexes exist, and expected query times.\n**UI design impact:** Match pagination/filter UI to SQL capabilities — don\'t design client-side joins for related entities.\n**Tools:** Request EXPLAIN output from backend team for slow dashboard endpoints.',
    useCases: '- Transaction list JOINing account details for display\n- Monthly volume chart using GROUP BY with date aggregation\n- Authorization report JOINing user roles and payment details\n- Dashboard summary using COUNT/SUM aggregations',
    examples: `\`\`\`sql
-- Transaction with account details (INNER JOIN)
SELECT t.id, t.amount, t.status, a.account_number, a.account_type
FROM transactions t
INNER JOIN accounts a ON t.account_id = a.id
WHERE t.customer_id = 12345
ORDER BY t.created_at DESC LIMIT 20;

-- Monthly aggregation for chart data
SELECT DATE_FORMAT(created_at, '%Y-%m') AS month,
       COUNT(*) AS transaction_count,
       SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS total_credit
FROM transactions
WHERE account_id = 678 AND created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month;

-- LEFT JOIN to include accounts with zero transactions
SELECT a.account_number, COUNT(t.id) AS tx_count
FROM accounts a
LEFT JOIN transactions t ON a.id = t.account_id
WHERE a.customer_id = 12345
GROUP BY a.id;
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Client-side JOIN of separate API responses | Request joined data from backend in single API call |\n| Fetching all records for client-side aggregation | Push aggregations to SQL with GROUP BY |\n| Not understanding LEFT vs INNER JOIN | INNER for required matches; LEFT for optional relationships |\n| Ignoring query performance impact on UI | Discuss query plans with backend before designing real-time features |',
    trends: '- **GraphQL:** Client-specified joins replacing fixed REST endpoints\n- **Materialized views:** Pre-computed aggregations for instant dashboard loading\n- **Real-time analytics:** Streaming SQL (ksqlDB) for live transaction dashboards\n- **API pagination standards:** Cursor-based pagination matching SQL query patterns',
  }),
];

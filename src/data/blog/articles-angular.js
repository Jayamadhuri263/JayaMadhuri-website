import { createArticle } from './articleFactory';

export const angularArticles = [
  createArticle({
    id: 'angular-15-standalone-components-banking',
    title: 'Angular 15+ Standalone Components in Enterprise Banking Apps',
    excerpt: 'Migrating CBX banking modules from NgModules to standalone components for faster builds and cleaner architecture.',
    category: 'Angular',
    date: '2025-09-01',
    tags: ['Angular', 'Standalone Components', 'Banking', 'CBX'],
    context: 'Angular 15+ standalone components eliminate NgModule boilerplate, enabling tree-shakable imports and faster compilation — critical for large CBX corporate banking codebases at Intellect Design Arena with 50+ feature modules.',
    problem: 'Legacy NgModule-based Angular apps suffer from:\n- Circular dependency chains between shared and feature modules\n- Slow `ng build` times exceeding 8 minutes on CI\n- Difficulty lazy-loading granular features\n- New developers confused by module import hierarchies',
    solution: '**Standalone components** declare their own dependencies via `imports: []` in the `@Component` decorator, removing NgModule wrappers while preserving lazy routing.',
    usage: '**Adopt when:** Starting new banking features, refactoring shared UI libraries, or migrating Angular 14+ projects.\n\n**Setup:** Enable standalone in CLI (`ng generate component --standalone`), use `provideRouter()` in bootstrap, replace `SharedModule` exports with direct component imports.\n\n**Benefits:** 20-40% faster builds, clearer dependency graphs, easier micro-frontend integration.',
    useCases: '- CBX payment authorization screens as standalone feature components\n- Shared banking UI widgets (account cards, transaction rows) imported directly\n- Lazy-loaded admin modules without wrapper NgModules\n- Storybook isolation for individual banking components',
    examples: `\`\`\`typescript
@Component({
  selector: 'app-fund-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, AccountSelectorComponent],
  templateUrl: './fund-transfer.component.html',
})
export class FundTransferComponent {
  private fb = inject(FormBuilder);
  transferForm = this.fb.group({
    fromAccount: ['', Validators.required],
    toAccount: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
  });
}
\`\`\`

\`\`\`typescript
// app.routes.ts — lazy standalone routes
export const routes: Routes = [
  { path: 'payments', loadComponent: () => import('./payments/payments.component').then(m => m.PaymentsComponent) },
  { path: 'accounts', loadChildren: () => import('./accounts/accounts.routes').then(m => m.ACCOUNT_ROUTES) },
];
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Converting everything at once | Migrate one feature module per sprint |\n| Keeping empty NgModules | Delete wrapper modules after migration |\n| Missing standalone imports | Each component must import its own Material/Common deps |\n| Breaking library consumers | Publish standalone-compatible entry points |',
    trends: '- **Angular 19:** Standalone is now the default for `ng new`\n- **Signals integration:** Standalone + signal inputs replace `@Input()` decorators\n- **esbuild builder:** Standalone apps compile 50% faster with application builder\n- **Intellect eMACH.ai:** CBX teams adopting standalone for new micro-frontend boundaries',
  }),

  createArticle({
    id: 'angular-signals-reactive-state',
    title: 'Angular Signals for Real-Time Account Balance Updates',
    excerpt: 'Replace complex RxJS chains with Angular Signals for reactive, performant banking dashboard state.',
    category: 'Angular',
    date: '2025-08-28',
    tags: ['Angular', 'Signals', 'RxJS', 'State Management'],
    context: 'Angular Signals (stable since v16) provide fine-grained reactivity without Zone.js overhead — ideal for banking dashboards displaying real-time account balances, transaction counts, and authorization queue statuses in CBX platforms.',
    problem: 'RxJS-heavy Angular apps in banking cause:\n- Memory leaks from unsubscribed observables in long sessions\n- Unnecessary re-renders when unrelated stream values change\n- Complex `combineLatest`/`switchMap` chains hard to debug\n- Steep learning curve for junior developers joining CBX teams',
    solution: '**Signals + computed() + effect()** provide synchronous readable state with automatic dependency tracking, replacing most component-level RxJS patterns.',
    usage: '**Use Signals for:** Component state, derived values (total balance), UI flags.\n**Keep RxJS for:** HTTP calls, WebSocket streams, complex async orchestration.\n**Bridge pattern:** `toSignal()` converts observables to signals at service boundaries.',
    useCases: '- Real-time account balance display updated via WebSocket\n- Computed total portfolio value across multiple accounts\n- Authorization queue count badge in CBX header\n- Form field interdependencies in fund transfer wizard',
    examples: `\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class AccountStore {
  private accountsSignal = signal<Account[]>([]);
  accounts = this.accountsSignal.asReadonly();

  totalBalance = computed(() =>
    this.accountsSignal().reduce((sum, a) => sum + a.balance, 0)
  );

  pendingTransactions = computed(() =>
    this.accountsSignal().flatMap(a => a.transactions.filter(t => t.status === 'PENDING'))
  );

  updateBalance(accountId: string, newBalance: number) {
    this.accountsSignal.update(accounts =>
      accounts.map(a => a.id === accountId ? { ...a, balance: newBalance } : a)
    );
  }
}
\`\`\`

\`\`\`typescript
// Bridge HTTP to Signal
accounts = toSignal(this.http.get<Account[]>('/api/accounts'), { initialValue: [] });
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Replacing ALL RxJS with Signals | Keep RxJS for async streams; signals for sync state |\n| Mutating signal arrays in place | Always use `.update()` with immutable patterns |\n| Signals in NgZone-dependent code | Use `effect()` carefully; avoid DOM manipulation in effects |\n| Over-computing expensive derived values | Memoize heavy computations or use lazy computed |',
    trends: '- **Angular 19:** Signal-based components with `input()` and `output()` functions\n- **Zoneless Angular:** Experimental zoneless change detection powered by signals\n- **NgRx SignalStore:** Official signal-based state management alternative\n- **CBX migration:** Teams replacing BehaviorSubject stores with signal services',
  }),

  createArticle({
    id: 'angular-material-banking-theming',
    title: 'Angular Material Theming for Enterprise Banking UI Consistency',
    excerpt: 'Build bank-grade Material UI themes with custom palettes, typography, and density for CBX corporate banking.',
    category: 'Angular',
    date: '2025-08-20',
    tags: ['Angular', 'Material UI', 'Theming', 'Design System'],
    context: 'Angular Material provides the component foundation for most Intellect CBX banking applications. Custom theming ensures visual consistency across payments, accounts, and authorization modules while meeting accessibility (WCAG 2.1) requirements mandated by banking regulators.',
    problem: 'Inconsistent Material UI usage across CBX modules leads to:\n- Different button styles between payment and account screens\n- Accessibility failures in color contrast ratios\n- Hardcoded colors breaking dark mode support\n- Duplicate CSS overrides scattered across 30+ component stylesheets',
    solution: 'Centralized **Material 3 theming** with custom palettes, typography scales, and component density settings applied via a single `styles.scss` theme definition.',
    usage: '**Setup:** Define primary/accent/warn palettes matching bank brand colors. Set typography to Inter/Roboto. Use `-mdc-` component overrides sparingly.\n**Apply:** Wrap app in themed container, use `color="primary"` consistently, leverage `MatTheme` for runtime theme switching.',
    useCases: '- Indian Bank CBX portal with brand-specific primary color\n- High-density data tables for transaction history (compact density)\n- Accessible form fields for fund transfer with proper contrast\n- Dark theme support for extended corporate user sessions',
    examples: `\`\`\`scss
@use '@angular/material' as mat;

$bank-primary: mat.define-palette(mat.$blue-palette, 700);
$bank-accent: mat.define-palette(mat.$cyan-palette, A200);
$bank-warn: mat.define-palette(mat.$red-palette, 600);

$bank-theme: mat.define-light-theme((
  color: (primary: $bank-primary, accent: $bank-accent, warn: $bank-warn),
  typography: mat.define-typography-config($font-family: 'Inter, sans-serif'),
  density: -1,
));

@include mat.all-component-themes($bank-theme);
\`\`\`

\`\`\`html
<!-- Consistent button usage across modules -->
<button mat-raised-button color="primary">Authorize Payment</button>
<button mat-stroked-button color="accent">Save Draft</button>
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Inline style overrides on Material components | Use theme tokens and CSS custom properties |\n| Ignoring density settings | Set global density for data-heavy banking tables |\n| Mixing Material 2 and MDC components | Complete migration to MDC-based components |\n| No focus indicator customization | Ensure visible focus rings for keyboard navigation |',
    trends: '- **Material 3 (M3):** Dynamic color schemes and updated component shapes\n- **CSS custom properties:** Runtime theme switching without rebuild\n- **Angular CDK:** Headless primitives for custom banking components\n- **Design tokens:** Figma-to-code token pipelines for CBX design systems',
  }),

  createArticle({
    id: 'angular-lazy-loading-cbx-performance',
    title: 'Angular Lazy Loading Strategies for CBX Platform Performance',
    excerpt: 'Route-level and component-level lazy loading patterns that cut CBX initial bundle size by 60%.',
    category: 'Angular',
    date: '2025-08-10',
    tags: ['Angular', 'Lazy Loading', 'Performance', 'CBX'],
    context: 'CBX corporate banking platforms contain 20+ feature modules (payments, accounts, trade finance, admin). Loading everything upfront creates 3MB+ initial bundles — unacceptable for corporate users on VPN connections. Lazy loading is mandatory for production banking apps.',
    problem: 'Eager-loaded CBX applications experience:\n- Initial load times exceeding 8 seconds on corporate networks\n- JavaScript parse times blocking main thread for 2+ seconds\n- Users waiting for unused modules (admin, reports) to download\n- Memory pressure on low-spec corporate laptops',
    solution: '**Multi-level lazy loading:** Route-level `loadChildren`/`loadComponent` for feature modules, plus dynamic imports for heavy third-party libraries (charts, PDF viewers).',
    usage: '**Priority loading:** Eager-load dashboard + account summary (critical path). Lazy-load everything else.\n**Preloading:** Use `PreloadAllModules` or custom preloading for likely next routes.\n**Monitoring:** Track chunk sizes in Jenkins build artifacts.',
    useCases: '- Lazy-load payment module only when user navigates to transfers\n- Dynamic import Chart.js only on analytics dashboard\n- Preload authorization module after login (likely next destination)\n- Separate admin module bundle inaccessible to standard corporate users',
    examples: `\`\`\`typescript
export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent),
  },
];

// Dynamic library import
async loadChart() {
  const { Chart } = await import('chart.js/auto');
  this.renderChart(Chart);
}
\`\`\`

\`\`\`typescript
// Custom preloading strategy
@Injectable({ providedIn: 'root' })
export class BankingPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] ? load() : of(null);
  }
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Lazy loading shared dependencies repeatedly | Configure webpack/vite splitChunks for shared libs |\n| No loading indicators | Show skeleton UI during chunk download |\n| Lazy loading the login page | Keep auth flow in main bundle |\n| Ignoring chunk size budgets | Set 250KB warning limit per lazy chunk in angular.json |',
    trends: '- **Partial hydration:** Server-side rendering with lazy client hydration\n- **Module Federation:** Micro-frontend lazy loading across CBX sub-applications\n- **esbuild/Vite:** Faster chunk generation replacing webpack for Angular 17+\n- **Bundle analyzer CI gate:** Jenkins fails build if main chunk exceeds budget',
  }),

  createArticle({
    id: 'angular-http-interceptors-oauth2',
    title: 'Angular HttpClient Interceptors for OAuth2 Token Management',
    excerpt: 'Secure API communication patterns with token refresh, request queuing, and error handling for banking microservices.',
    category: 'Angular',
    date: '2025-07-30',
    tags: ['Angular', 'HttpClient', 'OAuth2', 'Security'],
    context: 'CBX frontend applications communicate with eMACH.ai microservices through API Gateways using OAuth2 Bearer tokens. HttpClient interceptors centralize token attachment, refresh logic, and 401 retry — preventing token leaks in individual service calls across 50+ Angular services.',
    problem: 'Without interceptors, banking apps suffer from:\n- Token refresh race conditions causing duplicate API calls\n- Inconsistent Authorization headers across services\n- 401 errors not triggering re-authentication\n- No centralized request/response logging for audit trails\n- Session timeout not communicated to UI components',
    solution: 'A **chain of HttpInterceptors:** AuthInterceptor (attach token), RefreshInterceptor (handle 401 + token refresh with request queue), LoggingInterceptor (audit trail), ErrorInterceptor (user-friendly banking error messages).',
    usage: '**Register in app.config.ts:** `provideHttpClient(withInterceptors([authInterceptor, refreshInterceptor]))`\n**Token storage:** Memory-only (never localStorage for banking tokens)\n**Refresh queue:** Pause in-flight requests during token refresh, replay after success.',
    useCases: '- Automatic Bearer token attachment to all CBX API calls\n- Silent token refresh before 15-minute session expiry\n- Redirect to login on refresh failure with session timeout modal\n- Request correlation IDs for distributed tracing in ServiceNow incidents',
    examples: `\`\`\`typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getAccessToken();
  if (token) {
    req = req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } });
  }
  return next(req);
};

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/refresh')) {
        return inject(AuthService).refreshToken().pipe(
          switchMap(newToken => {
            const cloned = req.clone({ setHeaders: { Authorization: \`Bearer \${newToken}\` } });
            return next(cloned);
          }),
          catchError(() => { inject(Router).navigate(['/login']); return throwError(() => error); })
        );
      }
      return throwError(() => error);
    })
  );
};
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Storing tokens in localStorage | Use memory storage or HttpOnly cookies |\n| Infinite refresh loops | Exclude refresh endpoint from retry logic |\n| No request queue during refresh | Queue concurrent requests, replay after refresh |\n| Logging sensitive request bodies | Redact PII/account numbers in audit logs |',
    trends: '- **Functional interceptors:** Angular 15+ `HttpInterceptorFn` replaces class-based interceptors\n- **PKCE flow:** OAuth2 PKCE for SPA banking applications\n- **Token binding:** DPoP (Demonstrating Proof-of-Possession) for enhanced security\n- **mTLS integration:** Mutual TLS at API Gateway level for CBX corporate clients',
  }),

  createArticle({
    id: 'angular-reactive-forms-payments',
    title: 'Angular Reactive Forms for Complex Banking Payment Flows',
    excerpt: 'Multi-step payment forms with validation, cross-field rules, and dynamic fields using Reactive Forms API.',
    category: 'Angular',
    date: '2025-07-15',
    tags: ['Angular', 'Reactive Forms', 'Validation', 'Payments'],
    context: 'Banking payment forms (fund transfers, bulk payments, beneficiary management) require complex validation — IFSC codes, amount limits, cross-account rules, and dynamic fields based on payment type. Angular Reactive Forms provide programmatic control essential for these multi-step CBX workflows.',
    problem: 'Template-driven forms fail in banking because:\n- Cross-field validation (amount ≤ available balance) is awkward\n- Dynamic form fields (UPI vs NEFT fields) require template rewrites\n- Unit testing form logic embedded in templates is impossible\n- Form state serialization for "save draft" features is unavailable\n- Async validators (account number lookup) are unsupported',
    solution: '**FormGroup + FormControl + FormArray** with custom validators, async validators, and value change subscriptions for dynamic banking form behavior.',
    usage: '**Structure:** One FormGroup per wizard step, parent FormGroup wrapping all steps.\n**Validation:** Sync validators for format rules, async validators for server-side account verification.\n**UX:** Disable submit until valid, show field-level errors on blur, not on every keystroke.',
    useCases: '- Fund transfer with beneficiary lookup and amount validation\n- Bulk payment upload with CSV parsing and row-level validation\n- Standing instruction setup with date/recurrence rules\n- Tax payment forms with dynamic field sets per payment category',
    examples: `\`\`\`typescript
transferForm = this.fb.group({
  fromAccount: ['', Validators.required],
  toAccount: ['', Validators.required, Validators.pattern(/^[0-9]{9,18}$/)],
  ifscCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
  amount: [null, [Validators.required, Validators.min(1)]],
  remarks: ['', Validators.maxLength(140)],
}, { validators: this.sufficientBalanceValidator });

sufficientBalanceValidator(group: AbstractControl): ValidationErrors | null {
  const amount = group.get('amount')?.value;
  const balance = this.accountStore.selectedBalance();
  return amount && balance && amount > balance ? { insufficientBalance: true } : null;
}

// Async IFSC validation
validateIfsc(): AsyncValidatorFn {
  return (control) => this.bankService.verifyIfsc(control.value).pipe(
    map(valid => valid ? null : { invalidIfsc: true }),
    catchError(() => of({ ifscLookupFailed: true }))
  );
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Validating on every keystroke | Validate on blur or submit for better UX |\n| Not disabling submit during async validation | Show spinner, disable button while validating |\n| Mutating form values without emitEvent control | Use `{ emitEvent: false }` for programmatic patches |\n| Missing form reset after successful submission | Reset form and mark pristine after payment success |',
    trends: '- **Signal Forms (experimental):** Angular signal-based form API replacing Reactive Forms\n- **Typed forms:** Strictly typed FormGroup for compile-time field name checking\n- **Server-driven UI:** Backend defines form schema, frontend renders dynamically\n- **AI-assisted validation:** Copilot suggests validators from business rule documents',
  }),

  createArticle({
    id: 'angular-route-guards-rbac',
    title: 'Angular Route Guards for Role-Based Banking Access Control',
    excerpt: 'Implementing CanActivate, CanDeactivate, and functional guards for CBX multi-role authorization workflows.',
    category: 'Angular',
    date: '2025-07-01',
    tags: ['Angular', 'Route Guards', 'RBAC', 'Security'],
    context: 'CBX corporate banking platforms serve multiple roles — Maker, Checker, Authorizer, Admin — each with distinct module access. Angular route guards enforce RBAC at the navigation level, preventing unauthorized access to payment authorization, admin settings, and sensitive reports.',
    problem: 'Without route guards, banking apps expose:\n- Payment authorization screens to read-only users\n- Admin configuration to standard corporate users\n- Unsaved form data lost on accidental navigation\n- Deep-link URLs bypassing menu-level access restrictions\n- Audit trail gaps when unauthorized access attempts occur',
    solution: '**Multi-layer guard strategy:** AuthGuard (logged in), RoleGuard (RBAC check), UnsavedChangesGuard (CanDeactivate), FeatureFlagGuard (toggle-based access).',
    usage: '**RoleGuard:** Read user roles from AuthService, compare against route.data.requiredRoles.\n**CanDeactivate:** Prompt user before leaving forms with unsaved payment data.\n**Resolver:** Pre-fetch authorization data before rendering guarded routes.',
    useCases: '- Restrict payment authorization to Checker/Authorizer roles only\n- Prevent navigation away from incomplete fund transfer forms\n- Block admin module access for non-admin corporate users\n- Feature-flag new UPI module to pilot customer group only',
    examples: `\`\`\`typescript
export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as string[];
  const userRoles = auth.getUserRoles();

  if (requiredRoles.some(role => userRoles.includes(role))) return true;
  router.navigate(['/unauthorized']);
  return false;
};

// Route config
{ path: 'authorize', component: AuthorizeComponent, canActivate: [authGuard, roleGuard], data: { roles: ['CHECKER', 'AUTHORIZER'] } }
{ path: 'transfer', component: TransferComponent, canDeactivate: [unsavedChangesGuard] }
\`\`\`

\`\`\`typescript
export const unsavedChangesGuard: CanDeactivateFn = (component: TransferComponent) => {
  if (component.transferForm.dirty) {
    return confirm('You have unsaved payment data. Leave anyway?');
  }
  return true;
};
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Client-side guards only | Always enforce RBAC on backend API too |\n| Hardcoded roles in guards | Read roles from JWT claims or config service |\n| No unauthorized page | Create dedicated 403 page with support contact |\n| Guards making HTTP calls synchronously | Use resolvers or pre-loaded auth state |',
    trends: '- **Functional guards:** `CanActivateFn` replaces class-based guards in Angular 15+\n- **Attribute-based access control (ABAC):** Fine-grained permissions beyond roles\n- **Zero-trust frontend:** Continuous authorization checks, not just route-level\n- **Audit logging:** Guard denial events sent to ServiceNow for compliance',
  }),

  createArticle({
    id: 'angular-onpush-change-detection',
    title: 'OnPush Change Detection for High-Traffic Banking Dashboards',
    excerpt: 'Optimize Angular rendering performance with ChangeDetectionStrategy.OnPush in data-heavy CBX dashboards.',
    category: 'Angular',
    date: '2025-06-20',
    tags: ['Angular', 'Performance', 'Change Detection', 'OnPush'],
    context: 'CBX dashboards render hundreds of transaction rows, account cards, and pending authorization items simultaneously. Default change detection runs checks on every component for every event — causing visible lag during scroll and filter operations in production banking environments.',
    problem: 'Default change detection in banking dashboards causes:\n- Scroll jank when 500+ transaction rows re-render unnecessarily\n- Filter operations taking 500ms+ due to full tree checks\n- CPU spikes on corporate laptops during peak hours (salary day)\n- Battery drain on mobile banking WebView containers\n- Poor INP scores on interactive dashboard widgets',
    solution: '**ChangeDetectionStrategy.OnPush** limits checks to input reference changes, events, and observables — combined with immutable data patterns and async pipe for automatic subscription management.',
    usage: '**Apply OnPush to:** List components, table rows, chart widgets, card components.\n**Keep default for:** Root components, forms with frequent internal state changes.\n**Trigger manually:** Use ChangeDetectorRef.markForCheck() when updating state outside Angular zone.',
    useCases: '- Transaction history table with 1000+ rows and virtual scroll\n- Account summary cards updated via WebSocket push\n- Authorization queue with real-time status changes\n- Analytics charts re-rendering only when data inputs change',
    examples: `\`\`\`typescript
@Component({
  selector: 'app-transaction-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <tr>
      <td>{{ transaction.date | date:'medium' }}</td>
      <td>{{ transaction.description }}</td>
      <td [class.credit]="transaction.amount > 0">{{ transaction.amount | currency:'INR' }}</td>
    </tr>
  \`,
})
export class TransactionRowComponent {
  @Input({ required: true }) transaction!: Transaction;
}

// Parent passes immutable updates
updateTransaction(id: string, update: Partial<Transaction>) {
  this.transactions = this.transactions.map(t =>
    t.id === id ? { ...t, ...update } : t
  );
}
\`\`\`

\`\`\`typescript
// Async pipe triggers OnPush automatically
transactions$ = this.transactionService.getTransactions();
// template: *ngFor="let tx of transactions$ | async"
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| OnPush with mutable object mutations | Always create new object references |\n| Forgetting markForCheck after setTimeout | Inject ChangeDetectorRef and call markForCheck |\n| OnPush on form components | Forms need default detection for input binding |\n| Mixing OnPush and non-OnPush siblings inconsistently | Apply consistently within feature modules |',
    trends: '- **Zoneless Angular:** Eliminates Zone.js entirely; signals drive all updates\n- **Angular Signals:** Fine-grained updates replacing broad change detection\n- **Virtual scroll CDK:** `@angular/cdk/scrolling` essential companion to OnPush lists\n- **Performance budgets:** Jenkins CI gates failing builds with change detection regression tests',
  }),
];

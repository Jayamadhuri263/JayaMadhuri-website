export const aiCategories = ['All', 'Debugging', 'Refactoring', 'Documentation', 'Performance', 'Architecture'];

export const aiPrompts = [
  {
    id: 'debug-1',
    title: 'Root Cause Analysis for Production Bug',
    category: 'Debugging',
    tool: 'ChatGPT / Claude',
    prompt: `Act as a senior frontend debugger. I have a production bug in an Angular banking app:
- Error: [paste error]
- Component: [component name]
- Steps to reproduce: [steps]

Analyze the stack trace, identify the most likely root cause, suggest 3 diagnostic steps using Chrome DevTools, and provide a minimal fix with explanation.`,
  },
  {
    id: 'debug-2',
    title: 'Memory Leak Detection',
    category: 'Debugging',
    tool: 'Cursor / Copilot',
    prompt: `Review this React component for memory leaks. Check for:
1. Uncleaned event listeners in useEffect
2. Subscriptions not unsubscribed
3. setState on unmounted components
4. Closure references holding large objects

[paste component code]

Provide fixes with before/after code snippets.`,
  },
  {
    id: 'refactor-1',
    title: 'Extract Reusable Hook',
    category: 'Refactoring',
    tool: 'Cursor',
    prompt: `Refactor this Angular service method into a reusable custom hook/utility. Follow SOLID principles, add TypeScript types, and include JSDoc comments. Maintain backward compatibility.

[paste code]`,
  },
  {
    id: 'refactor-2',
    title: 'Component Decomposition',
    category: 'Refactoring',
    tool: 'Claude',
    prompt: `This React component is 400+ lines. Decompose it into:
1. Container component (logic)
2. Presentational sub-components
3. Custom hooks for data fetching and form state
4. Utility functions

Keep the same API/props interface. [paste component]`,
  },
  {
    id: 'docs-1',
    title: 'API Integration Documentation',
    category: 'Documentation',
    tool: 'ChatGPT',
    prompt: `Generate technical documentation for this API integration in our banking frontend:
- Endpoint: [URL]
- Auth: OAuth2 Bearer
- Request/Response schemas: [paste]

Include: usage examples, error handling patterns, retry logic, and TypeScript interface definitions.`,
  },
  {
    id: 'docs-2',
    title: 'Component Storybook Stories',
    category: 'Documentation',
    tool: 'Copilot',
    prompt: `Create Storybook stories for this UI component with variants:
- Default state
- Loading state
- Error state
- Empty state
- Dark/Light theme

Include argTypes and accessibility notes. [paste component]`,
  },
  {
    id: 'debug-3',
    title: 'API Error UX & Retry Logic',
    category: 'Debugging',
    tool: 'Claude / ChatGPT',
    prompt: `Act as a senior frontend engineer. This banking screen mis-handles API failures:
- Symptom: [what users see]
- Endpoint: [method + path]
- Current handler: [paste code]

Suggest user-facing error copy, retry/backoff strategy, idempotent re-submit rules, and a minimal code patch. Flag any PII or token leakage in error messages.`,
  },
  {
    id: 'refactor-3',
    title: 'RxJS Stream Hardening',
    category: 'Refactoring',
    tool: 'Cursor',
    prompt: `Review this Angular/RxJS data flow for banking UI:
- Unsubscribe / takeUntilDestroyed usage
- switchMap vs mergeMap for user-triggered searches
- shareReplay pitfalls on hot observables
- Error propagation to the template

[paste service/component code]

Return a refactored version with brief comments on each change.`,
  },
  {
    id: 'docs-3',
    title: 'Pull Request Description',
    category: 'Documentation',
    tool: 'ChatGPT',
    prompt: `Write a clear PR description for this frontend change in a corporate banking app:
- Summary (2–3 sentences)
- What changed (bullets)
- Screenshots / UX notes to mention
- Risk areas (regression, auth, payments)
- Test plan (manual steps — no automated test code)
- Rollback notes

Diff summary: [paste git diff or bullet list of files]`,
  },
  {
    id: 'perf-3',
    title: 'Angular Route & Bundle Splitting',
    category: 'Performance',
    tool: 'Claude / Copilot',
    prompt: `Given this Angular module/routing setup for a CBX-style app:
[paste routes or module list]

Recommend lazy-loaded feature boundaries, preloading strategy, and which third-party imports to defer. Estimate impact on initial bundle and list quick wins I can ship in one sprint.`,
  },
  {
    id: 'arch-3',
    title: 'Shared UI Component API Design',
    category: 'Architecture',
    tool: 'Cursor / Claude',
    prompt: `Design a reusable banking UI component (e.g. account picker, amount input, status badge):
- Props/inputs, outputs/events, and slots/content projection
- Loading, empty, error, and read-only states
- Theming (Material / internal design tokens)
- Accessibility requirements for keyboard and screen readers

Provide TypeScript interfaces and a short usage example for consuming teams.`,
  },
  {
    id: 'perf-1',
    title: 'Bundle Size Optimization',
    category: 'Performance',
    tool: 'Claude',
    prompt: `Analyze this webpack/vite bundle report and suggest optimizations:
- Identify largest chunks
- Recommend code splitting strategies
- Suggest tree-shaking improvements
- List libraries that could be replaced with lighter alternatives

Target: reduce initial bundle by 30%. [paste bundle stats]`,
  },
  {
    id: 'perf-2',
    title: 'Core Web Vitals Fix Plan',
    category: 'Performance',
    tool: 'ChatGPT',
    prompt: `My banking app Lighthouse scores:
- LCP: 4.2s (target: <2.5s)
- FID: 180ms (target: <100ms)
- CLS: 0.15 (target: <0.1)

Create a prioritized fix plan with specific code changes, estimated impact, and implementation effort for each item.`,
  },
  {
    id: 'arch-1',
    title: 'Microservice Integration Pattern',
    category: 'Architecture',
    tool: 'Claude',
    prompt: `Design a frontend architecture for integrating with eMACH.ai microservices:
- 15+ backend services via API Gateway
- Real-time notifications via WebSocket
- Offline-capable transaction queue
- Multi-tenant role-based access

Provide folder structure, state management approach, and error boundary strategy.`,
  },
  {
    id: 'arch-2',
    title: 'Angular to React Migration Plan',
    category: 'Architecture',
    tool: 'ChatGPT',
    prompt: `Create a phased migration plan from Angular 14 to React 18 for a banking module:
- 50+ components, 20 services
- Must maintain zero downtime
- Team of 4 developers, 6-month timeline

Include: risk assessment, parallel running strategy, shared component library approach, and rollback plan.`,
  },
];

export const keyboardShortcuts = [
  { keys: 'Ctrl + Shift + I', action: 'Open Chrome DevTools' },
  { keys: 'Ctrl + Shift + C', action: 'Inspect Element' },
  { keys: 'Ctrl + Shift + P', action: 'Command Menu in DevTools' },
  { keys: 'F8', action: 'Pause/Resume Debugger' },
  { keys: 'Ctrl + G', action: 'Go to Line (VS Code/Cursor)' },
  { keys: 'Ctrl + D', action: 'Select Next Occurrence' },
  { keys: 'Alt + ↑/↓', action: 'Move Line Up/Down' },
  { keys: 'Ctrl + Shift + K', action: 'Delete Line' },
  { keys: 'Ctrl + `', action: 'Toggle Terminal' },
  { keys: 'Ctrl + Shift + F', action: 'Search Across Files' },
];

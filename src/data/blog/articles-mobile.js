import { createArticle } from './articleFactory';

export const mobileArticles = [
  createArticle({
    id: 'cordova-banking-mobility-development',
    title: 'Apache Cordova for Enterprise Banking Mobility Solutions',
    excerpt: '1.5 years maintaining IDFC First Bank and Bank of Baroda mobile apps with Cordova and CBX framework.',
    category: 'Mobile',
    date: '2025-08-22',
    tags: ['Cordova', 'Mobile', 'Banking', 'Android'],
    context: 'During 1.5 years as Mobility Developer at Intellect Design Arena, I maintained Android banking applications using Apache Cordova and the internal CBX framework for IDFC First Bank and Bank of Baroda — supporting live mobility programs with web technologies and native plugin access.',
    problem: 'Native Android/iOS development for banking requires:\n- Separate codebases for each platform doubling development effort\n- Long app store review cycles delaying critical security patches\n- Difficulty finding developers skilled in both Kotlin and Swift\n- Inconsistent UI between Android and iOS banking apps\n- High cost of maintaining platform-specific code for each bank client',
    solution: '**Apache Cordova** wraps web applications (HTML/CSS/JS) in a native WebView container with JavaScript-to-native bridge plugins — enabling one codebase for Android (and iOS) with access to device features (camera, biometrics, push notifications).',
    usage: '**Project structure:** `www/` for web assets, `plugins/` for native features, `config.xml` for app configuration.\n**Build:** `cordova build android --release` for production APK.\n**Testing:** Chrome DevTools remote debugging for WebView inspection.',
    useCases: '- IDFC First Bank mobile banking app with fund transfers and balance inquiry\n- Bank of Baroda enterprise mobility with role-based access\n- Biometric authentication integration via Cordova plugins\n- Push notification delivery for transaction alerts',
    examples: `\`\`\`javascript
// config.xml essentials
<widget id="com.bank.mobilebanking" version="2.1.0">
  <platform name="android">
    <preference name="AndroidLaunchMode" value="singleTask" />
    <preference name="Fullscreen" value="false" />
  </platform>
</widget>

// Cordova device ready
document.addEventListener('deviceready', () => {
  initBankingApp();
  registerPushNotifications();
  checkBiometricAvailability();
}, false);
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Treating Cordova as desktop web app | Optimize for mobile touch, offline, and performance |\n| Not testing on real devices | Test on low-end Android devices common in India |\n| Outdated Cordova/plugins versions | Keep Cordova CLI and plugins updated for security |\n| Large unoptimized web assets in APK | Minify, compress, lazy-load for mobile performance |',
    trends: '- **Capacitor (Ionic):** Modern Cordova successor with better native bridge\n- **PWA alternative:** Progressive Web Apps reducing need for app store distribution\n- **Flutter/React Native:** Growing adoption for greenfield banking mobile apps\n- **Super App containers:** Banking apps embedded in WeChat/PayTM-style platforms',
  }),

  createArticle({
    id: 'cbx-framework-mobile-architecture',
    title: 'CBX Framework: Internal Banking Mobile Architecture',
    excerpt: 'Understanding Intellect\'s CBX framework for building consistent mobile banking experiences across clients.',
    category: 'Mobile',
    date: '2025-08-08',
    tags: ['CBX', 'Framework', 'Banking', 'Architecture'],
    context: 'The CBX (Corporate Banking Exchange) framework is Intellect Design Arena\'s internal platform for building consistent mobile and web banking applications. Used across IDFC First Bank, Bank of Baroda, and Indian Bank projects, CBX provides pre-built UI components, API integration patterns, and security modules.',
    problem: 'Building banking apps from scratch for each client causes:\n- Reinventing authentication, session management, and encryption for every project\n- Inconsistent UX between different bank mobile apps from same vendor\n- Slow project kickoff spending months on infrastructure before features\n- Security vulnerabilities from custom-implemented banking patterns\n- Difficulty onboarding developers to client-specific codebases',
    solution: '**CBX framework** provides standardized modules: UI component library, API service layer, security/encryption utilities, navigation framework, and plugin integration layer — configurable per bank client.',
    usage: '**Extend, don\'t modify:** Create client-specific modules extending CBX base classes.\n**Configuration:** Bank branding, feature flags, and API endpoints via config files.\n**Plugins:** CBX plugin architecture wrapping Cordova native plugins with unified API.',
    useCases: '- IDFC First Bank mobile app built on CBX mobility layer\n- Bank of Baroda enterprise app with CBX security modules\n- Indian Bank CBX web platform sharing components with mobile\n- New bank client onboarding using CBX template project',
    examples: `\`\`\`javascript
// CBX module pattern
CBX.module('payments', {
  init: function(config) {
    this.apiEndpoint = config.paymentServiceUrl;
    this.registerRoutes();
  },
  registerRoutes: function() {
    CBX.router.register('fundTransfer', this.showFundTransfer.bind(this));
    CBX.router.register('beneficiaryList', this.showBeneficiaries.bind(this));
  },
  showFundTransfer: function() {
    CBX.view.render('fund-transfer-template', { accounts: CBX.store.getAccounts() });
  }
});
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Modifying CBX core framework files | Extend via client-specific override modules |\n| Ignoring CBX upgrade paths | Track framework version; plan upgrade sprints |\n| Custom implementations duplicating CBX features | Check CBX docs for existing modules first |\n| Hardcoding bank-specific values in CBX core | Use configuration-driven customization |',
    trends: '- **CBX to eMACH.ai migration:** Intellect\'s microservices platform replacing monolithic CBX backend\n- **Micro-frontend CBX:** Splitting CBX web into independently deployable modules\n- **Design system evolution:** CBX UI components migrating to web components standard\n- **Low-code configuration:** Bank admins customizing flows without developer involvement',
  }),

  createArticle({
    id: 'biometric-auth-cordova-android',
    title: 'Biometric Authentication with Cordova in Android Banking Apps',
    excerpt: 'SPOT Award-winning implementation of fingerprint and face authentication for secure mobile banking login.',
    category: 'Mobile',
    date: '2025-07-20',
    tags: ['Biometric', 'Cordova', 'Security', 'Android'],
    context: 'Received SPOT Award for implementing biometric authentication features within the Cordova framework for IDFC First Bank — enabling fingerprint and face recognition login that significantly enhanced app security while maintaining seamless user experience. This remains a critical pattern for modern mobile banking applications.',
    problem: 'Password-only mobile banking authentication causes:\n- User friction leading to app abandonment (complex password requirements)\n- Credential phishing via fake banking apps\n- Session hijacking on shared devices\n- Regulatory pressure for strong customer authentication (SCA)\n- Poor UX compared to native apps offering biometric login',
    solution: '**Cordova Fingerprint/Biometric plugin** integrates with Android BiometricPrompt API, providing unified JavaScript interface for fingerprint, face, and iris authentication with fallback to PIN/pattern.',
    usage: '**Flow:** App launch → Check biometric availability → Prompt biometric → Validate → Retrieve stored token → Auto-login.\n**Fallback:** Always provide PIN/password fallback for devices without biometrics.\n**Security:** Store encrypted session token in Android Keystore, not plain SharedPreferences.',
    useCases: '- Quick login for returning IDFC First Bank mobile users\n- Transaction authorization via fingerprint confirmation\n- App unlock after background timeout\n- Step-up authentication for high-value transfers',
    examples: `\`\`\`javascript
// Check and prompt biometric
async function biometricLogin() {
  const available = await Fingerprint.isAvailable();
  if (available !== 'OK') return fallbackToPinLogin();

  try {
    await Fingerprint.show({
      title: 'Banking App Login',
      description: 'Verify your identity',
      disableBackup: false,
      fallbackButtonTitle: 'Use PIN',
    });
    const token = await SecureStorage.get('sessionToken');
    return api.validateSession(token);
  } catch (err) {
    if (err.code === 'FINGERPRINT_CANCELLED') return;
    return fallbackToPinLogin();
  }
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Storing passwords for biometric re-auth | Store encrypted session token, not credentials |\n| No fallback authentication method | Always offer PIN/password alternative |\n| Biometric as only auth factor for transactions | Require biometric + server OTP for high-value transfers |\n| Not handling biometric enrollment changes | Detect new fingerprint enrollment, require full re-login |',
    trends: '- **Passkeys (FIDO2):** WebAuthn-based passwordless authentication\n- **Android Credential Manager:** Unified biometric + passkey API\n- **Behavioral biometrics:** Typing patterns and device motion as additional factors\n- **RBI guidelines:** Indian banking regulator mandating multi-factor authentication',
  }),

  createArticle({
    id: 'android-webview-security-hardening',
    title: 'Android WebView Security Hardening for Mobile Banking',
    excerpt: 'Securing Cordova WebView containers against XSS, file access, and JavaScript bridge vulnerabilities.',
    category: 'Mobile',
    date: '2025-07-08',
    tags: ['Android', 'WebView', 'Security', 'Cordova'],
    context: 'Cordova banking apps run inside Android WebView — a full browser engine embedded in the native shell. Without proper hardening, WebView apps are vulnerable to XSS attacks, unauthorized file access, and JavaScript bridge exploitation — critical risks when handling financial transactions for IDFC First Bank and Bank of Baroda.',
    problem: 'Unhardened WebView in banking apps exposes:\n- XSS vulnerabilities executing malicious scripts in banking context\n- `file://` protocol access allowing local file theft\n- JavaScript bridge allowing unauthorized native API calls\n- Debug WebView enabled in production builds\n- Mixed content (HTTP resources on HTTPS pages) leaking data',
    solution: '**Multi-layer WebView security:** Disable debug mode, restrict file access, implement CSP headers, validate all bridge calls, enable Safe Browsing, and use HTTPS-only content.',
    usage: '**config.xml:** `<preference name="AndroidInsecureFileModeEnabled" value="false" />`\n**CSP:** Content Security Policy meta tag restricting script sources.\n**Bridge:** Validate all plugin calls server-side; never trust client-side alone.',
    useCases: '- IDFC First Bank Cordova app WebView configuration\n- Preventing JavaScript injection via deep links\n- Securing local storage access in banking WebView\n- Production build verification removing debug flags',
    examples: `\`\`\`xml
<!-- config.xml security preferences -->
<preference name="AndroidInsecureFileModeEnabled" value="false" />
<preference name="AllowInlineMediaPlayback" value="false" />
<preference name="MediaPlaybackRequiresUserAction" value="true" />
\`\`\`

\`\`\`html
<!-- CSP in index.html -->
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self' https://api.bank.com;
           script-src 'self';
           style-src 'self' 'unsafe-inline';
           img-src 'self' data: https:;
           connect-src 'self' https://api.bank.com wss://realtime.bank.com;">
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| `access origin="*"` in config.xml | Whitelist only required domains |\n| Debug WebView in production APK | Verify `WebView.setWebContentsDebuggingEnabled(false)` |\n| Storing sensitive data in WebView localStorage | Use Cordova Secure Storage plugin with Keystore |\n| Allowing arbitrary deep link URLs | Validate and sanitize all deep link parameters |',
    trends: '- **Android WebView updates:** Independent WebView updates via Play Store\n- **Trusted Web Activities:** PWA in trusted full-screen mode\n- **WebView process isolation:** Separate process for WebView rendering\n- **MTEE (Trusted Execution Environment):** Hardware-backed key storage for banking',
  }),

  createArticle({
    id: 'offline-first-cordova-banking',
    title: 'Offline-First Patterns for Cordova Banking Applications',
    excerpt: 'Handling network interruptions gracefully in mobile banking with local caching and sync queues.',
    category: 'Mobile',
    date: '2025-06-22',
    tags: ['Cordova', 'Offline', 'PWA', 'Mobile Banking'],
    context: 'Mobile banking users in India frequently experience network interruptions — switching between WiFi and mobile data, entering low-connectivity areas, or using 2G/3G networks. Cordova banking apps must handle offline scenarios gracefully, showing cached data and queuing transactions for sync when connectivity returns.',
    problem: 'Online-only mobile banking apps fail when:\n- Users see blank screens during network transitions\n- In-progress fund transfers lost on connection drop\n- Account balance unavailable in metro/low-connectivity areas\n- App appears "broken" showing error pages instead of cached data\n- Frustrated users force-closing and reopening the app repeatedly',
    solution: '**Offline-first architecture:** Cache critical data locally (SQLite/IndexedDB), queue write operations, sync on reconnect, and show clear offline/online status indicators.',
    usage: '**Read operations:** Serve from local cache immediately, refresh from API in background.\n**Write operations:** Queue locally, show "pending sync" status, submit when online.\n**UI:** Offline banner, cached data timestamp, retry buttons.',
    useCases: '- View last-known account balance and recent transactions offline\n- Queue fund transfer request for processing when network returns\n- Cache beneficiary list for offline selection during transfer setup\n- Store unread notification count for offline display',
    examples: `\`\`\`javascript
// Network status monitoring
document.addEventListener('offline', () => showOfflineBanner());
document.addEventListener('online', () => { hideOfflineBanner(); syncPendingTransactions(); });

// Cache-first data fetch
async function getAccountBalance(accountId) {
  const cached = await SQLiteDB.get('balances', accountId);
  if (cached) displayBalance(cached.value, cached.timestamp);

  if (navigator.onLine) {
    try {
      const fresh = await api.getBalance(accountId);
      await SQLiteDB.set('balances', accountId, { value: fresh, timestamp: Date.now() });
      displayBalance(fresh, Date.now());
    } catch (err) { /* cached data already displayed */ }
  }
}

// Offline transaction queue
async function queueTransfer(transferData) {
  await SQLiteDB.insert('pendingTransfers', { ...transferData, queuedAt: Date.now() });
  showNotification('Transfer queued — will process when online');
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| No indication app is showing cached data | Show "Last updated: X minutes ago" timestamp |\n| Syncing stale queued transactions without validation | Re-validate balance and limits before processing queued transfers |\n| Unlimited offline queue growth | Cap queue size; expire old pending transactions |\n| Not clearing cache on logout | Wipe all local data on session termination |',
    trends: '- **Service Workers in Cordova:** PWA-style caching within hybrid apps\n- **Background Sync API:** Automatic retry of failed requests\n- **CRDTs:** Conflict-free replicated data types for offline editing\n- **5G rollout:** Reduced offline need but still critical for rural banking',
  }),

  createArticle({
    id: 'emojimart-rich-chat-ui',
    title: 'EmojiMart and Rich Interactions in Modern Chat UIs',
    excerpt: 'Emoji reactions, GIF integration, and rich message types in ChatterJoy chat experience.',
    category: 'Frontend',
    date: '2025-06-10',
    tags: ['EmojiMart', 'Giphy', 'Chat UI', 'UX'],
    context: 'ChatterJoy integrates EmojiMart for emoji picker, Giphy API for GIF search, and rich message types (voice messages, view-once photos, YouTube previews) — demonstrating how modern chat UIs go beyond plain text to create engaging communication experiences applicable to banking support chat.',
    problem: 'Plain-text-only chat interfaces suffer from:\n- Low user engagement and expression limitation\n- Inability to convey tone leading to misunderstandings\n- No visual feedback for message reactions\n- Missing media sharing for support troubleshooting (screenshots)\n- Competitive disadvantage vs WhatsApp/Telegram user expectations',
    solution: '**Rich chat component stack:** EmojiMart picker, Giphy search API, custom message type components, and reaction overlay system.',
    usage: '**EmojiMart:** `@emoji-mart/react` with data package for picker UI.\n**Giphy:** API key-based search with trending/ search endpoints.\n**Message types:** Extensible message schema supporting text, emoji, gif, image, voice, youtube, reaction.',
    useCases: '- ChatterJoy emoji reactions on messages (👍 ❤️ 😂)\n- GIF sharing for casual conversation expression\n- YouTube link preview with embedded thumbnail\n- Voice message recording and playback in chat',
    examples: `\`\`\`javascript
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

function MessageInput({ onSend }) {
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <div className="message-input">
      <button onClick={() => setShowEmoji(!showEmoji)}>😊</button>
      {showEmoji && (
        <Picker data={data} onEmojiSelect={(emoji) => onSend({ type: 'emoji', content: emoji.native })} />
      )}
      <input placeholder="Type a message..." />
    </div>
  );
}

// Reaction overlay
function MessageReactions({ message, onReact }) {
  return (
    <div className="reactions">
      {message.reactions?.map(r => <span key={r.emoji}>{r.emoji} {r.count}</span>)}
      <button onClick={() => onReact('👍')}>+</button>
    </div>
  );
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Loading entire emoji data on initial page load | Lazy-load EmojiMart data on picker open |\n| No Giphy content filtering | Enable Giphy content rating filter (G/PG)\n| Autoplaying GIFs consuming bandwidth | Click-to-play GIF previews in chat list |\n| Missing accessibility for emoji-only messages | Include aria-label with emoji description |',
    trends: '- **Custom emoji/stickers:** Bank-branded sticker packs for support chat\n- **Message formatting:** Markdown support in chat messages\n- **AI emoji suggestions:** Context-aware emoji recommendations\n- **Unicode 16:** New emoji additions and skin tone improvements',
  }),

  createArticle({
    id: 'express-api-performance-tools',
    title: 'Express.js API Design for Performance Analysis Tools',
    excerpt: 'Building scalable Node.js/Express backends for the Web Performance Analyzer with Puppeteer integration.',
    category: 'Full-Stack',
    date: '2025-05-28',
    tags: ['Express.js', 'Node.js', 'API', 'Backend'],
    context: 'The Web Performance Analyzer backend uses Node.js with Express.js to orchestrate Puppeteer browser instances, manage analysis queues, store reports in Firebase, and serve results to the React dashboard. This demonstrates Express patterns applicable to banking API middleware and internal tooling.',
    problem: 'Poorly structured Express APIs cause:\n- Puppeteer browser instances leaking memory without pool management\n- Long-running analysis requests blocking other API calls\n- No rate limiting allowing abuse of expensive analysis endpoints\n- Unhandled promise rejections crashing the Node process\n- Missing request validation accepting malformed URLs',
    solution: '**Structured Express architecture:** Router modules, middleware chain (validation, auth, rate limiting), browser pool manager, job queue for async analysis, and proper error handling middleware.',
    usage: '**Structure:** `routes/`, `middleware/`, `services/`, `utils/` directories.\n**Async:** Use express-async-handler or try/catch wrapper for async routes.\n**Queue:** Process analysis jobs sequentially to manage browser instance count.',
    useCases: '- POST /api/analyze — single URL performance analysis\n- POST /api/analyze/batch — multiple URL batch processing\n- GET /api/reports/:id — retrieve stored analysis report\n- GET /api/reports — list user\'s saved reports with pagination',
    examples: `\`\`\`javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const { analyzeUrl } = require('./services/analyzer');

const app = express();
app.use(express.json());

const analyzeLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

app.post('/api/analyze', analyzeLimiter, async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url || !isValidUrl(url)) return res.status(400).json({ error: 'Invalid URL' });
    const report = await analyzeUrl(url, req.body.options);
    res.json(report);
  } catch (err) { next(err); }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Analysis failed', message: err.message });
});
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Launching new browser per request without limit | Browser pool with max concurrent instances |\n| No timeout on Puppeteer page.goto | Set 30s timeout; kill hung browsers |\n| Synchronous analysis blocking event loop | Queue long jobs; return job ID for polling |\n| Missing helmet.js security headers | Add helmet, cors, rate-limit middleware |',
    trends: '- **Fastify alternative:** 2x faster than Express for high-throughput APIs\n- **Bun runtime:** Faster Node.js alternative for Puppeteer workloads\n- **Worker threads:** Offload Puppeteer to separate threads/processes\n- **OpenAPI/Swagger:** Auto-generated API documentation for internal tools',
  }),
];

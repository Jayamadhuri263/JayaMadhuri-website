import { createArticle } from './articleFactory';

export const firebaseArticles = [
  createArticle({
    id: 'firebase-realtime-chat-chatterjoy',
    title: 'Building Real-Time Chat with Firebase Realtime Database',
    excerpt: 'ChatterJoy architecture — instant messaging, presence, and message sync using Firebase Realtime DB.',
    category: 'Firebase',
    date: '2025-09-08',
    tags: ['Firebase', 'Real-Time', 'Chat', 'ChatterJoy'],
    context: 'ChatterJoy (Apr 2025) leverages Firebase Realtime Database for instant messaging with sub-100ms latency. Firebase\'s WebSocket-based sync eliminates custom backend infrastructure for chat — letting frontend developers focus on UX while Firebase handles message persistence, offline queuing, and multi-device sync.',
    problem: 'Building custom real-time chat infrastructure requires:\n- WebSocket server setup, scaling, and maintenance\n- Message ordering guarantees across concurrent writers\n- Offline message queuing and sync on reconnect\n- Presence detection (online/offline/typing status)\n- Months of backend development before first message sends',
    solution: '**Firebase Realtime Database** provides JSON-tree storage with automatic sync, offline persistence, and security rules — enabling production chat in days instead of months.',
    usage: '**Structure:** `/conversations/{id}/messages/{msgId}`, `/users/{uid}/presence`.\n**Security:** Firebase Security Rules restrict read/write to conversation participants.\n**Offline:** Enable persistence with `enablePersistence()` for offline message queue.',
    useCases: '- ChatterJoy instant messaging with emoji reactions\n- Banking customer support chat with agent assignment\n- Real-time transaction notification feed\n- Collaborative document review comments in CBX',
    examples: `\`\`\`javascript
import { ref, push, onValue, serverTimestamp, onDisconnect } from 'firebase/database';

// Send message
async function sendMessage(conversationId, text) {
  await push(ref(db, \`conversations/\${conversationId}/messages\`), {
    text, senderId: auth.currentUser.uid,
    timestamp: serverTimestamp(), status: 'sent',
  });
}

// Listen for new messages
function useMessages(conversationId) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const msgRef = ref(db, \`conversations/\${conversationId}/messages\`);
    return onValue(msgRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(data ? Object.entries(data).map(([id, msg]) => ({ id, ...msg })) : []);
    });
  }, [conversationId]);
  return messages;
}

// Presence
onDisconnect(ref(db, \`users/\${uid}/presence\`)).set({ online: false, lastSeen: serverTimestamp() });
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Flat message list without pagination | Query with limitToLast(50), load more on scroll |\n| No security rules | Write rules before any production data |\n| Storing large media in Realtime DB | Use Cloudinary/Firebase Storage for files, store URL in DB |\n| Not handling offline gracefully | Enable persistence, show queued message indicator |',
    trends: '- **Firestore vs Realtime DB:** Firestore for complex queries; Realtime DB for pure speed\n- **Firebase Extensions:** Trigger Email, Resize Images automate common tasks\n- **App Check:** Protect Firebase backend from abuse\n- **Firebase AI:** Gemini integration for smart chat replies',
  }),

  createArticle({
    id: 'firebase-auth-secure-applications',
    title: 'Firebase Authentication Patterns for Secure Applications',
    excerpt: 'Email, Google, and phone auth flows with security rules for chat and banking support applications.',
    category: 'Firebase',
    date: '2025-08-30',
    tags: ['Firebase', 'Auth', 'Security', 'OAuth'],
    context: 'Firebase Auth provides production-ready authentication for ChatterJoy and the Web Performance Analyzer — supporting email/password, Google OAuth, and phone verification without building custom auth servers. For banking-adjacent apps, proper auth flow design prevents unauthorized data access.',
    problem: 'Custom auth implementations risk:\n- Password storage vulnerabilities\n- Missing email verification allowing fake accounts\n- No social login options reducing user adoption\n- Token management complexity across frontend and backend\n- Session hijacking without proper token rotation',
    solution: '**Firebase Auth** handles credential storage, token generation/refresh, and provider integration. Combine with Firebase Security Rules for authorization.',
    usage: '**Providers:** Enable email/password + Google for ChatterJoy; add phone auth for banking OTP flows.\n**Persistence:** `browserLocalPersistence` for remember-me, `browserSessionPersistence` for banking.\n**Custom claims:** Set user roles via Admin SDK for RBAC in security rules.',
    useCases: '- ChatterJoy user registration and Google sign-in\n- Web Performance Analyzer saved report history tied to user account\n- Banking support chat agent authentication\n- Admin dashboard access control via custom claims',
    examples: `\`\`\`javascript
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Email registration
async function register(email, password, displayName) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName });
  await sendEmailVerification(user);
  return user;
}

// Google sign-in
async function googleSignIn() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
  setCurrentUser(user);
  if (user) connectToDatabase(user.uid);
  else disconnectFromDatabase();
});
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Client-side only auth checks | Enforce with Firebase Security Rules server-side |\n| Storing Firebase tokens in localStorage for banking | Use session persistence or HttpOnly cookies |\n| No email verification before granting access | Block unverified users in security rules |\n| Missing auth state loading indicator | Show skeleton UI while onAuthStateChanged resolves |',
    trends: '- **Firebase App Check:** Verify requests come from your app, not bots\n- **Multi-factor auth:** SMS/TOTP second factor for sensitive apps\n- **Passkeys/WebAuthn:** Passwordless authentication support\n- **Identity Platform:** Enterprise SSO/SAML for corporate banking users',
  }),

  createArticle({
    id: 'webrtc-voice-calls-browser',
    title: 'WebRTC Voice Calls in Browser-Based Applications',
    excerpt: 'Implementing peer-to-peer voice calls in ChatterJoy using WebRTC with Firebase signaling.',
    category: 'Firebase',
    date: '2025-08-12',
    tags: ['WebRTC', 'Voice Calls', 'Firebase', 'ChatterJoy'],
    context: 'ChatterJoy includes seamless real-time voice calls using WebRTC for peer-to-peer audio communication, with Firebase Realtime Database handling signaling (SDP offer/answer exchange). This eliminates server-side media processing costs while providing encrypted, low-latency voice — applicable to banking customer support scenarios.',
    problem: 'Adding voice calls to web apps traditionally requires:\n- Expensive media servers (SFU/MCU) for audio routing\n- Complex SIP/WebRTC gateway integration\n- NAT traversal issues blocking peer connections\n- Signaling server infrastructure for call setup\n- No browser-native solution without third-party SDKs',
    solution: '**WebRTC API** enables direct browser-to-browser audio with Firebase (or any real-time DB) as the signaling channel for exchanging session descriptions and ICE candidates.',
    usage: '**Flow:** Caller creates RTCPeerConnection → generates offer → writes to Firebase → Callee receives offer → generates answer → ICE candidates exchanged → audio flows P2P.\n**STUN/TURN:** Use free Google STUN servers; TURN server for restrictive corporate networks.',
    useCases: '- ChatterJoy voice calls between chat contacts\n- Banking video KYC verification sessions\n- Customer support voice escalation from chat\n- Internal team voice huddles in CBX platform',
    examples: `\`\`\`javascript
async function startCall(conversationId, remoteUserId) {
  const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getTracks().forEach(track => pc.addTrack(track, stream));

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      push(ref(db, \`calls/\${conversationId}/candidates/\${remoteUserId}\`), event.candidate.toJSON());
    }
  };

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  set(ref(db, \`calls/\${conversationId}/offer\`), { sdp: offer.sdp, type: offer.type });
  return pc;
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| No TURN server fallback | Corporate firewalls block P2P; provide TURN relay |\n| Not handling call rejection/busy | Implement call state machine (ringing, connected, ended) |\n| Missing getUserMedia error handling | Handle permission denied gracefully with UI message |\n| Leaving peer connections open | Close PC and stop tracks on call end |',
    trends: '- **WebRTC NV:** Noise suppression and echo cancellation improvements\n- **Insertable Streams:** E2E encryption for voice in regulated industries\n- **WHIP/WHEP:** Standardized WebRTC ingestion protocols\n- **Agora/Twilio SDKs:** Managed alternatives when P2P is insufficient',
  }),

  createArticle({
    id: 'firebase-cloud-messaging-push',
    title: 'Firebase Cloud Messaging for Push Notifications',
    excerpt: 'Implementing FCM push notifications for chat messages, transaction alerts, and banking app engagement.',
    category: 'Firebase',
    date: '2025-07-28',
    tags: ['FCM', 'Firebase', 'Push Notifications', 'Mobile'],
    context: 'Firebase Cloud Messaging (FCM) powers push notifications in ChatterJoy — alerting users to new messages, call requests, and status updates even when the app is backgrounded. FCM integrates with both web (Service Workers) and Cordova mobile apps for unified notification delivery.',
    problem: 'Without push notifications, chat and banking apps lose:\n- Users missing urgent messages while app is closed\n- Transaction alert delivery depending on app being open\n- Re-engagement capability for dormant users\n- Real-time authorization request notifications for corporate checkers\n- Cross-platform notification consistency between web and mobile',
    solution: '**FCM** delivers notifications via Service Workers (web) and native channels (Android/iOS), with topic-based and token-based targeting.',
    usage: '**Web:** Register Service Worker, request notification permission, store FCM token in Firebase.\n**Mobile (Cordova):** Use `@havesource/cordova-plugin-push` with FCM configuration.\n**Backend:** Cloud Functions trigger FCM on new message/transaction events.',
    useCases: '- ChatterJoy new message notifications with sender name preview\n- Banking transaction debit/credit alerts\n- Authorization pending notification for corporate checkers\n- OTP delivery notification (supplementary to SMS)',
    examples: `\`\`\`javascript
// Web FCM setup
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const messaging = getMessaging();
const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
await set(ref(db, \`users/\${uid}/fcmToken\`), token);

onMessage(messaging, (payload) => {
  showInAppNotification(payload.notification.title, payload.notification.body);
});

// Cloud Function trigger
exports.onNewMessage = functions.database.ref('/conversations/{id}/messages/{msgId}')
  .onCreate(async (snapshot, context) => {
    const message = snapshot.val();
    const recipientToken = await getRecipientToken(message.recipientId);
    await admin.messaging().send({
      token: recipientToken,
      notification: { title: 'New Message', body: message.text },
    });
  });
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Requesting permission immediately on load | Ask after user sees value (first chat, first transaction) |\n| Not handling token refresh | Listen for onTokenRefresh and update stored token |\n| Sending PII in notification body | Show generic message; details only in-app |\n| No notification click handling | Deep link to relevant conversation/transaction |',
    trends: '- **Web Push API:** Standard web notifications without FCM dependency\n- **Rich notifications:** Action buttons, images in notification payload\n- **Notification channels (Android):** Category-based notification settings\n- **Privacy-focused:** iOS notification summary and scheduled delivery',
  }),

  createArticle({
    id: 'cloudinary-media-upload-fintech',
    title: 'Cloudinary Integration for Secure Media Upload in Apps',
    excerpt: 'Profile photos, chat attachments, and view-once media using Cloudinary with Firebase auth in ChatterJoy.',
    category: 'Firebase',
    date: '2025-07-18',
    tags: ['Cloudinary', 'Media Upload', 'Security', 'ChatterJoy'],
    context: 'ChatterJoy uses Cloudinary for profile photos, chat attachments, view-once photos, and voice message storage. Cloudinary\'s upload API, automatic optimization, and transformation pipeline eliminate custom media server infrastructure — patterns applicable to banking document upload and KYC photo capture.',
    problem: 'Self-hosted media handling causes:\n- Storage scaling costs and management overhead\n- No automatic image optimization (WebP conversion, resizing)\n- Security vulnerabilities in custom upload endpoints\n- Slow media delivery without CDN\n- Complex thumbnail generation for chat previews',
    solution: '**Cloudinary Upload Widget/API** with signed uploads, automatic format optimization, and on-the-fly transformations via URL parameters.',
    usage: '**Upload:** Client-side unsigned upload with upload preset, or signed upload for banking docs.\n**Transform:** `w_200,h_200,c_fill` for thumbnails, `q_auto,f_auto` for optimization.\n**Security:** Restrict upload presets, validate file types, scan for malware.',
    useCases: '- ChatterJoy profile photo upload and chat image attachments\n- View-once photo feature with auto-expiring Cloudinary URLs\n- Banking KYC document upload with format validation\n- Voice message storage and playback in chat applications',
    examples: `\`\`\`javascript
async function uploadChatImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'chatterjoy_chat');
  formData.append('folder', \`chats/\${conversationId}\`);

  const response = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD/image/upload', {
    method: 'POST', body: formData,
  });
  const data = await response.json();
  return { url: data.secure_url, thumbnail: data.secure_url.replace('/upload/', '/upload/w_200,h_200,c_fill/') };
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Unsigned uploads without preset restrictions | Configure preset: max file size, allowed formats, folder |\n| Storing full-resolution images for thumbnails | Generate thumbnails via Cloudinary transformations |\n| No client-side file validation | Check type/size before upload; validate server-side too |\n| Exposing Cloudinary API secret in frontend | Use unsigned presets or server-signed uploads |',
    trends: '- **Cloudinary AI:** Background removal, auto-crop, content-aware fill\n- **Video API:** Chat video messages with automatic transcoding\n- **Privacy:** Auto-expiring URLs for view-once banking documents\n- **Edge delivery:** Cloudinary CDN for sub-100ms media load globally',
  }),

  createArticle({
    id: 'webrtc-firebase-signaling-patterns',
    title: 'WebRTC Signaling Patterns with Firebase Realtime Database',
    excerpt: 'Reliable SDP and ICE candidate exchange for peer-to-peer connections using Firebase as signaling server.',
    category: 'Firebase',
    date: '2025-07-05',
    tags: ['WebRTC', 'Firebase', 'Signaling', 'P2P'],
    context: 'WebRTC requires a signaling mechanism to exchange session descriptions and network candidates before peer connections establish. Firebase Realtime Database serves as an ideal signaling channel — providing real-time sync, automatic cleanup, and security rules without dedicated signaling server infrastructure.',
    problem: 'WebRTC signaling challenges include:\n- Race conditions when both peers send offers simultaneously\n- ICE candidate trickling timing issues\n- Orphaned signaling data after failed/ended calls\n- No standard signaling protocol (unlike SIP for telephony)\n- Signaling data persistence exposing call metadata',
    solution: '**Structured Firebase signaling tree** with call state machine, ordered candidate exchange, and automatic cleanup via onDisconnect handlers.',
    usage: '**Call states:** `initiated → ringing → connected → ended`\n**Cleanup:** onDisconnect removes signaling data when peer disconnects.\n**Security:** Rules restrict signaling data access to call participants only.',
    useCases: '- ChatterJoy voice call setup and teardown\n- Screen sharing session initiation in support chat\n- Banking video KYC call establishment\n- Multi-party conference call signaling (mesh topology)',
    examples: `\`\`\`javascript
// Callee side — listen for offer
onValue(ref(db, \`calls/\${callId}/offer\`), async (snapshot) => {
  const offer = snapshot.val();
  if (!offer) return;
  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  set(ref(db, \`calls/\${callId}/answer\`), { sdp: answer.sdp, type: answer.type });
});

// ICE candidate exchange
onChildAdded(ref(db, \`calls/\${callId}/candidates/\${remoteUserId}\`), (snapshot) => {
  pc.addIceCandidate(new RTCIceCandidate(snapshot.val()));
});
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Not cleaning up signaling data after call | Delete call node on end/disconnect |\n| Handling glare (both send offers) | Implement polite/impolite peer role assignment |\n| Waiting for all ICE candidates before connecting | Use trickle ICE for faster connection setup |\n| No call timeout | Auto-cancel ringing after 30-60 seconds |',
    trends: '- **Perfect Negotiation pattern:** Glare handling standard from WebRTC spec\n- **MQTT signaling:** Alternative to Firebase for IoT/banking devices\n- **SFU migration:** Switch to mediasoup/LiveKit when P2P insufficient for groups\n- **Encrypted signaling:** E2E encrypt SDP/ICE data for regulated industries',
  }),

  createArticle({
    id: 'firebase-realtime-db-vs-firestore',
    title: 'Firebase Realtime Database vs Firestore: Choosing for Chat Apps',
    excerpt: 'Comparison guide for selecting the right Firebase database based on ChatterJoy production experience.',
    category: 'Firebase',
    date: '2025-06-25',
    tags: ['Firebase', 'Firestore', 'Realtime DB', 'Architecture'],
    context: 'ChatterJoy uses Firebase Realtime Database for its sub-100ms message sync. Understanding when to choose Realtime DB vs Firestore is critical for banking and chat applications where latency, query complexity, and offline behavior differ significantly between the two Firebase database products.',
    problem: 'Choosing the wrong Firebase database causes:\n- Firestore\'s 100ms+ latency unacceptable for real-time chat typing indicators\n- Realtime DB\'s flat JSON structure painful for complex banking queries\n- Migration costs after wrong initial choice\n- Overpaying for Firestore reads on simple key-value chat presence data\n- Missing offline capabilities needed for mobile banking apps',
    solution: '**Decision matrix:** Realtime DB for pure speed/simple sync (chat, presence, signaling). Firestore for complex queries, structured data, and scalability (user profiles, transaction logs, search).',
    usage: '**Choose Realtime DB when:** Latency < 100ms is critical, data structure is flat JSON, simple read/write patterns.\n**Choose Firestore when:** Complex queries, pagination, offline document sync, or structured collections needed.\n**Hybrid approach:** Realtime DB for live ephemeral data; Firestore for persistent searchable records.',
    useCases: '- Realtime DB: ChatterJoy messages, typing indicators, WebRTC signaling, online presence\n- Firestore: User profiles, chat metadata search, transaction history, report storage\n- Hybrid: Realtime DB for live data + Firestore for persistent records',
    examples: `\`\`\`javascript
// Realtime DB — optimized for speed
onValue(ref(db, \`conversations/\${id}/messages\`), callback); // ~50ms latency

// Firestore — optimized for queries
const q = query(
  collection(firestore, 'users'),
  where('status', '==', 'online'),
  orderBy('lastActive', 'desc'),
  limit(20)
);
const snapshot = await getDocs(q);
\`\`\`

| Feature | Realtime DB | Firestore |
|---|---|---|
| Latency | ~50ms | ~100-300ms |
| Queries | Limited | Rich (compound, array) |
| Offline | Full tree sync | Document-level |
| Pricing | Bandwidth-based | Read/write-based |
| Structure | JSON tree | Collections/docs |`,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Using Firestore for typing indicators | Realtime DB or client-side state for ephemeral data |\n| Deep nesting in Realtime DB | Flatten structure; avoid >5 levels deep |\n| No composite indexes in Firestore | Create indexes before deploying queries |\n| Reading entire collection for one document | Use direct document references |',
    trends: '- **Firestore real-time improvements:** Reduced latency approaching Realtime DB\n- **Firebase Data Connect:** SQL-based queries with GraphQL interface\n- **Multi-database Firestore:** Separate databases per feature/tenant\n- **Offline persistence v2:** Improved offline queue and conflict resolution',
  }),

  createArticle({
    id: 'puppeteer-web-performance-analyzer',
    title: 'Building a Web Performance Analyzer with Puppeteer and CDP',
    excerpt: 'Architecture of the Web Performance Analyzer — Puppeteer automation, Chrome DevTools Protocol, and scored reports.',
    category: 'Performance',
    date: '2025-06-18',
    tags: ['Puppeteer', 'CDP', 'Performance', 'Node.js'],
    context: 'The Web Performance Analyzer (Jun 2025) uses Puppeteer to launch headless Chrome, collect performance metrics via Chrome DevTools Protocol (CDP), and generate scored reports with charts. This tool demonstrates how frontend developers can automate the same DevTools analysis they do manually — applicable to CI/CD performance gates in banking deployments.',
    problem: 'Manual performance testing fails because:\n- Lighthouse CLI results vary between developer machines\n- No automated performance regression detection in CI/CD\n- Stakeholders can\'t reproduce developer performance findings\n- Batch URL analysis for multiple banking modules is tedious\n- No historical tracking of performance trends over releases',
    solution: '**Puppeteer + CDP** programmatically controls Chrome, collecting Navigation Timing, Resource Timing, Coverage data, and screenshots in a consistent, reproducible environment.',
    usage: '**Architecture:** React dashboard (frontend) → Express API (backend) → Puppeteer (browser automation) → Firebase (report storage).\n**Metrics:** LCP, FCP, TTFB, total blocking time, resource breakdown, console errors.\n**Features:** Network throttling (3G/Fast 3G), batch analysis, shareable report links.',
    useCases: '- Pre-deployment performance validation for CBX modules\n- Batch analysis of 20+ banking application URLs\n- Performance regression detection comparing release builds\n- Client-facing performance reports with visual charts',
    examples: `\`\`\`javascript
async function analyzeUrl(url, options = {}) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  if (options.throttle) {
    const client = await page.createCDPSession();
    await client.send('Network.emulateNetworkConditions', {
      offline: false, downloadThroughput: 1.5 * 1024 * 1024 / 8,
      uploadThroughput: 750 * 1024 / 8, latency: 40,
    });
  }

  const startTime = Date.now();
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    return { ttfb: nav.responseStart, domContentLoaded: nav.domContentLoadedEventEnd, load: nav.loadEventEnd };
  });

  const screenshot = await page.screenshot({ encoding: 'base64', fullPage: false });
  await browser.close();
  return { url, metrics, screenshot, analyzedAt: new Date().toISOString(), duration: Date.now() - startTime };
}
\`\`\``,
    mistakes: '| Anti-Pattern | Fix |\n|---|---|\n| Running Puppeteer without sandbox in CI | Use `--no-sandbox` flag in Docker/OpenShift |\n| Not setting consistent viewport | Standardize 1920x1080 or mobile viewport |\n| Single run per URL | Run 3 times, take median for stable results |\n| Memory leaks from unclosed browsers | Always close browser in finally block |',
    trends: '- **Playwright alternative:** Multi-browser support with similar CDP access\n- **Web Vitals library:** Official Google library for programmatic CWV measurement\n- **CI integration:** Jenkins pipeline step running Puppeteer on every deploy\n- **AI analysis:** GPT-powered performance recommendations from collected metrics',
  }),
];

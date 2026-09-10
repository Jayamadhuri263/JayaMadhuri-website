export const projects = [
  {
    id: 'personal-web-perf-analyzer',
    title: 'Web Performance Analyzer (Personal Project)',
    summary:
      'Browser-based performance analysis tool with Puppeteer-driven metrics, charts, and shareable reports — personal project aligned with my performance optimization focus.',
    category: ['Personal Projects', 'React'],
    workContext: 'personal',
    featured: true,
    featuredOrder: 1,
    employer: null,
    client: null,
    period: 'Jan 2026',
    role: 'Personal full-stack build',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Puppeteer', 'Chart.js', 'Firebase'],
    liveDemo: 'https://web-performance-analyzer-f257b.web.app/',
    documentation:
      'https://docs.google.com/document/d/1bpcCkKHj_hSzxyPOQPFfjzY06AOleX28sn8ip0CfzPk/edit?tab=t.0',
    github: 'https://github.com/Jayamadhuri263/Performance-analyzer',
    caseStudy: {
      problem:
        'Manual performance checks were repetitive; I needed a structured way to capture timings, resources, and visual reports from a real browser session.',
      solution:
        'Built a React + TypeScript dashboard backed by Node/Express and Puppeteer (CDP) to collect metrics, render charts, support throttling/batch runs, and store report history with Firebase auth.',
      impact:
        'Personal tooling project that reflects my interest in web performance tuning and DevTools-style debugging — not a client assignment at Intellect.',
    },
  },
  {
    id: 'personal-chatterjoy',
    title: 'ChatterJoy (Personal Project)',
    summary:
      'Real-time chat application with messaging, voice calls, media sharing, and personalization — built independently with React, Next.js, and Firebase.',
    category: ['Personal Projects', 'React'],
    workContext: 'personal',
    featured: true,
    featuredOrder: 2,
    employer: null,
    client: null,
    period: 'Apr 2025',
    role: 'Personal full-stack frontend build',
    technologies: ['React', 'Next.js', 'Firebase', 'WebRTC', 'Cloudinary', 'FCM'],
    liveDemo: 'https://chat-app-9601c.web.app/home/',
    documentation:
      'https://docs.google.com/document/d/1M1yD0URJ4S6nH_BX-QK8wgoQqnPa8kY0DB45rh-MnrM/edit?tab=t.0',
    github: 'https://github.com/Jayamadhuri263/ChatterJoy',
    caseStudy: {
      problem:
        'I wanted a modern chat product that combines real-time messaging, rich media, and voice — as a learning project beyond day-to-day banking delivery work.',
      solution:
        'Designed and built ChatterJoy with Next.js App Router, Firebase Auth & Realtime Database, WebRTC signaling, Cloudinary uploads, emoji/GIF integrations, and FCM notifications.',
      impact:
        'End-to-end personal project demonstrating real-time UX, WebRTC integration, and production-style feature documentation — separate from Intellect client deliverables.',
    },
  },
  {
    id: 'intellect-indian-bank-cbx',
    title: 'CBX Corporate Banking (Indian Bank)',
    summary:
      'Frontend development on Intellect’s CBX web platform for Indian Bank — responsive Angular modules, UI components, and integration with eMACH.ai microservices in a regulated banking environment.',
    category: ['Intellect Design Arena', 'Banking Apps', 'Angular', 'Microservices'],
    workContext: 'professional',
    employer: 'Intellect Design Arena Ltd',
    client: 'Indian Bank',
    period: '2023 – Present',
    role: 'Frontend Developer (Angular)',
    technologies: ['Angular', 'TypeScript', 'HTML/CSS', 'eMACH.ai', 'Jenkins', 'OpenShift'],
    liveDemo: null,
    github: null,
    caseStudy: {
      problem:
        'The client needed maintainable corporate banking web experiences with consistent UI, strong performance, and reliable integration with backend services delivered through Intellect’s CBX stack.',
      solution:
        'As part of the Intellect frontend team, I implemented and maintained Angular features and reusable UI components, collaborated with SMEs and backend engineers on requirements, and supported integration, testing, and production fixes across assigned modules.',
      impact:
        'Delivered assigned CBX modules with cross-browser responsive layouts, participated in code reviews and performance tuning, and supported production debugging to keep releases stable for banking users.',
    },
  },
  {
    id: 'intellect-idfc-mobility',
    title: 'Mobility Banking (IDFC First Bank)',
    summary:
      'Maintained Cordova-based Android banking applications on Intellect’s CBX mobility framework — UI fixes, client support, and biometric authentication enhancements.',
    category: ['Intellect Design Arena', 'Banking Apps', 'Mobile'],
    workContext: 'professional',
    employer: 'Intellect Design Arena Ltd',
    client: 'IDFC First Bank',
    period: 'Mobility assignment (~1.5 years)',
    role: 'Mobility / Frontend Developer',
    technologies: ['Cordova', 'CBX Framework', 'JavaScript', 'HTML/CSS', 'Android', 'REST APIs'],
    liveDemo: null,
    github: null,
    caseStudy: {
      problem:
        'Mobile banking users needed secure, responsive experiences on Android devices, including strong authentication patterns and reliable UI under real-world network conditions.',
      solution:
        'On assigned mobility workstreams, I maintained Cordova/CBX UI screens, enhanced biometric login flows within the framework, and provided ongoing fixes for mobile and web issues reported by client teams.',
      impact:
        'Recognized with a SPOT Award for biometric authentication work in Cordova; improved security UX on mobility flows and reduced turnaround on client-reported defects.',
    },
  },
  {
    id: 'intellect-bob-mobility',
    title: 'Enterprise Mobility (Bank of Baroda)',
    summary:
      'Maintained Bank of Baroda mobility on the Intellect CBX/Cordova stack — enterprise banking UI, responsiveness, and production support for assigned features.',
    category: ['Intellect Design Arena', 'Banking Apps', 'Mobile'],
    workContext: 'professional',
    employer: 'Intellect Design Arena Ltd',
    client: 'Bank of Baroda',
    period: 'Mobility assignment',
    role: 'Mobility / Frontend Developer',
    technologies: ['Cordova', 'CBX Framework', 'JavaScript', 'HTML/CSS', 'Android'],
    liveDemo: null,
    github: null,
    caseStudy: {
      problem:
        'Enterprise banking mobility required consistent, bank-grade UI behavior across devices while meeting client delivery timelines and support expectations.',
      solution:
        'I maintained assigned mobility screens, aligned UI with CBX design standards, worked with backend/API teams on integration issues, and handled support tickets for production defects.',
      impact:
        'Kept assigned mobility features stable with responsive layouts and smooth transitions, and provided steady client support for both mobile and related web touchpoints.',
    },
  },
];

export const categories = [
  'All',
  'Intellect Design Arena',
  'Personal Projects',
  'Banking Apps',
  'Angular',
  'Mobile',
  'React',
];

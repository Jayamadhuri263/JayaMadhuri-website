/** Verified Claude Academy credentials */
export const aiCertifications = [
  {
    id: 'claude-101',
    title: 'Claude 101',
    provider: 'Anthropic Academy',
    verifyUrl: 'https://academy.claude.com/verify/48f682f6b80c136a12f0e56a6ea1ec45',
  },
  {
    id: 'claude-code',
    title: 'Claude Code',
    provider: 'Anthropic Academy',
    verifyUrl: 'https://academy.claude.com/verify/dc3a045f7ce6564a5d03f86c09dd9269',
  },
  {
    id: 'claude-cowork',
    title: 'Claude Cowork',
    provider: 'Anthropic Academy',
    verifyUrl: 'https://academy.claude.com/verify/e9ece1ec8db7ee68297a96118c062d87',
  },
];

/**
 * Local brand assets under /public/icons/ai (served at /icons/ai/…).
 * @property {string} logo — path from site root
 * @property {'brand'|'mono'} [logoTheme] — mono icons invert on dark backgrounds
 */
export const aiTools = [
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-native IDE for multi-file edits and agent workflows',
    logo: '/icons/ai/cursor.png',
    logoTheme: 'brand',
    website: 'https://cursor.com',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Reasoning, coding, and pair-programming workflows',
    logo: '/icons/ai/claude.svg',
    logoTheme: 'brand',
    website: 'https://claude.ai',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Prompting, debugging, and documentation drafts',
    logo: '/icons/ai/chatgpt.svg',
    logoTheme: 'brand',
    website: 'https://chat.openai.com',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Multimodal research and code exploration',
    logo: '/icons/ai/gemini.svg',
    logoTheme: 'brand',
    website: 'https://gemini.google.com',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'In-editor completions and chat inside VS Code / JetBrains',
    logo: '/icons/ai/githubcopilot.svg',
    logoTheme: 'mono',
    website: 'https://github.com/features/copilot',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    description: 'Agentic IDE (Codeium) for autonomous coding tasks',
    logo: '/icons/ai/windsurf.svg',
    logoTheme: 'mono',
    website: 'https://windsurf.com',
  },
  {
    id: 'blackbox',
    name: 'Blackbox AI',
    description: 'Code search, snippets, and AI-assisted refactors',
    logo: '/icons/ai/blackbox.png',
    logoTheme: 'brand',
    website: 'https://www.blackbox.ai',
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    description: 'Learn topics from docs, notes, and sources with AI summaries',
    logo: '/icons/ai/notebooklm.png',
    logoTheme: 'brand',
    website: 'https://notebooklm.google.com',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI image generation for concepts and visual exploration',
    logo: '/icons/ai/midjourney.png',
    logoTheme: 'brand',
    website: 'https://www.midjourney.com',
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'UI/UX design, prototypes, and design handoff',
    logo: '/icons/ai/figma.svg',
    logoTheme: 'mono',
    website: 'https://www.figma.com',
  },
  {
    id: 'replit',
    name: 'Replit',
    description: 'Quick prototypes and full-stack experiments with AI',
    logo: '/icons/ai/replit.svg',
    logoTheme: 'mono',
    website: 'https://replit.com',
  },
  {
    id: 'bolt',
    name: 'Bolt.new',
    description: 'Prompt-to-app prototyping in the browser',
    logo: '/icons/ai/bolt.png',
    logoTheme: 'brand',
    website: 'https://bolt.new',
  },
];

/** Shown in the AI section — prompt craft & responsible use */
export const aiPromptStrengths = {
  headline: 'Prompt engineering that saves tokens and improves output',
  summary:
    'I treat AI as a senior pair programmer: tight context, clear constraints, and review before merge — not copy-paste and hope.',
  points: [
    {
      title: 'Lower token use',
      detail:
        'Scoped prompts with file paths, acceptance criteria, and “do not change” boundaries — less noise, fewer wasted retries.',
    },
    {
      title: 'Better code quality',
      detail:
        'Ask for typed interfaces, edge cases, and tests; then I refactor AI drafts to match team patterns and banking UI standards.',
    },
    {
      title: 'Structured workflows',
      detail:
        'Break work into plan → implement → diff review; use smaller chats for bugs and larger context only when the task needs it.',
    },
    {
      title: 'Safe, review-first delivery',
      detail:
        'No secrets in prompts, validate suggestions against lint/build, and keep humans accountable for what ships to production.',
    },
  ],
};

import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import AIVaultWidget from '../components/ai-vault/AIVaultWidget';
import MoreComingSoon from '../components/ui/MoreComingSoon';
import { useTheme } from '../context/ThemeContext';

export default function AIVaultPage() {
  const { isDark } = useTheme();

  return (
    <>
      <SEO
        title="AI Vault & Productivity Lab | Jaya Madhuri"
        description="Searchable AI prompts, workflow hacks, and keyboard shortcuts for frontend developers. ChatGPT, Claude, Copilot, and Cursor prompts."
        path="/ai-vault"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title">AI Vault & Productivity Lab</h1>
          <p className={`mb-8 max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Daily AI prompts, workflow hacks, and keyboard shortcuts for developer efficiency
          </p>
        </motion.div>

        <AIVaultWidget />

        <MoreComingSoon
          description="More prompts, keyboard workflows, and AI playbooks are on the way — I add new entries as I refine what works in real frontend delivery."
        />
      </div>
    </>
  );
}

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function MoreComingSoon({ title = 'More to come', description }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 glass-card glow-border flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 text-center sm:text-left"
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
          isDark ? 'bg-cyber-accent/15 text-cyber-accent' : 'bg-slate-accent/15 text-slate-accent'
        }`}
        aria-hidden
      >
        <Sparkles size={22} />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
      </div>
    </motion.div>
  );
}

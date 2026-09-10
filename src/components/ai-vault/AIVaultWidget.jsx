import { forwardRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Copy, Check, Keyboard, Sparkles } from 'lucide-react';
import { aiPrompts, aiCategories, keyboardShortcuts } from '../../data/aiPrompts';
import { copyToClipboard } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const PromptCard = forwardRef(function PromptCard({ prompt, onCopy, copiedId }, ref) {
  const { isDark } = useTheme();

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="glass-card p-5 glow-border"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold mb-1">{prompt.title}</h4>
          <div className="flex gap-2">
            <span className="tag-pill text-xs">{prompt.category}</span>
            <span
              className={`mt-[0.5em] text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
            >
              {prompt.tool}
            </span>
          </div>
        </div>
        <button
          onClick={() => onCopy(prompt.id, prompt.prompt)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            copiedId === prompt.id
              ? 'bg-green-500/20 text-green-400'
              : isDark
              ? 'bg-cyber-accent/10 text-cyber-accent hover:bg-cyber-accent/20'
              : 'bg-slate-accent/10 text-slate-accent hover:bg-slate-accent/20'
          }`}
        >
          {copiedId === prompt.id ? <Check size={14} /> : <Copy size={14} />}
          {copiedId === prompt.id ? 'Copied!' : 'Copy Prompt'}
        </button>
      </div>
      <pre className={`text-xs leading-relaxed whitespace-pre-wrap p-3 rounded-lg overflow-x-auto ${isDark ? 'bg-black/30 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
        {prompt.prompt}
      </pre>
    </motion.div>
  );
});

export default function AIVaultWidget() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { isDark } = useTheme();

  const filtered = useMemo(() => {
    return aiPrompts.filter((p) => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.prompt.toLowerCase().includes(search.toLowerCase()) ||
        p.tool.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  const handleCopy = async (id, text) => {
    await copyToClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search prompts, tools, workflows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
              isDark
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-cyber-accent'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-slate-accent'
            } focus:outline-none focus:ring-1 ${isDark ? 'focus:ring-cyber-accent' : 'focus:ring-slate-accent'}`}
          />
        </div>
        <button
          onClick={() => setShowShortcuts(!showShortcuts)}
          className="btn-secondary text-sm whitespace-nowrap"
        >
          <Keyboard size={16} />
          {showShortcuts ? 'Hide' : 'Show'} Shortcuts
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {aiCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`tag-pill cursor-pointer ${
              activeCategory === cat
                ? isDark ? '!bg-cyber-accent/30 !border-cyber-accent' : '!bg-slate-accent/30 !border-slate-accent'
                : ''
            }`}
          >
            {cat === 'All' ? <Sparkles size={12} className="inline mr-1" /> : null}
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-6 mb-8 overflow-hidden"
          >
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Keyboard size={18} /> Developer Keyboard Shortcuts
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {keyboardShortcuts.map((s) => (
                <div key={s.keys} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{s.action}</span>
                  <kbd className={`px-2 py-1 rounded text-xs font-mono ${isDark ? 'bg-black/30 text-cyber-accent' : 'bg-gray-200 text-slate-accent'}`}>
                    {s.keys}
                  </kbd>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} onCopy={handleCopy} copiedId={copiedId} />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className={`text-center py-12 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            No prompts found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}

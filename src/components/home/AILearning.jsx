import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, ExternalLink, MessageSquareText, Sparkles } from 'lucide-react';
import { aiCertifications, aiPromptStrengths, aiTools } from '../../data/aiLearning';
import { useTheme } from '../../context/ThemeContext';

function ToolLogo({ tool, isDark }) {
  if (!tool.logo) {
    return (
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
          isDark ? 'border-cyber-accent/30 bg-cyber-accent/10' : 'border-slate-accent/30 bg-slate-accent/10'
        }`}
        aria-hidden
      >
        <Sparkles size={22} className={isDark ? 'text-cyber-accent' : 'text-slate-accent'} />
      </div>
    );
  }

  const monoOnDark = tool.logoTheme === 'mono' && isDark;

  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl p-1.5 ${
        isDark ? 'bg-white/5' : 'bg-black/[0.04]'
      }`}
    >
      <img
        src={tool.logo}
        alt=""
        width={48}
        height={48}
        className={`max-h-full max-w-full object-contain ${monoOnDark ? 'brightness-0 invert' : ''}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default function AILearning() {
  const { isDark } = useTheme();

  return (
    <section id="ai-learning" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">AI &amp; Design Tooling</h2>
          <p className={`mb-6 max-w-3xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            I use AI daily for frontend delivery — and I focus on{' '}
            <span className={isDark ? 'text-cyber-accent' : 'text-slate-accent'}>
              writing precise prompts
            </span>{' '}
            so responses stay on-scope, use fewer tokens, and produce code I can ship after review.
          </p>
          <Link to="/ai-vault" className="btn-secondary text-sm inline-flex mb-12">
            Open full AI Vault
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 glass-card glow-border p-6 sm:p-8"
        >
          <div className="flex items-start gap-3 mb-4">
            <MessageSquareText
              size={24}
              className={`shrink-0 mt-0.5 ${isDark ? 'text-cyber-accent' : 'text-slate-accent'}`}
            />
            <div>
              <h3 className="text-lg font-semibold">{aiPromptStrengths.headline}</h3>
              <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {aiPromptStrengths.summary}
              </p>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {aiPromptStrengths.points.map((item) => (
              <li key={item.title} className="flex gap-2 text-sm">
                <span
                  className={`shrink-0 font-bold leading-relaxed ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}
                  aria-hidden
                >
                  •
                </span>
                <span>
                  <span
                    className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}
                  >
                    {item.title}
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}> — {item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Award size={20} className={isDark ? 'text-cyber-accent' : 'text-slate-accent'} />
            Verified certifications
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiCertifications.map((cert, i) => (
              <motion.a
                key={cert.id}
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card glow-border group flex flex-col p-5 transition-transform hover:scale-[1.02]"
              >
                <span className="text-xs font-medium uppercase tracking-wide opacity-70">
                  {cert.provider}
                </span>
                <span className="mt-1 font-semibold">{cert.title}</span>
                <span
                  className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium ${
                    isDark ? 'text-cyber-accent' : 'text-slate-accent'
                  }`}
                >
                  View verification
                  <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-4 text-lg font-semibold">Tools I use</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {aiTools.map((tool, i) => (
              <motion.a
                key={tool.id}
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card flex gap-4 p-4 transition-transform hover:scale-[1.02]"
              >
                <ToolLogo tool={tool} isDark={isDark} />
                <div className="min-w-0">
                  <p className="font-semibold">{tool.name}</p>
                  <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {tool.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

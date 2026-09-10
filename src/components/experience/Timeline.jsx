import { motion } from 'framer-motion';
import { Building2, Calendar } from 'lucide-react';
import { experience } from '../../data/experience';
import { useTheme } from '../../context/ThemeContext';
import { highlightSpotAward } from '../../utils/highlightSpotAward';

function experienceImageSrc(item, isDark) {
  if (!item.image) return null;
  return isDark && item.imageDark ? item.imageDark : item.image;
}

function ExperienceVisual({ item, isDark }) {
  const imageSrc = experienceImageSrc(item, isDark);
  if (!imageSrc) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.12 }}
      className="relative hidden md:flex md:w-1/2 items-stretch px-2 lg:px-6"
    >
      <div className="relative w-full overflow-hidden rounded-2xl glow-border ring-1 ring-white/10">
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isDark ? 'from-cyber-bg/90 via-transparent to-transparent' : 'from-slate-bg/80 via-transparent to-transparent'
          } z-10 pointer-events-none`}
        />
        <div
          className={`absolute inset-0 opacity-40 bg-gradient-to-br ${item.color} mix-blend-soft-light pointer-events-none`}
        />
        <img
          src={imageSrc}
          alt={item.imageAlt ?? ''}
          className={`h-full min-h-[280px] w-full object-contain ${
            isDark ? 'bg-slate-400/35' : 'bg-slate-700/50'
          }`}
          loading="lazy"
          decoding="async"
        />
      </div>
    </motion.div>
  );
}

function ExperienceCard({ item, isDark }) {
  return (
    <div className="glass-card p-6 glow-border hover:scale-[1.01] transition-transform">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={18} className={isDark ? 'text-cyber-accent' : 'text-slate-accent'} />
            <h3 className="font-bold text-lg">{item.company}</h3>
          </div>
          <p className={`text-sm font-medium ${isDark ? 'text-cyber-accent' : 'text-slate-accent'}`}>{item.role}</p>
        </div>
        <span className="tag-pill text-xs">{item.type}</span>
      </div>

      <div className={`flex items-center gap-2 text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <Calendar size={14} />
        {item.period}
      </div>

      <ul className="space-y-2 mb-4">
        {item.highlights.map((h) => {
          const key = typeof h === 'string' ? h : h.text;
          const isRich = typeof h === 'object' && h !== null && 'text' in h;
          return (
            <li
              key={key}
              className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              <span
                className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-r ${item.color}`}
              />
              <span>
                {isRich ? (
                  <>
                    {h.text}
                    {h.metric ? (
                      <>
                        {' '}
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {h.metric}
                        </span>
                      </>
                    ) : null}
                    {h.metricSuffix ?? (h.metric ? '.' : '')}
                  </>
                ) : (
                  highlightSpotAward(h, isDark)
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap gap-2">
        {item.technologies.map((tech) => (
          <span key={tech} className="tag-pill">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Timeline() {
  const { isDark } = useTheme();

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Professional Experience</h2>
          <p
            className={`mb-12 max-w-full text-sm sm:text-base md:whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Frontend & mobility work at Intellect Design Arena Ltd on assigned banking client programs
          </p>
        </motion.div>

        <div className="relative">
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 ${isDark ? 'bg-cyber-accent/20' : 'bg-slate-accent/20'}`} />

          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex flex-col md:flex-row md:items-center gap-8 mb-12 ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div
                className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${item.color} border-4 ${isDark ? 'border-cyber-bg' : 'border-slate-bg'} z-10`}
              />

              {item.image ? (
                <div className="md:hidden ml-12 overflow-hidden rounded-2xl ring-1 ring-white/10 mb-4">
                  <img
                    src={experienceImageSrc(item, isDark)}
                    alt={item.imageAlt ?? ''}
                    className={`h-44 w-full object-contain ${isDark ? 'bg-slate-400/35' : 'bg-slate-700/50'}`}
                    loading="lazy"
                  />
                </div>
              ) : null}

              <div className="md:w-1/2 ml-12 md:ml-0 md:px-2">
                <ExperienceCard item={item} isDark={isDark} />
              </div>

              <ExperienceVisual item={item} isDark={isDark} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

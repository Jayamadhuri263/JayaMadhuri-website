import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Building2, ExternalLink, Github, FileText, User } from 'lucide-react';
import { projects, categories } from '../../data/projects';
import { featuredCaseStudy } from '../../data/featuredCaseStudy';
import { useTheme } from '../../context/ThemeContext';

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { isDark } = useTheme();
  const caseImage = isDark ? featuredCaseStudy.imageDark : featuredCaseStudy.imageLight;

  const projectSort = (a, b) => {
    const rank = (p) => {
      if (p.featured) return 0;
      if (p.workContext === 'personal') return 1;
      return 2;
    };
    const d = rank(a) - rank(b);
    if (d !== 0) return d;
    return (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99);
  };

  const filtered = (
    activeCategory === 'All' ? [...projects] : projects.filter((p) => p.category.includes(activeCategory))
  ).sort(projectSort);

  const hasLiveDemo = (project) =>
    project.workContext === 'personal' && Boolean(project.liveDemo);

  const hasDocumentation = (project) =>
    project.workContext === 'personal' && Boolean(project.documentation);

  const hasGithub = (project) =>
    project.workContext === 'personal' && project.github && project.github !== '#';

  const linkBtnClass = (isDark) =>
    `relative z-10 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
      isDark
        ? 'bg-white/5 hover:bg-white/10 text-gray-200 hover:text-cyber-accent border border-white/10'
        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-slate-accent border border-gray-200'
    }`;

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Work & Projects</h2>
          <p
            className={`mb-8 max-w-full text-sm sm:text-base lg:whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Live personal builds you can click through, plus a featured banking assignment summary (client UI is confidential).
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden glow-border grid md:grid-cols-2 mb-10"
        >
          <div className={`p-6 lg:p-8 flex flex-col ${isDark ? 'bg-white/[0.02]' : 'bg-white/50'}`}>
            <p
              className={`text-xs font-semibold uppercase tracking-wide mb-2 ${isDark ? 'text-cyber-accent' : 'text-slate-accent'}`}
            >
              {featuredCaseStudy.eyebrow}
            </p>
            <h3 className="text-2xl font-bold mb-3">{featuredCaseStudy.title}</h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{featuredCaseStudy.summary}</p>
            <ul className={`space-y-2 text-sm mb-6 flex-grow ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {featuredCaseStudy.highlights.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className={isDark ? 'text-cyber-accent' : 'text-slate-accent'}>•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Award size={16} className="text-amber-400 shrink-0" />
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                SPOT Award — biometric login on Cordova mobility (IDFC stream)
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {featuredCaseStudy.technologies.map((t) => (
                <span key={t} className="tag-pill text-xs">
                  {t}
                </span>
              ))}
            </div>
            <a href="#experience" className="btn-secondary text-sm w-fit">
              Full experience timeline
            </a>
          </div>
          <div
            className={`relative min-h-[240px] flex items-center justify-center ${
              isDark ? 'bg-slate-500/30' : 'bg-slate-600/40'
            }`}
          >
            <img
              src={caseImage}
              alt="Conceptual CBX corporate web login on laptop — illustrative only"
              className="w-full h-full object-contain p-4"
              loading="lazy"
            />
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
              {featuredCaseStudy.clients.map((client) => (
                <span
                  key={client}
                  className="tag-pill text-xs inline-flex items-center gap-1 bg-black/20 backdrop-blur-sm"
                >
                  <Building2 size={11} /> {client}
                </span>
              ))}
            </div>
          </div>
        </motion.article>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`tag-pill cursor-pointer transition-all ${
                activeCategory === cat
                  ? isDark
                    ? '!bg-cyber-accent/30 !border-cyber-accent'
                    : '!bg-slate-accent/30 !border-slate-accent'
                  : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 glow-border flex flex-col hover:scale-[1.02] transition-transform"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {project.workContext === 'professional' ? (
                    <span className="tag-pill text-xs inline-flex items-center gap-1">
                      <Building2 size={12} /> Intellect · {project.client}
                    </span>
                  ) : (
                    <span className="tag-pill text-xs inline-flex items-center gap-1">
                      <User size={12} /> Personal project
                    </span>
                  )}
                  {project.featured && (
                    <span
                      className={`tag-pill text-xs ${
                        isDark
                          ? '!border-amber-500/50 !bg-amber-500/10 !text-amber-200'
                          : '!border-amber-600/40 !bg-amber-50 !text-amber-900'
                      }`}
                    >
                      Featured
                    </span>
                  )}
                  {project.period && (
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {project.period}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                {project.role && (
                  <p className={`text-xs mb-2 ${isDark ? 'text-cyber-accent/80' : 'text-slate-accent'}`}>
                    {project.role}
                  </p>
                )}
                <p className={`text-sm mb-4 flex-grow ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((t) => (
                    <span key={t} className="tag-pill text-xs">
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  className={`relative z-10 flex flex-wrap items-center gap-2 pt-4 mt-auto border-t ${
                    isDark ? 'border-white/5' : 'border-gray-200'
                  }`}
                >
                  {project.workContext === 'professional' && (
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Confidential client work
                    </span>
                  )}
                  {hasLiveDemo(project) && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkBtnClass(isDark)} ${project.featured ? '!bg-cyber-accent/20 !border-cyber-accent/40 font-semibold' : ''}`}
                    >
                      <ExternalLink size={14} /> {project.featured ? 'Live demo' : 'View project'}
                    </a>
                  )}
                  {hasDocumentation(project) && (
                    <a
                      href={project.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkBtnClass(isDark)}
                    >
                      <FileText size={14} /> Documentation
                    </a>
                  )}
                  {hasGithub(project) && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkBtnClass(isDark)}
                      aria-label="GitHub"
                    >
                      <Github size={14} /> GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

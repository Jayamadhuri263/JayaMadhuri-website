import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Lightbulb, AlertTriangle, Briefcase } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function CaseStudyModal({ project, onClose }) {
  const { isDark } = useTheme();

  if (!project) return null;

  const { caseStudy, title, technologies, workContext, employer, client, role, period } = project;
  const isProfessional = workContext === 'professional';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              {isProfessional && (
                <p className={`text-sm mb-2 flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Briefcase size={14} />
                  {employer} · Client: {client}
                  {period ? ` · ${period}` : ''}
                </p>
              )}
              {role && (
                <p className={`text-sm mb-3 ${isDark ? 'text-cyber-accent' : 'text-slate-accent'}`}>{role}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {technologies.map((t) => (
                  <span key={t} className="tag-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
            >
              <X size={20} />
            </button>
          </div>

          {isProfessional && (
            <p
              className={`text-xs mb-6 p-3 rounded-lg ${isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}
            >
              This summary describes my contribution on an Intellect client engagement. It does not
              represent a personal product or public repository.
            </p>
          )}

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={18} className="text-orange-400" />
                <h4 className="font-semibold">Context</h4>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {caseStudy.problem}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={18} className={isDark ? 'text-cyber-accent' : 'text-slate-accent'} />
                <h4 className="font-semibold">{isProfessional ? 'My contribution' : 'Solution'}</h4>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {caseStudy.solution}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-green-400" />
                <h4 className="font-semibold">{isProfessional ? 'Outcomes' : 'Impact'}</h4>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {caseStudy.impact}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

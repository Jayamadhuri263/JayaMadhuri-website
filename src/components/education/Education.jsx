import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { education } from '../../data/education';
import { useTheme } from '../../context/ThemeContext';

export default function Education() {
  const { isDark } = useTheme();

  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="section-title">Education</h2>
          <p
            className={`mt-2 text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-4xl`}
          >
            Engineering foundation from RGUKT RK Valley before moving into frontend and banking IT.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card glow-border overflow-hidden"
        >
          <div
            className={`flex items-center gap-2 border-b px-5 py-4 sm:px-6 ${
              isDark ? 'border-white/10 bg-white/[0.02]' : 'border-gray-200/80 bg-gray-50/80'
            }`}
          >
            <GraduationCap
              size={20}
              className={isDark ? 'text-cyber-accent' : 'text-slate-accent'}
            />
            <span className="text-sm font-semibold tracking-wide">Academic background</span>
          </div>

          <ul className={isDark ? 'divide-y divide-white/10' : 'divide-y divide-gray-200/70'}>
            {education.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-[4.5rem_minmax(0,1fr)_5.5rem] sm:items-start sm:gap-x-6 sm:gap-y-0 sm:px-6 sm:py-5"
              >
                <div className="flex sm:block sm:pt-0.5">
                  <span
                    className={`inline-flex min-w-[4rem] items-center justify-center rounded-lg px-2 py-1.5 text-sm font-bold tabular-nums ${
                      isDark
                        ? 'bg-cyber-accent/10 text-cyber-accent ring-1 ring-cyber-accent/25'
                        : 'bg-slate-accent/10 text-slate-accent ring-1 ring-slate-accent/20'
                    }`}
                  >
                    {item.year}
                  </span>
                </div>

                <div className="min-w-0 space-y-1.5 sm:order-none">
                  <p className={`font-semibold leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.degree}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.institution}
                  </p>
                  <p
                    className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    <MapPin size={14} className="shrink-0 opacity-80" aria-hidden />
                    {item.location}
                  </p>
                </div>

                <div className="flex sm:justify-end sm:pt-0.5">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tabular-nums ${
                      isDark
                        ? 'text-amber-300 bg-amber-400/10 ring-1 ring-amber-400/35'
                        : 'text-amber-900 bg-amber-100 ring-1 ring-amber-400/40'
                    }`}
                  >
                    {item.score}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

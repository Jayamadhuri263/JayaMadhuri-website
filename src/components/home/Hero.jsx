import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, BookOpen, Briefcase, Download, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { metrics } from '../../data/experience';
import { useTheme } from '../../context/ThemeContext';
import { downloadResume } from '../../utils/resumeDownload';

const PROFILE_IMAGE = '/images/profile.jpg';

export default function Hero() {
  const { isDark } = useTheme();
  const [photoOk, setPhotoOk] = useState(true);

  const handleResume = async () => {
    try {
      await downloadResume();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Could not download resume.');
    }
  };

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl ${isDark ? 'bg-cyber-purple/20' : 'bg-slate-accent/10'} animate-float`}
        />
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-cyber-accent/10' : 'bg-slate-accent/5'} animate-float`}
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-[1fr,300px] xl:grid-cols-[1fr,320px] gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span
                  className={`text-sm font-medium whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Open to opportunities
                </span>
              </div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${
                  isDark
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-200'
                    : 'border-amber-600/30 bg-amber-50 text-amber-900'
                }`}
              >
                <Award size={16} className="text-amber-400 shrink-0" />
                SPOT Award · Cordova biometric login
              </div>
            </div>

            <p className={`text-sm font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-cyber-accent' : 'text-slate-accent'}`}>
              Frontend Developer
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] mb-4">
              <span className="bg-gradient-to-r from-cyber-accent to-cyber-purple bg-clip-text text-transparent">
                Jaya Madhuri
              </span>
            </h1>
            <p
              className={`text-lg sm:text-xl font-semibold mb-4 max-w-full lg:whitespace-nowrap ${isDark ? 'text-gray-100' : 'text-gray-800'}`}
            >
              Enterprise banking UI — Angular CBX web & Cordova mobility
            </p>
            <p className={`text-base sm:text-lg max-w-2xl mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Intellect Design Arena Ltd — Indian Bank CBX frontend today; maintained Android banking apps for IDFC First
              Bank & Bank of Baroda. React/Vite portfolio, performance focus, live personal demos below.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a href="#projects" className="btn-primary">
                <Briefcase size={18} /> View work & projects
              </a>
              <button type="button" onClick={handleResume} className="btn-secondary">
                <Download size={18} /> Resume
              </button>
              <Link to="/blog" className="btn-secondary hidden sm:inline-flex">
                <BookOpen size={18} /> Tech blog
              </Link>
              <a href="#contact" className="btn-secondary hidden sm:inline-flex">
                <MessageCircle size={18} /> Contact
              </a>
            </div>

            <p className={`text-xs mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Trusted on programs for{' '}
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Indian Bank · IDFC First Bank · Bank of Baroda
              </span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass-card p-5 glow-border"
                >
                  <div className={`text-2xl sm:text-3xl font-bold mb-0.5 ${isDark ? 'text-cyber-accent' : 'text-slate-accent'}`}>
                    {metric.value}
                  </div>
                  <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="order-1 lg:order-2 w-full"
          >
            <div className="glass-card p-4 sm:p-6 glow-border flex flex-row lg:flex-col items-center gap-4 lg:text-center">
              <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 lg:w-40 lg:h-40 lg:mx-auto lg:mb-4">
                {photoOk ? (
                  <img
                    src={PROFILE_IMAGE}
                    alt="Jaya Madhuri"
                    className="w-full h-full rounded-2xl object-cover object-top ring-2 ring-cyber-accent/40"
                    onError={() => setPhotoOk(false)}
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-cyber-accent to-cyber-purple flex items-center justify-center text-2xl lg:text-4xl font-bold text-cyber-bg">
                    JM
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 lg:w-4 lg:h-4 bg-green-400 rounded-full border-2 border-cyber-bg" />
              </div>
              <div className="min-w-0 flex-1 lg:flex-none lg:w-full text-left lg:text-center">
                <p className="font-bold text-base sm:text-lg mb-0.5 lg:mb-1">Jaya Madhuri</p>
                <p className={`text-xs sm:text-sm mb-3 lg:mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Chennai · Banking domain Frontend
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:justify-center">
                  {['JavaScript', 'Angular', 'React', 'TypeScript', 'Performance'].map((tag) => (
                    <span key={tag} className="tag-pill text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`flex flex-col items-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
          >
            <span className="text-xs">Scroll</span>
            <ArrowRight size={16} className="rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

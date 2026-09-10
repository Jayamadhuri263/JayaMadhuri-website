import { useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

import { Menu, X, Sun, Moon, Download } from 'lucide-react';

import { useTheme } from '../../context/ThemeContext';

import { trackEvent, scrollToSection } from '../../utils/helpers';

import { downloadResume } from '../../utils/resumeDownload';



const navLinks = [

  { label: 'About', href: '/#about', sectionId: 'about' },

  { label: 'Experience', href: '/#experience', sectionId: 'experience' },

  { label: 'Projects', href: '/#projects', sectionId: 'projects' },

  { label: 'Blog', href: '/blog' },

  { label: 'AI Vault', href: '/ai-vault' },

  { label: 'Contact', href: '/#contact', sectionId: 'contact' },

];



export default function Navbar() {

  const [mobileOpen, setMobileOpen] = useState(false);

  const { isDark, toggleTheme } = useTheme();

  const location = useLocation();

  const navigate = useNavigate();



  const handleResumeDownload = async () => {

    trackEvent('resume_download', { source: 'navbar' });

    try {

      await downloadResume();

    } catch (err) {

      const message =

        err instanceof Error

          ? err.message

          : 'Could not download resume. Please try again or use the email on the contact page.';

      window.alert(message);

    }

  };



  const handleSectionNav = (e, link) => {
    if (!link.sectionId) return;

    e.preventDefault();
    setMobileOpen(false);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: link.sectionId } });
      return;
    }

    scrollToSection(link.sectionId);
    window.history.replaceState(null, '', `#${link.sectionId}`);
  };

  const handleRouteNav = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== href) {
      navigate(href);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };



  const isActive = (link) => {

    if (link.sectionId) {

      return location.pathname === '/' && location.hash === `#${link.sectionId}`;

    }

    return location.pathname === link.href;

  };



  const linkClass = (link) =>

    `px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap transition-all duration-200 ${

      isActive(link)

        ? isDark

          ? 'text-cyber-accent bg-cyber-accent/10'

          : 'text-slate-accent bg-slate-accent/10'

        : isDark

          ? 'text-gray-300 hover:text-white hover:bg-white/5'

          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'

    }`;



  return (

    <nav className="glass-nav">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16 gap-2">

          <Link

            to="/"

            className="flex items-center gap-2 shrink-0 group min-w-0"

            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.history.replaceState(null, '', '/');
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                return;
              }
              setMobileOpen(false);
            }}

          >

            <div className="relative shrink-0">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-accent to-cyber-purple flex items-center justify-center font-bold text-cyber-bg text-sm">

                JM

              </div>

              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-cyber-bg animate-pulse-slow" />

            </div>

            <span className="font-bold text-base xl:text-lg truncate hidden md:block max-w-[9rem] xl:max-w-none group-hover:text-cyber-accent transition-colors">

              Jaya Madhuri

            </span>

          </Link>



          <div className="hidden xl:flex items-center gap-0.5 min-w-0 flex-1 justify-center">

            {navLinks.map((link) =>

              link.sectionId ? (

                <a

                  key={link.label}

                  href={`#${link.sectionId}`}

                  onClick={(e) => handleSectionNav(e, link)}

                  className={linkClass(link)}

                >

                  {link.label}

                </a>

              ) : (

                <Link
                  key={link.label}
                  to={link.href}
                  className={linkClass(link)}
                  onClick={(e) => handleRouteNav(e, link.href)}
                >
                  {link.label}
                </Link>

              )

            )}

          </div>



          <div className="flex items-center gap-1.5 shrink-0">

            <button

              onClick={toggleTheme}

              aria-label="Toggle theme"

              className={`p-2 rounded-lg transition-colors ${

                isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'

              }`}

            >

              {isDark ? <Sun size={20} /> : <Moon size={20} />}

            </button>



            <button

              onClick={handleResumeDownload}

              className="hidden sm:flex btn-primary text-xs xl:text-sm !px-3 xl:!px-4 !py-2"

            >

              <Download size={16} />

              Resume

            </button>



            <button

              onClick={() => setMobileOpen(!mobileOpen)}

              className={`xl:hidden p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}

              aria-label="Toggle menu"

            >

              {mobileOpen ? <X size={24} /> : <Menu size={24} />}

            </button>

          </div>

        </div>

      </div>



      <AnimatePresence>

        {mobileOpen && (

          <motion.div

            initial={{ opacity: 0, height: 0 }}

            animate={{ opacity: 1, height: 'auto' }}

            exit={{ opacity: 0, height: 0 }}

            className="xl:hidden border-t border-white/5"

          >

            <div className="px-4 py-4 space-y-1">

              {[

                ...navLinks,

                { label: 'Design Thinking', href: '/#design-thinking', sectionId: 'design-thinking' },

                { label: 'AI & Tools', href: '/#ai-learning', sectionId: 'ai-learning' },

                { label: 'Education', href: '/#education', sectionId: 'education' },

              ].map((link) =>

                link.sectionId ? (

                  <a

                    key={link.label}

                    href={`#${link.sectionId}`}

                    onClick={(e) => handleSectionNav(e, link)}

                    className={`block px-4 py-3 rounded-lg text-sm font-medium ${

                      isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'

                    }`}

                  >

                    {link.label}

                  </a>

                ) : (

                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={(e) => handleRouteNav(e, link.href)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                      isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>

                )

              )}

              <button onClick={handleResumeDownload} className="w-full btn-primary text-sm mt-2">

                <Download size={16} /> Download Resume

              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </nav>

  );

}


import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { contactInfo } from '../../data/contact';

export default function Footer() {
  const { isDark } = useTheme();
  const year = 2025;

  return (
    <footer className={`border-t py-8 ${isDark ? 'border-white/5 bg-cyber-bg' : 'border-gray-200 bg-slate-bg'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            © {year} Jaya Madhuri. Built with React + Vite
            <span className="footer-heartbeat inline-flex shrink-0 items-center justify-center mx-1.5" aria-hidden>
              <Heart size={14} strokeWidth={1.75} className="footer-heartbeat-icon h-full w-full" fill="currentColor" />
            </span>
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: contactInfo.github.url, label: 'GitHub' },
              { icon: Linkedin, href: contactInfo.linkedin.url, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${contactInfo.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'text-gray-400 hover:text-cyber-accent hover:bg-white/5' : 'text-gray-500 hover:text-slate-accent hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

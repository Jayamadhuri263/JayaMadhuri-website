import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function SectionDivider({ label }) {
  const { isDark } = useTheme();
  const rootRef = useRef(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;

    const reveal = () => {
      if (!node.classList.contains('section-divider-visible')) {
        node.classList.add('section-divider-visible');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          requestAnimationFrame(reveal);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const trackClass = isDark ? 'section-divider-track-dark' : 'section-divider-track-light';
  const fillClass = isDark ? 'section-divider-fill-dark' : 'section-divider-fill-light';

  return (
    <div
      ref={rootRef}
      className="section-divider relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4"
      role={label ? 'separator' : undefined}
      aria-label={label ? `Section: ${label}` : undefined}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="section-divider-line section-divider-line-left flex-1 flex items-center min-w-0">
          <div className={`section-divider-track relative w-full h-1 rounded-full overflow-hidden ${trackClass}`}>
            <div className={`section-divider-fill absolute inset-0 rounded-full ${fillClass}`} />
            <div className={`section-divider-shimmer section-divider-shimmer-left absolute inset-y-0 w-1/3 max-w-[130px] rounded-full ${isDark ? 'section-divider-shimmer-dark' : 'section-divider-shimmer-light'}`} />
          </div>
        </div>

        <div className="section-divider-hub relative shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
          <svg
            viewBox="0 0 64 64"
            className={`section-divider-ring section-divider-ring-cw absolute inset-0 w-full h-full ${isDark ? 'section-divider-ring-outer-dark' : 'section-divider-ring-outer-light'}`}
            aria-hidden
          >
            <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
          </svg>
          <svg
            viewBox="0 0 64 64"
            className={`section-divider-ring section-divider-ring-ccw absolute inset-0 w-full h-full ${isDark ? 'section-divider-ring-inner-dark' : 'section-divider-ring-inner-light'}`}
            aria-hidden
          >
            <circle cx="32" cy="32" r="21" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 9" />
          </svg>
          <span className={`section-divider-core relative w-2.5 h-2.5 rounded-full ${isDark ? 'section-divider-core-dark' : 'section-divider-core-light'}`} />
        </div>

        <div className="section-divider-line section-divider-line-right flex-1 flex items-center min-w-0">
          <div className={`section-divider-track relative w-full h-1 rounded-full overflow-hidden ${trackClass}`}>
            <div className={`section-divider-fill absolute inset-0 rounded-full ${fillClass}`} />
            <div className={`section-divider-shimmer section-divider-shimmer-right absolute inset-y-0 w-1/3 max-w-[130px] rounded-full ${isDark ? 'section-divider-shimmer-dark' : 'section-divider-shimmer-light'}`} />
          </div>
        </div>
      </div>

      {label && (
        <p className="section-divider-label text-center mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          {label}
        </p>
      )}
    </div>
  );
}

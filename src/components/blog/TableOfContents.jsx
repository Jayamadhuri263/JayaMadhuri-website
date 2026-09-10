import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const { isDark } = useTheme();

  useEffect(() => {
    const matches = content.match(/^## \d+\. .+$/gm) || [];
    const items = matches.map((h) => {
      const text = h.replace(/^## \d+\. /, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return { text, id };
    });
    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className={`sticky top-24 p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
      <h4 className="font-semibold text-sm mb-3">Table of Contents</h4>
      <ul className="space-y-2">
        {headings.map(({ text, id }, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`text-xs block py-1 transition-colors ${
                activeId === id
                  ? isDark ? 'text-cyber-accent font-medium' : 'text-slate-accent font-medium'
                  : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {i + 1}. {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

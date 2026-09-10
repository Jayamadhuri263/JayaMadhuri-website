import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';
import { slugify } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

export default function MarkdownRenderer({ content }) {
  const { isDark } = useTheme();
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => {
          const text = String(children);
          const id = slugify(text.replace(/^\d+\.\s*/, ''));
          return <h2 id={id}>{children}</h2>;
        },
        h3: ({ children }) => <h3>{children}</h3>,
        code: ({ inline, className, children }) => {
          const match = /language-(\w+)/.exec(className || '');
          if (!inline && match) {
            return <CodeBlock language={match[1]}>{children}</CodeBlock>;
          }
          return <code className={className}>{children}</code>;
        },
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th
            className={`border px-2 py-2 sm:px-4 text-left text-xs sm:text-sm font-semibold ${
              isDark ? 'border-white/10 bg-white/5 text-gray-200' : 'border-gray-200 bg-slate-100 text-gray-800'
            }`}
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            className={`border px-2 py-2 sm:px-4 text-xs sm:text-sm ${
              isDark ? 'border-white/10 text-gray-300' : 'border-gray-200 text-gray-700'
            }`}
          >
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.min.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import { copyToClipboard } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

export default function CodeBlock({ language, children }) {
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();
  const code = String(children).replace(/\n$/, '');

  useEffect(() => {
    Prism.highlightAll();
  }, [code, isDark]);

  const handleCopy = async () => {
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="blog-code-block relative group my-4">
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-t-xl text-xs border-b ${
          isDark
            ? 'bg-[#161b22] text-gray-400 border-white/10'
            : 'bg-slate-800 text-slate-200 border-slate-600'
        }`}
      >
        <span className="font-medium capitalize">{language || 'code'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
            isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-white/15 text-slate-100'
          }`}
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre
        className={`blog-code-pre !mt-0 !rounded-t-none !mb-0 language-${language || 'javascript'}`}
      >
        <code className={`language-${language || 'javascript'}`}>{code}</code>
      </pre>
    </div>
  );
}

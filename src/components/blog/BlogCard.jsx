import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { calculateReadTime } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

export default function BlogCard({ post }) {
  const { isDark } = useTheme();
  const readTime = calculateReadTime(post.content);

  return (
    <Link
      to={`/blog/${post.id}`}
      className="glass-card p-6 glow-border block hover:scale-[1.02] transition-transform group"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="tag-pill">{post.category}</span>
        <span className={`flex items-center gap-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <Clock size={12} /> {readTime} min read
        </span>
      </div>

      <h3 className={`font-bold text-lg mb-2 group-hover:${isDark ? 'text-cyber-accent' : 'text-slate-accent'} transition-colors`}>
        {post.title}
      </h3>
      <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <span className={`flex items-center gap-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
        <div className="flex gap-1">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag-pill text-[10px]">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

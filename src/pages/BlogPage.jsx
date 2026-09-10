import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import SEO from '../components/seo/SEO';
import BlogCard from '../components/blog/BlogCard';
import { allBlogPosts as blogPosts, allBlogCategories as blogCategories } from '../data/blog/index';
import { useTheme } from '../context/ThemeContext';
import MoreComingSoon from '../components/ui/MoreComingSoon';

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const { isDark } = useTheme();

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCat = category === 'All' || post.category === category;
      const matchSearch = !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <>
      <SEO
        title="Tech Blog | Jaya Madhuri"
        description="Technical articles on SDLC, Jenkins CI/CD, OpenShift, Angular vs React, JavaScript internals, and web performance for banking IT."
        path="/blog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title">Tech Blog & Knowledge Vault</h1>
          <p className={`mb-8 max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Enterprise banking insights, DevOps workflows, and frontend engineering deep dives
          </p>
        </motion.div>

        <div className="relative mb-6">
          <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
              isDark
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-cyber-accent'
                : 'bg-white border-gray-200 focus:border-slate-accent'
            } focus:outline-none`}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`tag-pill cursor-pointer ${
                category === cat
                  ? isDark ? '!bg-cyber-accent/30 !border-cyber-accent' : '!bg-slate-accent/30 !border-slate-accent'
                  : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={`text-center py-12 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            No articles found.
          </p>
        )}

        <MoreComingSoon
          description="More deep dives on Angular, React, DevOps, performance, and AI-assisted development are on the way — new articles landing soon."
        />
      </div>
    </>
  );
}

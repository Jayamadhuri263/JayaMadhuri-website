import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import SEO from '../components/seo/SEO';
import MarkdownRenderer from '../components/blog/MarkdownRenderer';
import TableOfContents from '../components/blog/TableOfContents';
import { allBlogPosts as blogPosts } from '../data/blog/index';
import { calculateReadTime } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.id === slug);
  const { isDark } = useTheme();

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  const readTime = calculateReadTime(post.content);

  return (
    <>
      <SEO
        title={`${post.title} | Jaya Madhuri`}
        description={post.excerpt}
        path={`/blog/${post.id}`}
        type="article"
        article={post}
      />

      <div className="blog-detail-page max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          to="/blog"
          className={`inline-flex items-center gap-2 text-sm mb-6 sm:mb-8 transition-colors ${
            isDark ? 'text-gray-400 hover:text-cyber-accent' : 'text-gray-500 hover:text-slate-accent'
          }`}
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 min-w-0"
          >
            <div
              className={`blog-detail-article rounded-2xl border p-5 sm:p-8 md:p-10 ${
                isDark
                  ? 'bg-cyber-card/95 border-white/10 shadow-glass'
                  : 'bg-white/95 border-gray-200/80 shadow-lg'
              }`}
            >
              <header
                className={`mb-6 sm:mb-8 pb-6 border-b ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  <span className="tag-pill text-xs">{post.category}</span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-pill text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-3 sm:mb-4">
                  {post.title}
                </h1>
                <p
                  className={`text-base sm:text-lg leading-relaxed mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {post.excerpt}
                </p>
                <div
                  className={`flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm ${
                    isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <User size={14} className="shrink-0" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="shrink-0" />{' '}
                    {new Date(post.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="shrink-0" /> {readTime} min read
                  </span>
                </div>
              </header>

              <div className="prose-blog max-w-none">
                <MarkdownRenderer content={post.content} />
              </div>
            </div>
          </motion.article>

          <aside className="hidden lg:block">
            <TableOfContents content={post.content} />
          </aside>
        </div>
      </div>
    </>
  );
}

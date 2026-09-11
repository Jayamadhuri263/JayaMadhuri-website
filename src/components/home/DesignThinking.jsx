import { motion, useReducedMotion } from 'framer-motion';
import { Building2, Heart, Minimize2, Sparkles, Target } from 'lucide-react';
import { designThinkingLaws } from '../../data/designThinking';
import { useTheme } from '../../context/ThemeContext';

const iconMap = { Minimize2, Sparkles, Target };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/** Intellect Design Arena corporate blue (trust / fintech brand palette). */
const INTELLECT_BRAND = '#006CB5';

function centerLabelLines(label) {
  const preset = {
    'Less is More': ['Less is', 'More'],
    'The Last 2%': ['The Last', '2%'],
  };
  if (preset[label]) return preset[label];
  const words = label.split(' ');
  if (words.length <= 2) return words;
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

function PrinciplesOrbit({ isDark, reducedMotion }) {
  const center = { x: 200, y: 210 };
  const nodes = [
    { label: 'Less is More', angle: -90, color: '#22d3ee' },
    { label: 'The Last 2%', angle: 30, color: '#a855f7' },
    { label: 'Prioritization', angle: 150, color: '#f59e0b' },
  ];

  return (
      <svg
        viewBox="0 0 400 420"
        className="w-full max-w-md mx-auto overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7928CA" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          style={{ transformOrigin: `${center.x}px ${center.y}px` }}
          animate={reducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          <motion.circle
            cx={center.x}
            cy={center.y}
            r="130"
            fill="none"
            stroke="url(#orbitGrad)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            animate={reducedMotion ? {} : { strokeDashoffset: [0, -28] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.g>
        <circle
          cx={center.x}
          cy={center.y}
          r="95"
          fill="none"
          stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
          strokeWidth="1"
        />

        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = center.x + Math.cos(rad) * 130;
          const y = center.y + Math.sin(rad) * 130;
          return (
            <g key={node.label}>
              <motion.line
                x1={center.x}
                y1={center.y}
                x2={x}
                y2={y}
                stroke={node.color}
                strokeOpacity="0.35"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.15 }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="36"
                fill={isDark ? '#161F30' : '#ffffff'}
                stroke={node.color}
                strokeWidth="2"
                filter={isDark ? 'url(#glow)' : undefined}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 + i * 0.12 }}
                animate={
                  reducedMotion
                    ? {}
                    : {
                        scale: [1, 1.06, 1],
                        strokeOpacity: [1, 0.7, 1],
                      }
                }
                style={{ transformOrigin: `${x}px ${y}px` }}
                {...(!reducedMotion && {
                  transition: {
                    scale: { duration: 2.5, repeat: Infinity, delay: i * 0.4 },
                    strokeOpacity: { duration: 2.5, repeat: Infinity, delay: i * 0.4 },
                  },
                })}
              />
              <motion.text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                fill={isDark ? '#f1f5f9' : '#0f172a'}
                fontSize="8.5"
                fontWeight="600"
                {...(!isDark && {
                  stroke: '#ffffff',
                  strokeWidth: 0.35,
                  paintOrder: 'stroke fill',
                })}
              >
                {centerLabelLines(node.label).map((line, li, arr) => (
                  <tspan
                    key={`${node.label}-${line}`}
                    x={x}
                    dy={li === 0 ? (arr.length > 1 ? '-0.5em' : '0') : '1.05em'}
                  >
                    {line}
                  </tspan>
                ))}
              </motion.text>
              {!reducedMotion && (
                <motion.circle
                  r="4"
                  fill={node.color}
                  initial={{ cx: center.x, cy: center.y, opacity: 0 }}
                  animate={{
                    cx: [center.x, x, center.x],
                    cy: [center.y, y, center.y],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    delay: i * 1.05,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </g>
          );
        })}

        <motion.g
          animate={reducedMotion ? {} : { scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${center.x}px ${center.y}px` }}
        >
          <motion.circle
            cx={center.x}
            cy={center.y}
            r="52"
            fill={isDark ? '#0B0F17' : '#F8FAFC'}
            stroke={INTELLECT_BRAND}
            strokeOpacity={0.85}
            strokeWidth="2"
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
          <text x={center.x} y={center.y} textAnchor="middle" fill={INTELLECT_BRAND} fontSize="10.5" fontWeight="700">
            <tspan x={center.x} dy="-0.55em">
              Design
            </tspan>
            <tspan x={center.x} dy="1.15em">
              Thinking®
            </tspan>
          </text>
        </motion.g>
      </svg>
  );
}

function ConceptDiagram({ isDark }) {
  const steps = [
    { step: 'Discover', desc: 'What matters to the user?', color: 'border-cyan-500/40' },
    { step: 'Prioritize', desc: 'Ship core value first', color: 'border-amber-500/40' },
    { step: 'Simplify', desc: 'Less is More', color: 'border-teal-500/40' },
    { step: 'Polish', desc: 'The Last 2%', color: 'border-purple-500/40' },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`rounded-2xl p-6 border ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-white'}`}
    >
      <motion.p
        variants={fadeUp}
        custom={0}
        className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
      >
        How the three laws work together
      </motion.p>
      <div className="flex flex-col md:flex-row items-stretch gap-3 text-center text-sm">
        {steps.map((item, i, arr) => (
          <div key={item.step} className="flex-1 flex items-center gap-2">
            <motion.div
              variants={fadeUp}
              custom={i + 1}
              whileHover={{ scale: 1.04, y: -4 }}
              className={`flex-1 rounded-xl border-2 ${item.color} p-4 ${isDark ? 'bg-cyber-card/50 hover:shadow-glow' : 'bg-slate-50'} transition-shadow`}
            >
              <div className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.step}</div>
              <div
                className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-800 font-medium'}`}
              >
                {item.desc}
              </div>
            </motion.div>
            {i < arr.length - 1 && (
              <motion.span
                variants={fadeUp}
                custom={i + 0.5}
                animate={{ x: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
                className={`hidden md:inline text-lg ${isDark ? 'text-cyber-accent' : 'text-slate-accent'}`}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LessIsMoreIllustration({ isDark }) {
  return (
    <div className="grid grid-cols-2 gap-3 text-xs">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`rounded-lg p-3 border border-red-500/20 ${isDark ? 'bg-red-500/5' : 'bg-red-50'}`}
      >
        <p className={`font-semibold mb-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>Before</p>
        <div className="space-y-1">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <motion.div
              key={n}
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: `${100 - n * 5}%`, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ delay: n * 0.06, duration: 0.4 }}
              className={`h-2 rounded ${isDark ? 'bg-white/20' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <p className={`mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Cluttered UI</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`rounded-lg p-3 border border-cyan-500/30 ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-50'}`}
      >
        <p className={`font-semibold mb-2 ${isDark ? 'text-cyan-400' : 'text-cyan-800'}`}>After</p>
        <div className="space-y-2">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
            className={`h-3 rounded ${isDark ? 'bg-cyber-accent/40' : 'bg-sky-300'}`}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{ originX: 0, width: '60%' }}
            className={`h-2 rounded ${isDark ? 'bg-white/15' : 'bg-gray-200'}`}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, type: 'spring' }}
            className={`h-8 rounded-lg mt-3 w-[40%] ${isDark ? 'bg-cyber-accent/30' : 'bg-sky-200'}`}
          />
        </div>
        <p className={`mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Focused flow</p>
      </motion.div>
    </div>
  );
}

function LastTwoPercentIllustration({ isDark, reducedMotion }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Functional</span>
        <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>Last 2% polish</span>
      </div>
      <div className={`h-3 rounded-full overflow-hidden relative ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-gray-500 to-gray-400"
          initial={{ width: '0%' }}
          whileInView={{ width: '98%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute top-0 right-0 h-full w-[2%] min-w-[6px] rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, type: 'spring', stiffness: 300 }}
          animate={
            reducedMotion
              ? {}
              : {
                  boxShadow: [
                    '0 0 0px rgba(168,85,247,0)',
                    '0 0 12px rgba(0,242,254,0.8)',
                    '0 0 0px rgba(168,85,247,0)',
                  ],
                }
          }
          {...(!reducedMotion && { transition: { duration: 2, repeat: Infinity } })}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
        className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
      >
        Micro-interactions, copy, spacing, accessibility — the edge that users feel.
      </motion.p>
    </div>
  );
}

function PrioritizationIllustration({ isDark }) {
  return (
    <motion.svg
      viewBox="0 0 280 120"
      className="w-full h-auto"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.polygon
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        }}
        points="20,10 260,10 200,110 80,110"
        fill={isDark ? 'rgba(0,242,254,0.08)' : 'rgba(2,132,199,0.08)'}
        stroke="#00F2FE"
        strokeWidth="1.5"
      />
      <text x="140" y="35" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="10">
        All requests & ideas
      </text>
      <motion.polygon
        variants={{
          hidden: { opacity: 0, scale: 0.85 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
        }}
        points="70,45 210,45 175,95 105,95"
        fill={isDark ? 'rgba(121,40,202,0.12)' : 'rgba(121,40,202,0.08)'}
        stroke="#7928CA"
        strokeWidth="1.5"
      />
      <text x="140" y="72" textAnchor="middle" fill={isDark ? '#cbd5e1' : '#475569'} fontSize="10">
        Sprint scope
      </text>
      <motion.rect
        variants={{
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0, transition: { type: 'spring', delay: 0.45 } },
        }}
        x="115"
        y="82"
        width="50"
        height="18"
        rx="4"
        fill="#f59e0b"
        fillOpacity="0.35"
        stroke="#f59e0b"
        animate={{ strokeOpacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text x="140" y="95" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">
        Core value
      </text>
    </motion.svg>
  );
}

const lawIllustrations = {
  'less-is-more': LessIsMoreIllustration,
  'last-two-percent': LastTwoPercentIllustration,
  prioritization: PrioritizationIllustration,
};

export default function DesignThinking() {
  const { isDark } = useTheme();
  const reducedMotion = useReducedMotion();

  return (
    <section id="design-thinking" className="py-20 relative overflow-hidden">
      <div className={`absolute inset-0 pointer-events-none ${isDark ? 'opacity-30' : 'opacity-20'}`}>
        <motion.div
          animate={reducedMotion ? {} : { x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyber-purple/25 to-transparent blur-3xl"
        />
        <motion.div
          animate={reducedMotion ? {} : { x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-cyber-accent/15 to-transparent blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <motion.div
              animate={reducedMotion ? {} : { rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Building2 size={16} className={isDark ? 'text-cyber-accent' : 'text-slate-accent'} />
            </motion.div>
            <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Inspired at Intellect Design Arena Ltd
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} custom={1} className="section-title">
            Design Thinking in My Work
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className={`max-w-3xl mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          >
            At Intellect, I was introduced to a mindset that goes beyond screens and sprints —{' '}
            <strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>
              The 3 Laws of Design Thinking®
            </strong>{' '}
            formulated by <strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>Arun Jain</strong>.
            I connected deeply with these principles and consciously apply them in every assignment:
            simplifying flows for banking users, polishing the details that build trust, and aligning
            with what truly matters for the customer.
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={3}
            className={`flex items-start gap-2 max-w-3xl mb-12 text-sm leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
          >
            <motion.span
              animate={reducedMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="inline-flex"
            >
              <Heart size={16} className="text-red-400 shrink-0 mt-0.5" />
            </motion.span>
            <span>
              Design Thinking® is Intellect’s registered approach; the laws below are how I translate
              that philosophy into frontend delivery every day.
            </span>
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: -8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.01 }}
            className="glass-card p-8 glow-border"
          >
            <motion.div
              animate={reducedMotion ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PrinciplesOrbit isDark={isDark} reducedMotion={reducedMotion} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className={`text-center text-sm mt-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Three laws — one continuous loop of thoughtful delivery
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ConceptDiagram isDark={isDark} />
          </motion.div>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {designThinkingLaws.map((law, index) => {
            const Icon = iconMap[law.icon];
            const Illustration = lawIllustrations[law.id];

            return (
              <motion.article
                key={law.id}
                variants={fadeUp}
                custom={index}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.25 },
                }}
                className="glass-card p-6 glow-border flex flex-col h-full group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: isDark
                      ? 'radial-gradient(circle at 50% 0%, rgba(0,242,254,0.08), transparent 60%)'
                      : 'radial-gradient(circle at 50% 0%, rgba(2,132,199,0.06), transparent 60%)',
                  }}
                />

                <div className="flex items-start justify-between mb-4 relative">
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-br ${law.accent}`}
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={22} className="text-white" />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0.15 }}
                    whileInView={{ opacity: 0.25 }}
                    whileHover={{ opacity: 0.4, scale: 1.05 }}
                    className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {law.number}
                  </motion.span>
                </div>

                <h3
                  className={`text-xl font-bold mb-1 relative ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  {law.title}
                </h3>
                <p className={`text-sm font-medium mb-3 relative ${isDark ? 'text-cyber-accent' : 'text-slate-accent'}`}>
                  {law.tagline}
                </p>
                <motion.p
                  initial={{ opacity: 0.7 }}
                  whileInView={{ opacity: 1 }}
                  className={`text-sm mb-4 italic relative ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  “{law.principle}”
                </motion.p>
                <p className={`text-sm mb-6 flex-grow relative ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {law.application}
                </p>

                <div className={`pt-4 border-t relative ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  {law.id === 'last-two-percent' ? (
                    <LastTwoPercentIllustration isDark={isDark} reducedMotion={reducedMotion} />
                  ) : (
                    <Illustration isDark={isDark} />
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mt-12 text-center max-w-2xl mx-auto border-l-4 pl-6 ${isDark ? 'border-cyber-accent text-gray-300' : 'border-slate-accent text-gray-700'}`}
        >
          <motion.p
            className="text-lg italic"
            animate={reducedMotion ? {} : { opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            “Great banking UI is not more features — it is the right features, finished with care.”
          </motion.p>
          <footer className={`text-sm mt-2 not-italic ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            — How I practice Design Thinking at Intellect and beyond
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}

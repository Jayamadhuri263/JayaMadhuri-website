import { motion } from 'framer-motion';
import { Code2, Cpu, Rocket, Shield } from 'lucide-react';
import { skills } from '../../data/experience';
import { useTheme } from '../../context/ThemeContext';

const highlights = [
  { icon: Shield, title: 'Bank-Grade Security', desc: 'Building UI components that meet enterprise security and compliance standards.' },
  { icon: Rocket, title: 'Performance First', desc: 'Core Web Vitals optimization, bundle splitting, and lazy loading strategies.' },
  { icon: Cpu, title: 'Microservices Integration', desc: 'Frontend architecture for eMACH.ai API Gateway patterns and service orchestration.' },
  { icon: Code2, title: 'Modern Frameworks', desc: 'React, Angular, and TypeScript — plus AI-assisted workflows for faster, safer delivery.' },
];

export default function About() {
  const { isDark } = useTheme();

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className={`mb-12 max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Frontend Developer with 4+ years crafting enterprise banking solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              I'm a Frontend Developer in the IT banking domain, specializing in building
              high-performance, scalable web applications for India's leading banks. From mobile-first
              mobility programs at IDFC First Bank and Bank of Baroda (maintenance and enhancements) to enterprise CBX platforms at
              Indian Bank, I bring deep expertise in modern JavaScript frameworks and microservices architecture.
            </p>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              My toolkit spans React, Angular, TypeScript, OpenShift container orchestration, Jenkins CI/CD
              pipelines, and AI-powered development workflows. I'm passionate about web performance optimization,
              clean architecture, and mentoring teams on frontend best practices.
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {skills.map((skill) => (
                <span key={skill} className="tag-pill">{skill}</span>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 glow-border group hover:scale-[1.02] transition-transform"
              >
                <item.icon size={24} className={`mb-3 ${isDark ? 'text-cyber-accent' : 'text-slate-accent'}`} />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

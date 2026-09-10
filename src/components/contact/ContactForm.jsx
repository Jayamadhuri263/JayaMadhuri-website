import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Linkedin, Github, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { contactInfo } from '../../data/contact';

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const { isDark } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setStatus(null);
    try {
      // EmailJS integration — replace with your service/template IDs
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

      if (serviceId === 'your_service_id') {
        await new Promise((r) => setTimeout(r, 1000));
        console.info('Demo mode — form data:', data);
        setStatus('success');
        reset();
        return;
      }

      const emailjs = await import('@emailjs/browser');

      // Matches EmailJS template "Contact Us": subject, name, email, time, message, from_*
      const templateParams = {
        name: data.name,
        from_name: data.name,
        email: data.email,
        from_email: data.email,
        reply_to: data.email,
        subject: data.subject,
        message: data.message,
        time: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
          timeZone: 'Asia/Kolkata',
        }),
      };

      await emailjs.default.send(serviceId, templateId, templateParams, publicKey);

      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border transition-colors ${
    isDark
      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-cyber-accent'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-slate-accent'
  } focus:outline-none focus:ring-1 ${isDark ? 'focus:ring-cyber-accent' : 'focus:ring-slate-accent'}`;

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Let's Connect</h2>
          <p
            className={`mb-12 max-w-full text-sm sm:text-base lg:whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Open to enterprise frontend opportunities, technical collaborations, and knowledge sharing
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: 'Location', value: contactInfo.location },
                  {
                    icon: Mail,
                    label: 'Email',
                    value: contactInfo.email,
                    href: `mailto:${contactInfo.email}`,
                  },
                  {
                    icon: Linkedin,
                    label: 'LinkedIn',
                    value: contactInfo.linkedin.label,
                    href: contactInfo.linkedin.url,
                  },
                  {
                    icon: Github,
                    label: 'GitHub',
                    value: contactInfo.github.label,
                    href: contactInfo.github.url,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-cyber-accent/10' : 'bg-slate-accent/10'}`}>
                      <Icon size={18} className={isDark ? 'text-cyber-accent' : 'text-slate-accent'} />
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className={`text-sm hover:underline ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                          {value}
                        </a>
                      ) : (
                        <p className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 glass-card p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                <input
                  {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
                  className={inputClass}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                  })}
                  type="email"
                  className={inputClass}
                  placeholder="you@email.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Subject</label>
              <input
                {...register('subject', { required: 'Subject is required' })}
                className={inputClass}
                placeholder="What's this about?"
              />
              {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
              <textarea
                {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Min 10 characters' } })}
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Tell me about your project or opportunity..."
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle size={16} /> Message sent successfully! Jaya Madhuri will get back to you soon, and she is so happy to hear from you!
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} /> Something went wrong. Please try again or email directly.
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto disabled:opacity-50">
              <Send size={18} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

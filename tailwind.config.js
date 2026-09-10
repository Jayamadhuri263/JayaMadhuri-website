/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0B0F17',
          card: '#161F30',
          accent: '#00F2FE',
          purple: '#7928CA',
          muted: '#8892A4',
        },
        slate: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          accent: '#0284C7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 242, 254, 0.15)',
        'glow-purple': '0 0 20px rgba(121, 40, 202, 0.2)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-dark': 'radial-gradient(at 40% 20%, rgba(121, 40, 202, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0, 242, 254, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(121, 40, 202, 0.08) 0px, transparent 50%)',
        'mesh-light': 'radial-gradient(at 40% 20%, rgba(2, 132, 199, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(2, 132, 199, 0.05) 0px, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

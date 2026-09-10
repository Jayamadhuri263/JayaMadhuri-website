import Navbar from './Navbar';
import Footer from './Footer';
import CyberScrollRail from './CyberScrollRail';
import ScrollToTop from './ScrollToTop';
import ScrollToHash from './ScrollToHash';
import { useTheme } from '../../context/ThemeContext';

export default function Layout({ children }) {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyber-accent focus:text-cyber-bg focus:font-semibold"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <ScrollToHash />
      <Navbar />
      <CyberScrollRail />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}

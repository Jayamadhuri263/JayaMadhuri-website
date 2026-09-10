import SEO from '../components/seo/SEO';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import DesignThinking from '../components/home/DesignThinking';
import Education from '../components/education/Education';
import Timeline from '../components/experience/Timeline';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import ContactForm from '../components/contact/ContactForm';
import AILearning from '../components/home/AILearning';
import SectionDivider from '../components/layout/SectionDivider';

export default function HomePage() {
  return (
    <>
      <SEO />
      <Hero />
      <SectionDivider label="About" />
      <About />
      <SectionDivider label="Experience" />
      <Timeline />
      <SectionDivider label="Projects" />
      <PortfolioGrid />
      <SectionDivider label="Education" />
      <Education />
      <SectionDivider label="Design" />
      <DesignThinking />
      <SectionDivider label="AI & Tools" />
      <AILearning />
      <SectionDivider label="Contact" />
      <ContactForm />
    </>
  );
}

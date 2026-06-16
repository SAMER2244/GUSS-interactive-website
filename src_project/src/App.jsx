import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import DetectiveActivity from './components/DetectiveActivity';
import SkillsMapCard from './components/SkillsMapCard';
import FeedbackSection from './components/FeedbackSection';
import DarkModeToggle from './components/DarkModeToggle';
import FloatingButtons from './components/FloatingButtons';
import SahrMascot from './components/SahrMascot';
import Footer from './components/Footer';

/**
 * App — Main application component
 * Manages the scroll-reveal logic.
 */
function App() {
  // Global scroll-reveal observer
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <DarkModeToggle />
      <HeroSection />
      <AboutSection />
      <DetectiveActivity />
      <SkillsMapCard />
      <FeedbackSection />
      <Footer />
      <FloatingButtons />
      <SahrMascot />
    </>
  );
}

export default App;

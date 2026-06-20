import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import DetectiveActivity from './components/DetectiveActivity';
import SkillsMapCard from './components/SkillsMapCard';
import WorkshopCard from './components/WorkshopCard';
import WorkshopPage from './components/WorkshopPage';
import FeedbackSection from './components/FeedbackSection';
import DarkModeToggle from './components/DarkModeToggle';
import FloatingButtons from './components/FloatingButtons';
import SahrMascot from './components/SahrMascot';
import Footer from './components/Footer';

/**
 * App — Main application component
 * Manages routing and scroll-reveal logic.
 */
function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  // Listen to hash changes for routing
  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash || '#/';
      const isLocked = new Date() < new Date('2026-06-20T14:00:00');
      
      if (isLocked && path.startsWith('#/workshop')) {
        // Force redirect to home if manual entry tried
        window.location.hash = '#/';
        setCurrentPath('#/');
      } else {
        setCurrentPath(path);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange(); // check initial hash on load

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global scroll-reveal observer
  useEffect(() => {
    // Only run reveal observer on home page
    if (currentPath !== '#/' && currentPath !== '') return;

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
  }, [currentPath]);

  // Render Workshop view
  const isLocked = new Date() < new Date('2026-06-20T14:00:00');
  if (currentPath.startsWith('#/workshop') && !isLocked) {
    return (
      <>
        <DarkModeToggle />
        <WorkshopPage />
        <Footer />
        <FloatingButtons />
      </>
    );
  }

  // Render Main Home view
  return (
    <>
      <DarkModeToggle />
      <HeroSection />
      <AboutSection />
      <DetectiveActivity />
      <SkillsMapCard />
      <WorkshopCard />
      <FeedbackSection />
      <Footer />
      <FloatingButtons />
      <SahrMascot />
    </>
  );
}

export default App;


import { useState, useEffect, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ChallengeSection from './components/ChallengeSection';
import ScenarioDetail from './components/ScenarioDetail';
import SkillsMapCard from './components/SkillsMapCard';
import FeedbackSection from './components/FeedbackSection';
import DarkModeToggle from './components/DarkModeToggle';
import FloatingButtons from './components/FloatingButtons';
import Footer from './components/Footer';

/**
 * App — Main application component
 * Manages the scenario selection state and scroll-reveal logic.
 */
function App() {
  const [selectedScenario, setSelectedScenario] = useState(null);

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
  }, [selectedScenario]); // Re-run when scenario changes to observe new elements

  const handleSelectScenario = useCallback((id) => {
    setSelectedScenario(id);
    // Wait for state update then scroll smoothly to the scenario details section
    setTimeout(() => {
      const detailSection = document.getElementById('scenario-detail');
      if (detailSection) {
        detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  const handleBackToChallenge = useCallback(() => {
    setSelectedScenario(null);
    // Wait for state update then scroll to challenge section
    setTimeout(() => {
      const challengeSection = document.getElementById('challenge');
      if (challengeSection) {
        challengeSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  return (
    <>
      <DarkModeToggle />
      <HeroSection />
      <AboutSection />

      {selectedScenario ? (
        <ScenarioDetail
          scenarioId={selectedScenario}
          onBack={handleBackToChallenge}
        />
      ) : (
        <ChallengeSection onSelectScenario={handleSelectScenario} />
      )}

      <SkillsMapCard />
      <FeedbackSection />
      <Footer />
      <FloatingButtons />
    </>
  );
}

export default App;

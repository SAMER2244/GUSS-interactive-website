import { useState, useEffect, useCallback } from 'react';
import ParticleBackground from './ParticleBackground';
import logoSrc from '../assets/logo.png';
import './HeroSection.css';

const TITLE_TEXT = 'مكتب المتابعة والتقييم';
const SUBTITLE_TEXT = 'الاتحاد العام لطلبة سوريا';
const CTA_TEXT = 'ابدأ التجربة ↓';
const CHAR_REVEAL_INTERVAL = 70; // ms per character

function ChevronDownIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function HeroSection() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [titleDone, setTitleDone] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  // Check reduced motion preference
  const [reducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // Typewriter effect for title
  useEffect(() => {
    if (reducedMotion) {
      setRevealedCount(TITLE_TEXT.length);
      setTitleDone(true);
      setSubtitleVisible(true);
      setCtaVisible(true);
      setArrowVisible(true);
      return;
    }

    // Start after logo animation (~1.3s)
    const startDelay = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setRevealedCount(count);
        if (count >= TITLE_TEXT.length) {
          clearInterval(interval);
          setTitleDone(true);
        }
      }, CHAR_REVEAL_INTERVAL);

      return () => clearInterval(interval);
    }, 1400);

    return () => clearTimeout(startDelay);
  }, [reducedMotion]);

  // Cascade subtitle → CTA → arrow after title
  useEffect(() => {
    if (!titleDone || reducedMotion) return;

    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 300);
    const ctaTimer = setTimeout(() => setCtaVisible(true), 900);
    const arrowTimer = setTimeout(() => setArrowVisible(true), 1400);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(ctaTimer);
      clearTimeout(arrowTimer);
    };
  }, [titleDone, reducedMotion]);

  const handleCtaClick = useCallback((e) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="hero-section" id="hero" aria-label="القسم الرئيسي">
      <ParticleBackground />

      <div className="hero-content">
        <div className="hero-logo-wrapper">
          <img
            src={logoSrc}
            alt="شعار مكتب المتابعة والتقييم"
            className={`hero-logo${logoLoaded ? ' visible' : ''}`}
            onLoad={() => setLogoLoaded(true)}
            width="180"
            height="180"
          />
        </div>

        <h1 className="hero-title" aria-label={TITLE_TEXT}>
          {TITLE_TEXT.split('').map((char, i) => (
            <span
              key={i}
              className={`hero-title-char${i < revealedCount ? ' revealed' : ''}`}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
        </h1>

        <div className={`hero-slogan${subtitleVisible ? ' visible' : ''}`}>
          <span className="hero-slogan-word">قيم</span>
          <span className="hero-slogan-dot" aria-hidden="true">•</span>
          <span className="hero-slogan-word">طور</span>
          <span className="hero-slogan-dot" aria-hidden="true">•</span>
          <span className="hero-slogan-word">أثّر</span>
        </div>

        <p className={`hero-subtitle${subtitleVisible ? ' visible' : ''}`}>
          {SUBTITLE_TEXT}
        </p>
        
        <button
          className={`hero-cta${ctaVisible ? ' visible' : ''}`}
          onClick={handleCtaClick}
          type="button"
        >
          {CTA_TEXT}
        </button>
      </div>

      <div className={`hero-arrow${arrowVisible ? ' visible' : ''}`} aria-hidden="true">
        <ChevronDownIcon className="hero-arrow-icon" />
      </div>
    </section>
  );
}

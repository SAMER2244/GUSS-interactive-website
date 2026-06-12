import { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const PARTICLE_COUNT = 40;
const GOLD_R = 212;
const GOLD_G = 168;
const GOLD_B = 67;

function createParticle(canvasWidth, canvasHeight) {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    radius: Math.random() * 2 + 1,
    opacity: Math.random() * 0.4 + 0.2,
    speed: Math.random() * 0.6 + 0.2,
    sineOffset: Math.random() * Math.PI * 2,
    sineAmplitude: Math.random() * 0.5 + 0.3,
    sineFrequency: Math.random() * 0.01 + 0.005,
  };
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationIdRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect() || {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      const rect = canvas.parentElement?.getBoundingClientRect() || {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(rect.width, rect.height)
      );
    }

    function animate() {
      const rect = canvas.parentElement?.getBoundingClientRect() || {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);
      timeRef.current += 1;

      for (const p of particlesRef.current) {
        // Move upward
        if (!prefersReducedMotion) {
          p.y -= p.speed;
          p.x += Math.sin(timeRef.current * p.sineFrequency + p.sineOffset) * p.sineAmplitude;
        }

        // Wrap around
        if (p.y < -p.radius * 2) {
          p.y = h + p.radius * 2;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // Draw with glow
        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${GOLD_R}, ${GOLD_G}, ${GOLD_B}, ${p.opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD_R}, ${GOLD_G}, ${GOLD_B}, ${p.opacity})`;
        ctx.fill();
        ctx.restore();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
    });

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

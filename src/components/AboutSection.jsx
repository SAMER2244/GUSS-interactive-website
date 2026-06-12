import { useState, useEffect, useRef, useCallback } from 'react';
import './AboutSection.css';

const FEATURES = [
  { icon: '📊', title: 'رصد الأداء', desc: 'متابعة مستمرة لأداء جميع المشاريع' },
  { icon: '🔍', title: 'تحليل البيانات', desc: 'تحليل دقيق للمؤشرات الميدانية' },
  { icon: '📋', title: 'تقارير تطويرية', desc: 'تحويل الملاحظات لتقارير رصينة' },
  { icon: '⚖️', title: 'الشفافية والمساءلة', desc: 'ضمان أعلى معايير النزاهة' },
];


function FeatureCard({ icon, title, desc, index }) {
  return (
    <article className={`about-feature reveal reveal-delay-${index + 1}`}>
      <div className="about-feature__icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="about-feature__title">{title}</h3>
      <p className="about-feature__desc">{desc}</p>
    </article>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);

  // Reveal animation observer
  const setupRevealObserver = useCallback(() => {
    const elements = sectionRef.current?.querySelectorAll('.reveal');
    if (!elements?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanupReveal = setupRevealObserver();

    return () => {
      cleanupReveal?.();
    };
  }, [setupRevealObserver]);

  return (
    <section id="about" className="about section" ref={sectionRef} aria-labelledby="about-title">
      <div className="about__container container">
        {/* Header */}
        <header className="about__header reveal">
          <h2 id="about-title" className="section-title">من نحن؟</h2>
          <p className="section-subtitle">
            مكتب المتابعة والتقييم — عين الاتحاد الساهرة
          </p>
        </header>

        {/* Glass Description Card */}
        <div className="about__glass-card reveal">
          <div className="about__glass-inner">
            <p className="about__description">
              مكتب المتابعة والتقييم هو الجهة الرقابية والتحليلية المستقلة المسؤولة عن متابعة
              وتقييم أداء جميع المكاتب، اللجان، المشاريع والمبادرات داخل الاتحاد. يتلخص دور
              المكتب في رصد الأداء المؤسسي، تحليل البيانات الميدانية بدقة، وتحويل الملاحظات
              والمؤشرات المبعثرة إلى تقارير تطويرية رصينة تضمن تحقيق أعلى مستويات الشفافية،
              المساءلة، والاستدامة للمشاريع الطلابية والتطوعية.
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="about__features" role="list">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>


      </div>
    </section>
  );
}

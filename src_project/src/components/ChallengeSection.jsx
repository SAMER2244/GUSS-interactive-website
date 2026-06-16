import { useCallback } from 'react';
import './ChallengeSection.css';

/**
 * ChallengeSection — تحدي المقيم الذكي
 * Card selection for choosing a scenario.
 *
 * @param {{ onSelectScenario: (id: number) => void }} props
 */
function ChallengeSection({ onSelectScenario }) {
  const cards = [
    {
      id: 1,
      icon: '💻',
      title: 'مبادرة تكنو-شباب',
      subtitle: 'للتأهيل الرقمي',
      brief:
        'مبادرة تطوعية لتدريب 150 طالباً على مهارات سوق العمل الرقمي',
    },
    {
      id: 2,
      icon: '📚',
      title: 'معرض الكتاب الطلابي',
      subtitle: 'السنوي',
      brief:
        'فعالية ثقافية كبرى لتوفير الكتب للطلاب بأسعار مخفضة',
    },
  ];

  const handleCardClick = useCallback(
    (id) => {
      onSelectScenario(id);
    },
    [onSelectScenario],
  );

  const handleKeyDown = useCallback(
    (e, id) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelectScenario(id);
      }
    },
    [onSelectScenario],
  );

  return (
    <section id="challenge" className="challenge-section section">
      <div className="reveal">
        <h2 className="challenge-section__title">تحدي المقيم الذكي</h2>
        <p className="challenge-section__subtitle">
          اختر القضية والمشروع الذي ترغب في ممارسة دورك الرقابي عليه، واثبت
          لنا حسك النقدي!
        </p>
      </div>

      <div className="challenge-section__cards reveal">
        {cards.map((card, index) => (
          <article
            key={card.id}
            className={`challenge-card reveal-delay-${index + 1}`}
            role="button"
            tabIndex={0}
            aria-label={`${card.title} – ${card.subtitle}`}
            onClick={() => handleCardClick(card.id)}
            onKeyDown={(e) => handleKeyDown(e, card.id)}
          >
            <div className="challenge-card__inner">
              <span className="challenge-card__icon" aria-hidden="true">
                {card.icon}
              </span>
              <h3 className="challenge-card__title">{card.title}</h3>
              <p className="challenge-card__subtitle">{card.subtitle}</p>
              <p className="challenge-card__brief">{card.brief}</p>
              <span className="challenge-card__cta" aria-hidden="true">
                اختر هذا التحدي
                <span className="challenge-card__cta-arrow">←</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ChallengeSection;

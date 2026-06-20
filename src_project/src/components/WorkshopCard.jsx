import { useState, useEffect } from 'react';
import './WorkshopCard.css';

const TARGET_TIME = new Date('2026-06-20T14:00:00');

function WorkshopCard() {
  const [isLocked, setIsLocked] = useState(new Date() < TARGET_TIME);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [shake, setShake] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = TARGET_TIME.getTime() - now.getTime();

      if (diff <= 0) {
        setIsLocked(false);
        setShowError(false);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = () => {
    if (isLocked) {
      setShake(true);
      setShowError(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setShowError(false), 4000);
    } else {
      window.location.hash = '#/workshop';
    }
  };

  return (
    <section id="workshop-trigger" className="section workshop-card-section">
      <div 
        className={`workshop-card gradient-border reveal ${shake ? 'shake-animation' : ''} ${isLocked ? 'card-locked' : 'card-unlocked'}`}
        onClick={handleCardClick}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCardClick();
          }
        }}
        aria-label="ورشة عمل المكاتب: تحدي المقيم الذكي"
      >
        <div className="workshop-card__inner">
          
          {/* Badge indicator */}
          <div className={`workshop-card__badge-status ${isLocked ? 'badge-locked' : 'badge-unlocked'}`}>
            {isLocked ? '🔒 مغلق مؤقتاً | يفتح الساعة 14:00' : '⚡ مفتوح الآن | تحدي المقيم الذكي'}
          </div>

          {/* SVG Illustration */}
          <div className="workshop-card__illustration" aria-hidden="true">
            <svg
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="workshop-card__svg"
            >
              <circle cx="60" cy="60" r="50" stroke={isLocked ? 'var(--color-text-muted)' : 'var(--color-gold)'} strokeWidth="2" strokeDasharray="5 5" className={isLocked ? '' : 'pulse-circle'} />
              <rect x="35" y="30" width="50" height="60" rx="6" fill={isLocked ? 'var(--color-cream-dark)' : 'var(--color-forest-medium)'} stroke={isLocked ? 'var(--color-text-muted)' : 'var(--color-gold)'} strokeWidth="2" />
              <rect x="47" y="24" width="26" height="10" rx="3" fill={isLocked ? 'var(--color-text-muted)' : 'var(--color-gold)'} />
              
              {isLocked ? (
                // Padlock path
                <path d="M50 65v15h20v-15H50zm10-12a8 8 0 00-8 8v4h16v-4a8 8 0 00-8-8z" fill="var(--color-text-muted)" />
              ) : (
                <>
                  <line x1="45" y1="46" x2="75" y2="46" stroke="var(--color-white)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  <line x1="45" y1="56" x2="75" y2="56" stroke="var(--color-white)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  <line x1="45" y1="66" x2="65" y2="66" stroke="var(--color-white)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  <path d="M45 80l6 6 14-14" stroke="var(--color-gold-light)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
            </svg>
          </div>

          <h2 className="workshop-card__title">
            <span className="workshop-card__emoji" aria-hidden="true">{isLocked ? '🔒' : '🏆'}</span>
            ورشة عمل المكاتب: تحدي المقيم الذكي
          </h2>

          <p className="workshop-card__description">
            {isLocked ? (
              <>
                هذه الفقرة مخصصة لورشة عمل المكاتب ضمن <strong>ملتقى صناع الأثر</strong>. 
                سيتم فتح التحدي والسيناريوهات الرقابية في تمام الساعة <strong>14:00 ظهراً</strong>.
                <br />
                <span className="workshop-card__hype-text">
                  استعدوا يا قادة! 🚀 اجمعوا فريقكم وجهزوا عقولكم النقدية؛ ستواجهون سيناريوهات لمشاريع حقيقية وتكشفون ثغراتها الإدارية والمالية. هل لديكم الشجاعة والسرعة لحل اللغز وإصدار تقريركم في 10 دقائق فقط؟
                </span>
              </>
            ) : (
              <>
                اجمع فريقك الآن! خوضوا معاً غمار تجربة الرقابة والتقييم الحقيقية ضمن <strong>ملتقى صناع الأثر</strong>. 
                اقرأوا سيناريو المشروع المعروض، واكتشفوا الثغرات الإدارية والمالية واللوجستية، 
                ثم صيغوا تقريركم الرقابي الاحترافي في غضون 10 دقائق.
              </>
            )}
          </p>

          {/* Countdown Widget */}
          {isLocked && (
            <div className="workshop-countdown">
              <span className="countdown-label">تبقّى على انطلاق التحدي:</span>
              <div className="countdown-boxes">
                <div className="countdown-box">
                  <span className="num">{timeLeft.hours}</span>
                  <span className="unit">ساعة</span>
                </div>
                <span className="separator">:</span>
                <div className="countdown-box">
                  <span className="num">{timeLeft.minutes}</span>
                  <span className="unit">دقيقة</span>
                </div>
                <span className="separator">:</span>
                <div className="countdown-box">
                  <span className="num">{timeLeft.seconds}</span>
                  <span className="unit">ثانية</span>
                </div>
              </div>
            </div>
          )}

          {/* Action button */}
          <button 
            type="button" 
            className={`workshop-card__btn ${isLocked ? 'btn-locked' : 'btn-glow'}`}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            <span>{isLocked ? 'مغلق حتى انطلاق الورشة ⏳' : 'دخول الورشة التفاعلية'}</span>
            {!isLocked && <span className="workshop-card__btn-arrow" aria-hidden="true">←</span>}
          </button>

          {/* Toast / Error notification inside the card */}
          {showError && (
            <div className="workshop-card__error-toast" role="alert">
              ⚠️ عذراً! لم تبدأ الورشة بعد. يرجى الانتظار حتى انتهاء العد التنازلي والانطلاق في تمام الساعة 14:00!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WorkshopCard;

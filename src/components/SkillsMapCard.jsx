import './SkillsMapCard.css';

function SkillsMapCard() {
  return (
    <section id="skills-map" className="section skills-map-section">
      <div className="skills-map-card gradient-border reveal">
        <div className="skills-map-card__inner">
          {/* Decorative map SVG */}
          <div className="skills-map-card__illustration" aria-hidden="true">
            <svg
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="skills-map-card__svg"
            >
              {/* Map outline */}
              <circle cx="60" cy="60" r="54" stroke="var(--color-gold)" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
              <circle cx="60" cy="60" r="38" stroke="var(--color-forest-light)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />
              {/* Location pins */}
              <g>
                <path d="M60 28c-5.5 0-10 4.5-10 10 0 7.5 10 18 10 18s10-10.5 10-18c0-5.5-4.5-10-10-10z" fill="var(--color-gold)" opacity="0.9" />
                <circle cx="60" cy="38" r="4" fill="var(--color-white)" />
              </g>
              <g opacity="0.6">
                <path d="M35 58c-3.3 0-6 2.7-6 6 0 4.5 6 10.8 6 10.8s6-6.3 6-10.8c0-3.3-2.7-6-6-6z" fill="var(--color-forest-light)" />
                <circle cx="35" cy="64" r="2.5" fill="var(--color-white)" />
              </g>
              <g opacity="0.6">
                <path d="M85 50c-3.3 0-6 2.7-6 6 0 4.5 6 10.8 6 10.8s6-6.3 6-10.8c0-3.3-2.7-6-6-6z" fill="var(--color-forest-light)" />
                <circle cx="85" cy="56" r="2.5" fill="var(--color-white)" />
              </g>
              {/* Connection lines */}
              <line x1="60" y1="46" x2="38" y2="60" stroke="var(--color-gold-light)" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
              <line x1="60" y1="46" x2="82" y2="52" stroke="var(--color-gold-light)" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
            </svg>
          </div>

          <h2 className="skills-map-card__title">
            <span className="skills-map-card__emoji" aria-hidden="true">🗺️</span>
            خريطة مهارات سوريا الجغرافية
          </h2>

          <p className="skills-map-card__description">
            شاركنا طموحك! اختر ورقة ملونة تعبّر عن مجالك، اكتب مهارة تودّ أن تطوّرها أو
            تقدّمها، وثبّتها على محافظتك على الخريطة الجدارية أمامك بالبوث. دع بصمتك
            تبدأ من هنا!
          </p>

          <span className="skills-map-card__badge">
            <span aria-hidden="true">📍</span>
            النشاط متاح في البوث حصرياً
          </span>
        </div>
      </div>
    </section>
  );
}

export default SkillsMapCard;

import './FeedbackSection.css';

const FEEDBACK_ITEMS = [
  {
    id: 'survey',
    icon: '📊',
    title: 'الاستبيان السريع',
    desc: 'شاركنا تقييمك السريع لأداء البوث ومخرجات الفعالية لنستمر في التطوير الممنهج.',
    btnText: 'ابدأ الاستبيان السريع',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfqy2IiGcGDbVv0MDB3AKHhvFsZOt6CuY9Iob96vLuh9DDvZw/viewform?usp=publish-editor',
    theme: 'survey'
  },
  {
    id: 'suggestions',
    icon: '💡',
    title: 'صندوق الاقتراحات',
    desc: 'لديك ملاحظة تطويرية أو فكرة مشروع؟ ضع بصمتك الإدارية هنا وساعدنا على التحسين.',
    btnText: 'شاركنا اقتراحك',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfHntZW8s4Tzm5KZMbrL1Niuv-CqC6_RtrE7SJnMqiHX2u0NA/viewform?usp=publish-editor',
    theme: 'suggestions'
  }
];

export default function FeedbackSection() {
  const handleItemClick = (href) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="feedback" className="feedback-section section">
      <div className="container feedback-container reveal">
        <header className="feedback-header">
          <h2 className="section-title">شاركنا التقييم والأثر</h2>
          <p className="section-subtitle">
            رأيك يمثل قيمة مضافة حقيقية لنا. مساهمتك في تعبئة الاستبيان أو تقديم الاقتراحات تدعم تحقيق معايير الجودة والشفافية.
          </p>
        </header>

        <div className="feedback-grid">
          {FEEDBACK_ITEMS.map((item) => (
            <article key={item.id} className={`feedback-card feedback-card--${item.theme}`}>
              <div className="feedback-card__glow" aria-hidden="true" />
              <div className="feedback-card__inner">
                <span className="feedback-card__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="feedback-card__title">{item.title}</h3>
                <p className="feedback-card__desc">{item.desc}</p>
                <button
                  type="button"
                  className="feedback-card__btn"
                  onClick={() => handleItemClick(item.href)}
                >
                  {item.btnText}
                  <span className="btn-arrow" aria-hidden="true">←</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import './ScenarioDetail.css';

/* ── Scenario data ── */
const scenarios = {
  1: {
    title: 'مبادرة تكنو-شباب للتأهيل الرقمي',
    icon: '💻',
    welcome:
      'هل تمتلك عيناً رقابية ثاقبة وحساً نقدياً؟ أمامك الآن سيناريو حقيقي لمشروع طلابي تم تنفيذه. المشروع يبدو ناجحاً جداً في الظاهر، لكنه يحتوي على فجوات أثر وثغرات خفية كادت أن تودي به إلى الفشل! اقرأ المعطيات بذكاء، وحدد مكامن الخلل، ثم التفت للمتحدث الرسمي في البوث لتناقشه في حلك وتربح ختم الإنجاز!',
    tabs: [
      {
        icon: '📋',
        label: 'وصف المشروع',
        content:
          'تعتبر مبادرة تكنو-شباب للتأهيل الرقمي مبادرة تطوعية تهدف إلى تدريب 150 طالباً جامعياً على مهارات سوق العمل الرقمي الأساسية خلال فترة زمنية محددة بـ 3 أسابيع متواصلة. وقد حقق حفل الافتتاح صدى إعلامياً واسعاً وحضره شخصيات اعتبارية هامة، كما تجاوز عدد المتقدمين للمبادرة 500 طالب، تم قبول 150 منهم بناءً على فرز أولي، وتم تأمين قاعة تدريبية مجهزة مجاناً لصالح المبادرة في مركز المدينة.',
      },
      {
        icon: '👥',
        label: 'الجانب الإداري',
        content:
          'تألف الفريق التنظيمي للمبادرة من 5 متطوعين فقط، تولى أحدهم إدارة المشروع، والتنسيق اللوجستي، والتواصل مع المدربين في آن واحد لضمان سرعة اتخاذ القرار. تم الاعتماد على مدربين محترفين وافقوا على تقديم الورشات تطوعاً وبشكل مجاني بالكامل دعماً للطلاب دون وجود عقود إلزامية.',
      },
      {
        icon: '💰',
        label: 'الجانب المالي',
        content:
          'حصلت المبادرة على رعاية مالية محدودة لتغطية ضيافة حفل الافتتاح والختام وطباعة الشهادات الكرتونية. تم صرف الميزانية بالكامل في الأسبوع الأول لتأمين حفل افتتاح فاخر يليق بالحضور الاعتباري، وتم تأجيل مستلزمات حفل الختام والشهادات للأسبوع الأخير على أمل الحصول على دعم إضافي أو تبرعات طارئة.',
      },
      {
        icon: '🔧',
        label: 'الجانب اللوجستي',
        content:
          'تم تحديد جدول التدريب بمعدل 4 ساعات يومياً، من الساعة 2 ظهراً وحتى 6 مساءً، طيلة أيام الأسبوع الثلاثة. تقع القاعة التدريبية المستضافة في مبنى تجاري بوسط المدينة.',
      },
    ],
  },
  2: {
    title: 'معرض الكتاب الطلابي السنوي',
    icon: '📚',
    welcome:
      'اقرأ تفاصيل المعرض التشغيلية، واكتشف الخلل اللوجستي والتنظيمي المخفي، ثم توجه فوراً للمتحدث الرسمي في البوث لمناقشة تحليلك الإداري!',
    tabs: [
      {
        icon: '📋',
        label: 'وصف المشروع',
        content:
          'معرض الكتاب الطلابي السنوي هو فعالية ثقافية كبرى ينظمها الاتحاد داخل الحرم الجامعي لمدة 5 أيام متواصلة، تهدف إلى توفير الكتب الأكاديمية والثقافية للطلاب بأسعار مخفضة، ويستهدف المعرض حوالي 2000 زائر يومياً. تم التعاقد مع 15 دار نشر وتأمين أكثر من 5000 عنوان كتاب متنوع، وتم تصميم حملة إعلانية بصرية ممتازة ومنشورات جذابة لاقت تفاعلاً ضخماً، كما حظي الافتتاح برضا كبير من عمادة الشؤون الطلابية.',
      },
      {
        icon: '🏛️',
        label: 'إدارة المساحة',
        content:
          'تم اختيار صالة الأنشطة الرياضية المغلقة بالجامعة لإقامة المعرض، وتم تخصيص بوابة واحدة رئيسية للمبنى تستخدم لدخول الزوار وخروجهم في نفس الوقت لسهولة ضبط الأمن ومراقبة الالتزام. تم توزيع طاولات دور النشر بشكل متقارب جداً لاستغلال المساحة المتاحة وعرض أكبر عدد ممكن من الكتب داخل الصالة.',
      },
      {
        icon: '💳',
        label: 'التنظيم الرقمي والمالي',
        content:
          'يعتمد المعرض نظام الدفع النقدي (الكاش) بشكل كامل عند طاولات دور النشر مباشرة لتسريع العمليات وتجنب طوابير المحاسبة المركزية. وتم توفير رابط تسجيل رقمي مسبق للزوار للحصول على بطاقة دخول مجانية، ولكن تم السماح أيضاً بالدخول المباشر لمن لم يسجل منعاً لإحراج الطلاب عند البوابة الرسمية.',
      },
      {
        icon: '🤝',
        label: 'الكوادر والدعم',
        content:
          'تم توزيع 30 متطوعاً على أجنحة المعرض بالتساوي طوال ساعات العمل من 9 صباحاً وحتى 5 مساءً دون فترات راحة مجدولة نظراً لكثافة الحضور، وتم إيكال مهمة الإسعافات الأولية والدعم الفني والدفاع المدني للجنة مشتركة من 3 متطوعين يتواجدون في غرفة الإدارة الخلفية للمبنى لطلبهم عند الطوارئ.',
      },
    ],
  },
};

/**
 * ScenarioDetail — Detailed tabbed view for a selected scenario.
 *
 * @param {{ scenarioId: 1 | 2, onBack: () => void }} props
 */
function ScenarioDetail({ scenarioId, onBack }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isEntering, setIsEntering] = useState(true);
  const [tabTransition, setTabTransition] = useState(false);

  const scenario = scenarios[scenarioId];

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  // Reset tab when scenario changes
  useEffect(() => {
    setActiveTab(0);
  }, [scenarioId]);

  const handleTabChange = (index) => {
    if (index === activeTab) return;
    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(index);
      setTabTransition(false);
    }, 200);
  };

  if (!scenario) return null;

  return (
    <section
      id="scenario-detail"
      className={`scenario-detail section ${isEntering ? 'scenario-detail--entering' : ''}`}
    >
      {/* Back button */}
      <button
        className="scenario-detail__back"
        onClick={onBack}
        aria-label="العودة لاختيار تحدي آخر"
      >
        <span className="scenario-detail__back-arrow">→</span>
        العودة لاختيار تحدي آخر
      </button>

      {/* Scenario title */}
      <div className="scenario-detail__header">
        <span className="scenario-detail__icon" aria-hidden="true">
          {scenario.icon}
        </span>
        <h2 className="scenario-detail__title">{scenario.title}</h2>
      </div>

      {/* Welcome banner */}
      <div className="scenario-detail__welcome" role="alert">
        <div className="scenario-detail__welcome-icon" aria-hidden="true">🔍</div>
        <p>{scenario.welcome}</p>
      </div>

      {/* Stepper progress indicator */}
      <div className="scenario-stepper" role="tablist" aria-label="أقسام التحدي">
        {scenario.tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            className={`scenario-step ${activeTab === index ? 'scenario-step--active' : ''} ${index < activeTab ? 'scenario-step--completed' : ''}`}
            onClick={() => handleTabChange(index)}
          >
            <span className="scenario-step__icon" aria-hidden="true">{tab.icon}</span>
            <span className="scenario-step__label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Carousel Card */}
      <div className="scenario-carousel">
        <div
          className={`scenario-card-detail ${tabTransition ? 'scenario-card-detail--transitioning' : ''}`}
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          <div className="scenario-card-detail__header">
            <span className="scenario-card-detail__icon" aria-hidden="true">
              {scenario.tabs[activeTab].icon}
            </span>
            <h3 className="scenario-card-detail__title">{scenario.tabs[activeTab].label}</h3>
          </div>

          <div className="scenario-card-detail__body">
            <p>{scenario.tabs[activeTab].content}</p>
          </div>

          <div className="scenario-card-detail__footer">
            <button
              type="button"
              className="scenario-nav-btn"
              disabled={activeTab === 0}
              onClick={() => handleTabChange(activeTab - 1)}
              aria-label="القسم السابق"
            >
              <span className="nav-arrow" aria-hidden="true">→</span>
              السابق
            </button>

            <div className="scenario-dots">
              {scenario.tabs.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`scenario-dot ${activeTab === index ? 'scenario-dot--active' : ''}`}
                  onClick={() => handleTabChange(index)}
                  aria-label={`الذهاب إلى القسم ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="scenario-nav-btn scenario-nav-btn--primary"
              disabled={activeTab === scenario.tabs.length - 1}
              onClick={() => handleTabChange(activeTab + 1)}
              aria-label="القسم التالي"
            >
              التالي
              <span className="nav-arrow" aria-hidden="true">←</span>
            </button>
          </div>
        </div>
      </div>

      {/* Motivational banner */}
      <div className="scenario-detail__motivation">
        <span className="scenario-detail__motivation-badge" aria-hidden="true">🏅</span>
        <p>
          هل اكتشفت الثغرات؟ توجه الآن للمتحدث الرسمي في البوث لمناقشة تحليلك واربح ختم الإنجاز!
        </p>
      </div>
    </section>
  );
}

export default ScenarioDetail;

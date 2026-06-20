import { useState, useEffect, useRef } from 'react';
import './WorkshopPage.css';

// Scenarios data from DOCX
const SCENARIOS = [
  {
    id: 'techno-youth',
    title: 'الخيار الأول: مبادرة تكنو-شباب للتأهيل الرقمي',
    emoji: '💻',
    sections: [
      {
        heading: 'أولاً — وصف المشروع والنتائج الظاهرة',
        content: [
          'مبادرة تكنو-شباب للتأهيل الرقمي مبادرة تطوعية تهدف إلى تدريب 150 طالباً جامعياً على مهارات سوق العمل الرقمي الأساسية خلال فترة زمنية محددة بـ3 أسابيع متواصلة.',
          'النتائج الظاهرة:',
          '• حقّق حفل الافتتاح صدىً إعلامياً واسعاً وحضره شخصيات اعتبارية هامة.',
          '• تجاوز عدد المتقدمين 500 طالب، تم قبول 150 منهم بناءً على فرز أولي.',
          '• تم تأمين قاعة تدريبية مجهزة مجاناً في مركز المدينة.',
          '• حصلت المبادرة على إشادات واسعة عبر منصات التواصل الاجتماعي.',
          '• أُنجزت الدورة في موعدها دون تأجيل رسمي معلن.'
        ]
      },
      {
        heading: 'ثانياً — الجانب الإداري والكوادر',
        content: [
          '• تألّف الفريق التنظيمي من 5 متطوعين فقط، تولّى أحدهم إدارة المشروع والتنسيق اللوجستي والتواصل مع المدربين في آنٍ واحد — وذلك لضمان سرعة اتخاذ القرار وفق تبرير الفريق.',
          '• بالنسبة للمدربين، تم الاعتماد على مدربين محترفين وافقوا على تقديم الورشات تطوعاً بالكامل دعماً للطلاب، دون وجود أي عقود إلزامية أو اتفاقيات رسمية موثّقة.',
          '• لم يُحدَّد أي منهجية رسمية لتوثيق القرارات التشغيلية أو التسليمات بين أعضاء الفريق، واعتُمد التواصل الشفهي وتطبيقات المراسلة الفورية بديلاً عن المحاضر والسجلات.'
        ]
      },
      {
        heading: 'ثالثاً — الجانب المالي والتدفقات',
        content: [
          '• حصلت المبادرة على رعاية مالية محدودة لتغطية ضيافة حفل الافتتاح والختام وطباعة الشهادات.',
          '• تم صرف الميزانية بالكامل في الأسبوع الأول لتأمين حفل افتتاح فاخر يليق بالحضور الاعتباري.',
          '• تم تأجيل مستلزمات حفل الختام والشهادات للأسبوع الأخير، على أمل الحصول على دعم إضافي أو تبرعات طارئة لم تُحدَّد مصادرها مسبقاً.',
          '• لا يوجد كشف حساب مفصّل أو تقرير مالي يوثّق بنود الإنفاق الفعلي، ولا آلية لمقارنة الإنفاق الفعلي بالمخطط.'
        ]
      },
      {
        heading: 'رابعاً — الجانب اللوجستي والبيئة التشغيلية',
        content: [
          '• تم تحديد جدول التدريب بمعدل 4 ساعات يومياً، من الساعة 2 ظهراً حتى 6 مساءً، طيلة أيام الأسبوع الثلاثة بما فيها أيام الامتحانات الجامعية الجزئية لبعض الكليات.',
          '• تقع القاعة التدريبية في مبنى تجاري بوسط المدينة، يستغرق الوصول إليه بالمواصلات العامة ما بين 40 و60 دقيقة من أغلب الأحياء الجامعية.',
          '• لم يُجرَ أي استطلاع مسبق لمعرفة الأوقات الملائمة للمشاركين قبل تحديد الجدول الزمني.',
          '• لم تُوضَع آلية واضحة لقياس اكتساب المهارات الفعلية لدى المشاركين في نهاية البرنامج.'
        ]
      }
    ]
  },
  {
    id: 'book-fair',
    title: 'الخيار الثاني: معرض الكتاب الطلابي السنوي',
    emoji: '📚',
    sections: [
      {
        heading: 'أولاً — وصف الفعالية والنتائج الظاهرة',
        content: [
          'معرض الكتاب الطلابي السنوي فعالية ثقافية كبرى ينظّمها الاتحاد داخل الحرم الجامعي لمدة 5 أيام متواصلة، تهدف إلى توفير الكتب الأكاديمية والثقافية للطلاب بأسعار مخفّضة.',
          'النتائج الظاهرة:',
          '• تم التعاقد مع 15 دار نشر وتأمين أكثر من 5000 عنوان كتاب متنوع.',
          '• تصميم حملة إعلانية بصرية ممتازة لاقت تفاعلاً ضخماً على منصات التواصل.',
          '• حظي الافتتاح برضا كبير من عمادة الشؤون الطلابية.',
          '• الهدف المُعلَن: استقطاب حوالي 2000 زائر يومياً.'
        ]
      },
      {
        heading: 'ثانياً — إدارة المساحة والحشود',
        content: [
          '• تم اختيار صالة الأنشطة الرياضية المغلقة بالجامعة لإقامة المعرض.',
          '• تم تخصيص بوابة واحدة رئيسية للمبنى تستخدم لدخول الزوار وخروجهم في الوقت ذاته، وذلك لـ«سهولة ضبط الأمن ومراقبة الالتزام» وفق تبرير اللجنة المنظِّمة.',
          '• تم توزيع طاولات دور النشر بشكل متقارب جداً لاستغلال المساحة المتاحة وعرض أكبر عدد ممكن من الكتب، دون مراعاة معايير ممرات السلامة والإخلاء.',
          '• لا توجد خطة طارات موثّقة لسيناريوهات الازدحام الشديد أو الحوادث المفاجئة.'
        ]
      },
      {
        heading: 'ثالثاً — التنظيم الرقمي والمالي',
        content: [
          '• يعتمد المعرض نظام الدفع النقدي (الكاش) بشكل كامل عند طاولات دور النشر مباشرةً، لتسريع العمليات وتجنّب طوابير المحاسبة المركزية.',
          '• تم توفير رابط تسجيل رقمي مسبق للزوار للحصول على بطاقة دخول مجانية، غير أنه تم السماح بالدخول المباشر لمن لم يسجّل، منعاً لـ«إحراج الطلاب عند البوابة» وفق تعبير اللجنة.',
          '• لا توجد بيانات حقيقية عن أعداد الحضور الفعلي لكل يوم، مما يجعل التقييم اللاحق مبنياً على تقديرات غير موثّقة.',
          '• لا يوجد توثيق للعمليات المالية بين دور النشر والاتحاد، وتعتمد عمليات الحساب على تقارير دور النشر بشكل أحادي دون تدقيق مستقل.'
        ]
      },
      {
        heading: 'رابعاً — الكوادر والدعم اللوجستي',
        content: [
          '• تم توزيع 30 متطوعاً على أجنحة المعرض بالتساوي طوال ساعات العمل من 9 صباحاً حتى 5 مساءً، دون فترات راحة مجدولة نظراً لـ«كثافة الحضور».',
          '• أُوكلت مهمة الإسعافات الأولية والدعم الفني والدفاع المدني للجنة مشتركة من 3 متطوعين فقط يتواجدون في غرفة الإدارة الخلفية، يُستدعَون عند الطوارئ فقط دون دوريات استباقية.',
          '• لا توجد آلية اتصال طارئة واضحة موزّعة على المتطوعين الميدانيين لتسريع الاستجابة عند الحوادث.'
        ]
      }
    ]
  },
  {
    id: 'camp',
    title: 'الخيار الثالث: مخيّم القيادة الطلابية الصيفي',
    emoji: '⛺',
    sections: [
      {
        heading: 'أولاً — وصف المخيّم والنتائج الظاهرة',
        content: [
          'مخيّم القيادة الطلابية الصيفي برنامج سنوي ينظّمه الاتحاد لمدة 7 أيام متواصلة في منطقة ريفية خارج المدينة، ويهدف إلى تنمية مهارات القيادة والعمل الجماعي والتفكير الاستراتيجي لدى 60 طالباً من مختلف الكليات.',
          'النتائج الظاهرة:',
          '• تجاوز عدد المتقدمين 220 طالباً، ما يعكس اهتماماً واسعاً بالبرنامج.',
          '• تم اختيار 60 مشاركاً نهائياً عبر مقابلات شخصية أجراها فريق التنظيم.',
          '• استقطب المخيّم 4 محاضرين ومدرّبين من خارج الجامعة.',
          '• نُشرت عشرات الصور والتغطيات الإعلامية خلال أيام المخيّم ولقيت تفاعلاً واسعاً.',
          '• أُنجز المخيّم في موعده وغادر المشاركون بشهادات مشاركة رسمية.'
        ]
      },
      {
        heading: 'ثانياً — الجانب الإداري والاختيار',
        content: [
          '• أجرى فريق التنظيم المؤلَّف من 4 أشخاص عملية اختيار المشاركين الـ60 دون وجود معايير مكتوبة أو موثّقة، واعتُمد الحكم الشخصي للمقابلة بوصفه المرجع الوحيد.',
          '• لم تُشكَّل لجنة اختيار مستقلة أو متعددة الأعضاء، ولم يُطَّلع المتقدمون على أسباب القبول أو الرفض.',
          '• تولّى منسّق واحد تنسيق الإقامة وتجهيز البرنامج الأكاديمي والتواصل مع مزود الموقع في وقت واحد، دون أي توزيع رسمي للمهام أو توثيق.',
          '• لم تُعقَد اجتماعات دورية لمراجعة الجدول الزمني قبيل المخيّم، واعتُمد التواصل الفردي بديلاً.'
        ]
      },
      {
        heading: 'ثالثاً — الجانب المالي والتعاقدي',
        content: [
          '• موّل المخيّم من خلال رسوم تسجيل رمزية من المشاركين ودعم محدود من الاتحاد، دون أي رعاية خارجية مؤمَّنة مسبقاً.',
          '• تم التعاقد مع موقع الإقامة الريفي بالاتفاق الشفهي فقط، دون عقد مكتوب يحدّد الخدمات المشمولة وآليات التعويض عند الإخلال.',
          '• لم يُعدَّ أي ميزانية طارئة للنفقات غير المتوقعة (طبية، لوجستية، طقس)، واعتُمد على التصرّف الآني عند الحاجة.',
          '• لا يوجد تقرير مالي ختامي يوثّق الإنفاق الفعلي مقارنةً بالمخطط، وتُستند الأرقام إلى ذاكرة المنسّق المالي.'
        ]
      },
      {
        heading: 'رابعاً — البرنامج التدريبي وقياس الأثر',
        content: [
          '• استُعيض عن المحاضر الأصلي المتخصص في القيادة بمحاضر بديل تطوّع في اليوم الأخير قبيل المخيّم، دون الاطلاع على البرنامج الأكاديمي المعتمد مسبقاً.',
          '• لم يُجرَ أي تقييم قبلي (Pre-assessment) لمستوى المشاركين، مما جعل المحتوى التدريبي موحّداً رغم تباين خلفياتهم ومستوياتهم.',
          '• لم تُوضَع أدوات قياس موضوعية لقياس اكتساب مهارات القيادة بعد المخيّم، واكتُفي بشهادات شفهية وانطباعات المشاركين كمؤشر وحيد للنجاح.',
          '• لم تُوضَع آلية متابعة ما بعد المخيّم (Follow-up) لقياس الأثر الحقيقي على المشاركين بعد مرور شهر أو ثلاثة أشهر.'
        ]
      },
      {
        heading: 'خامساً — الجانب اللوجستي والسلامة',
        content: [
          '• يقع موقع المخيّم على بُعد 65 كيلومتراً من المدينة في منطقة ريفية ذات تغطية شبكة هاتفية ضعيفة، مع اعتماد وسيلة نقل واحدة مشتركة (باص واحد) لجميع المشاركين والطاقم.',
          '• لم تُحضَّر خطة إخلاء طارئة أو طوارئ طبية مكتوبة، وكان المسعف الوحيد المرافق متطوعاً من داخل المجموعة دون مؤهل طبي رسمي.',
          '• اعتُمد برنامج يومي مكثّف يبدأ من السابعة صباحاً حتى الحادية عشرة ليلاً دون فترات راحة كافية، ولم يُستشَر أي متخصص في الصحة النفسية أو التعلم في تصميم الجدول.'
        ]
      }
    ]
  }
];

const TIMER_DURATION = 600; // 10 minutes in seconds

function WorkshopPage() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [openSectionIdx, setOpenSectionIdx] = useState(0);

  // Timer states
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Workspace input states
  const [gaps, setGaps] = useState('');
  const [reasons, setReasons] = useState('');
  const [report, setReport] = useState('');
  
  // Notification states
  const [copySuccess, setCopySuccess] = useState(false);

  const activeScenario = SCENARIOS[activeScenarioIdx];

  // Initialize and load saved workspace data for selected scenario
  useEffect(() => {
    const savedGaps = localStorage.getItem(`guss_ws_gaps_${activeScenario.id}`) || '';
    const savedReasons = localStorage.getItem(`guss_ws_reasons_${activeScenario.id}`) || '';
    const savedReport = localStorage.getItem(`guss_ws_report_${activeScenario.id}`) || '';

    setGaps(savedGaps);
    setReasons(savedReasons);
    setReport(savedReport);
  }, [activeScenarioIdx]);

  // Save data to localStorage on input changes
  const handleInputChange = (field, value) => {
    if (field === 'gaps') {
      setGaps(value);
      localStorage.setItem(`guss_ws_gaps_${activeScenario.id}`, value);
    } else if (field === 'reasons') {
      setReasons(value);
      localStorage.setItem(`guss_ws_reasons_${activeScenario.id}`, value);
    } else if (field === 'report') {
      setReport(value);
      localStorage.setItem(`guss_ws_report_${activeScenario.id}`, value);
    }
  };

  // Timer Logic
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const toggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(TIMER_DURATION);
  };

  // Format Time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer stroke dasharray calculations
  const strokePercentage = (timeLeft / TIMER_DURATION) * 283; // 2 * PI * r where r = 45

  // Utilities
  const handleCopyReport = () => {
    const fullText = `تقرير رقابي - ورشة عمل المكاتب: تحدي المقيم الذكي\nالمشروع: ${activeScenario.title}\n\n[1. الثغرات الموجودة في المشروع]\n${gaps}\n\n[2. الأسباب الجوهرية]\n${reasons}\n\n[3. التقرير الرقابي والتوصيات]\n${report}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClear = () => {
    if (window.confirm('هل أنت متأكد من مسح جميع الحقول لهذا السيناريو؟')) {
      setGaps('');
      setReasons('');
      setReport('');
      localStorage.removeItem(`guss_ws_gaps_${activeScenario.id}`);
      localStorage.removeItem(`guss_ws_reasons_${activeScenario.id}`);
      localStorage.removeItem(`guss_ws_report_${activeScenario.id}`);
    }
  };

  const goBackHome = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="workshop-container">
      {/* Back to main page button */}
      <div className="workshop-back-wrapper print-hidden">
        <button type="button" onClick={goBackHome} className="workshop-back-btn">
          <span className="arrow">→</span>
          <span>الرجوع للرئيسية</span>
        </button>
      </div>

      {/* Header section */}
      <header className="workshop-header reveal revealed">
        <h1 className="workshop-header__title">
          <span className="badge">ورشة العمل</span>
          ورشة عمل المكاتب: تحدي المقيم الذكي
        </h1>
        <p className="workshop-header__lead">
          اجمع فريقك! اقرأ سيناريو المشروع بعناية، ثم قم بإنشاء تقرير رقابي موجز
        </p>
      </header>

      {/* Timer & Meta section */}
      <div className="workshop-meta-bar print-hidden">
        {/* Time warning block */}
        <div className="time-warning-card">
          <div className="warning-icon-wrapper">⏱️</div>
          <div className="warning-text-wrapper">
            <h3>الوقت المتاح للنشاط</h3>
            <p>لديك 10 دقائق لقراءة السيناريو وكتابة تقريرك الرقابي مع فريقك.</p>
          </div>
        </div>

        {/* Dynamic Timer Widget */}
        <div className={`timer-widget ${timeLeft < 120 ? 'timer-danger' : ''} ${isTimerRunning ? 'timer-active' : ''}`}>
          <div className="timer-svg-wrapper">
            <svg viewBox="0 0 100 100" className="timer-ring">
              <circle cx="50" cy="50" r="45" className="timer-ring-bg" />
              <circle
                cx="50"
                cy="50"
                r="45"
                className="timer-ring-progress"
                style={{ strokeDashoffset: strokePercentage }}
              />
            </svg>
            <div className="timer-digital">{formatTime(timeLeft)}</div>
          </div>
          <div className="timer-controls">
            <button
              type="button"
              className={`timer-ctrl-btn ${isTimerRunning ? 'btn-pause' : 'btn-start'}`}
              onClick={toggleTimer}
              aria-label={isTimerRunning ? 'إيقاف مؤقت' : 'بدء المؤقت'}
            >
              {isTimerRunning ? '⏸️ إيقاف' : '▶️ البدء'}
            </button>
            <button
              type="button"
              className="timer-ctrl-btn btn-reset"
              onClick={resetTimer}
              aria-label="إعادة ضبط المؤقت"
            >
              🔄 تصفير
            </button>
          </div>
        </div>
      </div>

      {/* Main Scenarios Section */}
      <section className="workshop-scenarios-section">
        <div className="scenarios-selector print-hidden">
          <h3>اختر مشروعاً للتقييم:</h3>
          <div className="scenarios-tabs">
            {SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                className={`scenario-tab-btn ${activeScenarioIdx === idx ? 'tab-active' : ''}`}
                onClick={() => {
                  setActiveScenarioIdx(idx);
                  setOpenSectionIdx(0); // reset accordion block
                }}
              >
                <span className="tab-emoji">{sc.emoji}</span>
                <span className="tab-title">{sc.title.split(': ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Scenario Document Box */}
        <div className="scenario-document-card">
          <div className="document-header">
            <span className="doc-icon">📄</span>
            <h2>{activeScenario.title}</h2>
          </div>
          
          <div className="document-body">
            {/* Accordion list */}
            <div className="accordion-container">
              {activeScenario.sections.map((section, sIdx) => {
                const isOpen = openSectionIdx === sIdx;
                return (
                  <div key={sIdx} className={`accordion-item ${isOpen ? 'acc-open' : ''}`}>
                    <button
                      type="button"
                      className="accordion-header print-visible-header"
                      onClick={() => setOpenSectionIdx(isOpen ? -1 : sIdx)}
                      aria-expanded={isOpen}
                    >
                      <span>{section.heading}</span>
                      <span className="acc-arrow print-hidden">{isOpen ? '▼' : '▲'}</span>
                    </button>
                    
                    <div className="accordion-content">
                      <div className="accordion-content-inner">
                        {section.content.map((p, pIdx) => (
                          <p key={pIdx} className={p.startsWith('•') ? 'bullet-item' : 'paragraph-item'}>
                            {p.startsWith('•') ? p.substring(2) : p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Section */}
      <section className="workshop-workspace-section">
        <div className="workspace-card-inner">
          <div className="workspace-header">
            <span className="work-icon">✍️</span>
            <div>
              <h2>مساحة العمل وصياغة التقرير</h2>
              <p className="print-hidden">اكتب تحليلاتك الرقابية أدناه. يتم الحفظ تلقائياً لكل سيناريو بشكل منفصل.</p>
            </div>
          </div>

          <div className="workspace-fields">
            {/* Field 1: Gaps */}
            <div className="workspace-field-group">
              <label htmlFor="ws-gaps">
                <span className="field-num">1</span>
                تحديد الثغرات الموجودة في المشروع:
              </label>
              <textarea
                id="ws-gaps"
                placeholder="مثال: صرف كامل الميزانية في الأسبوع الأول على حفل الافتتاح، غياب معايير السلامة والإخلاء، إلخ..."
                value={gaps}
                onChange={(e) => handleInputChange('gaps', e.target.value)}
              />
            </div>

            {/* Field 2: Reasons */}
            <div className="workspace-field-group">
              <label htmlFor="ws-reasons">
                <span className="field-num">2</span>
                ذكر السبب الجوهري لكل ثغرة:
              </label>
              <textarea
                id="ws-reasons"
                placeholder="مثال: غياب التخطيط المالي المتزن وتفضيل الدعاية، التبرير الأمني غير المدروس للجنة المنظمة دون تقدير للمخاطر..."
                value={reasons}
                onChange={(e) => handleInputChange('reasons', e.target.value)}
              />
            </div>

            {/* Field 3: Report */}
            <div className="workspace-field-group field-full">
              <label htmlFor="ws-report">
                <span className="field-num">3</span>
                صياغة تقرير شامل تتحدث فيه عن كل ثغرة مع ذكر الأسباب:
              </label>
              <textarea
                id="ws-report"
                placeholder="اكتب هنا التقرير الرقابي النهائي الذي يربط بين كل ثغرة والسبب الجوهري لها مع تقديم التوصيات المناسبة لفريق العمل..."
                value={report}
                onChange={(e) => handleInputChange('report', e.target.value)}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="workspace-actions print-hidden">
            <button
              type="button"
              className="ws-action-btn btn-copy"
              onClick={handleCopyReport}
              disabled={!gaps && !reasons && !report}
            >
              <span>{copySuccess ? '✔️ تم النسخ!' : '📋 نسخ التقرير'}</span>
            </button>
            <button
              type="button"
              className="ws-action-btn btn-export"
              onClick={handlePrint}
              disabled={!gaps && !reasons && !report}
            >
              <span>🖨️ تصدير التقرير (طباعة)</span>
            </button>
            <button
              type="button"
              className="ws-action-btn btn-clear-inputs"
              onClick={handleClear}
              disabled={!gaps && !reasons && !report}
            >
              <span>🧹 مسح البيانات</span>
            </button>
          </div>
        </div>
      </section>

      {/* Styled Printable Version (hidden on screen, visible on print) */}
      <div className="print-only-layout">
        <div className="print-header-invoice">
          <div className="print-logo-meta">
            <h1>مكتب المتابعة والتقييم (GUSS)</h1>
            <p>ملتقى صناع الأثر - تقرير ورشة العمل الرقابية</p>
          </div>
          <div className="print-date">التاريخ: {new Date().toLocaleDateString('ar-SY')}</div>
        </div>
        <hr className="print-divider" />
        
        <div className="print-project-info">
          <strong>اسم القضية/المشروع المقيَّم:</strong>
          <h2>{activeScenario.title}</h2>
        </div>

        <div className="print-content-section">
          <h3>1. الثغرات الموجودة في المشروع:</h3>
          <div className="print-content-box">{gaps || 'لم يتم تدوين أي ثغرات.'}</div>
        </div>

        <div className="print-content-section">
          <h3>2. السبب الجوهري لكل ثغرة:</h3>
          <div className="print-content-box">{reasons || 'لم يتم تدوين أسباب جوهرية.'}</div>
        </div>

        <div className="print-content-section">
          <h3>3. التقرير الرقابي النهائي:</h3>
          <div className="print-content-box">{report || 'لم يتم كتابة التقرير.'}</div>
        </div>

        <div className="print-footer-sign">
          <p>توقيع فريق التقييم:</p>
          <div className="sign-line">_____________________</div>
        </div>
      </div>
    </div>
  );
}

export default WorkshopPage;

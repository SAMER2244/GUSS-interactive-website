import { useState, useCallback } from 'react';
import hallImg from '../assets/hall_evidence.png';
import './DetectiveActivity.css';

/* ══════════════════════════════════════════════════════════
   بيانات السيناريوهات الثلاثة
   ══════════════════════════════════════════════════════════ */
const SCENARIOS = [
  /* ───── السيناريو 1: الحفلة المشبوهة ───── */
  {
    id: 1,
    title: 'الحفلة المشبوهة',
    icon: '🎭',
    brief:
      'فعالية "ليلة الإبداع الطلابية" أعلنت نجاحها الباهر وصرفت ميزانيتها كاملة — لكن شيئاً ما لا يستقيم.',
    intro:
      'وصلنا بلاغ! فعالية "ليلة الإبداع الطلابية" أعلنت نجاحها الباهر وصرفت ميزانيتها كاملة — لكن شيئاً ما لا يستقيم. أنت المحقق، افحص الأدلة واكشف الحقيقة.',
    evidence: [
      {
        id: 'A',
        icon: '📋',
        label: 'تقرير الحضور',
        type: 'text',
        content:
          '"حضر الفعالية ٢٠٠ طالب من مختلف الكليات وكانت القاعة تعج بالحماس"',
      },
      {
        id: 'B',
        icon: '💰',
        label: 'الفاتورة المالية',
        type: 'text',
        content: 'صُرف ١٠٠,٠٠٠ ل.س على تجهيزات وعشاء لـ ٢٠٠ شخص',
        highlight: '١٠٠,٠٠٠ ل.س',
      },
      {
        id: 'C',
        icon: '📸',
        label: 'صورة القاعة',
        type: 'image',
        content: hallImg,
        caption: 'صورة تُظهر القاعة قبل بدء الفعالية',
      },
    ],
    questionType: 'choice',
    question:
      'كمحقق في مكتب المتابعة والتقييم، ما هو التناقض الأكثر خطورة في هذه الأدلة؟',
    options: [
      { id: 'a', color: 'red',    text: 'الفاتورة لا تتناسب مع عدد الحضور الحقيقي' },
      { id: 'b', color: 'yellow', text: 'التقرير مكتوب بلغة مبالغ فيها' },
      { id: 'c', color: 'green',  text: 'الصورة التُقطت قبل بدء الفعالية' },
      { id: 'd', color: 'blue',   text: 'لا يوجد تناقض، كل شيء طبيعي' },
    ],
    correctAnswer: 'a',
    explanation:
      'أحسنت! الفاتورة هي الدليل الأقوى — المال لا يكذب. مهمة مكتب المتابعة والتقييم هي بالضبط ربط الأرقام ببعضها واكتشاف هذا النوع من التضارب قبل إغلاق أي ملف.',
  },

  /* ───── السيناريو 2: الجائزة الغائبة ───── */
  {
    id: 2,
    title: 'الجائزة الغائبة',
    icon: '🏆',
    brief:
      'مسابقة "أفضل مشروع طلابي" أعلنت عن فائز وصرفت الجائزة رسمياً — لكن الطالب الفائز يؤكد أنه لم يتسلّم شيئاً.',
    intro:
      'تسلّمنا شكوى عاجلة! مسابقة "أفضل مشروع طلابي" أعلنت عن فائز وصرفت الجائزة رسمياً — لكن الطالب الفائز يؤكد أنه لم يتسلّم قرشاً واحداً. أنت المحقق، تتبّع أثر الجائزة.',
    evidence: [
      {
        id: 'A',
        icon: '📢',
        label: 'الإعلان الرسمي',
        type: 'text',
        content:
          '"يسعد اتحاد الطلاب بالإعلان عن فوز الطالب خالد محمود المصري بجائزة أفضل مشروع طلابي بقيمة ١٥٠,٠٠٠ ل.س"',
        highlight: 'خالد محمود المصري',
      },
      {
        id: 'B',
        icon: '💰',
        label: 'سند الصرف',
        type: 'text',
        content:
          'مبلغ ١٥٠,٠٠٠ ل.س صُرف بتاريخ ١٢ نوفمبر — المستلم: "خالد محمود" — التوقيع على الاستلام: م.ك. (غير مقروء)',
        highlight: 'م.ك. (غير مقروء)',
      },
      {
        id: 'C',
        icon: '📋',
        label: 'شكوى الفائز',
        type: 'text',
        content:
          '"أنا الطالب خالد محمود المصري أؤكد رسمياً أنني لم أتسلّم جائزة المسابقة حتى اليوم ٢٠ نوفمبر، ولم يتواصل معي أحد من الاتحاد"',
      },
    ],
    questionType: 'choice',
    question:
      'ما هو التناقض الأكثر خطورة الذي يستوجب التحقيق الفوري؟',
    options: [
      { id: 'a', color: 'red',    text: 'التوقيع على الاستلام ليس بيد الفائز الحقيقي' },
      { id: 'b', color: 'yellow', text: 'التأخر في صرف الجائزة (8 أيام من الإعلان)' },
      { id: 'c', color: 'green',  text: 'قيمة الجائزة كبيرة مقارنة بميزانية الاتحاد' },
      { id: 'd', color: 'blue',   text: 'الفائز لم يحضر شخصياً لاستلام جائزته' },
    ],
    correctAnswer: 'a',
    explanation:
      'ممتاز! التوقيع "م.ك." لا يطابق اسم الفائز "خالد محمود المصري" — هذا يعني أن شخصاً آخر استلم الجائزة. مكتب المتابعة والتقييم يتحقق من التوقيعات والهويات لأن هذا التفصيل الصغير قد يكشف اختلاساً كاملاً.',
  },

  /* ───── السيناريو 3: التقرير المنسوخ ───── */
  {
    id: 3,
    title: 'التقرير المنسوخ',
    icon: '📋',
    brief:
      'تقرير متابعة أسبوعي وصل للمكتب ويبدو مثالياً للوهلة الأولى — لكن عين المحقق المدرّبة لاحظت شيئاً غريباً.',
    intro:
      'تقرير متابعة أسبوعي وصل للمكتب ويبدو مثالياً للوهلة الأولى — لكن عين المحقق المدرّبة لاحظت شيئاً غريباً. هل تستطيع اكتشافه؟',
    evidence: [
      {
        id: 'A',
        icon: '📄',
        label: 'تقرير الأسبوع الثالث',
        type: 'report',
        date: '١-٧ نوفمبر',
        rows: [
          { label: 'نسبة الحضور',     value: '٨٧٪' },
          { label: 'المهام المنجزة',  value: 'إعداد قاعدة البيانات، تدريب الفريق' },
          { label: 'الأعضاء النشطون', value: 'أحمد، سارة، محمود، لينا' },
          { label: 'ملاحظات',         value: 'الفريق يسير بخطى ممتازة' },
        ],
      },
      {
        id: 'B',
        icon: '📄',
        label: 'تقرير الأسبوع الرابع',
        type: 'report',
        date: '٨-١٤ نوفمبر',
        rows: [
          { label: 'نسبة الحضور',     value: '٨٧٪' },
          { label: 'المهام المنجزة',  value: 'إعداد قاعدة البيانات، تدريب الفريق' },
          { label: 'الأعضاء النشطون', value: 'أحمد، سارة، محمود، لينا' },
          { label: 'ملاحظات',         value: 'الفريق يسير بخطى ممتازة' },
        ],
      },
    ],
    questionType: 'choice',
    question: 'ما عدد التطابقات المشبوهة التي وجدتها بين التقريرين؟',
    options: [
      { id: 'a', color: 'blue',   text: '١ تطابق' },
      { id: 'b', color: 'yellow', text: '٢ تطابق' },
      { id: 'c', color: 'green',  text: '٣ تطابقات' },
      { id: 'd', color: 'red',    text: '٤ تطابقات أو أكثر' },
    ],
    correctAnswer: 'd',
    explanation:
      'دقيق جداً! كل شيء متطابق حرفياً — النسبة، المهام، الأسماء، والملاحظات. أسبوعان كاملان بدون أي تغيير؟ هذا مستحيل في أي فريق حقيقي. مكتب المتابعة والتقييم موجود بالضبط لاكتشاف هذا النوع من "التقارير الوهمية".',
  },
];

/* ══════════════════════════════════════════════════════════
   مكوّن عرض الدليل
   ══════════════════════════════════════════════════════════ */
function EvidenceCard({ item, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className={`det-evidence-card ${open ? 'det-evidence-card--open' : ''}`}>
      <button
        className="det-evidence-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="det-evidence-badge">دليل {item.id}</span>
        <span className="det-evidence-icon">{item.icon}</span>
        <span className="det-evidence-label">{item.label}</span>
        <span className="det-evidence-chevron" aria-hidden="true">
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div className="det-evidence-body">
          {item.type === 'image' ? (
            <figure className="det-evidence-figure">
              <img src={item.content} alt={item.caption} className="det-evidence-img" />
              <figcaption className="det-evidence-caption">📍 {item.caption}</figcaption>
            </figure>
          ) : item.type === 'report' ? (
            <div className="det-report">
              <div className="det-report-date">📅 الفترة: {item.date}</div>
              <table className="det-report-table">
                <tbody>
                  {item.rows.map((row) => (
                    <tr key={row.label}>
                      <td className="det-report-key">{row.label}</td>
                      <td className="det-report-val">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="det-evidence-text">
              {item.highlight ? (
                <>
                  {item.content.split(item.highlight).map((part, i, arr) =>
                    i < arr.length - 1 ? (
                      <span key={i}>
                        {part}
                        <mark className="det-highlight">{item.highlight}</mark>
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )}
                </>
              ) : (
                item.content
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   سؤال الترتيب (السيناريو المحذوف — احتياطي)
   ══════════════════════════════════════════════════════════ */
function OrderQuestion({ scenario, onSubmit }) {
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    if (selected.includes(id)) return;
    const next = [...selected, id];
    setSelected(next);
    if (next.length === scenario.orderItems.length) {
      const isCorrect =
        JSON.stringify(next) === JSON.stringify(scenario.correctOrder);
      onSubmit(isCorrect, next);
    }
  };

  const handleReset = () => setSelected([]);

  return (
    <div className="det-order">
      {scenario.orderItems.map((item) => {
        const rank = selected.indexOf(item.id) + 1;
        const isChosen = rank > 0;
        return (
          <button
            key={item.id}
            className={`det-order-item ${isChosen ? 'det-order-item--chosen' : ''}`}
            onClick={() => handleSelect(item.id)}
            disabled={isChosen}
            aria-label={`اختر "${item.text}" كدليل رقم ${selected.length + 1}`}
          >
            <span className="det-order-rank">{isChosen ? rank : '?'}</span>
            <span className="det-order-text">{item.text}</span>
          </button>
        );
      })}

      {selected.length > 0 && selected.length < scenario.orderItems.length && (
        <button className="det-reset-btn" onClick={handleReset}>
          ↺ إعادة المحاولة
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   سؤال الاختيار
   ══════════════════════════════════════════════════════════ */
function ChoiceQuestion({ scenario, onSubmit }) {
  return (
    <div className="det-choices">
      {scenario.options.map((opt) => (
        <button
          key={opt.id}
          className={`det-choice det-choice--${opt.color}`}
          onClick={() => onSubmit(opt.id === scenario.correctAnswer, opt.id)}
          aria-label={opt.text}
        >
          <span className="det-choice-text">{opt.text}</span>
        </button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   المكوّن الرئيسي
   ══════════════════════════════════════════════════════════ */
function DetectiveActivity() {
  // phase: 'intro' | 'investigate' | 'result'
  const [phase, setPhase] = useState('intro');
  const [scenario, setScenario] = useState(null);
  const [usedIds, setUsedIds] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [userAnswerId, setUserAnswerId] = useState(null);

  /* اختيار سيناريو عشوائي غير مكرر */
  const pickScenario = useCallback(
    (currentId = null) => {
      const remaining = SCENARIOS.filter(
        (s) => !usedIds.includes(s.id) && s.id !== currentId,
      );
      const pool =
        remaining.length > 0
          ? remaining
          : SCENARIOS.filter((s) => s.id !== currentId);
      return pool[Math.floor(Math.random() * pool.length)];
    },
    [usedIds],
  );

  const handleStart = () => {
    const chosen = pickScenario();
    setScenario(chosen);
    setUsedIds((prev) => [...prev, chosen.id]);
    setIsCorrect(null);
    setUserAnswerId(null);
    setPhase('investigate');
    setTimeout(() => {
      document.getElementById('detective-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAnswer = (correct, answerId) => {
    setIsCorrect(correct);
    setUserAnswerId(answerId);
    setPhase('result');
    setTimeout(() => {
      document.getElementById('detective-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTryAnother = () => {
    const chosen = pickScenario(scenario?.id);
    setScenario(chosen);
    setUsedIds((prev) => [...prev, chosen.id]);
    setIsCorrect(null);
    setUserAnswerId(null);
    setPhase('investigate');
    setTimeout(() => {
      document.getElementById('detective-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  /* ─── حساب نص الإجابة الصحيحة للعرض عند الفشل ─── */
  const getCorrectAnswerText = () => {
    if (!scenario || scenario.questionType !== 'choice') return null;
    const correct = scenario.options.find((o) => o.id === scenario.correctAnswer);
    return correct?.text ?? null;
  };

  /* ── شاشة الافتتاح ── */
  if (phase === 'intro') {
    return (
      <section id="detective-section" className="det-section">
        <div className="det-intro reveal">
          <div className="det-intro-stamp">سري للغاية</div>
          <div className="det-intro-icon" aria-hidden="true">🕵️</div>
          <div className="det-intro-tag">📁 ملف سري — أنت المحقق</div>
          <h2 className="det-intro-title">تحدي المحقق التفاعلي</h2>
          <p className="det-intro-desc">
            ستُعرض عليك قضية حقيقية من ملفات مكتب المتابعة والتقييم، معها أدلة موثّقة
            — أرقام، تقارير، وشهادات. مهمتك تحليل الأدلة واكتشاف التناقض الخفي والإدلاء بحكمك.
          </p>
          <div className="det-intro-badges">
            <span className="det-badge">🔍 قضية سرية</span>
            <span className="det-badge">📊 أدلة حقيقية</span>
            <span className="det-badge">⚖️ أصدر حكمك</span>
          </div>
          <button className="det-start-btn" onClick={handleStart}>
            <span className="det-start-btn__text">ابدأ التحقيق</span>
            <span className="det-start-btn__icon" aria-hidden="true">←</span>
          </button>
        </div>
      </section>
    );
  }

  /* ── شاشة التحقيق ── */
  if (phase === 'investigate' && scenario) {
    return (
      <section id="detective-section" className="det-section">
        <div className="det-case">
          {/* رأس القضية — بدون رقم القضية */}
          <div className="det-case-header">
            <h2 className="det-case-title">
              <span aria-hidden="true">{scenario.icon}</span>
              {scenario.title}
            </h2>
            <p className="det-case-intro">{scenario.intro}</p>
          </div>

          {/* الأدلة */}
          <div className="det-evidence-section">
            <h3 className="det-section-label">🗂️ الأدلة المتاحة</h3>
            <div
              className={`det-evidence-list ${
                scenario.id === 3 ? 'det-evidence-list--side' : ''
              }`}
            >
              {scenario.evidence.map((item, i) => (
                <EvidenceCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* السؤال */}
          <div className="det-question-section">
            <h3 className="det-question-text">⚖️ {scenario.question}</h3>
            {scenario.questionType === 'choice' ? (
              <ChoiceQuestion scenario={scenario} onSubmit={handleAnswer} />
            ) : (
              <OrderQuestion scenario={scenario} onSubmit={handleAnswer} />
            )}
          </div>
        </div>
      </section>
    );
  }

  /* ── شاشة النتيجة ── */
  if (phase === 'result' && scenario) {
    const correctText = getCorrectAnswerText();

    return (
      <section id="detective-section" className="det-section">
        <div className="det-result">
          <div
            className={`det-result-badge ${
              isCorrect ? 'det-result-badge--correct' : 'det-result-badge--wrong'
            }`}
          >
            {isCorrect ? '✅' : '❌'}
          </div>

          <h2 className="det-result-title">
            {isCorrect ? 'أحسنت أيها المحقق!' : 'تحتاج مراجعة أدلتك'}
          </h2>

          {/* عرض الإجابة الصحيحة عند الفشل */}
          {!isCorrect && correctText && (
            <div className="det-correct-answer">
              <span className="det-correct-answer__label">✔️ الإجابة الصحيحة:</span>
              <span className="det-correct-answer__text">{correctText}</span>
            </div>
          )}

          <div className="det-result-explanation">
            <span className="det-result-explanation-icon">💡</span>
            <p>{scenario.explanation}</p>
          </div>

          {/* رسالة التوجه للبوث عند النجاح فقط */}
          {isCorrect && (
            <div className="det-booth-message">
              <span className="det-booth-message__icon">🏅</span>
              <p>توجه الآن للمتحدث الرسمي في البوث لمناقشة تحليلك واربح ختم الإنجاز!</p>
            </div>
          )}

          <button className="det-try-btn" onClick={handleTryAnother}>
            <span aria-hidden="true">📁</span>
            جرّب قضية أخرى
          </button>
        </div>
      </section>
    );
  }

  return null;
}

export default DetectiveActivity;

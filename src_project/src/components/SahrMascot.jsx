import { useState, useEffect, useRef, useCallback } from 'react';
import sahrImg from '../assets/sahr_mascot.png';
import './SahrMascot.css';

/* ══════════════════════════════════════════════════════════
   رسائل سَحَر لكل قسم
   ══════════════════════════════════════════════════════════ */
const SECTION_MESSAGES = {
  hero: {
    icon: '👋',
    messages: [
      'مرحباً! أنا سَحَر، بومة مكتب المتابعة والتقييم 🦉 سأكون رفيقتك في هذه الرحلة!',
      'هذا هو الموقع التفاعلي لبوث مكتب المتابعة والتقييم — اكتشف ما نقدمه!',
      'تقول كلمة المكتب: «قيّم… طوّر… أثّر» — هذا مبدأنا في كل خطوة.',
    ],
  },
  about: {
    icon: '📖',
    messages: [
      'هنا تعرف علينا أكثر! مكتب المتابعة والتقييم جزء أساسي من منظومة الاتحاد.',
      'مهمتنا رصد الأنشطة وتقييمها لنضمن أن كل جهد يُحدث أثراً حقيقياً.',
      'نحن عيون الاتحاد — نتأكد أن كل مشروع يسير في الاتجاه الصحيح! 🔍',
    ],
  },
  'detective-section': {
    icon: '🕵️',
    messages: [
      'القضايا الثلاث في انتظارك! اضغط «ابدأ التحقيق» وستحصل على قضية عشوائية.',
      'افحص الأدلة بعناية — المحققون الجيدون يقرؤون كل تفصيلة!',
      'إذا أجبت صح، توجه للمتحدث في البوث لتربح ختم الإنجاز! 🏅',
    ],
  },
  'skills-map': {
    icon: '🗺️',
    messages: [
      'هذه خريطة المهارات شاركنا ما الذي تريد اكتسابه ضمن رحلتك التطوعية؟',
    ],
  },
  'workshop-trigger': {
    icon: '🏆',
    messages: [
      'هنا مدخل ورشة عمل المكاتب التفاعلية! اضغط على البطاقة لتنتقل لصفحة التحدي.',
      'في الورشة ستعمل كفريق لقراءة سيناريوهات معقدة وصياغة تقرير رقابي كامل!',
      'تحدي المقيم الذكي يتطلب مهارات نقدية عالية — هل أنتم جاهزون؟ 🏆',
    ],
  },
  feedback: {
    icon: '📝',
    messages: [
      'من خلال هذا الاستبيان يمكنك ممارسة دورك كمقيم للملتقى لا تتردد!',
    ],
  },
  footer: {
    icon: '👋',
    messages: [
      'شكراً على تجربتك معنا! لا تنسَ ختم الإنجاز من البوث 🏅',
      'سَحَر توّدعك بابتسامة — أراكَ في الجولة القادمة! 🦉✨',
    ],
  },
};

/* الموضع الابتدائي — أسفل اليمين */
const getInitialPos = () => ({
  x: window.innerWidth  - 90,
  y: window.innerHeight - 200,
});

/* ترتيب الأقسام للتنقل */
const SECTION_ORDER = ['hero', 'about', 'detective-section', 'skills-map', 'workshop-trigger', 'feedback', 'footer'];


/* ══════════════════════════════════════════════════════════
   المكوّن الرئيسي
   ══════════════════════════════════════════════════════════ */
function SahrMascot() {
  const [isOpen, setIsOpen]         = useState(false);
  const [isVisible, setIsVisible]   = useState(false);
  const [currentMsg, setCurrentMsg] = useState('');
  const [currentIcon, setCurrentIcon] = useState('👋');
  const [isTyping, setIsTyping]     = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [msgIndex, setMsgIndex]     = useState(0);

  const activeSectionRef = useRef(null);

  /* موضع السحب */
  const [pos, setPos] = useState(getInitialPos);
  const isDragging  = useRef(false);
  const hasMoved    = useRef(false);
  const dragStart   = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });
  const moveHandler = useRef(null);
  const upHandler   = useRef(null);

  const typingTimer    = useRef(null);
  const autoCloseTimer = useRef(null);

  /* ── تتبع القسم النشط في مرجع فوري ── */
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  /* ── مؤقت الظهور الأولي للبومة ── */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  /* ── العد التنازلي للإغلاق ── */
  const scheduleAutoClose = useCallback(() => {
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    autoCloseTimer.current = setTimeout(() => setIsOpen(false), 5000);
  }, []);

  /* ── تأثير الكتابة المتدرجة ── */
  const typeMessage = useCallback((text) => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setIsTyping(true);
    setCurrentMsg('');
    let i = 0;
    const tick = () => {
      if (i <= text.length) {
        setCurrentMsg(text.slice(0, i++));
        typingTimer.current = setTimeout(tick, 28);
      } else {
        setIsTyping(false);
        scheduleAutoClose();
      }
    };
    tick();
  }, [scheduleAutoClose]);

  /* ── عرض رسالة قسم ── */
  const showSectionMessage = useCallback((sectionId, idx = 0) => {
    let data = SECTION_MESSAGES[sectionId];
    if (sectionId === 'workshop-trigger') {
      const isLocked = new Date() < new Date('2026-06-20T14:00:00');
      if (isLocked) {
        data = {
          icon: '⏳',
          messages: [
            'تنبيه! هذه الفقرة مخصصة لورشة عمل المكاتب ضمن ملتقى صناع الأثر، وسيتم فتحها في تمام الساعة 14:00 ظهراً! ⏳',
            'العد التنازلي بدأ! اجمعوا فريقكم وجهزوا أنفسكم، فالتحديات والسيناريوهات الرقابية الكبرى قادمة قريباً! 🏆',
            'لا يمكن الدخول الآن، لكن ابقوا قريبين فالمنافسة ستنطلق في تمام الثانية ظهراً! 🦉✨'
          ]
        };
      } else {
        data = {
          icon: '🏆',
          messages: [
            'الورشة مفتوحة الآن! اضغط على البطاقة لتنتقل لصفحة تحدي المقيم الذكي! 🏆',
            'في الورشة ستعمل كفريق لقراءة سيناريوهات معقدة وصياغة تقرير رقابي كامل!',
            'لديك 10 دقائق فقط لكتابة التقرير مع فريقك. أرونا مهاراتكم! 🔍'
          ]
        };
      }
    }
    if (!data) return;
    setCurrentIcon(data.icon);
    setIsOpen(true);
    typeMessage(data.messages[idx % data.messages.length]);
  }, [typeMessage]);

  /* ── مراقب التمرير والترحيب الأولي عند ظهور البومة ── */
  useEffect(() => {
    if (!isVisible) return;

    // ترحيب أولي بالبومة فور ظهورها
    setActiveSection('hero');
    setMsgIndex(0);
    showSectionMessage('hero', 0);

    const observers = [];
    Object.keys(SECTION_MESSAGES).forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && id !== activeSectionRef.current) {
            setActiveSection(id);
            setMsgIndex(0);
            showSectionMessage(id, 0);
          }
        },
        { threshold: 0.35 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [isVisible, showSectionMessage]);

  /* ── تنظيف المؤقتات والحدث عند الخروج من المكون ── */
  useEffect(() => {
    return () => {
      if (typingTimer.current)    clearTimeout(typingTimer.current);
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
      if (moveHandler.current) window.removeEventListener('pointermove', moveHandler.current);
      if (upHandler.current)   window.removeEventListener('pointerup',   upHandler.current);
    };
  }, []);

  /* ══════════════════════════════════════════
     منطق السحب (Drag)
     ══════════════════════════════════════════ */
  const OWL_SIZE = 72; // px

  const handlePointerDown = (e) => {
    // السماح بالسحب فقط من جسم البومة (ليس من أزرار الفقاعة)
    if (e.target.closest('.mascot-bubble')) return;

    e.preventDefault();
    isDragging.current = true;
    hasMoved.current   = false;
    dragStart.current  = {
      mx: e.clientX,
      my: e.clientY,
      ox: pos.x,
      oy: pos.y,
    };

    moveHandler.current = (ev) => {
      const dx = ev.clientX - dragStart.current.mx;
      const dy = ev.clientY - dragStart.current.my;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved.current = true;
      setPos({
        x: Math.max(0, Math.min(window.innerWidth  - OWL_SIZE, dragStart.current.ox + dx)),
        y: Math.max(0, Math.min(window.innerHeight - OWL_SIZE, dragStart.current.oy + dy)),
      });
    };

    upHandler.current = () => {
      isDragging.current = false;
      window.removeEventListener('pointermove', moveHandler.current);
      window.removeEventListener('pointerup',   upHandler.current);
    };

    window.addEventListener('pointermove', moveHandler.current);
    window.addEventListener('pointerup',   upHandler.current);
  };

  /* ── نقرة البومة (تُتجاهل إن كانت سحباً) ── */
  const handleOwlClick = () => {
    if (hasMoved.current) return; // كان سحباً
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);

    if (!isOpen) {
      setIsOpen(true);
      if (activeSection) showSectionMessage(activeSection, msgIndex);
      return;
    }
    if (activeSection) {
      const msgs  = SECTION_MESSAGES[activeSection]?.messages ?? [];
      const next  = (msgIndex + 1) % msgs.length;
      setMsgIndex(next);
      showSectionMessage(activeSection, next);
    }
  };

  /* ── نقرة الانتقال للقسم التالي ── */
  const handleNextSectionClick = (e) => {
    e.stopPropagation();
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);

    const currentIndex = SECTION_ORDER.indexOf(activeSection);
    if (currentIndex !== -1 && currentIndex < SECTION_ORDER.length - 1) {
      const nextSectionId = SECTION_ORDER[currentIndex + 1];
      const nextSection = document.getElementById(nextSectionId);
      if (nextSection) {
        activeSectionRef.current = nextSectionId;
        setActiveSection(nextSectionId);
        setMsgIndex(0);
        showSectionMessage(nextSectionId, 0);
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    setIsOpen(false);
  };

  /* ── حساب موضع الفقاعة: أعلى يمين البومة ── */
  const bubbleRight = Math.max(0, window.innerWidth - pos.x - OWL_SIZE);

  return (
    <div
      className={`mascot-wrapper ${isVisible ? 'mascot-wrapper--visible' : ''} ${isDragging.current ? 'mascot-wrapper--dragging' : ''}`}
      style={{ left: pos.x, top: pos.y }}
      role="complementary"
      aria-label="المساعدة التفاعلية سحر"
    >
      {/* فقاعة الحوار — مطلقة فوق البومة */}
      {isOpen && (
        <div
          className="mascot-bubble"
          role="status"
          aria-live="polite"
          style={{ right: 0 }}
        >
          <div className="mascot-bubble__header">
            <span className="mascot-bubble__name">
              <span aria-hidden="true">{currentIcon}</span> سَحَر
            </span>
            <button
              className="mascot-bubble__close"
              onClick={handleClose}
              aria-label="إغلاق رسالة سحر"
            >
              ✕
            </button>
          </div>

          <p className="mascot-bubble__text">
            {currentMsg}
            {isTyping && <span className="mascot-cursor" aria-hidden="true">|</span>}
          </p>

          {!isTyping && activeSection && SECTION_ORDER.indexOf(activeSection) < SECTION_ORDER.length - 1 && (
            <button className="mascot-bubble__more" onClick={handleNextSectionClick}>
              القسم التالي ←
            </button>
          )}

          {!isTyping && (
            <div className="mascot-bubble__progress" aria-hidden="true" />
          )}
        </div>
      )}

      {/* البومة */}
      <button
        className={`mascot-owl ${isOpen ? 'mascot-owl--active' : ''}`}
        onPointerDown={handlePointerDown}
        onClick={handleOwlClick}
        aria-label={isOpen ? 'رسالة سحر التالية' : 'افتح مساعدة سحر'}
        title="سَحَر — اسحبني أو اضغط عليّ!"
      >
        <img
          src={sahrImg}
          alt="سحر البومة المحققة"
          className="mascot-owl__img"
          draggable={false}
        />
        {!isOpen && <span className="mascot-ping" aria-hidden="true" />}
      </button>
    </div>
  );
}

export default SahrMascot;

/* global React */
/* ARYA · «Ритм восстановления» — 40 дней, 4 фазы.
   Паттерн перенесён из рабочего макета v38: компактные фазы + липкая капля
   масла, растущая при скролле, + стадии со строками-изменениями.
   Заменяет прежнюю громоздкую «Хронику». */

function Chronicle() {
  const [phase, setPhase] = React.useState(1);
  const stagesRef = React.useRef(null);
  const phaseDays = ['10', '20', '30', '40'];

  const PHASES = [
    { days: 'Дни 1 — 10',  name: 'Первая волна' },
    { days: 'Дни 11 — 20', name: 'Углубление' },
    { days: 'Дни 21 — 30', name: 'Восстановление' },
    { days: 'Дни 31 — 40', name: 'Новый ритм' },
  ];

  const STAGES = [
    {
      num: 'Фаза 01 · Дни 1–10',
      h: 'Первая волна',
      lead: 'Тело узнаёт новый жир. Альфа-линоленовая кислота льна начинает встраиваться в мембраны клеток. Это тихая работа — пока без видимых эффектов.',
      changes: [
        ['Привычка', 'Холодная ложка натощак становится якорем утра. Рука находит бутылку не глядя.'],
        ['Вкус', 'Ореховая нота с травяным следом перестаёт удивлять уже к третьему дню.'],
        ['Лёгкость', 'Тело адаптируется к ежедневной ложке. Первые признаки лёгкости после еды.'],
      ],
    },
    {
      num: 'Фаза 02 · Дни 11–20',
      h: 'Углубление',
      lead: 'Жиры доходят до мембран. Мембраны клеток кожи на треть состоят из жирных кислот — свежая ω-3 становится материалом, из которого тело их пересобирает.',
      changes: [
        ['Кожа', 'Сухие зоны — локти, кутикула — на ощупь мягче, хотя крем вы не меняли.'],
        ['Сон', 'Углубляется. Чаще удаётся проспать ночь без пробуждений.'],
        ['Ясность', 'Меньше тумана к полудню. Внимание держится дольше в течение дня.'],
      ],
    },
    {
      num: 'Фаза 03 · Дни 21–30',
      h: 'Восстановление',
      lead: 'Системные сдвиги. Из ω-3 тело строит оболочки нервных волокон и материал для гормонов. Это уже не адаптация — это новое состояние.',
      changes: [
        ['Нервная система', 'Стрессовые пики переживаются мягче, восстановление быстрее.'],
        ['Ровный ритм', 'День без масла начинает ощущаться неполным. Привычка стала опорой.'],
        ['Тело', 'Появляется ощущение «я слышу своё тело» — возвращается чувствительность.'],
      ],
    },
    {
      num: 'Фаза 04 · Дни 31–40',
      h: 'Новый ритм',
      lead: 'Тело перестроилось. Сорок дней — срок, за который обновляются клеточные мембраны. Бутылка 100 ml заканчивается ровно к этому дню: один полный цикл.',
      changes: [
        ['Состояние', 'Ровная энергия весь день — без скачков и обвалов.'],
        ['Внешний вид', 'Кожа, волосы, ногти отражают изменения изнутри. Это видно.'],
        ['Норма', 'Это больше не курс, а норма. Внутри — спокойная сила.'],
      ],
    },
  ];

  function goToPhase(n) {
    setPhase(n);
    const root = stagesRef.current;
    if (!root) return;
    const el = root.querySelector(`[data-phase="${n}"]`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  React.useEffect(() => {
    const root = stagesRef.current;
    if (!root) return;
    const stages = Array.from(root.querySelectorAll('.stage'));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0.4) {
          setPhase(+e.target.dataset.phase);
        }
      });
    }, { threshold: [0.4, 0.6] });
    stages.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // reveal-on-scroll for this section's .reveal elements
  React.useEffect(() => {
    const els = document.querySelectorAll('.timeline-section .reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="timeline-section" id="ritm" data-screen-label="Ритм восстановления">
      <div className="container">
        <div className="timeline-head reveal">
          <span className="eyebrow">N° 02 · Ритм восстановления</span>
          <h2 className="display-l">Сорок дней. <span className="em">Четыре фазы.</span></h2>
          <p className="body-l">
            Изменения не приходят сразу — они приходят по календарю, который знает
            только тело. Одна бутылка льна — ровно один такой цикл.
          </p>
        </div>

        <div className="timeline-phases">
          {PHASES.map((p, i) => (
            <button
              key={i}
              className={`phase-pill ${phase === i + 1 ? 'active' : ''}`}
              onClick={() => goToPhase(i + 1)}>
              <span className="p-days">{p.days}</span>
              <span className="p-name">{p.name}</span>
            </button>
          ))}
        </div>

        <div className="timeline-body">
          <div className="timeline-visual">
            <div className="orb-wrap">
              <span className="orb-day-label">День</span>
              <div className="orb-bg"></div>
              <div className={`orb-fg s${phase}`}></div>
              <span className="orb-day">{phaseDays[phase - 1]}</span>
            </div>
          </div>

          <div className="timeline-stages" ref={stagesRef}>
            {STAGES.map((s, i) => (
              <div className="stage reveal" data-phase={i + 1} key={i}>
                <div className="s-num">{s.num}</div>
                <h3>{s.h}</h3>
                <p className="lead">{s.lead}</p>
                <div className="changes">
                  {s.changes.map(([label, text], j) => (
                    <div className="change" key={j}>
                      <div className="label">{label}</div>
                      <div className="text">{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Chronicle = Chronicle;

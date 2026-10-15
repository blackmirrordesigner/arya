// arya-flow.jsx — Квиз: Recognition intro → 3-step personal protocol → sticky cart.
// Step 1 · category tile · Step 2 · refinement (duration) · Step 3 · result:
// diagnostic frame → horizon → protocol (Foundation + one–two mono-oils) → set price + cart.
// Foundation is ALWAYS the base; mono-oils are the targeted reinforcement.
// Exposed as window.Acquire.

const { useState: useFlowState, useEffect: useFlowEffect, useRef: useFlowRef } = React;

const PRICE = '—— lei';

/* ── Recognition intro — evocative signals that lead into the quiz ── */
const RECOG = [
  { st: 'К вечеру сил не остаётся.', cc: 'Встаёте уже уставшим, и кофе держит недолго.' },
  { st: 'Мысли рассеиваются раньше, чем заканчивается день.', cc: 'Трудно держать фокус, память подводит.' },
  { st: 'Кожа потеряла ровность.', cc: 'Сухость, тусклость — снаружи кремами не вернуть.' },
  { st: 'Цикл стал непредсказуемым.', cc: 'ПМС, перепады настроения без явной причины.' },
  { st: 'После еды — тяжесть.', cc: 'Вздутие, дискомфорт, тяжесть в правом боку.' },
  { st: 'Сон не восстанавливает.', cc: 'Трудно расслабиться, утром как не спал.' },
  { st: 'Тело долго восстанавливается.', cc: 'Часто болеете, вирусы цепляются один за другим.' },
  { st: 'Суставы скованны по утрам.', cc: 'Хруст, тугоподвижность без явных причин.' },
];

/* ── Step 1 · eight condition categories (brief §7) ── */
const CATS = [
  {
    id: 'liver', name: 'Печень', hint: 'тяжесть в правом боку, горечь во рту, реакция на жирное',
    frameTitle: 'Печень несёт весь метаболический трафик.',
    frameBody: 'Через неё проходит всё, что вы едите, пьёте, вдыхаете и получаете как лекарство. При хронической нагрузке гепатоциты работают на пределе — отсюда тяжесть в правом боку, горечь во рту, непереносимость жирной еды.',
    horizon: '4–8 недель — восстановление ферментов, уход тяжести.',
    oils: [
      { name: 'Расторопша', note: 'силимарин, защита гепатоцитов' },
      { name: 'Кунжут', note: 'сезамин, антиоксидантная защита печени' },
    ],
  },
  {
    id: 'joints', name: 'Суставы', hint: 'скованность по утрам, боль в коленях',
    frameTitle: 'Утренняя скованность — сигнал тихого воспаления.',
    frameBody: 'Хрящ и соединительная ткань обновляются медленно и зависят от качества жиров. Когда воспалительный фон повышен, суставы становятся тугими по утрам, а движения — скованными.',
    horizon: '6–10 недель — мягче утренняя скованность, свободнее движения.',
    oils: [{ name: 'Льняное', note: 'омега-3, противовоспаление' }],
  },
  {
    id: 'skin', name: 'Кожа', hint: 'сухость, шелушение, воспаления',
    frameTitle: 'Кожа — это липидный барьер.',
    frameBody: 'Ровность и влага кожи держатся на липидном слое. Когда в нём не хватает строительных жиров и стеролов, появляются сухость, шелушение и воспаления — снаружи кремами это не восполнить.',
    horizon: '4–8 недель — возвращается влага и ровность тона.',
    oils: [{ name: 'Амарант', note: 'сквален и стеролы, барьер кожи' }],
  },
  {
    id: 'hormones', name: 'Гормоны', hint: 'ПМС, перименопауза, циклические перепады',
    frameTitle: 'Гормоны синтезируются из жиров.',
    frameBody: 'Половые гормоны строятся из жиров, а их баланс держится на минералах-кофакторах. При нехватке материала цикл становится непредсказуемым, а настроение — переменчивым.',
    horizon: '8–12 недель — ровнее цикл, мягче перепады.',
    oils: [{ name: 'Кунжут', note: 'сезамин и лигнаны, гормональный обмен' }],
  },
  {
    id: 'energy', name: 'Энергия', hint: 'усталость к обеду, мозговой туман',
    frameTitle: 'Энергию вырабатывают мембраны митохондрий.',
    frameBody: 'Митохондрии производят энергию внутри своих мембран. Когда мембранам не хватает качественных жиров, к обеду наступает усталость и мозговой туман, даже если вы высыпаетесь.',
    horizon: '4–6 недель — ровнее энергия в течение дня.',
    oils: [{ name: 'Льняное', note: 'омега-3 для мембран митохондрий' }],
  },
  {
    id: 'digestion', name: 'Пищеварение', hint: 'вздутие, нерегулярный стул',
    frameTitle: 'Тяжесть после еды — сигнал перегрузки.',
    frameBody: 'Когда желчь и ферменты не справляются с жирами, а микробиоте не хватает постбиотиков, появляются вздутие, нерегулярный стул и тяжесть после еды.',
    horizon: '3–6 недель — спокойнее пищеварение, меньше вздутия.',
    oils: [{ name: 'Расторопша', note: 'силимарин, отток желчи' }],
  },
  {
    id: 'nerves', name: 'Нервы', hint: 'тревога, плохой сон, снижение концентрации',
    frameTitle: 'Спокойствие держится на стабильных мембранах нейронов.',
    frameBody: 'Сон, концентрация и спокойствие зависят от нейромедиаторов и устойчивых мембран нервных клеток. При нехватке материала труднее расслабиться вечером и удерживать фокус днём.',
    horizon: '4–8 недель — глубже сон, устойчивее внимание.',
    oils: [{ name: 'Чёрный тмин', note: 'мягкое успокоение без дневной сонливости' }],
  },
  {
    id: 'immune', name: 'Иммунитет', hint: 'частые простуды, аллергии',
    frameTitle: 'Иммунным клеткам нужен материал, чтобы отвечать быстро.',
    frameBody: 'Чтобы вовремя отвечать на вирусы и аллергены, иммунным клеткам нужны минералы и аминокислоты. При дефиците ответ замедляется, а восстановление затягивается.',
    horizon: '6–10 недель — реже простуды, мягче аллергические реакции.',
    oils: [{ name: 'Чёрный тмин', note: 'тимохинон, иммунный вектор' }],
  },
];

/* ── Step 2 · refinement (how long the symptom has been present) ── */
const DUR = [
  { id: 'lt1', label: 'Меньше года', note: 'Симптом недавний — эффект обычно наступает в начале горизонта.' },
  { id: '1to3', label: '1–3 года', note: 'Симптом закрепился — ориентируйтесь на середину горизонта.' },
  { id: 'gt3', label: 'Больше трёх лет', note: 'Симптом застарелый — рассчитывайте на верхнюю границу горизонта и повтор курса.' },
];

const FOUNDATION_NOTE = 'Минеральный и белковый уровень, 30 дней. Материал, из которого клетки строят себя каждый день.';

/* ── Step 3 · result ── */
function ResultCard({ cat, dur, cart, onAddSet, resRef }) {
  const setIds = ['foundation', ...cat.oils.map((o) => 'oil-' + cat.id + '-' + o.name)];
  const inCart = setIds.every((id) => cart.some((c) => c.id === id));

  const addSet = () => onAddSet([
    { id: 'foundation', name: 'Foundation' },
    ...cat.oils.map((o) => ({ id: 'oil-' + cat.id + '-' + o.name, name: o.name })),
  ]);

  return (
    <div className="result" ref={resRef}>
      {/* diagnostic frame */}
      <div className="res-block">
        <div className="res-eyebrow">Диагностическая рамка</div>
        <div className="res-state">{cat.frameTitle}</div>
        <p className="res-frame-body">{cat.frameBody}</p>
      </div>

      {/* horizon */}
      <div className="res-block horizon">
        <div className="step-tag">Горизонт</div>
        <p className="hz-main">{cat.horizon}</p>
        {dur && <p className="hz-note">{dur.note}</p>}
      </div>

      {/* protocol */}
      <div className="res-block">
        <div className="step-tag">Протокол</div>
        <div className="proto">
          <div className="proto-row core">
            <div className="pr-name">Foundation</div>
            <div className="pr-note">
              <span className="pr-tag">Основа · всегда</span>
              {FOUNDATION_NOTE}
            </div>
          </div>
          {cat.oils.map((o) =>
            <div className="proto-row" key={o.name}>
              <div className="pr-name">{o.name}</div>
              <div className="pr-note">
                <span className="pr-tag">Инструмент</span>
                {o.note}
              </div>
            </div>
          )}
        </div>
        <div className="proto-foot">
          <span className="price">Набор · {PRICE}</span>
          <button className={'btn-sm solid' + (inCart ? ' added' : '')} onClick={addSet}>
            {inCart ? 'Набор в корзине ✓' : 'Собрать набор'}
          </button>
        </div>
      </div>
    </div>);

}

/* ── Sticky cart ── */
function CartBar({ cart, onRemove }) {
  return (
    <div className={'cart-bar' + (cart.length ? ' show' : '')}>
      <div className="cart-inner">
        <div className="cart-items">
          {cart.map((c) =>
            <span className="ci" key={c.id}>
              <span className="dot"></span>{c.name}
              <button onClick={() => onRemove(c.id)} aria-label={'Убрать ' + c.name}>×</button>
            </span>
          )}
        </div>
        <div className="cart-right">
          <span className="cart-total">Итого · <b>{PRICE}</b></span>
          <button className="btn-sm solid">Оформить заказ</button>
        </div>
      </div>
    </div>);

}

/* ── Act IV container ── */
function Acquire() {
  const [step, setStep] = useFlowState(1);
  const [catIx, setCatIx] = useFlowState(null);
  const [durIx, setDurIx] = useFlowState(null);
  const [cart, setCart] = useFlowState([]);
  const resRef = useFlowRef(null);

  const addSet = (items) => {
    setCart((prev) => {
      const next = [...prev];
      items.forEach((it) => { if (!next.some((c) => c.id === it.id)) next.push(it); });
      return next;
    });
  };
  const removeItem = (id) => setCart((prev) => prev.filter((c) => c.id !== id));

  const pickCat = (i) => { setCatIx(i); setDurIx(null); setStep(2); };
  const pickDur = (i) => { setDurIx(i); setStep(3); };

  useFlowEffect(() => {
    if (step === 3 && resRef.current) {
      const y = resRef.current.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [step, durIx]);

  const cat = catIx == null ? null : CATS[catIx];
  const dur = durIx == null ? null : DUR[durIx];

  return (
    <React.Fragment>
      {/* Recognition intro */}
      <section className="ep pad" id="recognition" data-screen-label="05 Узнавание">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="mono">Узнавание</span>
            <h2>Если узнаёте себя хотя бы в одном</h2>
            <p className="sh-sub">Это не диагнозы. Это сигналы, что клеткам не хватает правильного материала.</p>
          </div>
          <div className="recog-grid reveal d1">
            {RECOG.map((r, i) =>
              <a className="recog-card" href="#quiz" key={i}>
                <span className="rn">{String(i + 1).padStart(2, '0')}</span>
                <span className="st">{r.st}</span>
                <span className="cc">{r.cc}</span>
              </a>
            )}
          </div>
          <div className="recog-foot reveal">
            <p>Узнали себя? Найдём, чего не хватает именно вашему организму — за два шага.</p>
            <a className="btn-sm" href="#quiz">Пройти подбор <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      {/* 3-step quiz */}
      <section className="ep pad" id="quiz" data-screen-label="06 Квиз">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="mono">Персональный подбор</span>
            <h2>Чего не хватает именно вам?</h2>
            <p className="sh-sub">Foundation — всегда основа. Моно-масло — точечное усиление под ваш запрос.</p>
          </div>

          {/* breadcrumb */}
          <div className="step-crumb reveal">
            <span className={'cr' + (step === 1 ? ' on' : ' done')}>01 · Состояние{cat ? ' — ' + cat.name : ''}</span>
            <span className="sep">/</span>
            <span className={'cr' + (step === 2 ? ' on' : step > 2 ? ' done' : '')}>02 · Уточнение{dur ? ' — ' + dur.label.toLowerCase() : ''}</span>
            <span className="sep">/</span>
            <span className={'cr' + (step === 3 ? ' on' : '')}>03 · Протокол</span>
          </div>

          {/* Step 1 · category */}
          {step === 1 &&
            <div className="quiz-grid reveal d1">
              {CATS.map((c, i) =>
                <button className="qbtn" key={c.id} aria-pressed={catIx === i} onClick={() => pickCat(i)}>
                  <span className="qn">{c.name}</span>
                  <span className="qh">{c.hint}</span>
                </button>
              )}
            </div>
          }

          {/* Step 2 · refinement */}
          {step === 2 && cat &&
            <div>
              <p className="step-note" style={{ maxWidth: '46ch' }}>
                Как давно вы замечаете это состояние? Это уточняет горизонт эффекта.
              </p>
              <div className="dur-row">
                {DUR.map((d, i) =>
                  <button className="durbtn" key={d.id} aria-pressed={durIx === i} onClick={() => pickDur(i)}>
                    <span className="dl">{d.label}</span>
                  </button>
                )}
              </div>
              <button className="qback" onClick={() => setStep(1)}>← Назад к состояниям</button>
            </div>
          }

          {/* Step 3 · result */}
          {step === 3 && cat &&
            <div>
              <ResultCard cat={cat} dur={dur} cart={cart} onAddSet={addSet} resRef={resRef} />
              <button className="qback" onClick={() => setStep(2)}>← Изменить уточнение</button>
            </div>
          }
        </div>
      </section>

      <CartBar cart={cart} onRemove={removeItem} />
    </React.Fragment>);

}

window.Acquire = Acquire;

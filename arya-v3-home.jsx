// arya-v3-home.jsx — ARYA homepage v3. Новая архитектура:
// Hero → Философия (один экран) → Foundation как продукт → Подбор по состояниям
// → Восемь масел (карточки с рендерами) → Производство (коротко) → Финальный CTA.

const { useState, useEffect, useRef } = React;

/* ── daylight reveal ── */
function useReveal() {
  useEffect(() => {
    const finalize = (el) => {
      el.style.transition = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    };
    const reveal = (el) => {
      el.classList.add('in');
      setTimeout(() => finalize(el), 1300);
    };
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) reveal(el);
      });
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {check();ticking = false;});
    };
    check();
    requestAnimationFrame(check);
    const t = setTimeout(check, 200);
    const iv = setInterval(check, 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      clearTimeout(t); clearInterval(iv);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}

function useProgress() {
  useEffect(() => {
    const bar = document.getElementById('progress');
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? h.scrollTop / max * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

/* ── Header ── */
function Header() {
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const onScroll = () => setLit(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={'nav' + (lit ? ' lit' : '')}>
      <span className="mk">ARYA</span>
      <nav className="links">
        <a href="#foundation">Foundation</a>
        <a href="#oils">Масла</a>
        <a href="#press">Производство</a>
        <a href="#quiz" className="cart">Подбор</a>
      </nav>
    </header>);

}

/* ── 01 · HERO — как в текущей версии ── */
function Hero() {
  return (
    <section className="ep hero" id="hero" data-screen-label="01 Hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="mono reveal">ARYA · НУТРИТИВНАЯ АРХИТЕКТУРА</div>
            <h1 className="reveal d1" style={{ marginTop: '1.2rem' }}>
              Каждый день вы выбираете, из чего строится ваше тело.
            </h1>
            <p className="sub reveal d2">
              Через месяц вы состоите из того, что съедите сегодня.
            </p>
            <div className="act reveal d3">
              <a href="#philosophy" className="btn">Узнать почему <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <figure className="plate hero-plate has-photo reveal d1" data-mode="Daylight">
            <img className="ph" src="assets/photo-hero.png" alt="Бутылка ARYA Foundation в дневном свете" />
            <span className="cap">BOTTLE IN NORTH LIGHT · COLD-PRESSED · VAST WARM-WHITE MARGIN</span>
          </figure>
        </div>
      </div>
    </section>);

}

/* ── 02 · ФИЛОСОФИЯ — один экран вместо трёх принципов ── */
function Philosophy() {
  const facts = [
    ['Мембраны клеток', 'жиры'],
    ['Гормоны', 'жиры'],
    ['Мозг', '60% жиров'],
    ['Оболочка нервов', 'миелин / жиры'],
  ];
  return (
    <section className="ep philo" id="philosophy" data-screen-label="02 Философия">
      <div className="wrap">
        <div className="philo-grid">
          <div className="philo-copy">
            <span className="mono reveal">Принцип системы</span>
            <p className="philo-big reveal d1">Тело собирается заново. Каждый день.</p>
            <p className="philo-sub reveal d2">
              Клетки крови — за четыре месяца. Кожа — за месяц.
              Мембраны, гормоны, мозг — всё строится из жиров.
              Тех самых, что вы съели вчера.
            </p>
            <p className="philo-bridge reveal d3">Масло определяет качество этой архитектуры.</p>
          </div>
          <div className="philo-side">
            <figure className="plate philo-plate has-photo reveal d1" data-mode="Material">
              <img className="ph" src="assets/photo-macro.png" alt="Макро: пузырьки масла" />
            </figure>
            <ul className="facts reveal d2">
              {facts.map(([k, v]) =>
                <li key={k}><span className="fk">{k}</span><span className="fv">{v}</span></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>);

}

/* ── 03 · FOUNDATION — как продукт ── */
function FoundationProduct() {
  const compo = [
    { nm: 'Тыква', pc: 45, c: '#B98428' },
    { nm: 'Кунжут', pc: 25, c: '#8A8F7E' },
    { nm: 'Миндаль', pc: 20, c: '#C9C2B2' },
    { nm: 'Фундук', pc: 10, c: '#6E6A5C' },
  ];
  return (
    <section className="ep fnd2" id="foundation" data-screen-label="03 Foundation">
      <div className="wrap">
        <div className="fnd2-grid">
          <div className="fnd2-copy">
            <span className="mono fnd2-eyebrow reveal">FOUNDATION · НАЧАЛО СИСТЕМЫ</span>
            <h2 className="fnd2-big reveal d1">Foundation — основа вашего рациона.</h2>
            <p className="fnd2-concept reveal d2">
              Ферментированный порошок из семян. Активирует оба антиоксидантных
              контура клетки — цитоплазматический и митохондриальный.
              <em> Через еду. Не через таблетки.</em>
            </p>

            <div className="fnd2-compo reveal d2">
              <div className="fnd2-label">Состав</div>
              <div className="compo-bar" role="img" aria-label="Состав: Тыква 45%, Кунжут 25%, Миндаль 20%, Фундук 10%">
                {compo.map((s) =>
                  <div className="compo-seg" key={s.nm} style={{ width: s.pc + '%', background: s.c }}></div>
                )}
              </div>
              <div className="compo-legend">
                {compo.map((s) =>
                  <div className="lg" key={s.nm}>
                    <span className="sw" style={{ background: s.c }}></span>
                    <span className="ln">{s.nm}</span>
                    <span className="pc">{s.pc}%</span>
                  </div>
                )}
              </div>
            </div>

            <div className="fnd2-rows reveal d3">
              <div className="fr"><span className="frk">Пять минералов</span><span className="frv">Zn · Ca · Mg · Mn · Fe — в биодоступной форме</span></div>
              <div className="fr"><span className="frk">Полный белок</span><span className="frv">метионин из кунжута + лизин из миндаля</span></div>
              <div className="fr"><span className="frk">Ритуал</span><span className="frv">одна ложка в день · курс 30 дней · первый эффект через 14</span></div>
            </div>

            <div className="fnd2-cta reveal d3">
              <div className="cta-meta">
                <span className="fnd2-name">Foundation</span>
                <span className="fnd2-spec">30 порций · {V3_PRICE}</span>
              </div>
              <a href="#quiz" className="btn btn-inverse">Начать курс <span aria-hidden="true">→</span></a>
            </div>
          </div>

          <figure className="fnd2-photo reveal d1">
            <img src="assets/photo-foundation.png" alt="ARYA Foundation — пакет и порошок" />
            <figcaption className="mono">FOUNDATION · POWDER · 30 DAY COURSE</figcaption>
          </figure>
        </div>
      </div>
    </section>);

}

/* ── 06 · ПРОИЗВОДСТВО — коротко ── */
function Production() {
  const steps = [
    { no: '01', h: 'Сырьё', img: 'assets/prod-seeds.png', p: 'Отобранные семена. Партии проверяются перед каждой закладкой.' },
    { no: '02', h: 'Отжим', img: 'assets/prod-press.png', p: 'Механический пресс, не выше 27 °C. Первый отжим — единственный.' },
    { no: '03', h: 'Хранение', img: 'assets/prod-bottles.png', p: 'Тёмное толстое стекло, холод. Короткий срок жизни — потому что масло живое.' },
  ];
  return (
    <section className="ep pad" id="press" data-screen-label="06 Производство">
      <div className="wrap">
        <div className="press-head reveal">
          <span className="mono">Как это сделано</span>
          <h2>Мы контролируем три вещи. Остального нет.</h2>
        </div>
        <div className="steps steps-photo">
          {steps.map((s, i) =>
            <div className={'step reveal d' + (i + 1)} key={s.no}>
              <span className="step-img"><img src={s.img} alt={s.h} /></span>
              <div className="no">{s.no}</div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </div>
          )}
        </div>
        <p className="press-final reveal">Нечего добавить. Нечего убрать.</p>
      </div>
    </section>);

}

/* ── 07 · Финальный CTA ── */
function Invitation() {
  return (
    <section className="ep invite" id="invite" data-screen-label="07 Финальный CTA">
      <div className="wrap reveal">
        <span className="mono">Когда будете готовы</span>
        <h2>Начать легко. Тело сделает остальное.</h2>
        <div className="act invite-act">
          <a href="#foundation" className="btn">Начать курс Foundation <span aria-hidden="true">→</span></a>
          <a href="#quiz" className="btn btn-ghost">Пройти подбор</a>
        </div>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer className="foot" data-screen-label="Footer">
      <div className="wrap">
        <div className="foot-grid">
          <span className="mk">ARYA</span>
          <div className="cols">
            <div className="col">
              <h6>Масла</h6>
              <a href="#oils">Льняное</a><a href="#oils">Кунжутное</a>
              <a href="#oils">Тыквенное</a><a href="#oils">Чёрный тмин</a>
            </div>
            <div className="col">
              <h6>Дом</h6>
              <a href="#foundation">Foundation</a><a href="#press">Производство</a>
              <a href="#quiz">Подбор</a>
            </div>
            <div className="col">
              <h6>Кабинет</h6>
              <a href="#invite">Приобрести</a><a href="#">Где купить</a><a href="#">Связаться</a>
            </div>
          </div>
        </div>
        <div className="legal">
          <span>ARYA · Масла холодного отжима</span>
          <span>Дневной свет на честном объекте · 2026</span>
        </div>
      </div>
    </footer>);

}

/* ── App: корзина общая для подбора и масел ── */
function Home() {
  useReveal();
  useProgress();
  const [cart, setCart] = useState([]);
  const addSet = (items) => {
    setCart((prev) => {
      const next = [...prev];
      items.forEach((it) => { if (!next.some((c) => c.id === it.id)) next.push(it); });
      return next;
    });
  };
  const addOne = (item) => addSet([item]);
  const removeItem = (id) => setCart((prev) => prev.filter((c) => c.id !== id));

  return (
    <React.Fragment>
      <Header />
      <Hero />
      <Philosophy />
      <FoundationProduct />
      <window.StatesSection cart={cart} onAddSet={addSet} />
      <window.OilsSection cart={cart} onAdd={addOne} />
      <Production />
      <Invitation />
      <Footer />
      <window.CartBar cart={cart} onRemove={removeItem} />
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<Home />);

/* ── Tweaks ── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "paper": "#F5F2EC",
  "structural": "#6E7468",
  "headline": "Каждый день вы выбираете, из чего строится ваше тело.",
  "foundationDark": true,
  "motion": true
} /*EDITMODE-END*/;

function AryaTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--paper', t.paper);
    root.style.setProperty('--structural', t.structural);
    document.body.classList.toggle('no-motion', !t.motion);
    document.body.classList.toggle('fnd-light', !t.foundationDark);
  }, [t]);
  useEffect(() => {
    const h = document.querySelector('.hero h1');
    if (!h) return;
    const txt = (t.headline || '').trim();
    if (txt) h.textContent = txt;
  }, [t.headline]);
  return (
    <TweaksPanel>
      <TweakSection label="Daylight ground" />
      <TweakColor label="Paper" value={t.paper}
      options={['#F5F2EC', '#F3EFE6', '#F2F1ED', '#F6F1E8']}
      onChange={(v) => setTweak('paper', v)} />
      <TweakSection label="Structural accent" />
      <TweakColor label="Accent" value={t.structural}
      options={['#6E7468', '#7C8470', '#6A6A5E', '#5C594F']}
      onChange={(v) => setTweak('structural', v)} />
      <TweakSection label="Foundation" />
      <TweakToggle label="Тёмная секция" value={t.foundationDark}
      onChange={(v) => setTweak('foundationDark', v)} />
      <TweakSection label="Заголовок hero" />
      <TweakText label="Строка" value={t.headline}
      onChange={(v) => setTweak('headline', v)} />
      <TweakSection label="Motion" />
      <TweakToggle label="Daylight reveals" value={t.motion}
      onChange={(v) => setTweak('motion', v)} />
    </TweaksPanel>);

}
ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<AryaTweaks />);

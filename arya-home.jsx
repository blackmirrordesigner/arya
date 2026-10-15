// arya-home.jsx — ARYA homepage. Applies the approved Phase-2 visual language.
// Copy updated to the approved changes brief (all Russian). No new styles introduced
// beyond the additions declared in the HTML head.

const { useState, useEffect, useRef } = React;

/* ── daylight reveal: opacity + small drift, once, as it enters view ── */
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
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
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
        <a href="#invite" className="cart">Купить</a>
      </nav>
    </header>);

}

/* ── 1 · HERO — text-led (plate is a conceptual stand-in until real photography) ── */
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
              <a href="#principle-1" className="btn">Узнать почему <span aria-hidden="true">→</span></a>
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

/* ── 2 · ПРИНЦИП ПЕРВЫЙ — quiet statement, deep reveal far below ── */
function Statement() {
  return (
    <section className="ep principle quiet" id="principle-1" data-screen-label="02 Принцип первый">
      <div className="wrap">
        <span className="mono reveal">Принцип первый</span>
        <p className="big reveal d1">Тело собирается заново.</p>
        <p className="sub-line reveal d2">Каждый день. Из того, что вы съели вчера.</p>
        <div className="deep reveal">
          <p>Клетки крови — за четыре месяца. Кожа — за месяц. Кости — за десять лет.</p>
          <p className="ds">Тело, которое сейчас читает эту строку, отличается от того, что было год назад.</p>
        </div>
      </div>
    </section>);

}

/* ── 3 · ПРИНЦИП ВТОРОЙ — macro scene, one line, then reveal + bridge ── */
function TheObject() {
  return (
    <section className="ep principle" id="principle-2" data-screen-label="03 Принцип второй">
      <div className="wrap">
        <div className="mono reveal" style={{ marginBottom: '20px' }}>Принцип второй</div>
        <figure className="plate material scene-plate has-photo reveal d1" data-mode="Material">
          <img className="ph" src="assets/photo-macro.png" alt="Макро: пузырьки масла" />
          <span className="cap">MACRO · OIL THROUGH HEAVY GLASS · BACKLIT · REFRACTION</span>
        </figure>
        <h2 className="scene-line reveal d1">Из чего вы построены.</h2>
        <div className="scene-deep">
          <p className="ex reveal">
            Мембраны клеток. Оболочка нервов. Шестьдесят процентов мозга.{' '}
            <strong>Всё — жиры.</strong> Те самые, что вы съели вчера.
          </p>
          <ul className="facts reveal d1">
            <li><span className="fk">Мембраны клеток</span><span className="fv">жиры</span></li>
            <li><span className="fk">Гормоны</span><span className="fv">жиры</span></li>
            <li><span className="fk">Мозг</span><span className="fv">60% жиров</span></li>
            <li><span className="fk">Оболочка нервов</span><span className="fv">миелин / жиры</span></li>
          </ul>
        </div>
        <p className="bridge reveal">Масло определяет качество этой архитектуры.</p>
      </div>
    </section>);

}

/* ── 4 · ПРИНЦИП ТРЕТИЙ — seed scene, one line, then reveal + bridge to Foundation ── */
function MaterialMoment() {
  return (
    <section className="ep principle" id="principle-3" data-screen-label="04 Принцип третий">
      <div className="wrap">
        <div className="seed-grid">
          <div className="seed-copy">
            <div className="mono reveal" style={{ marginBottom: '24px' }}>Принцип третий</div>
            <p className="seed-line reveal d1">Одно семя — две формы.</p>
            <p className="seed-sub reveal d2">
              В масле — жиры, витамины, аромат. В плотной фракции — белок, минералы, клетчатка.
            </p>
          </div>
          <figure className="plate seed-plate has-photo reveal d1" data-mode="Daylight">
            <img className="ph" src="assets/photo-seed.png" alt="Раскрытое семя: масло и плотная фракция" />
            <span className="cap">SPLIT SEED · TEXTURE &amp; OIL DROP · SOFT DAYLIGHT</span>
          </figure>
        </div>
        <div className="seed-deep">
          <p className="ex reveal">
            Первый пресс отдаёт масло. Плотная фракция после пресса через ферментацию
            отдаёт второй слой — минералы, белок, постбиотики.
          </p>
          <p className="curio reveal d1">Так рождается Foundation.</p>
        </div>
      </div>
    </section>);

}

/* ── 9 · ПРОИЗВОДСТВО (rework of the Press section; also carries trust after Origin removal) ── */
function Proizvodstvo() {
  const steps = [
  { no: '01', h: 'Сырьё', p: 'Отобранные семена. Партии проверяются перед каждой закладкой. Никаких смесей неизвестного происхождения.' },
  { no: '02', h: 'Отжим', p: 'Механический пресс, температура не выше 27 °C. Первый отжим — единственный. Второго не бывает.' },
  { no: '03', h: 'Хранение', p: 'Тёмное толстое стекло. Холодильная камера. Короткий срок жизни — потому что живое масло не может лежать годами.' }];

  return (
    <section className="ep pad" id="press" data-screen-label="09 Производство">
      <div className="wrap">
        <div className="press-head reveal">
          <span className="mono">Как это сделано</span>
          <h2>Мы контролируем три вещи. Остального нет.</h2>
        </div>
        <div className="steps">
          {steps.map((s, i) =>
          <div className={'step reveal d' + (i + 1)} key={s.no}>
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

/* ── 10 · ПРИГЛАШЕНИЕ (close, leads to Foundation) ── */
function Invitation() {
  return (
    <section className="ep invite" id="invite" data-screen-label="10 Приглашение">
      <div className="wrap reveal">
        <span className="mono">Когда будете готовы</span>
        <h2>Начать легко. Тело сделает остальное.</h2>
        <div className="act">
          <a href="#foundation" className="btn">Начать курс Foundation <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>);

}

/* ── Footer ── */
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
              <a href="#oils">Масло</a>
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

/* ── progress bar ── */
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

function Home() {
  useReveal();
  useProgress();
  return (
    <React.Fragment>
      <Header />
      <Hero />
      <Statement />
      <TheObject />
      <MaterialMoment />
      <window.Acquire />
      <window.FoundationSection />
      <window.OilsSection />
      <Proizvodstvo />
      <Invitation />
      <Footer />
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<Home />);

/* ── Tweaks (high-impact language values; hidden when Tweaks is off) ── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "paper": "#F5F2EC",
  "structural": "#6E7468",
  "headline": "Каждый день вы выбираете, из чего строится ваше тело.",
  "notesDefault": false,
  "motion": true
} /*EDITMODE-END*/;

function AryaTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--paper', t.paper);
    root.style.setProperty('--structural', t.structural);
    document.body.classList.toggle('no-motion', !t.motion);
  }, [t]);
  // headline override (plain text into the hero h1)
  useEffect(() => {
    const h = document.querySelector('.hero h1');
    if (!h) return;
    const txt = (t.headline || '').trim();
    if (!txt) return;
    h.textContent = txt;
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
      <TweakSection label="Заголовок hero" />
      <TweakText label="Строка" value={t.headline}
      onChange={(v) => setTweak('headline', v)} />
      <TweakSection label="Motion" />
      <TweakToggle label="Daylight reveals" value={t.motion}
      onChange={(v) => setTweak('motion', v)} />
    </TweaksPanel>);

}
ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<AryaTweaks />);

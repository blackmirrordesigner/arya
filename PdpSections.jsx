/* global React, MiniBottle, PRODUCT */
/* ARYA · Linseed PDP — body sections */

function TrustStrip() {
  const stats = [
  { v: <>38<sup>°</sup></>, l: 'Максимум при отжиме. Семена не теряют структуру жирных кислот.' },
  { v: '7', l: 'Дней от пресса до пломбы. Кислород не успевает войти в масло.' },
  { v: '0', l: 'Консервантов, ароматизаторов и осветлителей. Только семя и пресс.' },
  { v: '100', l: 'Миллилитров в одной бутылке. Расход — 30 дней при чайной ложке в день.' }];

  return (
    <section className="trust">
      <div className="container">
        <ul className="trust__row">
          {stats.map((s, i) =>
          <li key={i} className="trust__cell">
              <div className="trust__v">{s.v}</div>
              <div className="trust__l">{s.l}</div>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

function Benefits() {
  const items = [
  {
    n: '01',
    h: <>Возвращает <em>гладкость</em> мембраны клетки.</>,
    b: 'Омега-3 ALA встраивается в клеточные стенки. Кожа становится мягче на ощупь — не от крема, а изнутри. Через две недели.'
  },
  {
    n: '02',
    h: <>Тихий <em>гормональный</em> ритм.</>,
    b: 'Жиры — материал, из которого тело строит половые гормоны. Циклы становятся ровнее, ПМС теряет резкость. Это не лечение. Это материал.'
  },
  {
    n: '03',
    h: <>Утренняя <em>ясность</em> вместо тумана.</>,
    b: 'Шестьдесят процентов мозга — жир. Когда жиры свежие, мысли становятся чище к одиннадцати утра, а не к трём пополудни.'
  },
  {
    n: '04',
    h: <>Кишечник, <em>который</em> молчит.</>,
    b: 'Слизистая кишечника обновляется каждые пять дней. Жиры участвуют в этой стройке. Вздутие после еды уходит на третьей неделе.'
  },
  {
    n: '05',
    h: <>Длинные <em>сны</em> без обрывов.</>,
    b: 'ALA — субстрат для построения миелиновых оболочек нервных волокон. Сон становится плотнее, без четырёх утра.'
  },
  {
    n: '06',
    h: <>Меньше <em>ломкости</em> в волосах и ногтях.</>,
    b: 'Кератин нуждается в липидах. Через сорок дней ногти растут без слоения. Волосы — не блестят, а становятся тяжелее. Это другое.'
  }];

  return (
    <section className="section benefits" style={{ lineHeight: "1.45", letterSpacing: "0px", fontSize: "23px" }}>
      <div className="container" style={{ fontSize: "15px" }}>
        <div className="head">
          <div className="head__eyebrow">
            <span className="num">N° 02</span>
            <span className="lbl">Что меняется в теле</span>
          </div>
          <h2 className="head__h" style={{ width: "1023px", fontSize: "54px" }}>Что люди начинают замечать.<br />Материал, из которого тело <em>строит себя.</em></h2>
          <p className="head__lead" style={{ fontSize: "43px", margin: "50.0703px", borderWidth: "0px", borderStyle: "solid", borderRadius: "0px", padding: "7.91797px", opacity: "2.26", width: "743px", height: "4px" }}>
            Льняное масло — не лекарство и не добавка. Это сырьё. Тело само решает,
            что с ним делать. Мы наблюдаем, что происходит у людей, которые ввели
            чайную ложку в утренний ритуал и не пропустили сорок дней.
          </p>
        </div>

        <div className="benefits__grid">
          {items.map((it, i) =>
          <article key={i} className="benefit">
              <div className="benefit__num">N° {it.n}</div>
              <h3 className="benefit__name">{it.h}</h3>
              <p className="benefit__body">{it.b}</p>
            </article>
          )}
        </div>
      </div>
    </section>);

}

function PullQuote() {
  return (
    <section className="pull">
      <div className="container">
        <div className="pull__inner">
          <div className="pull__mark">— Принцип ARYA</div>
          <p className="pull__quote">
            <em>Тело строится из жиров.</em> Когда жиры правильные —
            тело восстанавливает себя само.
          </p>
          <div className="pull__attr">N° 04 · Linum usitatissimum</div>
        </div>
      </div>
    </section>);

}

function Production() {
  const steps = [
  { h: <>Семя <em>прошлой осени</em></>, b: 'Урожай 2025 года, ферма в Хынчештах. Сорт «Молдова-2» — мелкое золотистое зерно, на 47–55% состоящее из жира.' },
  { h: <>Сухое <em>хранение</em> до пресса</>, b: 'Семя дозревает шесть недель в дубовых ульях при 14°C. Без сушки горячим воздухом. Без обработки.' },
  { h: <>Один <em>проход</em>. До 38°C</>, b: 'Шнековый пресс с водяной рубашкой. Один медленный проход. Температура внутри камеры не поднимается выше 38°C.' },
  { h: <>Семь дней <em>отстоя</em></>, b: 'Масло отстаивается в стеклянных колоннах в темноте. Без фильтров с активированным углём. Без отбеливания.' },
  { h: <>Marasca, <em>пломба</em>, дата</>, b: 'Розлив через семь дней после пресса. Тёмное стекло Marasca. На дне каждой бутылки — дата отжима.' }];

  return (
    <section className="section section--secondary production">
      <div className="container">
        <div className="head">
          <div className="head__eyebrow">
            <span className="num">N° 03</span>
            <span className="lbl">Семя · пресс · бутылка</span>
          </div>
          <h2 className="head__h">Пять шагов <em>от поля</em> до пломбы.</h2>
        </div>
        <div className="production__grid">
          <div className="production__media">
            <div className="production__media-caption">Цех ARYA · Хынчешты · апрель 2026</div>
          </div>
          <div className="production__copy">
            <p className="production__body">
              Льняное масло почти всегда испорчено к моменту, как его открыли.
              Окисленный жир — это не питание, это нагрузка. Мы переписали цепочку:
              урожай — пресс — бутылка — пломба за <em>семь дней</em>. Не позже.
            </p>
            <p className="production__body">
              Это значит: вы получаете масло, в котором ω-3 ALA сохранена в той же
              форме, в которой её сложило само растение. Не в окисленной. Не в перегретой.
              Не в очищенной. В <em>живой</em>.
            </p>
            <ol className="steps">
              {steps.map((s, i) =>
              <li key={i}>
                  <div>
                    <div className="steps__name">{s.h}</div>
                    <div className="steps__body">{s.b}</div>
                  </div>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>);

}

function HowTo() {
  const cells = [
  {
    time: 'Утро · 07:30',
    h: 'Натощак',
    qty: '1 чайная ложка',
    b: 'Под язык, медленно. Затем стакан тёплой воды через десять минут. Это якорь для сорока дней.'
  },
  {
    time: 'Полдень · 13:00',
    h: 'В тарелке',
    qty: '1–2 столовых ложки',
    b: 'Холодная подача: салат, творог, греческий йогурт, гречневая каша. Никогда не нагревать.'
  },
  {
    time: 'Вечер · 21:00',
    h: 'На кожу',
    qty: '2–3 капли',
    b: 'На ладонь, разогреть, нанести на сухие участки — локти, кутикула, виски. Перед сном.'
  }];

  return (
    <section className="section">
      <div className="container">
        <div className="head">
          <div className="head__eyebrow">
            <span className="num">N° 04</span>
            <span className="lbl">Простой жест в утре</span>
          </div>
          <h2 className="head__h">Как пользоваться. <em>Три точки в&nbsp;дне.</em></h2>
          <p className="head__lead">
            Не курс. Не протокол. Простой жест, который встроен в утро. Через четыре дня
            рука находит бутылку сама. Это всё, что нужно.
          </p>
        </div>

        <div className="howto__grid">
          {cells.map((c, i) =>
          <div key={i} className="howto__cell">
              <div className="howto__time">{c.time}</div>
              <h3 className="howto__h">{c.h}</h3>
              <div className="howto__qty">{c.qty}</div>
              <p className="howto__body">{c.b}</p>
            </div>
          )}
        </div>

        <div className="howto__caveat">
          <div>
            <div className="howto__caveat-h">Важно</div>
            <p>
              Льняное масло <em>никогда не нагревать</em>. При температуре выше 50°C
              ω-3 ALA окисляется и теряет смысл. Жарить — на оливковом extra virgin.
              Лён — только в холодную тарелку и под язык.
            </p>
          </div>
          <div>
            <div className="howto__caveat-h">Если беременность · кормление · приём лекарств</div>
            <p>
              Льняное масло обладает мягким разжижающим действием. Если вы принимаете
              антикоагулянты — посоветуйтесь со своим врачом. <em>Это не лечение.</em>
              ARYA не заменяет рекомендаций специалиста.
            </p>
          </div>
        </div>
      </div>
    </section>);

}

function Taste() {
  const rows = [
  { label: 'Ореховость', value: 78, hint: 'Кедр, грецкий орех' },
  { label: 'Травянистость', value: 62, hint: 'Свежескошенная трава' },
  { label: <>Горечь <em>в&nbsp;конце</em></>, value: 22, hint: 'Едва уловима' },
  { label: 'Сладость', value: 18, hint: 'Тонкая, как у злака' },
  { label: 'Жирность', value: 88, hint: 'Плотная, бархатная' }];

  return (
    <section className="section taste">
      <div className="container">
        <div className="head">
          <div className="head__eyebrow">
            <span className="num">N° 05</span>
            <span className="lbl">Чем пахнет, чем звучит</span>
          </div>
          <h2 className="head__h">Профиль вкуса. <em>Тихий и&nbsp;узнаваемый.</em></h2>
        </div>

        <div className="taste__inner">
          <div className="taste__intro">
            <p>
              Свежевыжатое льняное масло пахнет <em>сухой травой и кедром</em>. На языке —
              плотное, обволакивающее, с тонкой ореховой нотой и едва уловимой
              горчинкой в самом конце глотка.
            </p>
            <p>
              Если масло горчит сильно или пахнет рыбой — оно окислено и его нужно
              выбросить. Свежий лён <em>никогда</em> не пахнет рыбой.
            </p>

            <h3>Куда оно подходит</h3>
            <p>
              К зелёным салатам, к творогу с чёрным перцем, к печёной свёкле,
              к гречневой каше с маслом. К тарелке хумуса. К простому хлебу с солью.
            </p>

            <div className="taste__pairs">
              <div className="taste__pairs-h">Сочетается с</div>
              <ul className="taste__pairs-list">
                <li>творог</li>
                <li>гречка</li>
                <li>свёкла <em>печёная</em></li>
                <li>зелёный салат</li>
                <li>хумус</li>
                <li>чёрный хлеб</li>
                <li>яйцо <em>всмятку</em></li>
                <li>авокадо</li>
              </ul>
            </div>
          </div>

          <div className="taste__chart">
            {rows.map((r, i) =>
            <div key={i} className="taste__row">
                <div className="taste__label">{r.label}</div>
                <div>
                  <div className="taste__bar">
                    <div className="taste__bar-ticks">
                      {[0, 1, 2, 3, 4].map((t) => <span key={t} />)}
                    </div>
                    <div className="taste__dot" style={{ left: `${r.value}%` }} />
                  </div>
                  <div className="taste__hint" style={{
                  marginTop: 8, fontSize: 12, color: 'var(--ash)',
                  letterSpacing: '0.06em', textTransform: 'uppercase'
                }}>{r.hint}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

function Storage() {
  const rules = [
  { h: <>В <em>холодильнике</em> после открытия.</>, v: '4–8°C' },
  { h: <>Использовать в течение <em>тридцати</em> дней.</>, v: '30 дней' },
  { h: <>Подальше от <em>прямого</em> света.</>, v: 'Темнота' },
  { h: <>Срок до открытия — <em>девять</em> месяцев.</>, v: '9 мес' },
  { h: <>Только <em>холодная</em> подача. Не нагревать.</>, v: '< 50°C' }];

  return (
    <section className="section storage">
      <div className="container">
        <div className="head">
          <div className="head__eyebrow">
            <span className="num">N° 06</span>
            <span className="lbl">Как сохранить</span>
          </div>
          <h2 className="head__h">Хранение. <em>Пять простых правил.</em></h2>
        </div>

        <div className="storage__grid">
          <ul className="storage__list">
            {rules.map((r, i) =>
            <li key={i}>
                <div className="storage__rule">{r.h}</div>
                <div className="storage__v">{r.v}</div>
              </li>
            )}
          </ul>
          <div className="storage__notes">
            <h4>Если вдруг забыли в&nbsp;шкафу</h4>
            <p>
              Откройте бутылку, понюхайте. Свежее льняное масло пахнет сухой травой
              и слегка ореховым семенем. <em>Запах рыбы или прогорклой краски</em> — знак
              окисления. Такое масло уже не питает, а нагружает. Выбрасывайте без сожаления.
            </p>
            <p>
              Тёмное стекло Marasca, в котором мы разливаем, держит масло в неизменном
              состоянии до девяти месяцев — но <em>только до открытия пломбы</em>. После — отсчёт идёт в днях.
            </p>
          </div>
        </div>
      </div>
    </section>);

}

function FAQ() {
  const [open, setOpen] = React.useState(0);
  const items = [
  {
    q: <>Чем льняное масло <em>отличается</em> от рыбьего жира?</>,
    a: [
    <>Льняное содержит ω-3 в форме ALA — растительного предшественника. Рыбий жир — в готовых формах EPA и DHA. Тело умеет конвертировать ALA в EPA и DHA на 5–15%, и эта конверсия зависит от состояния печени и достатка минералов.</>,
    <>Это значит: ALA — это <em>материал</em>. EPA/DHA — почти <em>готовый продукт</em>. ARYA не противопоставляет лён рыбе. Мы предлагаем лён как ежедневную базу — мягкую, растительную, без вкуса океана.</>]

  },
  {
    q: <>Можно ли давать детям?</>,
    a: [
    <>С трёх лет — половину чайной ложки в кашу или йогурт. До трёх лет — только после консультации с педиатром. Никогда — натощак на голодный желудок ребёнка.</>]

  },
  {
    q: <>Почему 100 ml, а не 250 или 500?</>,
    a: [
    <>Потому что льняное масло <em>живёт тридцать дней</em> после открытия. Большая бутылка не успевает закончиться до того, как масло начнёт окисляться. Сто миллилитров — это ровно один цикл при чайной ложке в день.</>]

  },
  {
    q: <>На дне бутылки осадок. Это нормально?</>,
    a: [
    <>Да. Лёгкий золотистый осадок — это белковая фракция семени, которая выпадает при отстаивании в холоде. Перед использованием просто <em>наклоните бутылку</em> несколько раз. Это знак нерафинированности, а не дефект.</>]

  },
  {
    q: <>Сочетается ли с другими маслами ARYA?</>,
    a: [
    <>Да. Лён хорошо сочетается с маслом семени тыквы (сила), маслом расторопши (печень), маслом чёрного тмина (иммунитет). Если хотите подобрать пару — пройдите подбор за 60 секунд.</>]

  },
  {
    q: <>Что делать, если не нравится вкус?</>,
    a: [
    <>Введите в творог с мёдом или в йогурт с ягодами — они смягчают вкус. Через десять дней рецепторы перестроятся. Если и тогда вкус остаётся неприятным — попробуйте масло тыквы или конопли. Они тоже богаты ω-3, но мягче на языке.</>]

  },
  {
    q: <>Доставка и возврат</>,
    a: [
    <>Доставка по Кишинёву — на следующий день, бесплатно от 600 lei. По Молдове — 1–2 дня. В Румынию — 3–5 дней. Возврат масла после вскрытия не принимается. Если бутылка пришла повреждённой — мы заменим без вопросов в течение 48 часов.</>]

  }];

  return (
    <section className="section section--secondary">
      <div className="container container--narrow">
        <div className="head">
          <div className="head__eyebrow">
            <span className="num">N° 07</span>
            <span className="lbl">Часто спрашивают</span>
          </div>
          <h2 className="head__h">Семь вопросов <em>и&nbsp;семь честных ответов.</em></h2>
        </div>
        <ul className="faq__list">
          {items.map((it, i) =>
          <li key={i} className={`faq__item ${open === i ? 'is-open' : ''}`}>
              <button className="faq__btn" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="faq__sign">+</span>
              </button>
              <div className="faq__panel">
                <div className="faq__panel-inner">
                  {it.a.map((p, j) => <p key={j} className="faq__a">{p}</p>)}
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

function Related() {
  const items = [
  {
    no: 'N° 03', label: 'TYK', latin: 'Cucurbita pepo',
    cat: 'Mono · Сила', accent: '#6F7253', dotClass: 'is-balance',
    name: <>Тыквенное<br /><em>семечко</em></>,
    latinFull: 'Cucurbita pepo',
    body: 'Цинк, магний, ω-6 в чистой форме. Партнёр льна по утреннему ритуалу.',
    price: '240 lei'
  },
  {
    no: 'N° 05', label: 'NIG', latin: 'Nigella sativa',
    cat: 'Mono · Иммунитет', accent: '#A57555', dotClass: 'is-digest',
    name: <>Чёрный<br /><em>тмин</em></>,
    latinFull: 'Nigella sativa',
    body: 'Тимохинон, эфирные масла. Острая нота. Пять капель утром в холодном виде.',
    price: '290 lei'
  },
  {
    no: 'N° 02', label: 'CAN', latin: 'Cannabis sativa',
    cat: 'Mono · Кожа', accent: '#C9A084', dotClass: 'is-skin',
    name: <>Конопляное<br /><em>семя</em></>,
    latinFull: 'Cannabis sativa',
    body: 'Идеальное соотношение ω-3 / ω-6 (1:3). Мягче льна, без горчинки.',
    price: '260 lei'
  }];

  return (
    <section className="section">
      <div className="container">
        <div className="head">
          <div className="head__eyebrow">
            <span className="num">N° 08</span>
            <span className="lbl">Подойдут рядом</span>
          </div>
          <h2 className="head__h">Три масла, <em>которые любят лён.</em></h2>
          <p className="head__lead">
            Жиры работают в системе, не в одиночку. Эти три масла мы рекомендуем
            добавить в ритуал, если вы прошли первые две недели на льне.
          </p>
        </div>

        <ul className="related__grid">
          {items.map((it, i) =>
          <li key={i} className="related__card">
              <div className="related__media">
                <span className={`related__dot ${it.dotClass}`}></span>
                <MiniBottle label={it.label} latin={it.latin} num={it.no} accent={it.accent} />
              </div>
              <div className="related__cat">
                <span className="num">{it.no}</span>{it.cat}
              </div>
              <h3 className="related__name">{it.name}</h3>
              <div className="related__latin">{it.latinFull}</div>
              <p className="related__body">{it.body}</p>
              <div className="related__row">
                <span className="related__price">{it.price}</span>
                <button className="related__cta">Открыть</button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

function ClosingCTA({ onAdd }) {
  return (
    <section className="closing">
      <div className="container">
        <div className="closing__inner">
          <div className="closing__eyebrow">N° 09 · Начните сегодня</div>
          <h2 className="closing__h">
            Сорок дней. <em>Одна чайная ложка.</em><br />
            Тело начнёт строить себя само.
          </h2>
          <p className="closing__lead">
            Сто миллилитров — ровно один цикл. К концу третьей недели вы перестанете
            замечать масло. Это и есть момент, когда оно начало работать.
          </p>
          <div className="closing__ctas">
            <button className="btn btn--primary closing__btn-primary" onClick={onAdd}>
              Добавить в корзину · 220 lei <span className="arr">→</span>
            </button>
            <button className="btn btn--ghost closing__btn-ghost">
              Подобрать пару за 60 секунд
            </button>
          </div>
        </div>
      </div>
    </section>);

}

function PdpFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand-row">
          <div>
            <div className="footer__wordmark">ARYA</div>
            <p className="footer__tag">
              Cold-pressed restoration system. Семя, пресс, тёмное стекло.
              Кишинёв · Хынчешты · Молдова.
            </p>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <div className="footer__h">Каталог</div>
              <ul>
                <li>Купажи</li>
                <li>Моно-масла</li>
                <li>Курс 40 дней</li>
                <li>Подбор</li>
              </ul>
            </div>
            <div className="footer__col">
              <div className="footer__h">Бренд</div>
              <ul>
                <li>О ARYA</li>
                <li>Производство</li>
                <li>Доставка</li>
                <li>Возврат</li>
              </ul>
            </div>
            <div className="footer__col">
              <div className="footer__h">Связь</div>
              <ul>
                <li>hello@arya.md</li>
                <li>t.me/arya_md</li>
                <li>@arya.md</li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="footer__rule" />
        <div className="footer__legal">
          <span>© 2026 ARYA · Кишинёв</span>
          <span>RU · RO · EN</span>
        </div>
      </div>
    </footer>);

}

window.TrustStrip = TrustStrip;
window.Benefits = Benefits;
window.PullQuote = PullQuote;
window.Production = Production;
window.HowTo = HowTo;
window.Taste = Taste;
window.Storage = Storage;
window.FAQ = FAQ;
window.Related = Related;
window.ClosingCTA = ClosingCTA;
window.PdpFooter = PdpFooter;
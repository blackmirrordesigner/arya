const { useState, useRef, useEffect } = React;

/* ── продукты: цена в рублях (база), slug для карточки, фото ── */
const PROD = {
  'Кунжутное':      { slug:'kunzhut',      img:'assets/oil-kunzhut.png',     rub:950,  task:'Печень и суставы' },
  'Льняное':        { slug:'len',          img:'assets/oil-len.png',         rub:850,  task:'Мозг и омега-3' },
  'Горчичное':      { slug:'gorchitsa',    img:null,                          rub:790,  task:'Пищеварение и тепло' },
  'Тыквенное':      { slug:'tykva',        img:'assets/oil-tykva.png',       rub:1450, task:'Простата и волосы' },
  'Чёрный тмин':    { slug:'tmin',         img:'assets/oil-tmin.png',        rub:1900, task:'Иммунитет и обмен' },
  'Амарантовое':    { slug:'amarant',      img:'assets/oil-amarant.png',     rub:2400, task:'Кожа и гормоны' },
  'Расторопша':     { slug:'rastoropsha',  img:'assets/oil-rastoropsha.png', rub:1100, task:'Проблемная кожа' },
  'Жмых расторопши':{ slug:'zhmykh',       img:null,                          rub:690,  task:'Печень и кишечник' },
  'Грецкий орех':   { slug:'orekh',        img:'assets/oil-orekh.png',       rub:1300, task:'Сердце и голова' },
  'Фундук':         { slug:'funduk',       img:'assets/oil-funduk.png',      rub:1500, task:'Самое мягкое' },
  'Подсолнечное':   { slug:'podsolnechnoe',img:null,                          rub:650,  task:'Сухая кожа, витамин Е' },
};
const OILS = ['Кунжутное','Льняное','Горчичное','Тыквенное','Чёрный тмин','Амарантовое','Расторопша','Грецкий орех','Фундук','Подсолнечное'];
const cardUrl = (n) => 'ARYA Карточка товара.html?p=' + PROD[n].slug;
const fmt = (n, cur) => cur === 'MDL'
  ? (Math.round(PROD[n].rub * 0.21 / 5) * 5).toLocaleString('ru') + ' lei'
  : PROD[n].rub.toLocaleString('ru') + ' ₽';

/* ── подбор: 12 состояний, у каждого 1 основное + 2 равноценных масла с полным объяснением ── */
const STATES = [
  { id:'liver', name:'Печень', hint:'тяжесть, горечь во рту, реакция на жирное',
    main:{ oil:'Кунжутное', why:'В кунжутном есть два вещества, которых нет больше нигде: сезамин и сезамол. Они защищают клетки печени и помогают им восстанавливаться.', term:'Тяжесть и горечь по утрам уходят за 2–4 недели, анализы — к 6–8 неделе.' },
    alts:[
      { oil:'Жмых расторопши', note:'Если нагрузка на печень постоянная: лекарства, алкоголь, тяжёлое питание. В нём силимарин — самое изученное растительное вещество для печени. Работает глубже масла, а вместе с маслом усваивается полнее.' },
      { oil:'Чёрный тмин', note:'Если хочется одним продуктом закрыть сразу несколько задач. Тимохинон защищает клетки печени и заодно работает с холестерином, сахаром и иммунитетом. Учтите: у тмина серьёзные противопоказания.' }] },
  { id:'digest', name:'Пищеварение', hint:'вздутие, тяжесть, нерегулярный стул',
    main:{ oil:'Горчичное', why:'Запускает выработку пищеварительных соков и отделение желчи — отсюда лёгкость вместо тяжести после еды.', term:'Самое быстрое действие в линейке: от нескольких дней до двух недель.' },
    alts:[
      { oil:'Льняное', note:'Если главное неудобство — нерегулярность. Мягко налаживает работу кишечника, и это чувствуется быстрее всего остального. Требует холодильника и не терпит нагрева.' },
      { oil:'Чёрный тмин', note:'Если беспокоят вздутие и дискомфорт в желудке. Уменьшает тяжесть, поддерживает при гастрите, есть данные о действии против бактерии, вызывающей гастрит и язву.' }] },
  { id:'skin', name:'Кожа', hint:'сухость, шелушение, воспаления',
    main:{ oil:'Подсолнечное', why:'Кожа строит защитную плёнку из линолевой кислоты, а в подсолнечном её больше всего. В исследовании оно восстановило барьер кожи — лучше оливкового.', term:'Барьер восстанавливается около 4 недель.' },
    alts:[
      { oil:'Расторопша', note:'При высыпаниях: у склонной к акне кожи не хватает линолевой кислоты — жир густеет и забивает поры. В масле расторопши её около половины состава, оно возвращает коже ровно то, чего не хватает.' },
      { oil:'Амарантовое', note:'При возрастных изменениях: кожа сама вырабатывает сквален, но с возрастом его меньше. В амарантовом сквалена 6–8%, в десятки раз больше — кожа принимает его как своё.' }] },
  { id:'energy', name:'Энергия', hint:'усталость днём, рассеянность',
    main:{ oil:'Чёрный тмин', why:'Тонус замечают раньше всего остального. В исследованиях на людях чёрный тмин улучшал память, внимание и скорость мышления.', term:'Заметно на первой-второй неделе.' },
    alts:[
      { oil:'Грецкий орех', note:'Если усталость больше в голове, чем в теле. Мозг больше чем наполовину из жира, и омега-3 его материал: отсюда скорость мышления и ясность. Мягче тмина по вкусу и без его ограничений.' },
      { oil:'Амарантовое', note:'Если усталость идёт вместе с плохим сном и головной болью. Сквален и витамин Е снимают окислительную нагрузку, с которой во многом связано ощущение износа.' }] },
  { id:'joints', name:'Суставы', hint:'утренняя скованность, дискомфорт',
    main:{ oil:'Кунжутное', why:'Работает с двух сторон: внутрь снижает воспалительный фон, наружно — втирание при артрозе колена в исследовании не уступило аптечной мази.', term:'Утренняя скованность отступает за 4–6 недель.' },
    alts:[
      { oil:'Горчичное', note:'Если суставы отзываются на холод и сырость. Усиливает приток крови к больному месту и даёт живое, глубокое тепло. Хорошо после нагрузки и при затёкших мышцах. Только наружно для этой задачи.' },
      { oil:'Чёрный тмин', note:'Если воспаление системное. При ревматоидном артрите месяц приёма уменьшает боль и утреннюю скованность, а воспаление снижается — это видно по анализам крови.' }] },
  { id:'nerves', name:'Нервная система', hint:'напряжение, сон, концентрация',
    main:{ oil:'Льняное', why:'Мозг больше чем наполовину состоит из жира, и омега-3 — главный материал его клеток. Льняное — самый богатый растительный источник омега-3.', term:'Только холодным, хранить в холодильнике.' },
    alts:[
      { oil:'Грецкий орех', note:'То же самое, но проще в обращении и вкуснее. Омега-3 меньше, зато масло устойчивее и не требует такой строгости в хранении.' },
      { oil:'Чёрный тмин', note:'Если на первом месте концентрация и ясность. В исследованиях улучшал память, внимание и скорость мышления. Даёт заметный тонус уже на первой-второй неделе.' }] },
  { id:'heart', name:'Сердце и сосуды', hint:'холестерин, давление, профилактика',
    main:{ oil:'Грецкий орех', why:'Единственное масло, проверенное строгим исследованием именно как масло: каждый пятый вышел на здоровый уровень холестерина — в группе пустышки таких не было.', term:'Курс 3 месяца — столько длилось исследование.' },
    alts:[
      { oil:'Чёрный тмин', note:'Если важнее давление. Обобщения исследований подтверждают снижение, эффект накопительный и набирается за 6–8 недель. Заодно работает с холестерином и сахаром.' },
      { oil:'Кунжутное', note:'Если хочется мягко и надолго. Лучше всего снижает триглицериды, а давление опускает постепенно, эффект держится ещё месяц-два после курса. Самое спокойное из трёх, легко принимать долго.' }] },
  { id:'sugar', name:'Сахар и обмен', hint:'тяга к сладкому, скачки энергии, вес',
    main:{ oil:'Чёрный тмин', why:'Выравнивает то, насколько ровно организм обрабатывает сахар, и заодно приводит в порядок холестерин — эти вещи ходят вместе.', term:'Заметные изменения — 8–12 недель.' },
    alts:[
      { oil:'Грецкий орех', note:'Если диагноз уже поставлен. Оба исследования на этом масле проводились именно на людях с диабетом второго типа, и оно улучшало у них и сахар, и жиры крови.' },
      { oil:'Фундук', note:'Самое мягкое из трёх. Есть данные, что фундук справляется с уровнем сахара лучше грецкого ореха и миндаля. Работает через олеиновую кислоту, которой в нём больше, чем в оливковом масле.' }] },
  { id:'immune', name:'Иммунитет', hint:'частые простуды, восстановление',
    main:{ oil:'Чёрный тмин', why:'Помогает телу держать оборону постоянно. По аллергии — самая крепкая база: обобщение восьми клинических исследований.', term:'Курс 1–2 месяца, затем перерыв. Прочитайте противопоказания.' },
    alts:[
      { oil:'Амарантовое', note:'Если ограничения тмина вам не подходят. У сквалена есть свойство усиливать иммунный ответ — настолько, что он применяется в медицине как усилитель вакцин. Мягкое масло почти без противопоказаний.' },
      { oil:'Горчичное', note:'Для сезона простуд и кашля. Растирание груди и спины даёт согревающий эффект, который облегчает дыхание. Плюс природные горчичные соединения с антибактериальным действием.' }] },
  { id:'hormones', name:'Гормоны', hint:'ПМС, цикл, менопауза',
    main:{ oil:'Амарантовое', why:'Гормоны организм не берёт извне — он строит их сам, из сквалена. В амарантовом его 6–8%, в десятки раз больше, чем в любом другом масле.', term:'Чайная ложка в день, можно постоянно.' },
    alts:[
      { oil:'Тыквенное', note:'Для периода менопаузы. Помогает мягче пройти это время и удержать холестерин, который в такие годы часто уходит вверх.' },
      { oil:'Чёрный тмин', note:'Если есть вопросы к щитовидной железе. При аутоиммунном тиреоидите в исследовании улучшились показатели работы железы и снизился уровень антител. Приём при аутоиммунных состояниях согласуйте с врачом.' }] },
  { id:'hair', name:'Волосы', hint:'выпадение, ломкость, тусклость',
    main:{ oil:'Тыквенное', why:'Лучшие данные среди всех масел: в строгом исследовании за полгода количество волос выросло на 40% — против 10% на пустышке.', term:'Первые изменения — 8–12 недель. Здесь нужно терпение.' },
    alts:[
      { oil:'Кунжутное', note:'При ломкости и тусклости. Возвращает блеск за 3–4 недели, структуру — за 4–6. Быстрее заметно, чем прирост густоты, и работает внутрь и наружно.' },
      { oil:'Горчичное', note:'Для укрепления корней. Усиливает приток крови к коже головы, питает корни, придаёт волосам плотность. Наносится как бальзам на 20 минут перед мытьём.' }] },
  { id:'men', name:'Мужское здоровье', hint:'ночные подъёмы, профилактика после 45',
    main:{ oil:'Тыквенное', why:'При увеличенной простате заметно облегчает симптомы — в исследованиях работало мягче аптечного препарата и без побочных эффектов.', term:'Заметно к 4-й неделе, устойчиво — к 12-й.' },
    alts:[
      { oil:'Чёрный тмин', note:'Для репродуктивного здоровья. В исследовании именно на масле, 5 мл в день два месяца, улучшились количество, подвижность и строение сперматозоидов.' },
      { oil:'Амарантовое', note:'Для гормонального фона в целом. Из сквалена организм строит собственные гормоны, а амарант — его главный источник среди масел.' }] },
];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold:.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav({ cur, setCur }) {
  useEffect(() => {
    const n = document.getElementById('nav');
    const on = () => n.classList.toggle('lit', window.scrollY > 40);
    window.addEventListener('scroll', on); on();
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (<nav className="nav" id="nav"><div className="mk">ARYA</div>
    <div className="links"><a href="#pick">Подбор</a><a href="#oils">Масла</a><a href="#foundation">Foundation</a><a href="#press">Производство</a>
      <div className="cur" role="group" aria-label="Валюта">
        <button className={cur==='RUB'?'on':''} onClick={()=>setCur('RUB')}>₽</button>
        <button className={cur==='MDL'?'on':''} onClick={()=>setCur('MDL')}>lei</button>
      </div>
    </div>
  </nav>);
}

function Hero() {
  return (<section className="hero ep" data-screen-label="01 Hero">
    <div className="wrap hero-grid">
      <div className="reveal">
        <span className="mono">Сыродавленное · Без контакта с металлом · Отжим под заказ</span>
        <h1>Из масел тело строит клетки, создаёт гормоны и питает мозг.</h1>
        <p className="sub">Какие масла оно получит — решаете вы. Отжимаем только после заказа, в бутылку масло попадает в день отжима.</p>
        <a className="btn solid" href="#pick">Подобрать масло</a>
        <span className="under">Десять масел. Каждое — для своей задачи.</span>
      </div>
      <figure className="hero-ph reveal d1"><img src="assets/photo-hero.png" alt="Бутылка ARYA в дневном свете"/></figure>
    </div>
  </section>);
}

function Picker({ cur }) {
  const [sel, setSel] = useState(null);
  const st = STATES.find(s => s.id === sel);
  return (<section className="pick ep" id="pick" data-screen-label="02 Подбор">
    <div className="wrap">
      <span className="mono reveal">Подбор по состоянию</span>
      <h2 className="q reveal">Что беспокоит сейчас?</h2>
      <p className="q-sub reveal">Выберите знакомое состояние — покажем три подходящих продукта и объясним выбор.</p>
      <div className="chips reveal d1">
        {STATES.map(s => <button key={s.id} className="chip" aria-pressed={sel===s.id} onClick={()=>setSel(sel===s.id?null:s.id)}><b>{s.name}</b><i>{s.hint}</i></button>)}
      </div>
      {st && <Result st={st} cur={cur} key={st.id}/>}
    </div>
  </section>);
}

function OilCard({ oil, tag, why, term, note, cur }) {
  const img = PROD[oil].img;
  return (<div className="ocard-r">
    <div className="ocard-ph">{img ? <img src={img} alt={'Масло ' + oil}/> : <span className="ph-empty">фото</span>}</div>
    <div className="ocard-body">
      <span className="mono">{tag}</span>
      <h3>{oil}{oil==='Жмых расторопши'?'':' масло'}</h3>
      <p className="ocard-why">{why || note}</p>
      {term && <p className="ocard-term">{term}</p>}
      <div className="ocard-buy"><span className="price">100 мл · {fmt(oil, cur)}</span><a className="btn sm solid" href={cardUrl(oil)}>В корзину</a></div>
    </div>
  </div>);
}

function Result({ st, cur }) {
  return (<div className="result" data-screen-label="03 Результат">
    <div className="res-tag mono">Результат · {st.name} · три равноценных варианта</div>
    <OilCard oil={st.main.oil} tag="Основной выбор" why={st.main.why} term={st.main.term} cur={cur}/>
    <div className="res-alts">
      {st.alts.map((a, i) => <OilCard key={a.oil} oil={a.oil} tag={'Равноценно · вариант ' + (i+2)} note={a.note} cur={cur}/>)}
    </div>
    <div className="res-fnd"><span className="fdot"></span><p><b>Foundation — ежедневная основа.</b> Выбранное масло — точное усиление. Масло даёт жиры, Foundation — минералы, белок и клетчатку.</p><a className="btn sm" href="#foundation">Выбрать вместе</a></div>
  </div>);
}

function Line({ cur }) {
  const ref = useRef(null);
  const by = (d) => { const el = ref.current; const card = el.querySelector('.ocard'); el.scrollBy({ left: d * (card.offsetWidth + 16), behavior:'auto' }); };
  return (<section className="oils ep" id="oils" data-screen-label="04 Линейка">
    <div className="wrap">
      <div className="oils-head reveal">
        <div><span className="mono">Линейка</span><h2>Десять масел. Каждое — для своей задачи.</h2></div>
        <div className="arrows"><button aria-label="Назад" onClick={()=>by(-1)}>←</button><button aria-label="Вперёд" onClick={()=>by(1)}>→</button></div>
      </div>
      <div className="rail reveal d1" ref={ref}>
        {OILS.map(o => <article className="ocard" key={o}>
          <div className="oimg">{PROD[o].img ? <img src={PROD[o].img} alt={'Масло ' + o}/> : <span className="ph-empty">фото</span>}</div>
          <h4>{o}</h4><p className="otask">{PROD[o].task}</p>
          <div className="obuy"><span className="price">100 мл · {fmt(o, cur)}</span><a className="btn sm" href={cardUrl(o)}>Купить</a></div>
        </article>)}
      </div>
      <div className="oils-foot reveal"><a className="link-plain" href="#pick">Не знаете, с чего начать — подобрать масло →</a></div>
    </div>
  </section>);
}

function Foundation() {
  return (<section className="fnd ep" id="foundation" data-screen-label="05 Foundation">
    <div className="wrap fnd-grid">
      <figure className="fnd-ph reveal"><img src="assets/photo-foundation.png" alt="ARYA Foundation — пакет и порошок"/><figcaption className="mono">Foundation · Ферментированный порошок · Курс 30 дней</figcaption></figure>
      <div className="reveal d1">
        <span className="mono">Foundation · Ферментированный порошок</span>
        <h2>Семя не хочет, чтобы его съели</h2>
        <p className="fnd-p">Семечка — это склад: минералы, белок, витамины. Но собрано это не для нас — семя хочет прорасти и защищается. Фитиновая кислота держит минералы мёртвой хваткой, ингибиторы блокируют расщепление белка. Смолоть семечку и съесть — значит проглотить сундук вместе с замком.</p>
        <ul className="fnd-rows">
          <li><b>Замок</b><span>фитаты, ингибиторы и танины держат минералы и белок запертыми — даже у нас в кишечнике</span></li>
          <li><b>Ключ</b><span>ферментация запускает процессы прорастания и открывает запасы — вот почему «в биодоступной форме»</span></li>
        </ul>
        <p className="fnd-note">Ценность не в том, что собрано, а в том, что открыто. В составе кунжут, миндаль и фундук — при аллергии на орехи или кунжут не подходит.</p>
        <a className="btn" href={cardUrl('Кунжутное')}>Что такое Foundation</a>
      </div>
    </div>
  </section>);
}

function Press() {
  return (<section className="press ep" id="press" data-screen-label="06 Производство">
    <div className="wrap">
      <span className="mono reveal">Как мы делаем масло</span>
      <h2 className="reveal">Разница начинается до бутылки</h2>
      <figure className="press-ph reveal d1"><img src="assets/prod-press.png" alt="Гидравлический пресс"/></figure>
      <div className="proofs reveal d2">
        <div className="proof"><b>Без нагрева</b><span>гидравлический пресс, температура не выше комнатной — против 60–99 °C у шнекового</span></div>
        <div className="proof"><b>Без контакта с металлом</b><span>рабочие поверхности из медицинского капролона: металл ускоряет окисление</span></div>
        <div className="proof"><b>В бутылку в день отжима</b><span>отжимаем только после заказа — не месяцы на складе, а день первый</span></div>
      </div>
      <div className="press-foot reveal"><a className="link-plain" href="#pick">Как мы делаем масло →</a></div>
    </div>
  </section>);
}

function Final() {
  return (<section className="final ep" id="final" data-screen-label="07 Финал">
    <div className="wrap">
      <span className="mono reveal">ARYA</span>
      <h2 className="reveal">Тело каждый день решает, из чего себя строить</h2>
      <div className="final-act reveal d1"><a className="btn solid lg" href="#pick">Начать курс</a></div>
      <a className="link-plain reveal d2" href="#pick">Выбрать другое масло</a>
    </div>
    <footer className="foot"><div className="wrap foot-grid">
      <span className="mk">ARYA</span>
      <span className="mono">Сыродавленные масла · Отжим под заказ</span>
      <span className="mono">© 2026</span>
    </div></footer>
  </section>);
}

function Home() {
  useReveal();
  const [cur, setCur] = useState('RUB');
  return (<React.Fragment><Nav cur={cur} setCur={setCur}/><Hero/><Picker cur={cur}/><Line cur={cur}/><Foundation/><Press/><Final/></React.Fragment>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<Home/>);

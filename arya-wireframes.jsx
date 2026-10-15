const { useState } = React;

/* ── данные ── */
const S12 = ['Печень','Пищеварение','Кожа','Энергия','Суставы','Нервы','Сердце','Сахар','Иммунитет','Гормоны','Волосы','Мужское'];
const S8 = ['Печень','Пищеварение','Кожа','Энергия','Сердце','Нервы','Гормоны','Ещё 5 →'];
const G4 = [['Пищеварение и печень','тяжесть · горечь · вздутие'],['Кожа и волосы','сухость · акне · выпадение'],['Энергия и голова','усталость · сон · фокус'],['Тело и обмен','сердце · сахар · гормоны']];
const OILS = ['Кунжутное','Льняное','Горчичное','Тыквенное','Чёрный тмин','Амарантовое','Расторопша','Грецкий орех','Фундук','Подсолнечное'];

/* ── примитивы ── */
function Img({h=70, label='фото'}) {
  return <div className="wf-img" style={{height:h}}><svg viewBox="0 0 100 60" preserveAspectRatio="none"><line x1="0" y1="0" x2="100" y2="60"/><line x1="100" y1="0" x2="0" y2="60"/></svg><span>{label}</span></div>;
}
function Txt({n=2, w}) {
  return <div className="wf-txt">{Array.from({length:n},(_,i)=><i key={i} style={{width: w || (i===n-1?'62%':'100%')}}></i>)}</div>;
}
function Btn({label, solid, small}) { return <span className={'wf-btn'+(solid?' solid':'')+(small?' small':'')}>{label}</span>; }
function H({s, lines=2}) { return <div className={'wf-h'+(s?' s':'')}>{Array.from({length:lines},(_,i)=><b key={i} style={{width:i===lines-1?'55%':'88%'}}></b>)}</div>; }
function Note({children}) { return <div className="wf-note">✎ {children}</div>; }
function Sec({t, children, hl}) {
  return <div className={'wf-sec'+(hl?' hl':'')}><div className="wf-sec-tag">{t}</div>{children}</div>;
}
function Arrow() { return <div className="wf-arrow">↓</div>; }
function Frame({title, sub, children}) {
  return <div className="frame"><div className="frame-head"><b>{title}</b>{sub && <span>{sub}</span>}</div><div className="frame-body">{children}</div></div>;
}

/* ── подбор: три глубины ── */
function QuizBlock({depth, compact}) {
  if (depth === 'Группы 2 шага') return (<div>
    <div className="chips big">{G4.map(([n,h])=><span className="chip grp" key={n}><b>{n}</b><i>{h}</i></span>)}</div>
    <Note>тап по группе → раскрываются 3 уточнения</Note>
  </div>);
  if (depth === 'Все 12') return (<div>
    <div className="chips">{S12.map(s=><span className="chip" key={s}>{s}</span>)}</div>
    {!compact && <Note>12 сразу — плотно; допустимо только на десктопе</Note>}
  </div>);
  return (<div>
    <div className="chips">{S8.map(s=><span className={'chip'+(s.includes('Ещё')?' more':'')} key={s}>{s}</span>)}</div>
    {!compact && <Note>7 главных + «ещё» раскрывает остальные</Note>}
  </div>);
}

/* ── результат подбора ── */
function ResultBlock({withFoundation}) {
  return (<div className="wf-result">
    <div className="wf-sec-tag dark">Результат · «Печень»</div>
    <div className="row"><Img h={54} label="бутылка"/><div style={{flex:1}}><H s lines={1}/><Txt n={2}/><Btn small label="К маслу →"/></div></div>
    <div className="row alt2"><span className="mini">вариант 2 · жмых</span><span className="mini">вариант 3 · тмин</span></div>
    {withFoundation && <div className="row fnd"><span className="fdot"></span><div style={{flex:1}}><b className="fl">+ Foundation — основа</b><i className="fl2">одна строка: масло точечно, основа держит базу</i></div><Btn small label="Вместе"/></div>}
  </div>);
}

/* ── главная V1 «Лестница» ── */
function HomeV1({t}) {
  const fInResult = t.foundationPos !== 'Отдельный блок';
  const fBelow = t.foundationPos !== 'В результате';
  return (<Frame title="Главная · V1 «Лестница»" sub="классическая вертикаль, максимум воздуха">
    <Sec t="Hero — 100vh">
      <H lines={2}/><Txt n={1} w="70%"/><Btn solid label="Подобрать масло"/>
      <Note>3 строки, одна кнопка, кнопка скроллит к подбору</Note>
    </Sec><Arrow/>
    <Sec t="Подбор по состоянию" hl>
      <div className="wf-q">Что беспокоит сейчас?</div>
      <QuizBlock depth={t.quizDepth}/>
      <ResultBlock withFoundation={fInResult}/>
    </Sec><Arrow/>
    <Sec t="Линейка · 10 масел">
      <div className="grid5">{OILS.map(o=><div className="cell" key={o}><Img h={34} label=""/><span>{o}</span></div>)}</div>
      {t.density==='Полный' && <Txt n={2}/>}
      <Btn label="Вся линейка →"/>
    </Sec><Arrow/>
    {fBelow && <React.Fragment><Sec t="Foundation — зачем">
      <div className="row"><Img h={48} label="пакет"/><div style={{flex:1}}><H s lines={1}/><Txt n={t.density==='Полный'?3:2}/></div></div>
      <Btn label="Что такое Foundation"/>
      <Note>объясняющий блок; не дублирует продажу из результата</Note>
    </Sec><Arrow/></React.Fragment>}
    <Sec t="Производство — после линейки">
      <div className="row3">{['без нагрева','без металла','в день отжима'].map(x=><div className="mini-b" key={x}><Img h={28} label=""/><span>{x}</span></div>)}</div>
      {t.density==='Полный' && <Txt n={2}/>}
      <Btn label="Как мы делаем масло →"/>
    </Sec><Arrow/>
    <Sec t="Финал"><H s lines={1}/><Btn solid label="Подобрать масло"/></Sec>
  </Frame>);
}

/* ── главная V2 «Диалог» ── */
function HomeV2({t}) {
  const fInResult = t.foundationPos !== 'Отдельный блок';
  const fBelow = t.foundationPos !== 'В результате';
  return (<Frame title="Главная · V2 «Диалог»" sub="hero и подбор — один экран">
    <Sec t="Hero + подбор слиты" hl>
      <H lines={2}/><Txt n={1} w="60%"/>
      <div className="wf-q">Что беспокоит?</div>
      <QuizBlock depth={t.quizDepth} compact/>
      <Note>кнопки нет — состояния и есть CTA; экономит целый экран</Note>
    </Sec><Arrow/>
    <Sec t="Результат сразу под выбором">
      <ResultBlock withFoundation={fInResult}/>
    </Sec><Arrow/>
    <Sec t="Линейка — строками">
      {OILS.slice(0,4).map(o=><div className="line-row" key={o}><span className="ln">{o}</span><i className="lh">задача · вкус</i><span className="arr">→</span></div>)}
      <div className="line-row more2">+ 6 масел · жмых · Foundation</div>
      <Note>строка легче карточки: 10 позиций без сетки-простыни</Note>
    </Sec><Arrow/>
    {fBelow && <React.Fragment><Sec t="Foundation — полоса">
      <div className="row"><div style={{flex:1}}><H s lines={1}/><Txt n={t.density==='Полный'?3:1}/></div><Img h={44} label="пакет"/></div>
    </Sec><Arrow/></React.Fragment>}
    <Sec t="Производство — цифрами">
      <div className="row3">{['27 °C','0 металла','день 1'].map(x=><div className="mini-b num" key={x}><b>{x}</b></div>)}</div>
      {t.density==='Полный' && <Txt n={2}/>}
      <Btn label="Подробнее →"/>
    </Sec><Arrow/>
    <Sec t="Финал"><Btn solid label="Подобрать масло"/></Sec>
  </Frame>);
}

/* ── главная V3 «Витрина» ── */
function HomeV3({t}) {
  const fInResult = t.foundationPos !== 'Отдельный блок';
  const fBelow = t.foundationPos !== 'В результате';
  return (<Frame title="Главная · V3 «Витрина»" sub="продукт раньше, тексты позже">
    <Sec t="Hero">
      <H lines={2}/><Btn solid label="Подобрать масло"/>
      <div className="strip">{OILS.slice(0,6).map(o=><div className="scell" key={o}><Img h={30} label=""/></div>)}</div>
      <Note>лента бутылок прямо в hero — товар виден с 1-й секунды</Note>
    </Sec><Arrow/>
    <Sec t="Подбор" hl>
      <div className="wf-q">Что беспокоит сейчас?</div>
      <QuizBlock depth={t.quizDepth}/>
      <ResultBlock withFoundation={fInResult}/>
    </Sec><Arrow/>
    <Sec t="Линейка — 3 характера">
      <div className="row3">{[['На каждый день','3 масла'],['Точечная работа','4 масла'],['Омега-3','2 масла']].map(([a,b])=><div className="mini-b" key={a}><b className="gk">{a}</b><span>{b}</span></div>)}</div>
      {t.density==='Полный' && <Txt n={2}/>}
      <Btn label="Все 10 масел →"/>
      <Note>группировка из материала «как устроена линейка»</Note>
    </Sec><Arrow/>
    {fBelow && <React.Fragment><Sec t="Foundation — «вторая половина»">
      <div className="split"><div><b className="gk">Масло</b><Txt n={2}/></div><div><b className="gk">Foundation</b><Txt n={2}/></div></div>
      {t.density==='Полный' && <Txt n={1}/>}
    </Sec><Arrow/></React.Fragment>}
    <Sec t="Производство — одно фото">
      <Img h={64} label="пресс, крупно"/><Txt n={t.density==='Полный'?2:1}/><Btn label="Как мы отжимаем →"/>
    </Sec><Arrow/>
    <Sec t="Финал"><H s lines={1}/><Btn solid label="Подобрать масло"/></Sec>
  </Frame>);
}

/* ── страница подбора ── */
function PickerPage({t}) {
  return (<div className="pages">
  <Frame title="Подбор · экран выбора">
    <Sec t="Вопрос"><div className="wf-q big2">Что беспокоит сейчас?</div><Txt n={1} w="70%"/></Sec>
    <Sec t="Состояния" hl><QuizBlock depth={t.quizDepth}/></Sec>
    <Note>на отдельной странице можно все 12 — сюда приходят целенаправленно</Note>
  </Frame>
  <Frame title="Подбор · экран результата">
    <Sec t="Основной выбор" hl>
      <div className="row"><Img h={64} label="бутылка"/><div style={{flex:1}}><H s lines={1}/><Txt n={t.density==='Полный'?4:2}/><div className="pr">1 450 ₽ · 100 мл</div><Btn solid small label="К маслу"/></div></div>
      <Note>механизм + срок («2–4 недели») — главный аргумент</Note>
    </Sec>
    <Sec t="Ещё два варианта">
      <div className="split">{['вариант 2','вариант 3'].map(v=><div key={v}><Img h={36} label={v}/><Txt n={2}/><Btn small label="К маслу"/></div>)}</div>
    </Sec>
    <Sec t="Foundation — связка">
      <div className="row fnd"><span className="fdot"></span><div style={{flex:1}}><b className="fl">Масло — половина. Основа — вторая.</b><Txt n={1}/></div><Btn small label="Вместе"/></div>
    </Sec>
  </Frame>
  </div>);
}

/* ── линейка ── */
function LinePage({t}) {
  return (<div className="pages"><Frame title="Линейка масел">
    <Sec t="Голова"><H lines={1}/><Txt n={1} w="75%"/><Btn label="Не знаете — подобрать →"/></Sec>
    <Sec t="Как устроена линейка">
      <div className="row3">{['Каждый день · 3','Точечно · 4','Омега-3 · 2'].map(x=><div className="mini-b" key={x}><span>{x}</span></div>)}</div>
      <div className="mini-b wide">+ амарант — особое · жмых · Foundation</div>
    </Sec>
    <Sec t="Карточки — 12 позиций" hl>
      <div className="grid2">{OILS.slice(0,4).map(o=><div className="pcard" key={o}><Img h={44} label=""/><b>{o}</b><i>подзаголовок-роль</i>{t.density==='Полный' && <Txt n={2}/>}<span className="pr">от 950 ₽</span></div>)}</div>
      <div className="mini c">… ещё 6 масел + жмых + Foundation</div>
      <Note>у каждой карточки роль в одну строку — «спокойное для печени»</Note>
    </Sec>
    <Sec t="Сравнительная таблица">
      <div className="wf-table">{['масло / задача / вкус / греть','кунжут · печень · орех · да 90°','лён · мозг · терпкий · нет','…'].map((r,i)=><div key={i} className={i===0?'th':''}>{r}</div>)}</div>
    </Sec>
    <Sec t="Пары"><Txt n={2}/><Note>«льняное к любому», «масло + жмых», «масло + Foundation»</Note><Btn solid label="Подобрать под состояние"/></Sec>
  </Frame></div>);
}

/* ── Foundation ── */
function FoundationPage({t}) {
  const full = t.density==='Полный';
  return (<div className="pages"><Frame title="Foundation — страница продукта">
    <Sec t="Hero продукта" hl>
      <div className="row"><Img h={70} label="пакет"/><div style={{flex:1}}><H s lines={2}/><div className="pr">СОСТАВ · тыква 45 · кунжут 25 · миндаль 20 · фундук 10</div><div className="pr">1 900 ₽ · 30 дней</div><Btn solid small label="Заказать"/></div></div>
    </Sec>
    <Sec t="Главная мысль">«Масло — половина»<Txt n={full?3:2}/></Sec>
    <Sec t="Ферментация">{full ? <Txt n={3}/> : <Txt n={1}/>}<Note>фитиновая кислота → почему не «просто смолоть»</Note></Sec>
    <Sec t="Состав по семенам"><div className="row3">{['Тыква 45%','Кунжут 25%','Миндаль+фундук 30%'].map(x=><div className="mini-b" key={x}><span>{x}</span></div>)}</div></Sec>
    {full && <Sec t="Полный белок"><Txt n={2}/></Sec>}
    <Sec t="Ритуал + что почувствуете"><Txt n={2}/><div className="pr">ложка в день · курс 30 · эффект с 14-го</div></Sec>
    <Sec t="Кому не подходит"><Txt n={2}/><Note>аллергены честно и заметно — работает на доверие</Note></Sec>
    <Sec t="Связка с маслом"><Btn label="Подобрать масло"/><Btn solid label="Заказать Foundation"/></Sec>
  </Frame></div>);
}

/* ── производство ── */
function ProdPage({t}) {
  const full = t.density==='Полный';
  return (<div className="pages"><Frame title="Как мы делаем масло">
    <Sec t="Тезис"><H lines={1}/><Txt n={1} w="70%"/><Note>«разница начинается до бутылки»</Note></Sec>
    <Sec t="Сравнение — таблица" hl>
      <div className="wf-table">{['— / обычно / у нас','отжим · шнек · гидравлика','t° · 60–99° · комнатная','металл · весь путь · нет','путь · месяцы · день 1'].map((r,i)=><div key={i} className={i===0?'th':''}>{r}</div>)}</div>
    </Sec>
    {full && <Sec t="99° и перекиси"><Txt n={3}/><div className="pr">6,36 против 13,86 — вдвое из того же семени</div></Sec>}
    <Sec t="Почему дороже"><div className="row3">{['амарант 3 кг','тмин 1,5 кг','лён 1 кг'].map(x=><div className="mini-b num" key={x}><b>{x}</b><span>семян на бутылку</span></div>)}</div>{full && <Txt n={2}/>}</Sec>
    <Sec t="Свежесть + хранение"><Txt n={full?3:1}/></Sec>
    <Sec t="Выход"><Btn solid label="Смотреть линейку"/></Sec>
  </Frame></div>);
}

/* ── карточка товара ── */
function CardPage({t}) {
  const proofFirst = t.proofPos === 'До цены';
  const full = t.density==='Полный';
  const buy = <Sec t="Покупка" hl key="buy">
    <div className="row"><Img h={64} label="бутылка"/><div style={{flex:1}}><H s lines={1}/><div className="pr">100 мл / 250 мл</div><div className="pr">1 450 ₽</div><Btn solid small label="В корзину"/></div></div>
    <div className="pr">состав · омега-3 50–60% · витамин Е</div>
  </Sec>;
  const proof = <Sec t="Почему работает + исследования" key="proof">
    <Txt n={full?4:2}/><Note>механизм → срок → честное ограничение</Note>
  </Sec>;
  return (<div className="pages"><Frame title="Карточка масла — шаблон ×11" sub={'доказательство ' + (proofFirst?'ДО цены':'ПОСЛЕ цены')}>
    {proofFirst ? [<Sec t="Имя + роль" key="h"><H lines={1}/><Txt n={1} w="55%"/></Sec>, proof, buy] : [buy, proof]}
    <Sec t="Что меняется и когда"><div className="wf-table">{['кожа · 3–6 нед','кишечник · дни–2 нед','холестерин · 8–12 нед'].map(r=><div key={r}>{r}</div>)}</div></Sec>
    <Sec t="Как принимать">{full ? <Txt n={3}/> : <Txt n={1}/>}<Note>внутрь / кулинария / наружно — вкладки, не простыня</Note></Sec>
    <Sec t="Когда не подходит"><Txt n={2}/><Note>честные противопоказания — фирменный блок доверия</Note></Sec>
    <Sec t="Хранение + состав">{full ? <Txt n={2}/> : <Txt n={1}/>}</Sec>
    <Sec t="Пара"><div className="row fnd"><span className="fdot"></span><b className="fl">+ Foundation / + льняное к нему</b><Btn small label="Вместе"/></div></Sec>
  </Frame></div>);
}

/* ── главная ФИНАЛ · гибрид ── */
function HomeFinal({t}) {
  return (<Frame title="Главная · ФИНАЛ (гибрид)" sub="верх V1 + результат V2 + Foundation из V3">
    <Sec t="Hero — ~85vh, следующий экран выглядывает">
      <H lines={2}/><Txt n={1} w="66%"/><Btn solid label="Подобрать масло"/>
      <div className="peek">▔▔▔ край подбора виден снизу ▔▔▔</div>
    </Sec><Arrow/>
    <Sec t="Подбор — 6 направлений + ещё" hl>
      <div className="wf-q">Что беспокоит сейчас?</div>
      <div className="chips">{['Печень','Пищеварение','Кожа','Энергия','Сердце','Гормоны','Ещё 6 →'].map(s=><span className={'chip'+(s.includes('Ещё')?' more':'')} key={s}>{s}</span>)}</div>
      <Note>результат раскрывается здесь же, без перехода</Note>
    </Sec><Arrow/>
    <Sec t="Результат подбора">
      <div className="wf-result">
        <div className="wf-sec-tag dark">Главное масло</div>
        <div className="row"><Img h={54} label="бутылка"/><div style={{flex:1}}><H s lines={1}/><Txt n={2}/><Btn small label="К маслу →"/></div></div>
        <div className="row alt2"><span className="mini">альтернатива 2</span><span className="mini">альтернатива 3</span></div>
        <div className="row fnd"><span className="fdot"></span><div style={{flex:1}}><b className="fl">Foundation — ежедневная основа. Масло — точное усиление.</b></div><Btn small label="Выбрать вместе"/></div>
      </div>
    </Sec><Arrow/>
    <Sec t="Линейка — горизонтальная лента">
      <div className="hscroll">{OILS.slice(0,4).map(o=><div className="hcard" key={o}><Img h={52} label=""/><b>{o}</b><i>задача</i><span className="pr">100 мл · 1 450 ₽</span><Btn small label="Купить"/></div>)}<div className="hcard ghost">→</div></div>
      <Btn label="Смотреть все масла"/>
      <Note>4 крупные карточки в кадре, скролл вбок — не простыня</Note>
    </Sec><Arrow/>
    <Sec t="Foundation — вторая половина">
      <div className="row"><Img h={52} label="бутылка + порошок рядом"/><div style={{flex:1}}><H s lines={1}/><Txt n={t.density==='Полный'?3:2}/></div></div>
      <Btn label="Что такое Foundation"/>
    </Sec><Arrow/>
    <Sec t="Производство — один кадр">
      <Img h={62} label="пресс, крупно"/>
      <div className="row3">{['Без нагрева','Без металла','В день отжима'].map(x=><div className="mini-b" key={x}><span>{x}</span></div>)}</div>
      <Btn label="Как мы делаем масло →"/>
    </Sec><Arrow/>
    <Sec t="Финал — конкретное действие">
      <H s lines={1}/><div className="row"><Btn solid label="Начать курс"/><Btn label="Выбрать масло"/></div>
      <Note>не «подобрать» снова — человек подбор уже прошёл</Note>
    </Sec>
  </Frame>);
}

/* ── App ── */
const TABS = ['Главная: финал + 3','Подбор','Линейка','Foundation','Производство','Карточка'];
function App() {
  const [tab, setTab] = useState(0);
  const [tweaks, setTweak] = useTweaks({
    quizDepth: 'Плитки 7+ещё',
    foundationPos: 'Обе точки',
    density: 'Сжатый',
    proofPos: 'После цены'
  });
  const t = tweaks;
  return (<div className="board">
    <header className="top">
      <div><h1>ARYA — вайрфреймы новой карты сайта</h1><p>структура и путь, не стиль · порядок: hero → подбор → линейка → Foundation → производство</p></div>
      <nav className="tabs">{TABS.map((x,i)=><button key={x} className={i===tab?'on':''} onClick={()=>setTab(i)}>{x}</button>)}</nav>
    </header>
    {tab===0 && <div className="pages">{[HomeFinal,HomeV1,HomeV2,HomeV3].map((C,i)=><C t={t} key={i}/>)}</div>}
    {tab===1 && <PickerPage t={t}/>}
    {tab===2 && <LinePage t={t}/>}
    {tab===3 && <FoundationPage t={t}/>}
    {tab===4 && <ProdPage t={t}/>}
    {tab===5 && <CardPage t={t}/>}
    <TweaksPanel>
      <TweakSection label="Структура">
        <TweakRadio label="Глубина подбора" value={t.quizDepth} options={['Группы 2 шага','Плитки 7+ещё','Все 12']} onChange={v=>setTweak('quizDepth',v)}/>
        <TweakRadio label="Foundation на главной" value={t.foundationPos} options={['В результате','Отдельный блок','Обе точки']} onChange={v=>setTweak('foundationPos',v)}/>
        <TweakRadio label="Доказательство в карточке" value={t.proofPos} options={['До цены','После цены']} onChange={v=>setTweak('proofPos',v)}/>
        <TweakRadio label="Плотность текста" value={t.density} options={['Сжатый','Полный']} onChange={v=>setTweak('density',v)}/>
      </TweakSection>
    </TweaksPanel>
  </div>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

const { useState, useEffect, useMemo } = React;
const PRODUCTS = window.ARYA_PRODUCTS;

function useHashProduct() {
  const get = () => {
    const m = location.search.match(/[?&]p=([a-z]+)/) || location.hash.match(/p=([a-z]+)/);
    return (m && PRODUCTS.some(p=>p.slug===m[1])) ? m[1] : PRODUCTS[0].slug;
  };
  const [slug, setSlug] = useState(get);
  return [slug, setSlug];
}

function withIds(html) {
  let i = 0;
  return html.replace(/<h2>/g, () => `<h2 id="sec-${i++}">`);
}
function tocOf(html) {
  const out = []; const re = /<h2>([^<]+)<\/h2>/g; let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

function Card() {
  const [slug, setSlug] = useHashProduct();
  const p = PRODUCTS.find(x => x.slug === slug);
  const toc = useMemo(() => tocOf(p.html), [p]);
  const [added, setAdded] = useState(false);
  useEffect(() => { setAdded(false); window.scrollTo(0, 0); }, [slug]);
  return (<React.Fragment>
    <nav className="nav lit"><a className="mk" href="ARYA Homepage Final.html">ARYA</a>
      <select className="psel" value={slug} onChange={e=>setSlug(e.target.value)} aria-label="Продукт">
        {PRODUCTS.map(x => <option key={x.slug} value={x.slug}>{x.name}</option>)}
      </select>
      <a className="back" href="ARYA Homepage Final.html#oils">← Линейка</a>
    </nav>
    <header className="phero" data-screen-label={'Карточка · ' + p.name}>
      <div className="wrap phero-grid">
        <div className="phero-ph">{p.img ? <img src={p.img} alt={p.name}/> : <span className="ph-empty">фото бутылки</span>}</div>
        <div className="phero-body">
          <span className="mono">{p.task}</span>
          <h1>{p.name}</h1>
          <p className="intro" dangerouslySetInnerHTML={{__html: p.intro}}></p>
          <div className="buy">
            <div className="vol"><label className="vopt"><input type="radio" name="vol" defaultChecked/><span>100 мл · {p.price}</span></label><label className="vopt"><input type="radio" name="vol"/><span>250 мл · по запросу</span></label></div>
            <button className={'btn solid' + (added ? ' added' : '')} onClick={()=>setAdded(true)}>{added ? 'В корзине ✓' : 'В корзину'}</button>
          </div>
          <span className="ship mono">Отжим под заказ · В бутылку в день отжима · Тёмное стекло</span>
        </div>
      </div>
    </header>
    <div className="wrap layout">
      <aside className="toc">
        <span className="mono">На странице</span>
        {toc.map((t, i) => <a key={i} href={'#sec-'+i}>{t}</a>)}
      </aside>
      <article className="content" dangerouslySetInnerHTML={{__html: withIds(p.html)}}></article>
    </div>
    <section className="next">
      <div className="wrap next-grid">
        <div><span className="mono">Дальше</span><h2>Не уверены, что это ваше масло?</h2></div>
        <a className="btn" href="ARYA Homepage Final.html#pick">Подобрать по состоянию</a>
      </div>
    </section>
  </React.Fragment>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<Card/>);

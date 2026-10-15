/* global React */
/* ARYA · Linseed PDP — content + section components */

const PRODUCT = {
  no: 'N° 04',
  category: 'Mono · Линия чистоты',
  catLabel: 'Mono · Линия чистоты',
  latin: 'Linum usitatissimum',
  name: 'Льняное',
  nameRest: 'масло',
  tagline: 'Серебряный жир, который тело узнаёт первым.',
  lead: 'Холодный отжим до 38°C. До 55% омега-3 ALA. Дозревает шесть недель в ульях из мореного дуба, разливается через семь дней после пресса. 100 ml тёмного стекла Marasca.',
  price: 220,
  currency: 'lei',
  volume: '100 ml',
  origin: 'Хынчешты · Молдова',
  harvest: 'Урожай 2025',
  press: '14 апреля 2026',
};

/* ============== Inline bottle illustrations for related cards ============== */
function MiniBottle({ label, latin, num, accent = '#7A6446' }) {
  return (
    <svg className="related__bottle-illus" viewBox="0 0 200 420" width="120" height="252" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`mg-${label}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a0806"/>
          <stop offset="0.5" stopColor="#3d2c1f"/>
          <stop offset="1" stopColor="#0a0806"/>
        </linearGradient>
        <linearGradient id={`mc-${label}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5a4a32"/>
          <stop offset="0.5" stopColor="#a48662"/>
          <stop offset="1" stopColor="#5a4a32"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="408" rx="74" ry="6" fill="#181310" fillOpacity="0.24"/>
      <rect x="78" y="16" width="44" height="32" rx="1" fill={`url(#mc-${label})`}/>
      <rect x="78" y="46" width="44" height="3" fill="#3d3122"/>
      <rect x="84" y="49" width="32" height="26" fill={`url(#mg-${label})`}/>
      <path d="M84 75 Q84 90 70 100 L130 100 Q116 90 116 75 Z" fill={`url(#mg-${label})`}/>
      <rect x="44" y="100" width="112" height="296" rx="2" fill={`url(#mg-${label})`}/>
      <rect x="56" y="158" width="88" height="200" fill="#F4EFE5"/>
      <text x="100" y="190" fontFamily="Cormorant Garamond, serif" fontWeight="500" fontSize="22" letterSpacing="3" textAnchor="middle" fill="#7A6446">ARYA</text>
      <line x1="80" y1="200" x2="120" y2="200" stroke="#7A6446" strokeWidth="0.4"/>
      <rect x="64" y="220" width="72" height="100" fill="#1A1714"/>
      <text x="100" y="248" fontFamily="Manrope, sans-serif" fontSize="5" letterSpacing="1.4" textAnchor="middle" fill="#8B847B">{num}</text>
      <text x="100" y="278" fontFamily="Manrope, sans-serif" fontWeight="600" fontSize="13" letterSpacing="2.4" textAnchor="middle" fill="#F4EFE5">{label}</text>
      <text x="100" y="296" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="8" textAnchor="middle" fill={accent}>{latin}</text>
      <text x="100" y="346" fontFamily="Manrope, sans-serif" fontSize="7" letterSpacing="1.6" textAnchor="middle" fill="#1A1714">100 ml e</text>
    </svg>
  );
}

/* ============== NAV ============== */
function PdpNav({ cartCount }) {
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <div className="nav__crumbs">
          <a href="#">ARYA</a>
          <span className="sep">/</span>
          <a href="#">Моно-масла</a>
          <span className="sep">/</span>
          <span className="here">Льняное · 100 ml</span>
        </div>
        <div className="nav__wordmark" style={{ textAlign: 'center' }}>
          ARYA
          <sub>Cold-pressed · Moldova</sub>
        </div>
        <div className="nav__right">
          <span className="nav__lang"><b>RU</b> · RO · EN</span>
          <button className="nav__cart" aria-label="Cart">
            <span>Корзина</span>
            <span className="nav__cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ============== HERO ============== */
function PdpHero({ qty, setQty, onAdd, view, setView }) {
  const views = [
    { id: 'bottle', label: 'Бутылка' },
    { id: 'detail', label: 'Этикетка' },
    { id: 'seeds',  label: 'Семя' },
    { id: 'press',  label: 'Отжим' },
  ];
  return (
    <section className="hero" id="hero">
      <div className="container hero__inner">
        <div className="hero__media">
          <div className="hero__bottle-stage">
            {view === 'bottle' && (
              <img className="hero__bottle" src="assets/bottle-flaxseed.svg" alt="ARYA Linum — 100 ml" />
            )}
            {view === 'detail' && (
              <img className="hero__bottle is-detail" src="assets/photo-bottle.png" alt="Marasca bottle · production photograph" />
            )}
            {view === 'seeds' && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 60% 60% at 50% 45%, #b8915e 0%, #6a4a2a 50%, #2a1b10 100%)',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(circle, rgba(120,90,55,0.65) 1px, transparent 1.4px), radial-gradient(circle, rgba(160,118,72,0.55) 1px, transparent 1.4px)',
                  backgroundSize: '14px 14px, 22px 22px',
                  backgroundPosition: '0 0, 9px 11px',
                  mixBlendMode: 'screen',
                  opacity: 0.65,
                }}></div>
                <div style={{
                  position: 'absolute', left: 32, bottom: 28,
                  fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
                  fontSize: 22, color: '#f1e0c2',
                }}>Linum usitatissimum · семя</div>
              </div>
            )}
            {view === 'press' && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, #2a2520 0%, #1a1612 100%)',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '20%', left: '50%', width: 4, height: '54%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(to bottom, transparent, #d2a35a 12%, #e8c280 40%, #b88940 80%, #553616)',
                  borderRadius: 999,
                  filter: 'blur(0.6px)',
                  boxShadow: '0 0 24px rgba(232, 194, 128, 0.32)',
                }}></div>
                <div style={{
                  position: 'absolute', top: '74%', left: '50%',
                  width: 220, height: 28,
                  transform: 'translate(-50%, 0)',
                  background: 'radial-gradient(ellipse 80% 60% at 50% 30%, #c8985a 0%, #6a4525 70%, transparent 100%)',
                  borderRadius: '50%',
                  filter: 'blur(1px)',
                }}></div>
                <div style={{
                  position: 'absolute', left: 32, bottom: 28,
                  fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
                  fontSize: 22, color: '#f1e0c2',
                }}>Холодный отжим · 38°C</div>
              </div>
            )}
          </div>
          <div className="hero__thumbs">
            {views.map(v => (
              <button
                key={v.id}
                className={`hero__thumb ${view === v.id ? 'is-active' : ''}`}
                onClick={() => setView(v.id)}
                aria-label={v.label}>
                {v.id === 'bottle' && <img src="assets/bottle-flaxseed.svg" alt="" />}
                {v.id === 'detail' && <img src="assets/photo-bottle.png" alt="" style={{ height: '90%' }}/>}
                {v.id === 'seeds' && <div className="hero__thumb-tile tile--seeds">Семя</div>}
                {v.id === 'press' && <div className="hero__thumb-tile tile--press">Отжим</div>}
              </button>
            ))}
          </div>
        </div>

        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span className="hero__num">{PRODUCT.no}</span>
            <span className="hero__cat">{PRODUCT.catLabel}</span>
          </div>
          <div className="hero__latin">{PRODUCT.latin}</div>
          <h1 className="hero__h1">
            <em>Льняное</em> масло.<br/>
            Серебряный жир.
          </h1>
          <p className="hero__lead">
            Холодный отжим до 38°C. До 55% омега-3 ALA — самая богатая
            растительная форма этой кислоты на земле. Семь дней от пресса до пломбы.
            Тёмное стекло Marasca, 100 ml.
          </p>

          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-v">55<sup>%</sup></div>
              <div className="hero__stat-l">ω-3 ALA<br/>в составе</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-v">38<sup>°</sup></div>
              <div className="hero__stat-l">максимум при<br/>отжиме</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-v">7</div>
              <div className="hero__stat-l">дней от пресса<br/>до пломбы</div>
            </div>
          </div>

          <div className="hero__purchase">
            <div className="hero__price-block">
              <div className="hero__price-label">100 ml · одна бутылка</div>
              <div className="hero__price">{PRODUCT.price}<small>{PRODUCT.currency}</small></div>
            </div>
            <div className="hero__qty" aria-label="Quantity">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
            </div>
          </div>

          <div className="hero__cart-row">
            <button className="btn btn--primary" onClick={onAdd}>
              Добавить в корзину <span className="arr">→</span>
            </button>
            <button className="btn btn--ghost" aria-label="Save">
              Сохранить
            </button>
          </div>

          <div className="hero__meta">
            <div className="hero__meta-item">
              <span className="hero__meta-label">Доставка</span>
              <span className="hero__meta-v">Кишинёв · 1 день · бесплатно от 600 lei</span>
            </div>
            <div className="hero__meta-item">
              <span className="hero__meta-label">Свежесть</span>
              <span className="hero__meta-v">Отжато 14 апреля 2026 · разлито 21 апреля</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.PRODUCT = PRODUCT;
window.MiniBottle = MiniBottle;
window.PdpNav = PdpNav;
window.PdpHero = PdpHero;

// arya-v3-commerce.jsx — коммерческие блоки v3: подбор по состояниям,
// карточки масел с рендерами, корзина. Экспорт через window.

const { useState: useCState, useEffect: useCEffect, useRef: useCRef } = React;

/* ── 04 · Подбор по состояниям (узнавание + протокол, без лишних шагов) ── */
function StatesSection({ cart, onAddSet }) {
  const [ix, setIx] = useCState(null);
  const resRef = useCRef(null);
  const cat = ix == null ? null : V3_CATS[ix];

  useCEffect(() => {
    if (cat && resRef.current) {
      const y = resRef.current.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [ix]);

  const setIds = cat ? ['foundation', ...cat.oils.map((o) => 'oil-' + o.name)] : [];
  const inCart = cat && setIds.every((id) => cart.some((c) => c.id === id));
  const addSet = () => onAddSet([
    { id: 'foundation', name: 'Foundation' },
    ...cat.oils.map((o) => ({ id: 'oil-' + o.name, name: o.name })),
  ]);

  return (
    <section className="ep pad" id="quiz" data-screen-label="04 Подбор по состояниям">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="mono">Подбор</span>
          <h2>Какое ваше состояние сегодня?</h2>
          <p className="sh-sub">
            Выберите то, что узнаёте. Foundation — всегда основа;
            моно-масло — точечное усиление под ваш запрос.
          </p>
        </div>

        <div className="quiz-grid reveal d1">
          {V3_CATS.map((c, i) =>
            <button className="qbtn" key={c.id} aria-pressed={ix === i}
              onClick={() => setIx(ix === i ? null : i)}>
              <span className="qn">{c.name}</span>
              <span className="qh">{c.hint}</span>
            </button>
          )}
        </div>

        {cat &&
          <div className="result" ref={resRef}>
            <div className="res-block">
              <div className="res-eyebrow">Что происходит</div>
              <div className="res-state">{cat.frameTitle}</div>
              <p className="res-frame-body">{cat.frameBody}</p>
            </div>
            <div className="res-block horizon">
              <div className="step-tag">Горизонт</div>
              <p className="hz-main">{cat.horizon}</p>
            </div>
            <div className="res-block">
              <div className="step-tag">Ваш протокол</div>
              <div className="proto">
                <div className="proto-row core">
                  <div className="pr-name">Foundation</div>
                  <div className="pr-note">
                    <span className="pr-tag">Основа · всегда</span>
                    Минеральный и белковый уровень, 30 дней. Материал, из которого клетки строят себя.
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
                <span className="price">Набор · {V3_PRICE}</span>
                <button className={'btn-sm solid' + (inCart ? ' added' : '')} onClick={addSet}>
                  {inCart ? 'Набор в корзине ✓' : 'Собрать набор'}
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </section>);

}

/* ── 05 · Восемь масел — карточки с рендерами ── */
function OilsSection({ cart, onAdd }) {
  const [sel, setSel] = useCState(null);
  const detRef = useCRef(null);
  const oil = sel == null ? null : V3_OILS[sel];

  useCEffect(() => {
    if (oil && detRef.current) {
      const y = detRef.current.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [sel]);

  const oilId = oil ? 'oil-' + oil.name : null;
  const inCart = oil && cart.some((c) => c.id === oilId);

  return (
    <section className="ep pad" id="oils" data-screen-label="05 Масла">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="mono">Восемь моно-масел</span>
          <h2>Точечный инструмент под конкретный запрос.</h2>
          <p className="sh-sub">
            Каждое масло работает поверх основы. Откройте карточку —
            кому, что изменится и как принимать.
          </p>
        </div>

        <div className="oilgrid reveal d1">
          {V3_OILS.map((o, i) =>
            <button className="ocard" key={o.no} aria-pressed={sel === i}
              onClick={() => setSel(sel === i ? null : i)}>
              <span className="oimg"><img src={o.img} alt={'Масло ' + o.name} /></span>
              <span className="obody">
                <span className="onum2">{o.no}</span>
                <span className="oname2">{o.name}</span>
                <span className="oprev2">{o.prev}</span>
              </span>
              <span className="omore">{sel === i ? 'Закрыть —' : 'Подробнее +'}</span>
            </button>
          )}
        </div>

        {oil &&
          <div className="oildetail" ref={detRef}>
            <div className="od-head">
              <span className="od-name">{oil.name}</span>
              {oil.status === 'draft' && <span className="od-flag">Черновик текста</span>}
              <span className="od-price">{V3_PRICE}</span>
            </div>
            <div className="od-grid">
              <div className="oil-block"><h5>Кому это масло</h5><p>{oil.who}</p></div>
              <div className="oil-block"><h5>Что изменится и когда</h5><p>{oil.change}</p></div>
              <div className="oil-block"><h5>Как принимать</h5><p>{oil.take}</p>
                <div className="bridge-f">Основа курса — Foundation. Масло усиливает её точечно.</div></div>
              <div className="oil-block"><h5>Когда не подходит</h5><p>{oil.avoid}</p></div>
            </div>
            <div className="od-foot">
              <button className={'btn-sm solid' + (inCart ? ' added' : '')}
                onClick={() => onAdd({ id: oilId, name: oil.name })}>
                {inCart ? 'В корзине ✓' : 'В корзину'}
              </button>
              <a className="btn-sm" href="#quiz">Не уверены? Пройти подбор</a>
            </div>
          </div>
        }
      </div>
    </section>);

}

/* ── Корзина ── */
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
          <span className="cart-total">Итого · <b>{V3_PRICE}</b></span>
          <button className="btn-sm solid">Оформить заказ</button>
        </div>
      </div>
    </div>);

}

Object.assign(window, { StatesSection, OilsSection, CartBar });

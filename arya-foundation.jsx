// arya-foundation.jsx — Foundation: the core of the system.
// Set apart on a warmer paper tone inside a light frame with its own grid.
// Content verbatim from the approved changes brief. Exposed as window.FoundationSection.

const COMPO = [
  { nm: 'Тыква', pc: 45, c: '#B98428' },
  { nm: 'Кунжут', pc: 25, c: '#6E7468' },
  { nm: 'Миндаль', pc: 20, c: '#C9C2B2' },
  { nm: 'Фундук', pc: 10, c: '#5C594F' },
];

function FoundationSection() {
  return (
    <section className="ep foundation" id="foundation" data-screen-label="07 Foundation">
      <div className="wrap">
        <div className="fnd-frame">

          {/* header */}
          <div className="fnd-head reveal">
            <span className="mono">FOUNDATION · НАЧАЛО СИСТЕМЫ</span>
            <h2 className="fnd-big">Два фермента. Два контура защиты. Одна формула.</h2>
          </div>

          {/* concept */}
          <div className="reveal">
            <p className="fnd-concept">
              Foundation — ферментированный порошок из семян. Первый растительный продукт,
              который активирует оба антиоксидантных контура клетки: цитоплазматический и
              митохондриальный. <em>Через еду. Не через таблетки.</em>
            </p>
          </div>

          {/* composition */}
          <div className="reveal">
            <div className="fnd-label">Состав</div>
            <div className="compo-bar" role="img" aria-label="Состав: Тыква 45%, Кунжут 25%, Миндаль 20%, Фундук 10%">
              {COMPO.map((s) =>
                <div className="compo-seg" key={s.nm} style={{ width: s.pc + '%', background: s.c }}></div>
              )}
            </div>
            <div className="compo-legend">
              {COMPO.map((s) =>
                <div className="lg" key={s.nm}>
                  <span className="sw" style={{ background: s.c }}></span>
                  <span className="ln">{s.nm}</span>
                  <span className="pc">{s.pc}%</span>
                </div>
              )}
            </div>
          </div>

          {/* full protein + fermentation */}
          <div className="fnd-two reveal">
            <div className="fnd-note">
              <div className="fnd-label">Полный белок</div>
              <p>
                Метионин из кунжута. Лизин из миндаля. Вместе — полный аминокислотный
                профиль. Редкость для растительной формулы.
              </p>
            </div>
            <div className="fnd-note">
              <div className="fnd-label">Ферментация</div>
              <p>
                <em>L. plantarum</em> разбирает фитаты и освобождает минералы. То, что было
                заперто в семени, становится доступным телу.
              </p>
            </div>
          </div>

          {/* how it works — two cell contours */}
          <div className="fnd-work reveal">
            <div className="fnd-label">Как это работает</div>
            <div className="work-grid">
              <div className="contour">
                <div className="ct-tag">Внешний контур клетки</div>
                <p>
                  Цинк (из тыквы) и медь (из фундука) активируют Cu/Zn-SOD в цитоплазме.
                  Здесь встречается 80% свободных радикалов, поступающих извне.
                </p>
              </div>
              <div className="contour">
                <div className="ct-tag">Внутренний контур клетки</div>
                <p>
                  Марганец (из фундука) активирует Mn-SOD в митохондриях. Здесь рождаются
                  радикалы собственного метаболизма — там, где работает энергия.
                </p>
              </div>
            </div>
            <p className="work-foot">
              Раньше эти два уровня закрывались только синтетическими добавками. Теперь —
              одной формулой из семян.
            </p>
          </div>

          {/* minerals */}
          <div className="fnd-minerals reveal">
            <div className="min-row">Zn · Ca · Mg · Mn · Fe</div>
            <div className="min-cap">Пять минералов в биодоступной форме.</div>
          </div>

          {/* ritual */}
          <div className="fnd-ritual reveal">
            <div className="fnd-label">Ритуал</div>
            <p>
              Одна ложка в день. В смузи, в йогурт, поверх салата. Курс — 30 дней.
              Первый эффект — через 14.
            </p>
          </div>

          {/* CTA */}
          <div className="fnd-cta reveal">
            <div className="cta-meta">
              <span className="cta-name">Foundation</span>
              <span className="cta-spec">30 порций · —— lei</span>
            </div>
            <a href="#quiz" className="btn">Начать курс <span aria-hidden="true">→</span></a>
          </div>

        </div>
      </div>
    </section>);

}

window.FoundationSection = FoundationSection;

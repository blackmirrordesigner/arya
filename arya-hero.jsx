/* global React */
/* ARYA · Hero — "The Keeping"
   A single continuous light-field. One smoothed scroll value (p, 0..1) drives
   every visual property as a pure function. Nothing is triggered; everything is
   matter slowly changing under light. Turrell light · museum custody · entropy.
*/

const { useState, useEffect, useRef, useCallback } = React;

/* ---------- interpolation helpers (the grammar of inevitability) ---------- */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
// smoothstep ramp between two scroll thresholds -> 0..1, eased
function ramp(p, a, b) {
  const t = clamp((p - a) / (b - a));
  return t * t * (3 - 2 * t);
}
// a "window" that rises 0->1 across [a,b] then falls 1->0 across [c,d]
function band(p, a, b, c, d) {
  return clamp(ramp(p, a, b) - ramp(p, c, d));
}
const lerpColor = (c1, c2, t) => {
  const h = (c) => c.match(/\w\w/g).map((x) => parseInt(x, 16));
  const [r1, g1, b1] = h(c1), [r2, g2, b2] = h(c2);
  const r = Math.round(lerp(r1, r2, t)), g = Math.round(lerp(g1, g2, t)), b = Math.round(lerp(b1, b2, t));
  return `rgb(${r},${g},${b})`;
};

/* ====================================================================== */
/*  HERO                                                                   */
/* ====================================================================== */
function AryaHero({ t }) {
  // p: smoothed scroll progress across the experience (0..1)
  const [p, setP] = useState(0);
  const pRef = useRef(0);
  const targetRef = useRef(0);
  const stageRef = useRef(null);
  const scrollerRef = useRef(null);
  // cursor light (Turrell: the visitor's attention moves the light)
  const [light, setLight] = useState({ x: 0.5, y: 0.42 });
  const lightTarget = useRef({ x: 0.5, y: 0.42 });
  // protect interaction: how much the visitor is "holding back" entropy
  const [hold, setHold] = useState(0);
  const holdTarget = useRef(0);

  const pace = t.pace; // scroll length multiplier
  const warmth = t.warmth; // 0..1 cool->warm key light

  /* ---- scroll -> progress. Driven directly (no rAF dependency): the eased,
     "matter slowly changing" feel comes from the smoothstep ramps over scroll
     position, not from frame interpolation — so it works even when rAF is idle. ---- */
  useEffect(() => {
    const onScroll = () => {
      const el = scrollerRef.current;
      if (!el) return;
      const max = el.offsetHeight - window.innerHeight;
      const tgt = clamp(window.scrollY / Math.max(1, max));
      targetRef.current = tgt;
      pRef.current = tgt;
      setP(tgt);
      try { localStorage.setItem('arya_hero_p', String(tgt)); } catch (e) {}
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- rAF: cosmetic smoothing only (cursor light + entropy hold decay).
     Degrades gracefully when the tab is backgrounded. ---- */
  useEffect(() => {
    let raf;
    const tick = () => {
      setLight((l) => ({
        x: lerp(l.x, lightTarget.current.x, 0.06),
        y: lerp(l.y, lightTarget.current.y, 0.06),
      }));
      holdTarget.current *= 0.94;
      setHold((h) => lerp(h, holdTarget.current, 0.12));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = useCallback((e) => {
    lightTarget.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
  }, []);
  const onHold = useCallback(() => { holdTarget.current = 1; }, []);

  // verification hook: drive p directly without scrolling (so a fixed-stage
  // capture can render any state). Harmless in production.
  useEffect(() => {
    window.__aryaSetP = (v) => { pRef.current = v; targetRef.current = v; setP(clamp(v)); };
    return () => { delete window.__aryaSetP; };
  }, []);

  /* ================= derived states — all pure functions of p ============ */
  // Phase centres (continuous, never snapped):
  //  establish .00 · entropy .18 · specimen .36 · archive .54 · study .68 · record .82 · evidence .96
  const establish = band(p, -1, 0.02, 0.10, 0.18);
  const entropy = band(p, 0.11, 0.20, 0.27, 0.35);
  const specimen = band(p, 0.22, 0.33, 0.43, 0.52);
  const archive = band(p, 0.46, 0.55, 0.60, 0.69);
  const study = band(p, 0.62, 0.70, 0.77, 0.85);
  const record = band(p, 0.74, 0.82, 0.89, 0.97);
  const evidence = ramp(p, 0.87, 0.985);

  // The seed is present from the first frame, grows monumental mid-journey,
  // recedes as the bottle (its evidence) takes its place.
  const seedScale = lerp(0.40, 1.0, ramp(p, 0.02, 0.42)) * lerp(1, 0.55, ramp(p, 0.76, 0.95));
  const seedTurn = p * 240; // slow continuous rotation, deg
  const seedGlow = clamp(0.45 + ramp(p, 0.0, 0.4) * 0.55 - ramp(p, 0.8, 1) * 0.5);
  const seedOpacity = clamp(lerp(0.5, 1, ramp(p, 0, 0.36)) - ramp(p, 0.74, 0.92) * 1.1);

  // Light field: cool conservation key warming toward the living core.
  const keyCool = '#b9c2c4';
  const keyWarm = '#e8c79a';
  const keyColor = lerpColor(keyCool, keyWarm, clamp(warmth * 0.5 + ramp(p, 0.3, 0.85) * 0.5));
  // a focused conservation pool — never a flood. Grows to reveal the archive,
  // then re-tightens onto the bottle so the evidence frame stays dark + protected.
  const beamWidth = 24 + 20 * ramp(p, 0.0, 0.5) - 15 * ramp(p, 0.82, 0.98);
  const ambient = lerp(0.0, 1, ramp(p, 0, 0.08));
  // beam drifts from cursor toward the bottle as evidence resolves
  const beamX = lerp(light.x * 100, 57, ramp(p, 0.85, 0.99));

  // Archive grid: faint in establishing frame, asserts in archive state, fades for record.
  const gridOpacity = clamp(lerp(0.08, 0.10, establish) + archive * 0.7 - record * 0.55);

  // Pull-back: the whole field recedes to reveal it was one cell among many.
  const fieldScale = lerp(1, 0.66, band(p, 0.40, 0.54, 0.74, 0.86));
  const fieldY = lerp(0, -4, archive);

  // Bottle (evidence): absent until it is earned, rises from the opened record.
  const bottleReveal = ramp(p, 0.80, 0.99);
  const bottleScale = lerp(0.72, 1, bottleReveal);
  // ...but a whisper of it is present in the establishing frame (Louvre principle)
  const bottleEstablish = establish * 0.4;
  const bottleVisible = clamp(bottleEstablish + bottleReveal);
  // oil fills the bottle as proof the message survived
  const oilLevel = ramp(p, 0.86, 1);

  const cx = light.x * 100, cy = light.y * 100;

  /* ============================== render ================================= */
  return (
    <React.Fragment>
      {/* tall scroller defines the journey length */}
      <div ref={scrollerRef} className="aryah-scroller" style={{ height: `${100 + 560 * pace}vh` }}>
        <div ref={stageRef} className="aryah-stage" onMouseMove={onMove}>

          {/* ---- THE LIGHT FIELD (Turrell) — base atmosphere ---- */}
          <div className="aryah-room" style={{
            background:
              `radial-gradient(120% 90% at ${cx}% ${cy}%,` +
              ` rgba(40,33,26,${0.0 + ambient * 0.0}) 0%,` +
              ` rgba(24,19,16,${ambient}) 55%,` +
              ` rgba(11,9,7,${ambient}) 100%)`,
          }} />

          {/* conservation beam — light is custody (a contained pool, not a flood) */}
          <div className="aryah-beam" style={{
            opacity: ambient * 0.92 * (1 - evidence * 0.32),
            background:
              `radial-gradient(${beamWidth}% ${beamWidth * 1.15}% at ${beamX}% ${lerp(cy, 44, 0.5)}%,` +
              ` ${keyColor} 0%,` +
              ` rgba(232,199,154,0) 70%)`,
            mixBlendMode: 'screen',
            filter: `blur(${lerp(40, 18, ramp(p, 0, 0.4))}px)`,
          }} />

          {/* ---- ARCHIVE GRID — the institution ---- */}
          <ArchiveGrid opacity={gridOpacity} density={t.density} active={archive} p={p} keyColor={keyColor} />

          {/* ---- THE FIELD (seed + bottle share one beam) ---- */}
          <div className="aryah-field" style={{
            transform: `translateY(${fieldY}vh) scale(${fieldScale})`,
          }}>

            {/* SEED — living intelligence, matter under light */}
            <div className="aryah-seed-wrap" style={{
              opacity: seedOpacity,
              transform: `translate(-50%,-50%) scale(${seedScale})`,
            }}>
              <Seed turn={seedTurn} glow={seedGlow} keyColor={keyColor} study={study} hold={hold} />
              {/* loupe data — discovered, never advertised */}
              <Loupe study={study} />
            </div>

            {/* BOTTLE — evidence, earned */}
            <div className="aryah-bottle-wrap" style={{
              opacity: bottleVisible,
              transform: `translate(-50%,-50%) scale(${bottleScale})`,
              filter: `drop-shadow(0 40px 80px rgba(0,0,0,${0.5 * bottleVisible}))`,
            }}>
              <div className="aryah-bottle-light" style={{
                opacity: bottleReveal * 0.38,
                background: `radial-gradient(46% 58% at 50% 36%, ${keyColor} 0%, transparent 74%)`,
              }} />
              <BottleSVG glow={bottleReveal} />
            </div>
          </div>

          {/* ---- ENTROPY — the antagonist: time erases the message ---- */}
          <Entropy active={entropy} hold={hold} onHold={onHold} cx={cx} intensity={t.entropy} />

          {/* ---- TEXT LAYERS — the archive whispers ---- */}
          <TextField
            p={p}
            establish={establish}
            entropy={entropy}
            specimen={specimen}
            archive={archive}
            study={study}
            record={record}
            evidence={evidence}
            thesis={t.thesis}
          />

          {/* ---- ACQUISITION + handoff ---- */}
          <Acquisition evidence={evidence} p={p} />

          {/* ---- fixed chrome: wordmark + scroll cue ---- */}
          <div className="aryah-chrome">
            <div className="aryah-wordmark">ARYA</div>
            <div className="aryah-instit">Архив живых материалов · EST. MMXXIV</div>
          </div>
          <ScrollCue p={p} establish={establish} evidence={evidence} />
          <ProgressRail p={p} />
        </div>
      </div>
    </React.Fragment>
  );
}

/* ====================================================================== */
/*  SEED — a luminous specimen (light as material, not a drawn organism)   */
/* ====================================================================== */
function Seed({ turn, glow, keyColor, study, hold }) {
  return (
    <div className="aryah-seed" style={{ transform: `rotate(${turn * 0.04}deg)` }}>
      {/* halo of protection */}
      <div className="aryah-seed-halo" style={{
        opacity: 0.4 + glow * 0.6,
        background: `radial-gradient(50% 50% at 50% 50%, ${keyColor} 0%, rgba(232,199,154,0) 70%)`,
      }} />
      {/* the body — warm living matter, lit from the cursor side */}
      <div className="aryah-seed-body" style={{
        transform: `rotate(${turn}deg)`,
        filter: `brightness(${0.85 + glow * 0.5 + hold * 0.25})`,
      }}>
        <div className="aryah-seed-core" />
        <div className="aryah-seed-skin" />
        <div className="aryah-seed-rim" />
      </div>
    </div>
  );
}

/* ---------- Loupe: study state reveals structure + data ---------- */
function Loupe({ study }) {
  if (study < 0.02) return null;
  const tags = [
    { l: 'ω-3 ALA', v: '55%', t: 30, x: 80 },
    { l: 'отжим', v: '≤ 22°C', t: 52, x: 86 },
    { l: 'пломба', v: '7 дней', t: 70, x: 14 },
  ];
  return (
    <div className="aryah-loupe-layer" style={{ opacity: study }}>
      <div className="aryah-loupe" style={{ transform: `scale(${lerp(0.9, 1, study)})` }} />
      {tags.map((tg, i) => (
        <div key={i} className="aryah-tag" style={{
          top: `${tg.t}%`, left: `${tg.x}%`,
          opacity: clamp((study - i * 0.12) * 1.6),
        }}>
          <span className="aryah-tag-l">{tg.l}</span>
          <span className="aryah-tag-v">{tg.v}</span>
        </div>
      ))}
    </div>
  );
}

/* ====================================================================== */
/*  ARCHIVE GRID — the institution                                         */
/* ====================================================================== */
function ArchiveGrid({ opacity, density, active, p, keyColor }) {
  const cols = density === 'dense' ? 7 : density === 'sparse' ? 4 : 5;
  const rows = density === 'dense' ? 4 : density === 'sparse' ? 2 : 3;
  const entries = [
    { no: 'N°01', n: 'Camelina', s: 'Camelina sativa' },
    { no: 'N°02', n: 'Hemp', s: 'Cannabis sativa' },
    { no: 'N°03', n: 'Milk Thistle', s: 'Silybum marianum' },
    { no: 'N°04', n: 'Flax', s: 'Linum usitatissimum', live: true },
    { no: 'N°05', n: '—', s: 'in conservation' },
  ];
  const cells = [];
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const center = r === Math.floor(rows / 2) && c === Math.floor(cols / 2);
      const e = center ? entries[3] : entries[idx % entries.length];
      cells.push({ r, c, e, center, key: `${r}-${c}` });
      if (!center) idx++;
    }
  }
  return (
    <div className="aryah-grid" style={{ opacity, gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
      {cells.map((cell) => (
        <div key={cell.key} className={`aryah-cell ${cell.center ? 'is-live' : ''}`} style={{
          borderColor: cell.center ? `rgba(232,199,154,${0.2 + active * 0.5})` : undefined,
        }}>
          <div className="aryah-cell-reg" />
          {(active > 0.2 || (cell.center && active > 0.05)) && (
            <div className="aryah-cell-label" style={{ opacity: cell.center ? clamp(active + 0.2) : active }}>
              <span className="aryah-cell-no">{cell.e.no}</span>
              {cell.center && active > 0.2 && <span className="aryah-cell-live">живой образец</span>}
            </div>
          )}
          {cell.center && (
            <div className="aryah-cell-glow" style={{
              background: `radial-gradient(60% 60% at 50% 45%, ${keyColor} 0%, transparent 70%)`,
              opacity: 0.3 + active * 0.4,
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ====================================================================== */
/*  ENTROPY — the antagonist. heat · light · oxygen · time · industry      */
/* ====================================================================== */
function Entropy({ active, hold, onHold, cx, intensity }) {
  if (active < 0.01 && hold < 0.01) return null;
  const forces = [
    { w: 'жар', e: 'heat', a: 12, r: 30 },
    { w: 'свет', e: 'light', a: 70, r: 34 },
    { w: 'кислород', e: 'oxygen', a: 140, r: 28 },
    { w: 'время', e: 'time', a: 205, r: 36 },
    { w: 'рафинация', e: 'refining', a: 270, r: 30 },
    { w: 'масс-производство', e: 'mass production', a: 330, r: 33 },
  ];
  const press = active * intensity * (1 - hold * 0.7);
  return (
    <div className="aryah-entropy" onMouseDown={onHold} onMouseMove={(e) => e.buttons && onHold()} style={{ opacity: active }}>
      {/* the dimming, unprotected seed at the edge */}
      <div className="aryah-lost-seed" style={{ opacity: active * (0.5 - hold * 0.4) }}>
        <div className="aryah-lost-body" style={{ filter: `brightness(${0.5 - press * 0.3}) saturate(${0.6 - press * 0.4})` }} />
        <span className="aryah-lost-label">образец без защиты</span>
      </div>
      {/* encroaching forces — drift inward, cannot cross the beam */}
      {forces.map((f, i) => {
        const rad = (f.a * Math.PI) / 180;
        const dist = f.r + press * 6 - 4;
        const x = 50 + Math.cos(rad) * dist;
        const y = 46 + Math.sin(rad) * dist * 0.86;
        return (
          <div key={i} className="aryah-force" style={{
            left: `${x}%`, top: `${y}%`,
            opacity: clamp(active - hold * 0.5) * (0.5 + (i % 2) * 0.4),
            transform: `translate(-50%,-50%)`,
          }}>
            <span className="aryah-force-w">{f.w}</span>
            <span className="aryah-force-e">{f.e}</span>
          </div>
        );
      })}
      <div className="aryah-entropy-hint" style={{ opacity: clamp(active - hold) }}>
        удерживайте свет — защитите сообщение
      </div>
    </div>
  );
}

/* ====================================================================== */
/*  TEXT FIELD — the archive whispers. Cormorant = organic · Manrope = record */
/* ====================================================================== */
function TextField({ p, establish, entropy, specimen, archive, study, record, evidence, thesis }) {
  return (
    <div className="aryah-text">
      {/* placard — present from the establishing frame, one museum-label line */}
      <div className="aryah-placard" style={{ opacity: clamp(establish + specimen * 0.7 - record * 0.6) }}>
        <span className="aryah-placard-no">N° 04</span>
        <span className="aryah-placard-d">·</span>
        <span className="aryah-placard-bin">Linum usitatissimum</span>
        <span className="aryah-placard-d">·</span>
        <span className="aryah-placard-loc">Hâncești</span>
      </div>

      {/* establishing thesis — second one, oriented */}
      <Line show={establish} cls="aryah-thesis">
        <em>{thesis}</em>
      </Line>

      {/* entropy line */}
      <Line show={entropy} cls="aryah-line aryah-line--entropy">
        Природа пишет сообщение.<br /><em>Время его стирает.</em>
      </Line>

      {/* specimen line */}
      <Line show={specimen} cls="aryah-line aryah-line--specimen">
        Каждое семя хранит<br />миллионы лет <em>памяти.</em>
      </Line>

      {/* archive line */}
      <Line show={archive} cls="aryah-line aryah-line--archive">
        <span className="aryah-kicker">Архив живых материалов</span>
        Один образец из многих.<br /><em>Защищён.</em>
      </Line>

      {/* record line — the elevated thesis */}
      <Line show={record} cls="aryah-line aryah-line--record">
        Мы не храним масло.<br /><em>Мы сохраняем инструкции природы.</em>
      </Line>
    </div>
  );
}

function Line({ show, cls, children }) {
  if (show < 0.01) return null;
  return (
    <div className={cls}>
      <div className="aryah-line-inner" style={{
        opacity: show,
        transform: `translateY(${lerp(14, 0, show)}px)`,
        filter: `blur(${lerp(6, 0, show)}px)`,
      }}>{children}</div>
    </div>
  );
}

/* inline dark Marasca bottle — clean, transparent, glows under the beam */
function BottleSVG({ glow }) {
  return (
    <svg className="aryah-bottle-svg" viewBox="0 0 240 480" xmlns="http://www.w3.org/2000/svg"
         style={{ filter: `brightness(${0.9 + glow * 0.5})` }}>
      <defs>
        <linearGradient id="ah-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0d0a08" /><stop offset="0.42" stopColor="#241c15" />
          <stop offset="0.5" stopColor="#2d231a" /><stop offset="0.58" stopColor="#241c15" />
          <stop offset="1" stopColor="#0d0a08" />
        </linearGradient>
        <linearGradient id="ah-cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5a4a32" /><stop offset="0.5" stopColor="#9c8059" /><stop offset="1" stopColor="#5a4a32" />
        </linearGradient>
        <linearGradient id="ah-oil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2c18" /><stop offset="1" stopColor="#9c6f2e" stopOpacity={0.5 + glow * 0.4} />
        </linearGradient>
      </defs>
      <rect x="98" y="14" width="44" height="36" rx="1" fill="url(#ah-cap)" />
      <rect x="104" y="50" width="32" height="42" fill="url(#ah-glass)" />
      <path d="M104 92 Q104 110 86 124 L154 124 Q136 110 136 92 Z" fill="url(#ah-glass)" />
      <rect x="58" y="124" width="124" height="328" rx="2" fill="url(#ah-glass)" />
      {/* oil column glimpsed through glass */}
      <rect x="66" y="150" width="108" height="294" fill="url(#ah-oil)" opacity={0.35 + glow * 0.4} />
      {/* specimen label */}
      <rect x="74" y="214" width="92" height="150" fill="#ddd1bd" />
      <text x="120" y="242" fontFamily="Manrope, sans-serif" fontSize="8" letterSpacing="1.6" textAnchor="middle" fill="#7A6446">N° 04 · MONO</text>
      <text x="120" y="286" fontFamily="Cormorant Garamond, serif" fontWeight="500" fontSize="26" letterSpacing="3" textAnchor="middle" fill="#1A1714">ARYA</text>
      <text x="120" y="310" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontWeight="300" fontSize="12" textAnchor="middle" fill="#5A544C">Linum usitatissimum</text>
      <line x1="92" y1="326" x2="148" y2="326" stroke="#C9BBA6" strokeWidth="0.5" />
      <text x="120" y="348" fontFamily="Manrope, sans-serif" fontSize="6.5" letterSpacing="1.6" textAnchor="middle" fill="#5A544C">100 ML · COLD PRESSED ≤ 22°C</text>
    </svg>
  );
}

/* ====================================================================== */
/*  ACQUISITION — conversion as an archival slip, not ecommerce            */
/* ====================================================================== */
function Acquisition({ evidence, p }) {
  const [qty, setQty] = useState(1);
  const [acquired, setAcquired] = useState(false);
  if (evidence < 0.01) return null;
  return (
    <div className="aryah-acq" style={{
      opacity: evidence,
      transform: `translateY(${lerp(24, 0, evidence)}px)`,
      pointerEvents: evidence > 0.6 ? 'auto' : 'none',
    }}>
      <div className="aryah-acq-head">
        <span className="aryah-acq-no">N° 04 · Linum usitatissimum</span>
        <span className="aryah-acq-cap">Доказательство, что сообщение сохранено</span>
      </div>
      <h2 className="aryah-acq-title"><em>Льняное</em> масло</h2>
      <div className="aryah-acq-meta">
        <span>Холодный отжим ≤ 22°C</span><i />
        <span>55% ω-3 ALA</span><i />
        <span>100 ml · Marasca</span>
      </div>
      <div className="aryah-acq-row">
        <div className="aryah-acq-price">220<small>lei</small></div>
        <div className="aryah-acq-qty">
          <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="−">−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)} aria-label="+">+</button>
        </div>
        <button className={`aryah-acq-btn ${acquired ? 'is-done' : ''}`} onClick={() => setAcquired(true)}>
          {acquired ? 'В архиве вашем ✓' : 'Получить образец'}
        </button>
      </div>
      <a className="aryah-acq-file" href="Linseed Oil.html">
        Открыть полное дело образца <span>→</span>
      </a>
    </div>
  );
}

/* ---------- scroll cue + progress rail ---------- */
function ScrollCue({ p, establish, evidence }) {
  const vis = clamp(establish * 0.9 - evidence);
  return (
    <div className="aryah-cue" style={{ opacity: vis }}>
      <span>открыть запись</span>
      <div className="aryah-cue-line"><i /></div>
    </div>
  );
}
function ProgressRail({ p }) {
  const marks = ['зал', 'угроза', 'образец', 'архив', 'изучение', 'запись', 'доказательство'];
  const centers = [0.0, 0.18, 0.36, 0.54, 0.68, 0.82, 0.96];
  return (
    <div className="aryah-rail">
      {marks.map((m, i) => {
        const near = clamp(1 - Math.abs(p - centers[i]) * 7);
        return (
          <div key={i} className="aryah-rail-mark" style={{ opacity: 0.25 + near * 0.75 }}>
            <span className="aryah-rail-dot" style={{ transform: `scale(${1 + near * 0.8})` }} />
            <span className="aryah-rail-label" style={{ opacity: near }}>{m}</span>
          </div>
        );
      })}
    </div>
  );
}

window.AryaHero = AryaHero;

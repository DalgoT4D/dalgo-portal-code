// Data-lifecycle loop — Dalgo works across every stage except Collecting.
// Full serpentine loop (LifecycleLoop) for the Platform page + a compact
// vertical teaser (LifecycleTeaser) for Home, so both pages teach one model.

const LL_ICONS = {
  planning: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.4" /><path d="M10.2 12.1l1.3 1.3 2.4-2.7" /></svg>,
  storing: <svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></svg>,
  cleaning: <svg viewBox="0 0 24 24"><path d="M4 5h16l-6.2 7.2V19l-3.6 1.8v-8.6L4 5z" /><circle cx="9.4" cy="2.7" r=".7" /><circle cx="14.6" cy="2.7" r=".7" /></svg>,
  visualising: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7.5 16.5v-3.5M12 16.5v-6.5M16.5 16.5v-4.5" /></svg>,
  acting: <svg viewBox="0 0 24 24"><path d="M18.5 9a6.5 6.5 0 0 0-13 0c0 5.5-2.2 6.8-2.2 6.8h17.4S18.5 14.5 18.5 9" /><path d="M10 19.2a2.2 2.2 0 0 0 4 0" /></svg>,
};

const LL_TOOLS = [
  { name: 'Avni', src: 'assets/sources/avni.png' },
  { name: 'CommCare', src: 'assets/sources/commcare.png' },
  { name: 'SurveyCTO', src: 'assets/sources/surveycto.png' },
  { name: 'KoboToolbox', src: 'assets/sources/kobotoolbox.png' },
];

const LL_STAGES = [
  { key: 'planning', n: 1, name: 'Planning', cap: 'Decide what to measure, and why.', dalgo: true, area: 'aP' },
  { key: 'collecting', n: 2, name: 'Collecting', cap: 'Your field teams keep the tools they already use.', handoff: true, area: 'aC' },
  { key: 'storing', n: 3, name: 'Storing', cap: 'Land it in your own secure warehouse.', dalgo: true, area: 'aS' },
  { key: 'cleaning', n: 4, name: 'Cleaning', cap: 'Combine and clean automatically, on a schedule.', dalgo: true, ai: true, area: 'aCl' },
  { key: 'visualising', n: 5, name: 'Visualising', cap: 'See it in live, shareable dashboards.', dalgo: true, area: 'aV' },
  { key: 'acting', n: 6, name: 'Acting with data', cap: 'Alerts and reports that drive decisions.', dalgo: true, area: 'aA' },
];

const LLArrow = ({ dir, variant, area }) => (
  <div className={`ll-ar ll-ar--${dir} ll-ar--${variant} ll-${area}`} aria-hidden="true">
    <svg viewBox="0 0 48 24"><line x1="3" y1="12" x2="38" y2="12" /><path d="M32 6l8 6-8 6" /></svg>
  </div>
);

const LLCard = ({ s }) => {
  const dalgoAria = s.handoff
    ? `${s.name} — your existing tools: Avni, CommCare, SurveyCTO, KoboToolbox`
    : `${s.name} — run by Dalgo${s.ai ? ', AI-assisted' : ''}`;
  return (
    <div
      className={`ll-card ll-${s.area}${s.handoff ? ' ll-card--handoff' : ''}${s.key === 'planning' ? ' ll-card--pre-handoff' : ''}`}
      role="group"
      aria-label={dalgoAria}>
      {s.dalgo && <span className="ll-dot" title="Runs on Dalgo" aria-hidden="true"></span>}
      {s.handoff ? (
        <div className="ll-ico ll-ico--handoff" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /><path d="M12 4v10M8 10l4 4 4-4" /></svg>
        </div>
      ) : (
        <div className="ll-ico" aria-hidden="true">{LL_ICONS[s.key]}</div>
      )}
      <div className="ll-name">
        {s.name}
        {s.ai && <span className="ll-chip">AI-assisted</span>}
      </div>
      <p className="ll-cap">{s.cap}</p>
      {s.handoff && (
        <div className="ll-tools" aria-hidden="true">
          {LL_TOOLS.map((t) => (
            <span className="ll-tool" key={t.name}><img src={t.src} alt="" loading="lazy" />{t.name}</span>
          ))}
        </div>
      )}
    </div>
  );
};

const LifecycleLoop = () => (
  <section className="ll-section" id="lifecycle" aria-labelledby="ll-h">
    <div className="ll-head">
      <div className="ll-eyebrow">The data lifecycle</div>
      <h2 className="ll-h" id="ll-h">Dalgo works across your whole data lifecycle — from planning to action.</h2>
      <p className="ll-sub">You keep the collection tools your field teams already use. Dalgo handles everything after.</p>
    </div>
    <div className="ll-wrap">
      <div className="ll-grid" role="list" aria-label="Data lifecycle, in loop order">
        <LLCard s={LL_STAGES[0]} />
        <LLArrow dir="right" variant="handoff" area="aT1" />
        <LLCard s={LL_STAGES[1]} />
        <LLArrow dir="right" variant="handoff" area="aT2" />
        <LLCard s={LL_STAGES[2]} />
        <LLArrow dir="down" variant="flow" area="aR" />
        <LLCard s={LL_STAGES[3]} />
        <LLArrow dir="left" variant="flow" area="aB2" />
        <LLCard s={LL_STAGES[4]} />
        <LLArrow dir="left" variant="flow" area="aB1" />
        <LLCard s={LL_STAGES[5]} />
        <LLArrow dir="up" variant="loop" area="aL" />
      </div>
      <div className="ll-loopnote" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M4 9a8 8 0 0 1 14-3l2 2M20 15a8 8 0 0 1-14 3l-2-2" /><path d="M20 4v4h-4M4 20v-4h4" /></svg>
        Each cycle repeats
      </div>
      <div className="ll-legend">
        <span className="ll-legend-item"><span className="ll-legend-dot"></span>Runs on Dalgo</span>
        <span className="ll-legend-item"><span className="ll-legend-box"></span>Your existing tools</span>
      </div>
    </div>
  </section>
);

// Compact teaser — one column, same vocabulary, for Home's ValuePillars column.
const LifecycleTeaser = () => (
  <div className="llt" role="list" aria-label="Data lifecycle, in loop order">
    <div className="llt-head">The data lifecycle</div>
    {LL_STAGES.map((s) => (
      <div
        className={`llt-item${s.handoff ? ' llt-item--handoff' : ''}`}
        key={s.key}
        role="listitem"
        aria-label={s.handoff ? `${s.name} — your existing tools` : `${s.name} — run by Dalgo${s.ai ? ', AI-assisted' : ''}`}>
        <span className="llt-num">{s.n}</span>
        {s.handoff ? (
          <span className="llt-ic llt-ic--handoff" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /><path d="M12 4v10M8 10l4 4 4-4" /></svg>
          </span>
        ) : (
          <span className="llt-ic" aria-hidden="true">{LL_ICONS[s.key]}</span>
        )}
        <span className="llt-name">{s.name}{s.ai && <span className="llt-chip">AI</span>}</span>
        {s.dalgo && <span className="llt-dot" title="Runs on Dalgo" aria-hidden="true"></span>}
      </div>
    ))}
    <div className="llt-note" aria-hidden="true">Dalgo runs every stage except collection.</div>
  </div>
);

Object.assign(window, { LifecycleLoop, LifecycleTeaser });

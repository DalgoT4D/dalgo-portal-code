// DemoTour v2 — combined 27-step interactive demo: Connect (5) + Clean (8) + Visualize (14) with a scope switcher.
// Strictly linear within scope; progress segments are read-only. Step data ported verbatim from the reference build.
const DTR_STEPS = [
  { p: "ingest", img: "assets/demo/ingest/1.webp", w: 1600, h: 856, alt: "Connect page - empty state", hs: { t: 13.5, l: 95 }, side: "above", title: "Add a new data source", desc: "Click the \"+ NEW SOURCE\" button to start bringing data into Dalgo from tools like Google Sheets, KoboToolbox, or CommCare.", url: "insights.dalgo.org/impact" },
  { p: "ingest", img: "assets/demo/ingest/2.webp", w: 1600, h: 866, alt: "Choose your data source", hs: { t: 56, l: 40 }, side: "above", title: "Pick Google Sheets", desc: "Choose from popular sources or search the catalog. Dalgo supports spreadsheets, survey tools, databases, and more.", url: "insights.dalgo.org/impact" },
  { p: "ingest", img: "assets/demo/ingest/3.webp", w: 1600, h: 869, alt: "Configure Google Sheets source", hs: { t: 87, l: 72 }, side: "above", title: "Configure your source", desc: "Paste your spreadsheet link and authenticate with Google. Dalgo handles the schema mapping automatically.", url: "insights.dalgo.org/impact" },
  { p: "ingest", img: "assets/demo/ingest/4.webp", w: 1600, h: 867, alt: "Connection syncing - Locked status", hs: { t: 48, l: 72 }, side: "below", title: "First sync in progress", desc: "Your connection is now syncing data for the first time. The \"Locked\" status means Dalgo is pulling records into your warehouse.", url: "insights.dalgo.org/impact" },
  { p: "ingest", img: "assets/demo/ingest/5.webp", w: 1600, h: 867, alt: "Connection synced - Success", hs: { t: 46, l: 71 }, side: "below", title: "Data synced successfully!", desc: "Your Google Sheets data is now in your warehouse. From here, you can transform it, build dashboards, and track KPIs.", url: "insights.dalgo.org/impact" },
  { p: "transform", img: "assets/demo/transform/1.webp", w: 1600, h: 805, alt: "Clean overview - DBT Repository connected", hs: { t: 47, l: 92 }, side: "below", title: "Open the workflow builder", desc: "Your dbt repository is already connected. Click \"Edit Workflow\" to start building your transformation pipeline visually — no need to write SQL from scratch.", url: "insights.dalgo.org/impact" },
  { p: "transform", img: "assets/demo/transform/2.webp", w: 1600, h: 809, alt: "Workflow canvas with source table tree", hs: { t: 24, l: 21 }, side: "below", title: "Bring in a source table", desc: "Every table synced from Connect shows up in this tree. Click the + next to any table to drop it onto your canvas as a starting point.", url: "insights.dalgo.org/impact" },
  { p: "transform", img: "assets/demo/transform/3.webp", w: 1600, h: 801, alt: "Cast node added to canvas with Create Table and Add Function options", hs: { t: 32, l: 87 }, side: "below", title: "Add a transformation step", desc: "Attach a Cast node to your source, then fix column types or add a custom SQL function. Dalgo builds the underlying dbt model for you.", url: "insights.dalgo.org/impact" },
  { p: "transform", img: "assets/demo/transform/4.webp", w: 1600, h: 804, alt: "Casting the AQI column to a numeric type", hs: { t: 50, l: 92 }, side: "above", title: "Fix data types", desc: "Cast text columns into numbers, dates, or timestamps. Getting types right here means every dashboard and chart downstream can trust the data.", url: "insights.dalgo.org/impact" },
  { p: "transform", img: "assets/demo/transform/5.webp", w: 1600, h: 804, alt: "Naming the output table and choosing a schema", hs: { t: 47, l: 87 }, side: "below", title: "Name your output table", desc: "Give the cleaned table a name and pick a schema — \"intermediate\" for work-in-progress, \"production\" for models ready to power dashboards.", url: "insights.dalgo.org/impact" },
  { p: "transform", img: "assets/demo/transform/6.webp", w: 1600, h: 804, alt: "Choosing a directory under models for the new table", hs: { t: 57, l: 87 }, side: "above", title: "Choose where it lives", desc: "Pick or create a folder under models/ — like staging/ or analytics/ — to keep your dbt project organized as the pipeline grows.", url: "insights.dalgo.org/impact" },
  { p: "transform", img: "assets/demo/transform/7.webp", w: 1600, h: 805, alt: "Running the workflow - dbt clean executing", hs: { t: 34, l: 61 }, side: "below", title: "Run the transformation", desc: "Hit Run to execute your model. Dalgo runs \"dbt clean\" behind the scenes and streams the logs here in real time.", url: "insights.dalgo.org/impact" },
  { p: "transform", img: "assets/demo/transform/8.webp", w: 1600, h: 806, alt: "Completed production pipeline with multiple transform steps and preview data", hs: { t: 30, l: 94 }, side: "below", title: "See your pipeline come together", desc: "Chain as many cast, join, and drop steps as you need, then publish. The clean, modeled table is now ready to power dashboards and reports.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/1.webp", w: 1600, h: 804, alt: "Create a new chart - choose a dataset", hs: { t: 26.7, l: 15.5 }, side: "above", title: "Pick your dataset", desc: "Every chart starts with a dataset. Search or browse tables synced from Connect and Clean, then pick one to visualize.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/2.webp", w: 1600, h: 804, alt: "Configure the chart type, axis, and metrics", hs: { t: 35.7, l: 8.6 }, side: "below", title: "Design the chart", desc: "Pick a chart type, choose your X-axis and metrics, and watch the preview update live on the right — no code required.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/3.webp", w: 1600, h: 801, alt: "Chart styling options - orientation, labels, legend", hs: { t: 61, l: 8.5 }, side: "below", title: "Style it your way", desc: "Switch orientation, toggle legends and tooltips, and control data labels — all without touching a design tool.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/4.webp", w: 1600, h: 807, alt: "Saved chart with interactive tooltip showing values", hs: { t: 43.9, l: 85.6 }, side: "below", title: "See it come alive", desc: "Hover any bar to see exact values. Once you're happy, your chart is saved and ready to drop into a dashboard.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/5.webp", w: 1600, h: 805, alt: "Empty dashboard canvas with Add Chart, Add KPI, Add Text buttons", hs: { t: 5.7, l: 35.6 }, side: "below", title: "Start a dashboard", desc: "Dashboards bring charts, KPIs, and text together in one view. Click \"Add Chart\" to bring in the chart you just built.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/6.webp", w: 1600, h: 806, alt: "Add Chart modal with a grid of saved charts to choose from", hs: { t: 26.6, l: 39.1 }, side: "below", title: "Drop your chart in", desc: "Browse your saved charts and KPIs, or create a new one on the spot. Click any chart to add it to the canvas.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/7.webp", w: 1600, h: 805, alt: "Add KPI modal with a grid of saved KPIs to choose from", hs: { t: 38.5, l: 49.4 }, side: "below", title: "Track it with a KPI", desc: "KPIs surface a single important number — like a target metric — with its trend over time. Pick one to pin at the top of your dashboard.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/8.webp", w: 1600, h: 803, alt: "Dashboard canvas with KPI and chart placed, drag to move handle visible", hs: { t: 21.6, l: 64.7 }, side: "below", title: "Arrange your layout", desc: "Drag any block to reorder it, resize charts by their corner handle, and stack KPIs above the charts they support.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/9.webp", w: 1600, h: 806, alt: "Dashboard with a text heading block added above the KPI and chart", hs: { t: 26.8, l: 64.7 }, side: "below", title: "Add context with text", desc: "Use the Add Text block to title sections, call out context, or explain what a viewer should take away from the numbers.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/10.webp", w: 1600, h: 807, alt: "Create Dashboard Filter modal - naming a District dropdown filter", hs: { t: 83.3, l: 74 }, side: "above", title: "Add a filter", desc: "Turn any column — like District — into a dropdown filter so viewers can slice the whole dashboard themselves.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/11.webp", w: 1600, h: 806, alt: "District filter dropdown open showing a searchable list of values", hs: { t: 50.4, l: 16.8 }, side: "below", title: "Choose filter values", desc: "Search or scroll to pick which values show up as options — every district synced from your source data is available.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/12.webp", w: 1600, h: 805, alt: "Filter applied to Agra - chart updates to show only that district", hs: { t: 24.7, l: 15.3 }, side: "below", title: "Apply and see it filter", desc: "Hit Apply and every chart and KPI on the dashboard updates instantly to match your selection — here, just Agra district.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/13.webp", w: 1600, h: 805, alt: "Dashboard in viewer mode with Edit Dashboard and Share buttons", hs: { t: 4.4, l: 86.4 }, side: "below", title: "Preview the finished dashboard", desc: "Exit edit mode to see exactly what your audience will see — filters, KPIs, and charts working together.", url: "insights.dalgo.org/impact" },
  { p: "visualise", img: "assets/demo/visualise/14.webp", w: 1600, h: 869, alt: "Public read-only view of the dashboard, powered by Dalgo branding", hs: { t: 4.6, l: 23.1 }, side: "below", title: "Share it with anyone", desc: "Publish a read-only public link — no login required. Anyone with the URL sees a live, filterable version of your dashboard, branded with Dalgo.", url: "insights.dalgo.org/impact" }
];
const DTR_LABEL = { ingest: "Connect", transform: "Clean", visualise: "Visualize" };
const DTR_PHASE_START = { ingest: 0, transform: 5, visualise: 13 };
const DTR_PHASE_N = { ingest: 5, transform: 8, visualise: 14 };
const DTR_INTRO = {
  all: { title: "The full Dalgo journey", desc: "All 27 steps, back to back — raw spreadsheet to public dashboard in about three minutes." },
  ingest: { title: "Connect your first source", desc: "Five quick steps — from + NEW SOURCE to data synced in your warehouse. Takes about a minute." },
  transform: { title: "Clean and model your data", desc: "Eight steps — turn a raw synced table into a typed, production-ready model. About a minute." },
  visualise: { title: "From table to shared dashboard", desc: "Fourteen steps — build a chart, assemble a filterable dashboard, and publish a public link. Two to three minutes." }
};
const DTR_END = {
  all: { title: "That's the full Dalgo journey", desc: "You just watched data flow from a raw spreadsheet all the way to a public, filterable dashboard — no code, start to finish.", next: null, replay: "Replay Demo" },
  ingest: { title: "Connect: complete", desc: "Your data is flowing into the warehouse. Next, see how Dalgo cleans and models it into something dashboard-ready.", next: "transform", nextLabel: "Continue to Clean →", replay: "Replay Connect" },
  transform: { title: "Clean: complete", desc: "Your table is clean, typed, and modeled. Next, turn it into a chart and a shareable dashboard.", next: "visualise", nextLabel: "Continue to Visualize →", replay: "Replay Clean" },
  visualise: { title: "That's the full picture", desc: "You've built a chart, assembled a dashboard, and published it publicly. That's the complete Dalgo workflow.", next: null, replay: "Replay Visualize" }
};
const DTR_MODES = [["all", "Full Journey", 27], ["ingest", "Connect", 5], ["transform", "Clean", 8], ["visualise", "Visualize", 14]];
const DemoTour = () => {
  const [scope, setScope] = React.useState("all");
  const [mode, setMode] = React.useState("intro"); // intro | run | end
  const [pos, setPos] = React.useState(0); // position within active scope
  const [expanded, setExpanded] = React.useState(false);
  const [tip, setTip] = React.useState({ side: "below", left: 0, top: 0, ax: 150, ay: 95, ready: false });
  const [tick, setTick] = React.useState(0);
  const tipRef = React.useRef(null);
  const frameRef = React.useRef(null);
  const idxs = React.useMemo(() => scope === "all" ? DTR_STEPS.map((_, i) => i) : DTR_STEPS.map((_, i) => i).filter((i) => DTR_STEPS[i].p === scope), [scope]);
  const total = idxs.length;
  const gi = idxs[Math.min(pos, total - 1)];
  const s = DTR_STEPS[gi];
  const phaseRel = gi - DTR_PHASE_START[s.p];
  const isPhaseFirst = phaseRel === 0;
  const running = mode === "run";
  const effPos = mode === "end" ? total : pos;
  const focusFrame = () => requestAnimationFrame(() => { if (frameRef.current) frameRef.current.focus(); });
  const selectScope = (k) => { if (k === scope && mode === "intro") return; setScope(k); setMode("intro"); setPos(0); };
  const start = () => { setMode("run"); setPos(0); focusFrame(); };
  const startScope = (k) => { setScope(k); setMode("run"); setPos(0); focusFrame(); };
  const next = () => { if (pos + 1 >= total) setMode("end"); else setPos(pos + 1); };
  const back = () => { if (!isPhaseFirst) setPos(pos - 1); };
  const onKey = (e) => {
    if (e.key === "Escape" && expanded) { setExpanded(false); return; }
    if (!running) return;
    if (e.key === "ArrowRight" || e.key === " " || e.key === "Spacebar") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); back(); }
  };
  React.useEffect(() => { document.body.style.overflow = expanded ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [expanded]);
  React.useEffect(() => {
    const f = () => setTick((t) => t + 1);
    window.addEventListener("resize", f);
    window.__dtrSet = (sc, p) => { setScope(sc); setMode("run"); setPos(p); };
    return () => { window.removeEventListener("resize", f); delete window.__dtrSet; };
  }, []);
  // Anchor the tooltip to the hotspot: 12px gap between pulse ring (r26) and arrow tip (6px proud of card edge) => card edge 44px from centre.
  React.useLayoutEffect(() => {
    if (!running || !frameRef.current || !tipRef.current) return;
    const slide = frameRef.current.querySelector(".dtr-slide.is-active");
    if (!slide) return;
    const W = slide.clientWidth, H = slide.clientHeight;
    const hx = s.hs.l / 100 * W, hy = s.hs.t / 100 * H;
    const cw = tipRef.current.offsetWidth || 300, ch = tipRef.current.offsetHeight || 190;
    const M = 16, OFF = 44;
    const fits = { below: hy + OFF + ch <= H - M, above: hy - OFF - ch >= M, right: hx + OFF + cw <= W - M, left: hx - OFF - cw >= M };
    const order = [s.side, "below", "above", "right", "left"].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);
    let side = order.find((k) => fits[k]);
    if (!side) { const space = { below: H - hy, above: hy, right: W - hx, left: hx }; side = order.slice().sort((a, b) => space[b] - space[a])[0]; }
    let left, top, ax = 150, ay = 95;
    const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
    if (side === "below" || side === "above") {
      top = side === "below" ? hy + OFF : hy - OFF - ch;
      top = clamp(top, M, Math.max(M, H - M - ch));
      left = clamp(hx - cw / 2, M, Math.max(M, W - M - cw));
      ax = clamp(hx - left, 26, cw - 26);
    } else {
      left = side === "right" ? hx + OFF : hx - OFF - cw;
      left = clamp(left, M, Math.max(M, W - M - cw));
      top = clamp(hy - ch / 2, M, Math.max(M, H - M - ch));
      ay = clamp(hy - top, 26, ch - 26);
    }
    setTip({ side, left, top, ax, ay, ready: true });
  }, [gi, running, expanded, scope, tick]);
  const intro = DTR_INTRO[scope];
  const end = DTR_END[scope];
  const eyebrow = <React.Fragment>{DTR_LABEL[s.p]} · Step {phaseRel + 1} of {DTR_PHASE_N[s.p]}{scope === "all" && <span className="dtr-kicker-all"> · {pos + 1}/27</span>}</React.Fragment>;
  return (
    <section className="pg-section" style={{ background: "#fff" }} data-screen-label="See Dalgo in action">
      <div className="container">
        <div className="section-head section-head-center">
          <h2 className="pg-h2">See Dalgo <span className="hl-underline">in action</span></h2>
        </div>
        <div className="dtr-modes" role="tablist" aria-label="Choose demo scope">
          {DTR_MODES.map(([k, label, n]) => (
            <button key={k} type="button" role="tab" aria-selected={scope === k} className={"dtr-mode" + (scope === k ? " is-active" : "")} onClick={() => selectScope(k)}>{label}<span className="dtr-mode-n">{n}</span></button>
          ))}
        </div>
        <div className={"dtr-frame" + (expanded ? " is-expanded" : "")} ref={frameRef} tabIndex={0} role="group" aria-label="Interactive product tour: connect, clean, and visualize in Dalgo" onKeyDown={onKey}>
          <div className="dtr-chrome">
            <span className="dtr-dot dtr-dot-r"></span><span className="dtr-dot dtr-dot-y"></span><span className="dtr-dot dtr-dot-g"></span>
            <span className="dtr-url">{s.url}</span>
            <button type="button" className="dtr-expand" onClick={() => setExpanded(!expanded)} aria-label={expanded ? "Exit fullscreen" : "View fullscreen"}>
              {expanded ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path></svg>}
            </button>
          </div>
          <div className="dtr-progress" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={Math.min(effPos + 1, total)} aria-label={"Tour progress: step " + Math.min(effPos + 1, total) + " of " + total}>
            {idxs.map((g, i) => <span key={g} className={"dtr-seg" + (i < effPos ? " is-done" : i === effPos ? " is-active" : "") + (scope === "all" && (g === 4 || g === 12) ? " is-gap" : "")}></span>)}
          </div>
          <div className="dtr-viewport">
            <div className={"dtr-dim" + (running ? " is-visible" : "")}></div>
            {DTR_STEPS.map((st, i) => (
              <div key={i} className={"dtr-slide" + (i === gi ? " is-active" : "")}>
                <img src={st.img} alt={st.alt} width={st.w} height={st.h} loading={i === idxs[0] ? undefined : "lazy"} />
                {running && i === gi && <button type="button" className="dtr-hotspot" style={{ top: st.hs.t + "%", left: st.hs.l + "%" }} onClick={next} aria-label={"Continue: " + st.title}></button>}
                {running && i === gi && (
                  <div key={gi} ref={tipRef} className={"dtr-tip s-" + tip.side} style={{ left: tip.left, top: tip.top, "--ax": tip.ax + "px", "--ay": tip.ay + "px", visibility: tip.ready ? "visible" : "hidden" }} role="dialog" aria-live="polite" aria-label={DTR_LABEL[st.p] + " step " + (phaseRel + 1) + " of " + DTR_PHASE_N[st.p]}>
                    <div className="dtr-kicker">{eyebrow}</div>
                    <div className="dtr-tip-title">{st.title}</div>
                    <div className="dtr-tip-desc">{st.desc}</div>
                    <div className="dtr-tip-actions">
                      <button type="button" className={"dtr-btn dtr-btn-ghost" + (isPhaseFirst ? " is-hidden" : "")} onClick={back}>← Back</button>
                      <span className="dtr-counter">{pos + 1} / {total}</span>
                      <button type="button" className="dtr-btn dtr-btn-primary" onClick={next}>{pos === total - 1 ? "Finish ✓" : "Next →"}</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {mode === "intro" && (
              <div className="dtr-overlay" role="dialog" aria-labelledby="dtr-intro-t">
                <div className="dtr-card">
                  <h3 id="dtr-intro-t">{intro.title}</h3>
                  <p>{intro.desc}</p>
                  <div className="dtr-card-actions"><button type="button" className="btn btn-primary" onClick={start}>Start the Tour</button></div>
                  <div className="dtr-hint"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 15l-2 5L9 9l11 4-5 2z"></path></svg>Use Next, the arrow keys, or the pulsing hotspots</div>
                </div>
              </div>
            )}
            {mode === "end" && (
              <div className="dtr-overlay" role="dialog" aria-labelledby="dtr-end-t">
                <div className="dtr-card">
                  <h3 id="dtr-end-t">{end.title}</h3>
                  <p>{end.desc}</p>
                  <div className="dtr-card-actions">
                    {end.next ? <button type="button" className="btn btn-primary" onClick={() => startScope(end.next)}>{end.nextLabel}</button> : (() => { const tc = window.trialCta ? window.trialCta() : { label: 'Contact Us', href: '/contact' }; return <a className="btn btn-primary" href={tc.href} target={tc.ext ? '_blank' : undefined} rel={tc.ext ? 'noreferrer' : undefined}>{tc.label} →</a>; })()}
                    <button type="button" className="btn btn-ghost" onClick={start}>{end.replay}</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {running && (
            <div className="dtr-mcard">
              <div className="dtr-kicker">{eyebrow}</div>
              <div className="dtr-mtitle">{s.title}</div>
              <div className="dtr-mdesc">{s.desc}</div>
              <div className="dtr-mactions">
                <button type="button" className="dtr-mbtn dtr-mbtn-ghost" onClick={back} disabled={isPhaseFirst}>← Back</button>
                <span className="dtr-mcounter">{pos + 1} / {total}</span>
                <button type="button" className="dtr-mbtn dtr-mbtn-primary" onClick={next}>{pos === total - 1 ? "Finish ✓" : "Next →"}</button>
              </div>
            </div>
          )}
          <span className="dtr-sr" aria-live="polite">{running ? DTR_LABEL[s.p] + " step " + (phaseRel + 1) + " of " + DTR_PHASE_N[s.p] + ": " + s.title : mode === "end" ? end.title : ""}</span>
        </div>
      </div>
    </section>
  );
};
window.DemoTour = DemoTour;

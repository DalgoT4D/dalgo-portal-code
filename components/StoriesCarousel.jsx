// StoriesCarousel — auto-advancing customer photography showcase (hero right side).
// Smooth horizontal slide, 4.5s per slide, pause on hover or via the visible keyboard-reachable
// Pause button (WCAG 2.2.2), infinite loop, GPU-accelerated (transform only).
const StoriesCarousel = () => {
  const slides = [
    { org: 'STiR Education', img: 'assets/consult-1.jpg' },
  ];
  const n = slides.length;
  // i advances 0→1→…→n (n = first clone of slide 0). After the transition into the clone
  // finishes, snap back to 0 with the transition disabled — invisible, so the loop is seamless.
  const [i, setI] = React.useState(0);
  const [anim, setAnim] = React.useState(true);
  const [playing, setPlaying] = React.useState(true);
  const hover = React.useRef(false);
  const reduced = React.useRef(false);
  React.useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => { reduced.current = m.matches; }; on();
    m.addEventListener ? m.addEventListener('change', on) : m.addListener(on);
    return () => { m.removeEventListener ? m.removeEventListener('change', on) : m.removeListener(on); };
  }, []);
  React.useEffect(() => {
    const iv = setInterval(() => {
      if (hover.current || !playing || reduced.current || document.hidden) return;
      setI((v) => v + 1);
    }, 4500);
    return () => clearInterval(iv);
  }, [playing]);
  // After animating onto the clone (i === n), wait out the .8s transition, then snap to 0 un-animated.
  React.useEffect(() => {
    if (i !== n) return;
    const t = setTimeout(() => {
      setAnim(false);
      setI(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    }, 850);
    return () => clearTimeout(t);
  }, [i, n]);
  const x = -Math.min(i, n) * 100;
  const active = i % n;
  return (
    <div className="fc" onMouseEnter={() => { hover.current = true; }} onMouseLeave={() => { hover.current = false; }} aria-label="Dalgo customers in the field">
      <div className="fc-stage">
        <div className={'fc-track' + (anim ? '' : ' no-anim')} style={{ transform: `translate3d(${x}%, 0, 0)` }}>
          {[...slides, slides[0]].map((sl, idx) => (
            <div key={idx} className="fc-slide" aria-hidden={idx % n === active ? 'false' : 'true'}>
              <img className="fc-img" src={sl.img} alt={`${sl.org} — Dalgo customer`} loading={idx === 0 ? 'eager' : 'eager'} decoding="async" />
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="fc-playpause" aria-pressed={!playing}
        aria-label={playing ? 'Pause customer photo rotation' : 'Play customer photo rotation'}
        onClick={() => setPlaying((p) => !p)}>
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">{playing ? <path d="M7 5h4v14H7zM13 5h4v14z" /> : <path d="M8 5v14l11-7z" />}</svg>
      </button>
    </div>
  );
};
window.StoriesCarousel = StoriesCarousel;

// ===== Our Story — Purpose · People · Platform editorial narrative =====

const StoryIntro = () => (
  <section className="st-intro">
    <div className="st-intro-inner">
      <div className="st-intro-eyebrow">Our Story</div>
      <h1 className="st-intro-h">The idea behind Dalgo</h1>
      <p className="st-intro-sub">
        Three chapters on why we exist, who makes it possible, and how we deliver —
        the purpose, the people, and the platform behind the work.
      </p>
    </div>
  </section>
);

const PhotoBadge = () => (
  <span className="st-ph-badge">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  </span>
);

const StorySection = () => {
  const rootRef = React.useRef(null);

  const chapters = [
    {
      label: 'Why we exist',
      heading: 'Better data creates better decisions.',
      body: 'Every nonprofit deserves data systems that help them focus on impact instead of spreadsheets. Good data work should give teams their time back for the mission.',
      img: 'assets/opt/story-mission.webp',
      alt: 'A nonprofit leader presenting at a Dalgo community session',
      reverse: false,
    },
    {
      label: 'Who makes it possible',
      heading: 'Open knowledge. Shared ownership.',
      body: 'Dalgo is built alongside the social sector — with the M&E leads, field teams, and directors who use it every day. Researchers, nonprofits, engineers, and practitioners continuously shape the platform through collaboration, transparency, and shared learning.',
      img: 'assets/opt/story-present.webp',
      alt: 'A Dalgo engineer walking nonprofit teams through the platform',
      reverse: true,
    },
    {
      label: 'How we deliver',
      heading: 'Data infrastructure, handled for you.',
      body: 'Open source, DPDP compliant, and impact focused — designed around your own data warehouse, Dalgo handles the difficult parts of working with data so teams can focus on learning, reporting, and improving programmes.',
      img: 'assets/opt/story-transform.webp',
      alt: 'Nonprofit staff exploring their live Dalgo dashboards on a laptop',
      reverse: false,
    },
  ];

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const chaptEls = Array.prototype.slice.call(root.querySelectorAll('.st-chapter'));
    const cols = Array.prototype.slice.call(root.querySelectorAll('.st-rail-col'));
    const fill = root.querySelector('.st-rail-fill');
    const parEls = chaptEls.map((c) => c.querySelector('.st-media-parallax'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const last = chaptEls.length - 1;

    const update = () => {
      const vh = window.innerHeight;
      const vpMid = vh / 2;
      const rects = chaptEls.map((c) => c.getBoundingClientRect());
      const centers = rects.map((r) => r.top + r.height / 2);

      // reveal a below-fold chapter as its top edge scrolls into view (one-way).
      // Chapters already on screen at mount are flagged stSeen and shown
      // instantly, so they never flash through the entrance keyframe.
      chaptEls.forEach((c, i) => {
        if (!c.dataset.stSeen && !c.classList.contains('in-view') &&
            rects[i].top < vh * 0.96 && rects[i].bottom > 0) {
          c.classList.add('in-view');
        }
      });

      // active = chapter whose centre is nearest the viewport middle
      let active = 0;
      let best = Infinity;
      centers.forEach((c, i) => {
        const d = Math.abs(c - vpMid);
        if (d < best) { best = d; active = i; }
      });

      // progress rail
      cols.forEach((col, i) => {
        col.classList.toggle('is-reached', i <= active);
        col.classList.toggle('is-current', i === active);
      });
      if (fill) fill.style.width = (last > 0 ? (active / last) * 100 : 0) + '%';

      // focus: recede non-active chapters
      chaptEls.forEach((c, i) => c.classList.toggle('is-dim', i !== active));

      // gentle parallax on the media
      if (!reduce) {
        parEls.forEach((p, i) => {
          if (!p) return;
          const rel = (centers[i] - vpMid) / vh;
          const clamped = Math.max(-1, Math.min(1, rel));
          p.style.transform = 'translateY(' + (clamped * -18).toFixed(1) + 'px)';
        });
      }
    };
    // Chapters already on screen at mount are shown instantly (no entrance),
    // so the first view is never a flash of hidden copy.
    chaptEls.forEach((c) => {
      const r = c.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.96 && r.bottom > 0) c.dataset.stSeen = '1';
    });
    update();
    // .st-live (which enables the recede-others focus effect) is added only on
    // a genuine rAF tick — a live, painting tab. In no-JS / reduced-motion /
    // throttled-capture contexts rAF never fires and every chapter stays at
    // its fully visible base state.
    let rafId = 0;
    const loop = () => {
      if (!root.classList.contains('st-live')) root.classList.add('st-live');
      update();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="st" ref={rootRef} data-screen-label="Our Story">
      <div className="st-chapters">
        {chapters.map((c, i) => (
          <article key={i} className={'st-chapter' + (c.reverse ? ' st-reverse' : '')}>
            <div className="st-media">
              <div className="st-media-parallax">
                <div className="st-media-inner">
                  <img className="st-photo" src={c.img} alt={c.alt} loading="lazy" />
                </div>
              </div>
            </div>
            <div className="st-copy">
              <div className="st-label">{c.label}</div>
              <h2 className="st-h">{c.heading}</h2>
              <p className="st-body">{c.body}</p>
            </div>
            <div className="st-baseline">
              <div className="st-baseline-fill"></div>
              {i === chapters.length - 1 && <div className="st-baseline-dot"></div>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

window.StoryIntro = StoryIntro;
window.StorySection = StorySection;

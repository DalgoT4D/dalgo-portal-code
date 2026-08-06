// ===== Consulting page (BM-285) =====
// Grounded in: spec offering list (v2 build instruction) + existing site engagement copy.
// REPLACE-WITH-SOURCE-DOC: pillars to be reconciled against "Dalgo Consulting OnePager" and offering
// detail against "Consulting Offerings — Proposals" once the correct docs are supplied (the uploaded
// files were an Urja Trust client proposal). Engagement-process section intentionally omitted until
// the internal Consulting Process doc arrives — do not invent stages.
const ConsultingHero = () => (
  <SiteHero
    eyebrow="Consulting"
    headline={<>Data consulting built around your organization's <span className="cvh-hl">mission</span></>}
    body="Every nonprofit has different data challenges. Our consultants combine deep nonprofit expertise with Dalgo's technology to design solutions that fit your workflows, your teams, and your goals."
    ctas={<HeroCTAs primaryLabel="Book Free Consultation" primaryHref="contact.html" secondaryLabel="Explore Our Work" secondaryHref="case-studies.html" />}
  >
    <div className="cvh-visual cvh-visual-cover">
      <figure className="cvh-figure cvh-figure-cover">
        <img loading="lazy" src="assets/opt/consulting-hero.webp" alt="Two nonprofit data practitioners working through their data systems together at a Dalgo consulting workshop" width="1600" height="1067" />
      </figure>
    </div>
  </SiteHero>
);
const CO_ICON = {
  discover: <svg viewBox="0 0 40 40"><circle cx="18" cy="18" r="9"></circle><path d="M25 25l8 8"></path></svg>,
  strategy: <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="14"></circle><circle cx="20" cy="20" r="7"></circle><circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none"></circle></svg>,
  advisory: <svg viewBox="0 0 40 40"><path d="M8 28V12a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H15z"></path><path d="M14 16h12M14 21h8"></path></svg>,
  capacity: <svg viewBox="0 0 40 40"><path d="M12 30c0-5 3.6-8 8-8s8 3 8 8"></path><circle cx="20" cy="14" r="5"></circle><path d="M30 12l2 2 4-4"></path></svg>,
  ai: <svg viewBox="0 0 40 40"><rect x="11" y="13" width="18" height="16" rx="3"></rect><path d="M20 13V8M16 8h8M16 20h2M22 20h2M16 24h8"></path></svg>,
  mel: <svg viewBox="0 0 40 40"><path d="M8 30V10M8 30h24M14 26l5-7 4 4 7-11"></path></svg>,
  impl: <svg viewBox="0 0 40 40"><circle cx="13" cy="20" r="6"></circle><circle cx="27" cy="20" r="6"></circle><path d="M19 20h2"></path></svg>,
  probono: <svg viewBox="0 0 40 40"><path d="M20 33s-11-6.6-11-14a6.5 6.5 0 0 1 11-4.6A6.5 6.5 0 0 1 31 19c0 7.4-11 14-11 14z"></path></svg>,
};
const StrategicExpertise = () => {
  // Sentence-case headings (design-system copy rule). Pro bono lives as a line + button below the grid.
  const offers = [
    { ic: 'discover', h: 'Data discovery', p: 'A structured look at where your data stands today — sources, gaps, and the quickest wins. Often the first engagement.' },
    { ic: 'advisory', h: 'Advisory', p: 'Ongoing counsel for data decisions — tooling, governance, architecture, and hiring.' },
    { ic: 'capacity', h: 'Capacity building', p: 'Training for M&E and program teams, so the systems we build together keep working after the engagement ends.' },
    { ic: 'ai', h: 'AI readiness', p: 'Assess where AI can help your programmes, and get your data ready for it.' },
    { ic: 'mel', h: 'Monitoring & evaluation', p: 'Log frames, indicators, and collection formats that flow straight into your dashboards and reports.' },
    { ic: 'strategy', h: 'Data strategy', p: 'A realistic roadmap from where your data is now to where your mission needs it to be.' },
    { ic: 'impl', h: 'Implementation support', p: 'Hands-on help connecting sources, cleaning data, and getting pipelines live in production.' },
  ];
  return (
    <section className="pg-section alt">
      <div className="container">
        <div className="section-head section-head-center">
          <p className="pg-eyebrow">What Dalgo Consulting does</p>
          <h2 className="section-title">Strategic data expertise for <span className="hl-underline">every stage</span> of your data journey</h2>
          <p className="section-sub se-sub">From monitoring frameworks to executive dashboards to AI readiness, our consultants pair nonprofit expertise with Dalgo's technology to build data systems you can trust.</p>
        </div>
        <div className="co-grid">
          {offers.map((o) => (
            <article key={o.h} className="co-card">
              <span className="co-ico" aria-hidden="true">{CO_ICON[o.ic]}</span>
              <h3>{o.h}</h3>
              <p>{o.p}</p>
            </article>
          ))}
          <article className="co-card co-probono-card">
            <span className="co-ico" aria-hidden="true">{CO_ICON.probono}</span>
            <h3>Pro bono consulting</h3>
            <p>For eligible nonprofits — a complimentary one-hour discovery session to map your data challenges and the right next steps.</p>
            <a className="btn btn-primary co-probono-btn" href="https://forms.gle/vfMNUNHTwDWB4qm66" target="_blank" rel="noopener">Book Free Consultation</a>
          </article>
        </div>
      </div>
    </section>
  );
};
// Customer voices — single-row testimonial carousel. Uniform full-width text cards (visual
// consistency prioritised; no per-card images since full verbatim quotes crowd a side panel).
// Quotes are VERBATIM from the customer-voice sheet (verified 2026-08), with a SINGLE bolded outcome each.
const CONSULT_DESK = [
  { tag: 'Team Capacity Building', org: 'SHOFCO', logo: 'assets/logos/SHOFCO.png',
    quote: <>We were able to undertake training from the Dalgo team — Pratiksha, who trained us; there were three of us, and I was one member of that training cohort. They were able to take us through different data engineering concepts, and gave us <strong>over 40 hours of training to build our capacity.</strong></>,
    name: 'Sheila Codawa', desig: 'IT Officer' },
  { tag: 'Schema Co-Design', org: 'Bhumi', logo: 'assets/logos/Bhumi.png', avatar: 'assets/voices/anusha-avatar.webp',
    quote: <>Even so, when we came to Dalgo we had our own schema in mind, and Rito and the team helped us see why what we had drawn up wouldn't actually work well — both for using the tool and for summarising our data the way we needed. They helped us redesign it, and we ended up with <strong>a schema that was much more efficient for our reporting.</strong></>,
    name: 'Anusha Vishwanath', desig: 'EA to the Co-founder' },
  { tag: 'Consulting-led Setup', org: 'INREM Foundation', logo: 'assets/logos/INREM.webp', accent: true,
    quote: <>For us, we had a lot of help from the Dalgo team — a lot of consulting, and just being able to <strong>set up the platform for us.</strong> A lot of it was done with the support from the Dalgo team. My colleague Kiran was working closely with the Dalgo team, and figuring a lot of things out.</>,
    name: 'Rashika Pullam Chetti', desig: 'Program Lead – M&E' },
  { tag: 'Sector Expertise', org: 'Baala', logo: 'assets/logos/Baala.png', avatar: 'assets/voices/karishma-avatar.webp',
    quote: <>They (Dalgo) bring in a lot of sector knowledge in terms of what dashboards can look like, what is the kind of effort that we need to put in before and after that. So I think that helped us get into <strong>a very good space of getting our expectations clear.</strong></>,
    name: 'Karishma Navalkar', desig: 'M&E Lead' },
  { tag: 'Consultant Partnership', org: 'Durga India', logo: null, accent: true,
    quote: <>Our Dalgo SPOC, Himanshu Dube, was super patient, helpful, and approachable in understanding our requirements and challenges. He helped us envision how Dalgo could support us — not just in creating dashboards, but <strong>in showing how data works in the transform stage.</strong></>,
    name: 'Rajalakshmi R', desig: 'Learnings & Outcomes Lead' },
  { tag: 'AI-Assisted Upskilling', org: 'Make A Difference', logo: 'assets/logos/MAD.png',
    quote: <>One more thing Dalgo has helped us with — especially Siddhant during consultation — is teaching us how to use AI to build and manipulate these views that we then use to represent the data. <strong>That helped me a lot, because I'm not a coder.</strong></>,
    name: 'Chetan', desig: 'Product Manager' },
  { tag: 'Pipeline Engineering', org: 'Dasra', logo: 'assets/logos/Dasra.png',
    quote: <>The consultant supported us with data engineering to <strong>set up and streamline the pipeline from Salesforce to Tableau</strong> via Dalgo. This is enabling automated data flow into our dashboards, reducing manual data handling and improving the reliability and timeliness of our reporting.</>,
    name: 'Wayne Fernandes', desig: 'Data Associate' },
  { tag: 'Hands-on Capability Building', org: 'Bhumi', logo: 'assets/logos/Bhumi.png', avatar: 'assets/voices/anusha-avatar.webp',
    quote: <>In September we had a <strong>three-day in-person bootcamp</strong> with the Dalgo team where we learned to use the tool more deeply — including coding in DBT under Rito's guidance. That gave us real confidence to handle smaller problems on our own.</>,
    name: 'Anusha Vishwanath', desig: 'EA to the Co-founder' },
  { tag: 'Data Ownership', org: 'SHOFCO', logo: 'assets/logos/SHOFCO.png',
    quote: <>So it has really built my capacity to not just be an IT Officer, but to be a point of support for the data team and the MEL teams. When they have challenges, now they can come to us to be able to <strong>start the troubleshooting process, rather than going directly to the consultant.</strong> So we appreciate that.</>,
    name: 'Sheila Codawa', desig: 'IT Officer' },
  { tag: 'Patient, Hands-on Setup', org: 'Goonj', logo: 'assets/logos/Goonj.png',
    quote: <>Pratiksha and Siddhant were very helpful during the initial setup. They were <strong>very patient with team members and explained processes properly</strong> and sometime multiple times as well.</>,
    name: 'Shivangi Desai', desig: 'Tech Lead' },
];
const ConsultantsDesk = () => {
  const viewportRef = React.useRef(null);
  const emblaRef = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const [snaps, setSnaps] = React.useState([0]);
  React.useEffect(() => {
    const Embla = window.EmblaCarousel;
    const vp = viewportRef.current;
    if (!Embla || !vp) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // No continuous AutoScroll: constantly drifting text never lets the eye settle, which is
    // what made the green tags read as "jumping". Logos can marquee; quotes cannot. The track
    // now snaps slide-by-slide via the dots/arrows, with the optional discrete autoplay below.
    const embla = Embla(vp, { loop: true, align: 'start', containScroll: 'trimSnaps', dragFree: false, duration: 26 });
    emblaRef.current = embla;
    const sync = () => { setSnaps(embla.scrollSnapList()); setActive(embla.selectedScrollSnap()); };
    sync();
    embla.on('select', () => setActive(embla.selectedScrollSnap()));
    embla.on('reInit', sync);
    return () => { embla.destroy(); };
  }, []);
  return (
    <section className="pg-section cvc-section" aria-label="Why nonprofits choose to partner with Dalgo">
      <div className="container">
        <div className="section-head section-head-center">
          <p className="pg-eyebrow">Customer voices</p>
          <h2 className="section-title">Why nonprofits choose to partner with <span className="hl-underline">Dalgo</span></h2>
        </div>
        <div className="cvc-embla" ref={viewportRef}>
          <div className="cvc-embla-container">
            {CONSULT_DESK.map((c, i) => (
              <div className="cvc-slide" key={i}>
                <article className={`cvc-card${c.accent ? ' is-accent' : ''}`}>
                  <div className="cvc-body">
                    <div className="cvc-head">
                      {c.logo
                        ? <img className="cvc-logo" src={c.logo} alt={c.org} loading="lazy" />
                        : <span className="cvc-org-top">{c.org}</span>}
                      <span className="cvc-mark" aria-hidden="true">“</span>
                    </div>
                    <h3 className="cvc-tag">{c.tag}</h3>
                    <blockquote className="cvc-quote">{c.quote}</blockquote>
                  </div>
                  <footer className="cvc-attr">
                    {c.avatar && <img className="cvc-avatar" src={c.avatar} alt={c.name} width="48" height="48" loading="lazy" />}
                    <span className="cvc-who">
                      <span className="cvc-name">{c.name}</span>
                      <span className="cvc-desig">{c.desig}</span>
                      <span className="cvc-orgname">{c.org}</span>
                    </span>
                  </footer>
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className="cvc-dots">
          {snaps.map((_, i) => (
            <button type="button" key={i} className={'cvc-dot' + (i === active ? ' on' : '')} aria-label={`Go to slide ${i + 1}`} onClick={() => emblaRef.current && emblaRef.current.scrollTo(i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

// "The people you'll work with" — editorial profile cards.
// Every repeated value (padding, band gap, label size, icon size, divider, chip height)
// comes from one set of --sb-* custom properties declared on the section, so instances
// match by construction rather than by coincidence. One icon family, one stroke weight,
// one left edge: the polaroid + identity form the masthead, and EVERY block beneath it
// (bio, dividers, labels, chips, logos, both columns) starts on the card's padding edge.
const SOLID_LOGOS = ['SHOFCO', 'Ummeed', 'Baala', 'Dasra'];
// Wide wordmarks read far heavier than square emblems at equal height, so they are
// optically normalised down rather than dimensionally matched.
const WIDE_LOGOS = ['SHOFCO', 'Baala', 'MAD', 'Antarang', 'SHRI', 'SEARCH', 'STiR Education'];
const ICON = {
  heart: <path d="M12 20s-7-4.4-7-9.3A3.9 3.9 0 0 1 12 8.4a3.9 3.9 0 0 1 7 2.3C19 15.6 12 20 12 20z" />,
  people: <><circle cx="9" cy="9.5" r="2.4" /><circle cx="16" cy="9.5" r="2.4" /><path d="M4.5 18c0-2.3 2-3.8 4.5-3.8s4.5 1.5 4.5 3.8M13.5 18c0-2.3 1.8-3.8 4-3.8" /></>,
  note: <><path d="M9 17.5V6l9-1.8v11" /><circle cx="6.6" cy="17.6" r="2.4" /><circle cx="15.6" cy="15.6" r="2.4" /></>,
  book: <><path d="M4.5 5.5A2 2 0 0 1 6.5 3.5H19v14H6.5a2 2 0 0 0-2 2z" /><path d="M4.5 5.5v14" /></>,
  pin: <><path d="M12 20.5s5.5-5 5.5-9.5a5.5 5.5 0 1 0-11 0c0 4.5 5.5 9.5 5.5 9.5z" /><circle cx="12" cy="11" r="2" /></>,
};
const Ico = ({ name }) => (
  <span className="sb-ico"><svg viewBox="0 0 24 24" aria-hidden="true">{ICON[name]}</svg></span>
);

const TEAM = [
  {
    name: 'Ritabrata Roy', role: 'Data Consultant', place: 'Kolkata',
    photo: 'assets/team/ritabrata-roy.webp', pin: 'tape',
    bio: 'Grew up in Kolkata. Went from consulting analyst to teaching STEM in a government primary school — a journey that shaped how he sees data: as a tool for equity.',
    sectors: ['Education', 'Mental Health', 'Youth Development', 'Child Protection', 'Philanthropy'],
    orgs: [
      { n: 'Dasra', f: 'assets/logos/Dasra.png' }, { n: 'SHOFCO', f: 'assets/logos/SHOFCO.png' },
      { n: 'MAD', f: 'assets/logos/MAD.png' }, { n: 'Baala', f: 'assets/logos/Baala.png' },
      { n: 'Antarang', f: 'assets/logos/Antarang.webp' }, { n: 'Bhumi', f: 'assets/logos/Bhumi.png' },
    ],
    song: 'Time', artist: 'Pink Floyd', player: 'vinyl',
    offline: 'Volunteering in classrooms, building child-safety systems with schools, and talking careers with teenagers.',
  },
  {
    name: 'Pratiksha Rao', role: 'Data Consultant', place: 'Bangalore',
    photo: 'assets/team/pratiksha-rao.webp', pin: 'clip',
    bio: 'Raised in Dubai, computer science grad, former AI engineer. She left the corporate world to work with nonprofits — and calls it the best choice she has made.',
    sectors: ['Education', 'Water', 'Health', 'Gender', 'Sanitation'],
    orgs: [
      { n: 'SHOFCO', f: 'assets/logos/SHOFCO.png' }, { n: 'STiR Education', f: 'assets/logos/STiREducation.png' },
      { n: 'SHRI', f: 'assets/logos/SHRI.png' }, { n: 'Ummeed', f: 'assets/logos/Ummeed.png' },
      { n: 'AKRSP', f: 'assets/logos/AKRSP.png' }, { n: 'SEARCH', f: 'assets/logos/SEARCH.png' },
    ],
    song: 'Achilles Come Down', artist: 'Gang of Youths', player: 'cassette',
    offline: 'Books, video games and board games, learning the piano — and picking up new languages.',
  },
];

// One reusable band: label (icon + text) over content. Identical metrics everywhere.
const Band = ({ icon, label, children }) => (
  <div className="sb-band">
    <p className="sb-label"><Ico name={icon} />{label}</p>
    {children}
  </div>
);

const ConsultingTeam = () => (
  <section className="sb-section" id="team">
    <div className="container">
      <div className="sb-head">
        <p className="sb-eyebrow">Meet our consultants</p>
        <h2 className="sb-h2">The people you’ll <span className="hl-underline">work with</span></h2>
        <p className="sb-sub">We’re data nerds, change makers, and curious humans. Here to make your data work harder for good.</p>
      </div>

      <div className="sb-grid">
        {TEAM.map((p) => (
          <article className="sb-card" key={p.name}>
            <header className="sb-masthead">
              <figure className={'sb-photo is-' + p.pin}>
                <img src={p.photo} alt={p.name} width="640" height="640" loading="lazy" decoding="async" />
              </figure>
              <div className="sb-identity">
                <h3 className="sb-name">{p.name}</h3>
                <span className="sb-role">{p.role}</span>
                <p className="sb-place"><Ico name="pin" />{p.place}</p>
              </div>
            </header>

            <p className="sb-bio">{p.bio}</p>

            <Band icon="heart" label="Cares deeply about">
              <ul className="sb-chips">
                {p.sectors.map((x) => <li className="sb-chip" key={x}>{x}</li>)}
              </ul>
            </Band>

            <Band icon="people" label="Communities partnered with">
              <ul className="sb-logos">
                {p.orgs.map((o) => (
                  <li className="sb-logo-cell" key={o.n}>
                    <img
                      className={'sb-logo' + (SOLID_LOGOS.indexOf(o.n) !== -1 ? ' is-solid' : '') + (WIDE_LOGOS.indexOf(o.n) !== -1 ? ' is-wide' : '')}
                      src={o.f} alt={o.n} title={o.n} loading="lazy" decoding="async" />
                  </li>
                ))}
              </ul>
            </Band>

            <div className="sb-columns">
              <Band icon="note" label="Currently on repeat">
                <div className="sb-song">
                  <span className={'sb-player is-' + p.player} aria-hidden="true"></span>
                  <span className="sb-song-meta">
                    <span className="sb-song-title">{p.song}</span>
                    <span className="sb-song-artist">{p.artist}</span>
                  </span>
                </div>
              </Band>
              <Band icon="book" label="When the laptop closes">
                <p className="sb-offline">{p.offline}</p>
              </Band>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ConsultingFinalCTA = () => (
  <section className="final-cta final-cta-photo" id="final-cta">
    <div className="final-cta-bg" aria-hidden="true">
      <img width="1400" height="933" src="assets/opt/story-mission.webp" alt="" loading="lazy" />
    </div>
    <div className="container">
      <div className="final-cta-eyebrow">Dalgo Consulting</div>
      <h2 className="final-cta-h">Ready to strengthen your organization's <span className="hl-underline">data capabilities?</span></h2>
      <p className="final-cta-sub">Whether you're improving reporting, designing a new MEL framework, integrating systems, or preparing for AI, we'll help you build a data foundation that supports better decisions and greater impact.</p>
      <div className="final-cta-actions">
        <a href="contact.html" className="final-cta-btn">Book a Free Consultation
          <svg className="i" viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
        </a>
      </div>
    </div>
  </section>
);

window.ConsultingHero = ConsultingHero;
window.StrategicExpertise = StrategicExpertise;
window.ConsultantsDesk = ConsultantsDesk;
window.ConsultingTeam = ConsultingTeam;
window.ConsultingFinalCTA = ConsultingFinalCTA;

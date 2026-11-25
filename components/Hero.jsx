// Hero — headline + auto-advancing customer carousel. (Dead HeroDashboard removed per BM-357 audit.)
const RotateWord = ({ words, interval = 2200 }) => {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const iv = setInterval(() => setIdx((i) => (i + 1) % words.length), interval);
    return () => clearInterval(iv);
  }, []);
  return <span className="rotate-word" data-comment-anchor="f48851ef7e-span-83-10">{words[idx]}</span>;
};

// Hero CTAs are rendered directly rather than through HeroCTAs, because HeroCTAs decides which
// button is green by ROLE — the consultation CTA always leads — and would have made the second
// CTA the primary. The brief was explicit: trial leads. (Stuti, 26 Aug.)
//
// The hero now carries ONE CTA. The ghost beside it was the event link — "Upcoming Events",
// then "Register for Data Decoded" — and was removed 21 Oct (Stuti). Not relabelled: pointing a
// second button at the trial would have put two buttons on the same destination, and the events
// calendar is still reachable from the announcement bar and Resources.
//
// The trial label matches the nav's as of 15 Sep — both are "Try Platform for Free", both come
// from trialCta(), and both resolve to SITE_CONFIG.TRIAL_URL. They were deliberately different
// before that. cta_click reads the visible text, so the two surfaces now report as ONE row;
// data-cta-location is what still separates them.
const Hero = () => {
  const trial = window.trialCta();
  return (
    <SiteHero
      eyebrow="Data insights platform and expert data consulting"
      headline={<>Know Your Data,<br /><span className="cvh-hl">Share Your Story</span></>}
      body="From technology to strategy, Dalgo helps nonprofits build the data capabilities they need to report with confidence, make better decisions, and increase their impact."
      ctas={
        <a className="cmh-btn cmh-btn-primary" href={trial.href} target={trial.ext ? '_blank' : undefined} rel={window.ctaRel(trial)} data-cta-location="hero_trial">
          {trial.label}
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
        </a>
      }
      image={{ src: 'assets/hero/home.webp', alt: 'A nonprofit team reviewing their programme data together in Dalgo', kind: 'photo' }}
    />
  );
};

window.Hero = Hero;

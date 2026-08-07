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

const Hero = () => (
  <SiteHero
    eyebrow="Data insights platform and expert data consulting"
    headline={<>Know Your Data,<br /><span className="cvh-hl">Share Your Story</span></>}
    body="Bring scattered programme data into one trusted source your whole team can act on — for monthly reflections, funder reporting, and everyday decisions. Built by a nonprofit, for the social sector."
    ctas={<HeroCTAs primaryLabel="Try the Platform" primaryHref="https://dashboard.dalgo.org" secondaryLabel="Book a Free Consultation" secondaryHref={window.SITE_CONFIG.CONSULT_FORM} />}
    help={<>Need help planning your data systems? <a href={window.SITE_CONFIG.CONSULT_FORM} target="_blank" rel="noopener">Apply for Pro Bono Consulting<svg viewBox="0 0 24 24" className="x-ext" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"></path></svg></a></>}
  >
    <div className="cvh-visual hero-visual">
      {/* BM-329: DPG + open-source badges moved off the hero — they live in TrustBand (home) and About */}
      <div className="hero-carousel">
        <StoriesCarousel />
      </div>
    </div>
  </SiteHero>
);

window.Hero = Hero;

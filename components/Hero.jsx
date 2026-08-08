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
    body="From technology to strategy, Dalgo helps nonprofits build the data capabilities they need to report with confidence, make better decisions, and increase their impact."
    ctas={<HeroCTAs secondaryLabel="Book Free Consultation" secondaryHref={window.SITE_CONFIG.CONSULT_FORM} />}
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

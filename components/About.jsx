// About — single editorial paragraph block + carousel pane (People / Purpose / Platform)
const About = () => {
  const panes = [
  { label: 'People', h: 'Building the community, sharing the knowledge, refusing to stop solving' },
  { label: 'Purpose', h: 'Better tools. Better decisions. Better outcomes — for everyone we serve' },
  { label: 'Platform', h: 'Quietly making the hard parts easier, so the meaningful parts can breathe' }];

  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % panes.length), 4200);
    return () => clearInterval(iv);
  }, []);
  return (
    <section className="about-section" id="about" data-comment-anchor="24087b69e4-section-14-5">
      <div className="container">
        <div className="about-grid">
          <div className="about-copy">
            <h2 className="about-h">
              We are a combination of people, purpose, and platform
            </h2>
            <p className="about-p">
              Our purpose draws people in — with a shared conviction that the social sector deserves better data tools to drive their mission.
            </p>
            <p className="about-p">
              Our people carry that purpose forward — through the community they build, the knowledge they share, and the transparency that follows.
            </p>
            <p className="about-p">
              And the platform is how we keep our promise — making the messy parts of data easier so the meaningful parts can breathe.
            </p>
            <a href="about.html" className="about-cta">Meet Our Team →</a>
          </div>
          <div className="about-carousel">
            <img src="assets/people-1.jpg" alt="Dalgo community of nonprofit data practitioners" className="about-photo" />
            <div className="about-photo-cap">Our community of nonprofit data practitioners</div>
          </div>
        </div>
      </div>
    </section>);

};
window.About = About;
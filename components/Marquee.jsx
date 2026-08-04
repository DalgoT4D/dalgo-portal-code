// Trust — single-line auto-scrolling logo marquee. Every logo sits in an identical
// container and is rendered monochrome for consistent visual weight.
//
// Two monochrome treatments, because the roster is two families of asset (measured,
// not guessed — see the marquee-visibility note in the design system):
//   • line/wordmark logos (transparent, thin marks) → `brightness(0)` SILHOUETTE.
//     This is the ONLY treatment that rescues the pale wordmarks (TAP, Antarang, MAD
//     are ~235–255 luminance — grayscale keeps them invisible on white).
//   • solid filled emblems (SHOFCO, Ummeed, Baala, Dasra — >50% opaque) → GRAYSCALE.
//     brightness(0) would collapse these to black blobs/badges; grayscale keeps their
//     internal tone and they are already dark enough to read.
// `solid: true` selects the grayscale branch (.logo-img.is-solid in app.css).
const Marquee = () => {
  // Partner roster — local transparent assets only. Missing officials (ATECF, Goonj,
  // Dani Sports Foundation, 1000 Days Fund, Peepul, Scouts Australia, Protsahan) are
  // added to assets/logos/ as they arrive, then appended here.
  const logos = [
  { name: 'SNEHA', src: 'assets/logos/SNEHA.png' },
  { name: 'INREM', src: 'assets/logos/INREM.webp' },
  { name: 'The Apprentice Project', src: 'assets/logos/TAP.png' },
  { name: 'Antarang', src: 'assets/logos/Antarang.webp' },
  { name: 'SHRI', src: 'assets/logos/SHRI.png' },
  { name: 'Noora Health', src: 'assets/logos/NooraHealth.png' },
  { name: 'SHOFCO', src: 'assets/logos/SHOFCO.png', solid: true },
  { name: 'Ummeed', src: 'assets/logos/Ummeed.png', solid: true },
  { name: 'Janaagraha', src: 'assets/logos/Janaagraha.svg' },
  { name: 'MAD', src: 'assets/logos/MAD.png' },
  { name: "People's Courage International", src: 'assets/logos/PeoplesCourage.png' },
  { name: 'Baala', src: 'assets/logos/Baala.png', solid: true },
  { name: 'Bhumi', src: 'assets/logos/Bhumi.png' },
  { name: 'AKRSP', src: 'assets/logos/AKRSP.png' },
  { name: 'Dasra', src: 'assets/logos/Dasra.png', solid: true },
  { name: 'SEARCH', src: 'assets/logos/SEARCH.png' }];

  const track = [...logos, ...logos];
  return (
    <div className="marquee-wrap">
      <div className="marquee-label">Trusted by 25+ nonprofits across multiple sectors</div>
      <div className="logo-marquee">
        <div className="logo-marquee-track">
          {track.map((l, i) => (
            <div className="logo-tile" key={`${l.name}-${i}`} aria-hidden={i >= logos.length ? 'true' : undefined}>
              <img src={l.src} alt={i >= logos.length ? '' : l.name} className={l.solid ? 'logo-img is-solid' : 'logo-img'} decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </div>);

};
window.Marquee = Marquee;

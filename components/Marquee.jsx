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
//
// OPTICAL SIZING (Sep 2026). An identical container is NOT equal visual weight: a
// wide wordmark capped at one height covers ~4× the area of a circular emblem, so
// the wall looks lopsided (the "some are rectangle, some text, some circle" problem).
// Each logo instead carries an `h` — its cap-height in px, set toward equal optical
// weight (roughly equal area, so squares/circles render TALLER than wordmarks and
// read at the same importance). Derived from each asset's real aspect ratio, clamped
// 26–46. The two ultra-wide strips (AR > 5: TAP 8.6, Janaagraha 6.0) can't gain
// height without stretching, so they take `strip: true` — a wider content box for
// presence instead. Retune `h` if an asset is replaced; measure, don't guess.
const Marquee = () => {
  const logos = [
  { name: 'SNEHA', src: 'assets/logos/SNEHA.png', solid: true, h: 42 },
  { name: 'INREM', src: 'assets/logos/INREM.webp', solid: true, h: 36 },
  { name: 'The Apprentice Project', src: 'assets/logos/TAP.png', h: 22, strip: true },
  { name: 'Antarang', src: 'assets/logos/Antarang.webp', h: 32 },
  { name: 'SHRI', src: 'assets/logos/SHRI.png', solid: true, h: 30 },
  { name: 'Noora Health', src: 'assets/logos/NooraHealth.png', solid: true, h: 28 },
  { name: 'SHOFCO', src: 'assets/logos/SHOFCO.png', solid: true, h: 30 },
  { name: 'Ummeed', src: 'assets/logos/Ummeed.png', solid: true, h: 46 },
  { name: 'Janaagraha', src: 'assets/logos/Janaagraha.svg', h: 24, strip: true },
  { name: 'MAD', src: 'assets/logos/MAD.png', h: 34 },
  { name: "People's Courage International", src: 'assets/logos/PeoplesCourage.png', solid: true, h: 28 },
  { name: 'Baala', src: 'assets/logos/Baala.png', solid: true, h: 30 },
  { name: 'Bhumi', src: 'assets/logos/Bhumi.png', solid: true, h: 46 },
  { name: 'Dasra', src: 'assets/logos/Dasra.png', solid: true, h: 46 },
  { name: 'SEARCH', src: 'assets/logos/SEARCH.png', solid: true, h: 30 }];

  const track = [...logos, ...logos];
  return (
    <div className="marquee-wrap">
      <div className="marquee-label">Trusted by 25+ nonprofits across multiple sectors</div>
      <div className="logo-marquee">
        <div className="logo-marquee-track">
          {track.map((l, i) => (
            <div className={l.strip ? 'logo-tile is-strip' : 'logo-tile'} key={`${l.name}-${i}`} aria-hidden={i >= logos.length ? 'true' : undefined}>
              <img src={l.src} alt={i >= logos.length ? '' : l.name} className={l.solid ? 'logo-img is-solid' : 'logo-img'} style={{ '--logo-h': l.h + 'px' }} decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </div>);

};
window.Marquee = Marquee;

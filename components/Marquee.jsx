const Marquee = () => {
  const logos = [
  { name: 'SHRI', src: 'assets/logos/SHRI.png' },
  { name: 'STiR Education', src: 'assets/logos/STiREducation.png' },
  { name: 'Noora Health', src: 'assets/logos/NooraHealth.png' },
  { name: 'Ummeed', src: 'assets/logos/Ummeed.png' },
  { name: 'SHOFCO', src: 'assets/logos/SHOFCO.png' },
  { name: 'SNEHA', src: 'assets/logos/SNEHA.png' },
  { name: 'TAP', src: 'assets/logos/TAP.png' },
  { name: 'AKRSP', src: 'assets/logos/AKRSP.png' },
  { name: 'Bhumi', src: 'assets/logos/Bhumi.png' },
  { name: "People's Courage", src: 'assets/logos/PeoplesCourage.webp' },
  { name: 'Janaagraha', src: 'assets/logos/Janaagraha.svg' },
  { name: 'MAD', src: 'assets/logos/MAD.png' },
  { name: 'Dasra', src: 'assets/logos/Dasra.png' },
  { name: 'SEARCH', src: 'assets/logos/SEARCH.png' },
  { name: 'Baala', src: 'assets/logos/Baala.png' }];

  const track = [...logos, ...logos];
  return (
    <div className="marquee-wrap" data-comment-anchor="b6144152ed-div-21-5">
      <div className="marquee-label">Trusted by 25+ nonprofits across multiple sectors</div>
      <div className="logo-marquee">
        <div className="logo-marquee-track">
          {track.map((l, i) =>
          <div className="logo-tile" key={`${l.name}-${i}`} aria-hidden={i >= logos.length ? 'true' : undefined}>
            <img
              src={l.src}
              alt={i >= logos.length ? '' : l.name}
              className="logo-img"
              loading="lazy" />
          </div>
          )}
        </div>
      </div>
    </div>);

};
window.Marquee = Marquee;
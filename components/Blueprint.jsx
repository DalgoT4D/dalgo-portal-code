// Join the Dalgo Community — learning ecosystem (image cards + pill CTAs)
const Nurture = () => {
  const cards = [
  { img: 'assets/community-cards/decoding-data.webp',
    label: 'LinkedIn newsletter',
    title: 'Data Decoded',
    body: 'Practical, plain-language takes on nonprofit data — delivered to your LinkedIn feed every two weeks.',
    cta: 'Subscribe',
    href: 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7470812385688276992' },
  { img: 'assets/community-cards/webinars.webp',
    label: 'Live sessions',
    title: 'Monthly Webinars',
    body: 'Live product sessions and nonprofit data education — learn alongside peers across the sector.',
    cta: 'Register',
    href: 'https://luma.com/calendar/manage/cal-VTXoLOLr5aY3hfM' },
  { img: 'assets/community-cards/whatsapp-community.webp',
    label: 'Peer network',
    title: 'WhatsApp Community',
    body: 'Connect with nonprofit data practitioners — ask questions, share wins, and swap what works.',
    cta: 'Join Community',
    href: 'https://chat.whatsapp.com/GWXbfC0fXKf2RVfKiCaOEy?s=cl&p=i&ilr=4' },
  { img: 'assets/community-cards/newsletter.webp',
    label: 'Email newsletter',
    title: 'Dalgo Newsletter',
    body: 'Product updates, practical guides, and stories from the NGO partners building with Dalgo.',
    cta: 'Subscribe',
    href: 'https://zc1.maillist-manage.in/ua/Optin?od=1a1e3dbb3aab7&zx=1dfa5ea80f&tD=1334ba025024aa49&sD=1334ba0250252f1d' }];

  return (
    <section className="nurture-section" id="community">
      <div className="container">
        <div className="section-head section-head-center">
          <h2 className="section-title">Join the Dalgo <span className="hl-underline">community</span></h2>
          <p className="section-sub nurture-intro">Whether you're already using Dalgo or simply looking to improve your organisation's data practices, our community offers practical resources, live learning, and peer support.</p>
        </div>
        <div className="nurture-grid nurture-grid-4">
          {cards.map((c, i) =>
          <div key={i} className="nurture-card">
            {c.img ?
            <div className="nurture-thumb"><img src={c.img} alt={c.title} loading="lazy" /></div> :
            <div className="nurture-thumb nurture-thumb-panel"><span className="nurture-thumb-ic">{c.icon}</span></div>}
            <div className="nurture-body">
              <div className="nurture-label">{c.label}</div>
              <h3 className="nurture-h">{c.title}</h3>
              <p className="nurture-p">{c.body}</p>
              <a href={c.href} className="nurture-btn" target="_blank" rel="noopener">{c.cta}</a>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>);

};


// Final CTA — navy band over a blurred community photo, two actions
const FinalCTA = () =>
<section className="final-cta final-cta-photo" id="final-cta">
    <div className="final-cta-bg" aria-hidden="true">
      <img width="1400" height="933" src="assets/opt/story-mission.webp" alt="" loading="lazy" />
    </div>
    <div className="container">
      <div className="final-cta-eyebrow">Join a community of 25+ nonprofits</div>
      <h2 className="final-cta-h" data-comment-anchor="ecea4efc01-h2-64-7">Know your data. Share your <span className="hl-underline">story.</span></h2>
      <div className="final-cta-actions">
        {(() => { const tc = window.trialCta ? window.trialCta() : { label: 'Contact Us', href: '/contact' }; return (
        <a href={tc.href} target={tc.ext ? '_blank' : undefined} rel={tc.ext ? 'noopener' : undefined} className="final-cta-btn">
          {tc.label}
          <svg className="i" viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>); })()}
        <a href="/faq" className="final-cta-btn-ghost">Browse FAQs</a>
      </div>
    </div>
  </section>;

window.Nurture = Nurture;
window.FinalCTA = FinalCTA;

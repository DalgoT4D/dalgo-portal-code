// ===== Community page — central hub (Webinar · Newsletters · WhatsApp) =====

const CommunityHero = () => (
  <section className="cvh" id="events">
    <div className="cvh-grid">
      <div className="cvh-copy">
        <div className="cvh-eyebrow">Community</div>
        <h1 className="cvh-h1">Join Dalgo's <span className="cvh-hl">Data Community</span></h1>
        <p className="cvh-sub">
          We bring together nonprofits, ecosystem partners, funders, researchers, and data practitioners
          to explore how Data and AI can create greater social impact. Join webinars, discover practical
          resources, and connect with people building better data systems.
        </p>
        <div className="cvh-ctas">
          <a className="cmh-btn cmh-btn-primary" href="https://chat.whatsapp.com/GWXbfC0fXKf2RVfKiCaOEy?s=cl&p=i&ilr=4" target="_blank" rel="noopener">
            Join WhatsApp Community
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
          <a className="cmh-btn cmh-btn-ghost" href="#latest-webinar">Browse Upcoming Webinars</a>
        </div>
      </div>
      <div className="cvh-collage" aria-hidden="true">
        <div className="cvh-card cvh-c1"><img src="assets/community-cards/webinars.webp" alt="" /></div>
        <div className="cvh-note">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
          Next webinar · Thu, 4 PM IST
        </div>
        <div className="cvh-card cvh-c2"><img src="assets/community-cards/data-decoded.webp" alt="" /></div>
        <div className="cvh-card cvh-c3"><img src="assets/community/bootcamp-2.jpg" alt="" /></div>
        <div className="cvh-card cvh-c4 cvh-wa">
          <div className="cvh-wa-head">
            <span className="cvh-wa-dot"></span>
            Dalgo Data Community
          </div>
          <div className="cvh-wa-msg">
            <span className="cvh-wa-av av-rust">PR</span>
            <span className="cvh-wa-bubble">How are you all syncing KoboToolbox into your warehouse?</span>
          </div>
          <div className="cvh-wa-msg cvh-wa-me">
            <span className="cvh-wa-bubble cvh-wa-bubble-me">We set it up in Dalgo in ~10 min — happy to share!</span>
            <span className="cvh-wa-av av-pine">AK</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// 1 — Upcoming Webinar (primary focus, Luma embed)
const CommunityWebinar = () => (
  <section className="pg-section cmh-section" id="latest-webinar">
    <div className="container">
      <div className="cmh-head section-head-center">
        <div className="pg-eyebrow">Upcoming Webinar</div>
        <h2 className="section-title">Join our next <span className="hl-underline">live session</span></h2>
      </div>
      <div className="cmh-webinar">
        <div className="cmh-webinar-copy">
          <h3 className="cmh-webinar-title">Dalgo's Data &amp; AI Webinar</h3>
          <div className="cmh-webinar-meta">
            <span className="cmh-meta-item">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
              Monthly · Live online
            </span>
            <span className="cmh-meta-item">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              60 minutes · Free to attend
            </span>
          </div>
          <p className="comm-lead">
            Practical, sector-specific sessions on nonprofit data and AI — featuring NGO spotlights,
            live product walkthroughs, and honest conversation about building a stronger data culture.
            Register for the next session, or explore everything on our calendar.
          </p>
          <div className="cmh-webinar-actions">
            <a href="https://luma.com/event/evt-puR9eu8WHSDp0op" target="_blank" rel="noopener" className="cmh-btn cmh-btn-primary">
              Register Now
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a href="https://luma.com/calendar/manage/cal-VTXoLOLr5aY3hfM" target="_blank" rel="noopener" className="cmh-btn cmh-btn-ghost">Browse Past Webinars</a>
          </div>
        </div>
        <div className="cmh-webinar-embed">
          <iframe
            src="https://luma.com/embed/event/evt-puR9eu8WHSDp0op/simple"
            width="100%"
            height="600"
            frameBorder="0"
            style={{ border: 'none' }}
            allow="fullscreen; payment"
            aria-hidden="false"
            tabIndex="0"
            title="Upcoming Dalgo webinar">
          </iframe>
        </div>
      </div>
    </div>
  </section>
);

// 2 — Subscribe to Our Newsletters (two image cards)
const CommunityNewsletters = () => {
  const cards = [
    {
      img: 'assets/community-cards/data-decoded.webp',
      title: 'Data Decoded With Dalgo',
      tagline: 'Level up your nonprofit data game',
      body: <>Think Mario, but for M&amp;E. Every edition tackles one nonprofit data concept through stories, pop culture, and simple visuals. No jargon. Just those “Oh, I finally get it!”&gt; moments.</>,
      cta: 'Subscribe on LinkedIn',
      href: 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7470812385688276992',
    },
    {
      img: 'assets/community-cards/monthly-newsletter.webp',
      title: 'Dalgo’s Monthly Newsletter',
      tagline: 'Everything happening in the Dalgo universe',
      body: 'New features. Customer stories. AI experiments. Community events. Product launches. One monthly roundup so you never miss what’s new in nonprofit data.',
      cta: 'Subscribe',
      href: 'https://zc1.maillist-manage.in/ua/Optin?od=1a1e3dbb3aab7&zx=1dfa5ea80f&tD=1334ba025024aa49&sD=1334ba0250252f1d',
    },
  ];
  return (
    <section className="pg-section alt cmh-section" id="newsletters">
      <div className="container">
        <div className="cmh-head section-head-center">
          <div className="pg-eyebrow">Newsletters</div>
          <h2 className="section-title">Subscribe to our <span className="hl-underline">newsletters</span></h2>
          <p className="section-sub">Two ways to stay sharp on nonprofit data — pick one, or get both.</p>
        </div>
        <div className="cmh-news-grid">
          {cards.map((c) => (
            <div key={c.title} className="cmh-news-card">
              <div className="cmh-news-thumb"><img src={c.img} alt={c.title} loading="lazy" /></div>
              <div className="cmh-news-body">
                <h3 className="cmh-news-title">{c.title}</h3>
                <p className="cmh-news-tagline">{c.tagline}</p>
                <p className="cmh-news-desc">{c.body}</p>
                <a href={c.href} target="_blank" rel="noopener" className="cmh-btn cmh-btn-primary cmh-btn-sm">
                  {c.cta}
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3 — Join Our Community (WhatsApp)
const CommunityWhatsApp = () => (
  <section className="pg-section cmh-section" id="whatsapp">
    <div className="container">
      <div className="cmh-wa">
        <div className="cmh-wa-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.9 13.3L3 21l4.8-1.1A9 9 0 1 0 12 3z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg>
        </div>
        <div className="cmh-wa-copy">
          <div className="pg-eyebrow">Join Our Community</div>
          <h2 className="section-title cmh-wa-h">Dalgo Data Community on <span className="hl-underline">WhatsApp</span></h2>
          <p className="comm-lead">
            Connect with other nonprofit data practitioners, ask questions, share what you're learning,
            and stay updated on community activities — all in one place.
          </p>
          <a href="https://chat.whatsapp.com/GWXbfC0fXKf2RVfKiCaOEy?s=cl&p=i&ilr=4" target="_blank" rel="noopener" className="cmh-btn cmh-btn-wa">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.9 13.3L3 21l4.8-1.1A9 9 0 1 0 12 3z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg>
            Join WhatsApp Community
          </a>
        </div>
      </div>
    </div>
  </section>
);

const CommunityCTA = () => null;

window.CommunityHero = CommunityHero;
window.CommunityWebinar = CommunityWebinar;
window.CommunityNewsletters = CommunityNewsletters;
window.CommunityWhatsApp = CommunityWhatsApp;
window.CommunityCTA = CommunityCTA;

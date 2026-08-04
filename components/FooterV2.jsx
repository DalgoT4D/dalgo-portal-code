const FooterV2 = () =>
<footer className="fx">
    <div className="fx-links">
      <div className="fx-links-inner">
        <div className="fx-brand-col">
          <div className="fx-logo">
            <img src={window.__resources && window.__resources.dalgoLogo || "assets/dalgo-logo.png"} alt="Dalgo" style={{ height: 36, width: 'auto', display: 'block' }} />
          </div>
          <p className="fx-brand-tag">Join our community to get updates on Data + AI webinars, nonprofit stories, and offline meetups.</p>
          <form className="fx-sub-form" onSubmit={(e) => { e.preventDefault(); window.open('https://zcmp.in/byTZ', '_blank', 'noopener'); }}>
            <input type="email" placeholder="Enter your email" aria-label="Email address" data-comment-anchor="2f58a44c40-input-18-13" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="fx-creds">
            <a href="https://www.digitalpublicgoods.net/r/dalgo" target="_blank" rel="noopener" className="fx-trust-badge-link" aria-label="Recognised as a Digital Public Good"><img src={window.__resources && window.__resources.dpgBadge || "assets/dpg-badge.png"} alt="Recognised as a Digital Public Good" className="fx-trust-badge" /></a>
          </div>
          <p className="fx-initiative">Dalgo is an initiative of <a href="https://projecttech4dev.org" target="_blank" rel="noopener" style={{fontWeight:600}}>Project Tech4Dev<svg viewBox="0 0 24 24" className="x-ext" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg></a> — building open-source, affordable technology for the social sector.</p>
        </div>
        <nav className="fx-col" aria-label="Explore">
          <h2 className="fx-h">Explore</h2>
          <a href="product.html">Product</a>
          <a href="case-studies.html">Case Studies</a>
          <a href="consulting.html">Consulting</a>
          <a href="pricing.html">Pricing</a>
          <a href="contact.html">Book a Free Consultation</a>
        </nav>
        <nav className="fx-col" aria-label="Resources">
          <h2 className="fx-h">Resources</h2>
          <a href="about.html">About</a>
          <a href="community.html">Community</a>
          <a href="faq.html">Frequently Asked Questions</a>
        </nav>
        <div className="fx-col">
          <h2 className="fx-h">Connect</h2>
          <a href="https://zcmp.in/byTZ" target="_blank" rel="noopener">Newsletter</a>
          <a href="mailto:support@dalgo.org">support@dalgo.org</a>
          <div className="fx-social">
            <a href="https://www.linkedin.com/company/project-tech4dev/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg></a>
            <a href="https://www.youtube.com/@ProjectTech4Dev" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.8zM9.6 15.57V8.43L15.82 12 9.6 15.57z" /></svg></a>
            <a href="https://github.com/DalgoT4D" target="_blank" rel="noopener" aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg></a>
          </div>
        </div>
      </div>
      <div className="fx-bottom">
        <div>© 2026 Project Tech4Dev</div>
        <div className="fx-bottom-right">
          <a href="privacy.html">Privacy Policy</a>
          <a href="privacy.html">DPDP Compliance</a>
          <a href="https://github.com/DalgoT4D" target="_blank" rel="noopener">GitHub<svg viewBox="0 0 24 24" className="x-ext" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg></a>
        </div>
      </div>
    </div>
  </footer>;

window.FooterV2 = FooterV2;

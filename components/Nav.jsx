const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [resOpen, setResOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [menuOpen]);
  const closeMenu = () => { setMenuOpen(false); setResOpen(false); };
  const ddRef = React.useRef(null);
  const [ddOpen, setDdOpen] = React.useState(false);
  React.useEffect(() => {
    if (!ddOpen) return;
    const onDoc = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false); };
    const onKey = (e) => {
      if (e.key === 'Escape') { setDdOpen(false); const t = ddRef.current && ddRef.current.querySelector('.nav-dd-trigger'); if (t) t.focus(); }
    };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  }, [ddOpen]);
  // Active page: supports "product.html" (preview) and "/product" (Vercel cleanUrls)
  let page = '';
  if (window.__currentPage !== undefined) page = window.__currentPage;
  else { try { page = decodeURIComponent((window.location.pathname.split('/').pop() || '')); } catch (e) { page = ''; } }
  page = page.toLowerCase().replace(/\.html$/, '');
  const isHome = page === '' || page === 'index' || page === 'home page';
  const is = (k) => page === k;
  const resourcesActive = is('community') || is('faq');
  // BM-337 (resolved 30 Jul): nav label renamed "Case Studies", href stays case-studies.html
  // BM-335/346 (resolved 30 Jul): About moved out of Resources into footer-only; Learn + FAQ stay under Resources
  const tc = window.trialCta ? window.trialCta() : { label: 'Start Free Trial', href: 'https://insights.dalgo.org/trial', ext: true };
  const trialReady = !!(window.SITE_CONFIG && window.SITE_CONFIG.TRIAL_READY);
  const resourceLinks = [
    { href: '/community', label: 'Community', desc: 'Webinars, meetups, and the Dalgo network' },
    { href: '/faq', label: 'FAQs', desc: 'Answers on pricing, setup, and security' },
  ];
  // Featured slot (psychology #4 Von Restorff, #11 self-expiring): next webinar from site-config.
  const featured = window.featuredResource ? window.featuredResource() : null;
  const NavLink = ({ href, active, extra, children }) => (
    <a href={href} className={'nav-link' + (active ? ' is-active' : '') + (extra ? ' ' + extra : '')} aria-current={active ? 'page' : undefined}>{children}</a>
  );
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-left">
          <a href="/" className="nav-logo">
            <img src={window.__resources && window.__resources.dalgoLogo || "assets/dalgo-logo.png"} alt="Dalgo — A Project Tech4Dev Initiative" width="130" height="40" style={{ height: 40, width: 'auto', display: 'block' }} />
          </a>
          <div className="nav-links">
            <NavLink href="/" active={isHome}>Home</NavLink>
            <NavLink href="/product" active={is('product')}>Product</NavLink>
            <NavLink href="/consulting" active={is('consulting')}>Consulting</NavLink>
            <NavLink href="/case-studies" active={is('case-studies')}>Case Studies</NavLink>
            <NavLink href="/pricing" active={is('pricing')}>Pricing</NavLink>
            <div className="nav-dd" ref={ddRef}>
              <button type="button" className={'nav-link nav-dd-trigger' + (resourcesActive ? ' is-active' : '') + (ddOpen ? ' is-open' : '')} aria-haspopup="true" aria-expanded={ddOpen} aria-controls="nav-dd-resources"
                onClick={() => setDdOpen((o) => !o)}
                onKeyDown={(e) => { if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setDdOpen(true); requestAnimationFrame(() => { const a = ddRef.current && ddRef.current.querySelector('.nav-dd-menu a'); if (a) a.focus(); }); } }}>
                Resources
                <svg className="nav-dd-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
              </button>
              <div className={'nav-dd-menu' + (ddOpen ? ' is-open' : '')} id="nav-dd-resources" role="menu"
                onKeyDown={(e) => {
                  const links = [...e.currentTarget.querySelectorAll('a')];
                  const at = links.indexOf(document.activeElement);
                  if (e.key === 'ArrowDown') { e.preventDefault(); (links[at + 1] || links[0]).focus(); }
                  else if (e.key === 'ArrowUp') { e.preventDefault(); (links[at - 1] || links[links.length - 1]).focus(); }
                }}>
                <div className="nav-dd-col">
                  <div className="nav-dd-col-label" aria-hidden="true">Resources</div>
                  {resourceLinks.map((l) => (
                    <a key={l.href} href={l.href} role="menuitem" className="nav-dd-item">
                      <span className="nav-dd-item-t">{l.label}</span>
                      <span className="nav-dd-item-d">{l.desc}</span>
                    </a>
                  ))}
                </div>
                {featured && (
                  <div className="nav-dd-col">
                    <div className="nav-dd-col-label" aria-hidden="true">Featured</div>
                    <a className="nav-dd-featcard" href={featured.href} target="_blank" rel="noopener" role="menuitem">
                      <span className="nav-dd-featimg"><img src={featured.img} alt="" width="800" height="450" loading="lazy" /></span>
                      <span className="nav-dd-featkicker">{featured.kicker}</span>
                      <span className="nav-dd-feattitle">{featured.title}</span>
                      <span className="nav-dd-featblurb">{featured.blurb}</span>
                      <span className="nav-dd-featcta">{featured.cta} <span aria-hidden="true">→</span></span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <a href="/contact" className="btn btn-ghost">Contact Us</a>
          <a href={window.SITE_CONFIG.CONSULT_FORM} target="_blank" rel="noopener" className="btn btn-primary">Book Free Consultation</a>
        </div>
        <button type="button" className={`nav-burger ${menuOpen ? 'is-open' : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="nav-mobile-drawer" onClick={() => setMenuOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={`nav-mobile ${menuOpen ? 'is-open' : ''}`} id="nav-mobile-drawer" hidden={!menuOpen}>
        <div className="nav-mobile-scroll">
          <a href="/" className={'nav-m-link' + (isHome ? ' is-active' : '')} onClick={closeMenu}>Home</a>
          <a href="/product" className={'nav-m-link' + (is('product') ? ' is-active' : '')} onClick={closeMenu}>Product</a>
          <a href="/consulting" className={'nav-m-link' + (is('consulting') ? ' is-active' : '')} onClick={closeMenu}>Consulting</a>
          <a href="/case-studies" className={'nav-m-link' + (is('case-studies') ? ' is-active' : '')} onClick={closeMenu}>Case Studies</a>
          <a href="/pricing" className={'nav-m-link' + (is('pricing') ? ' is-active' : '')} onClick={closeMenu}>Pricing</a>
          <button type="button" className={`nav-m-link nav-m-acc ${resOpen ? 'is-open' : ''}`} aria-expanded={resOpen} aria-controls="nav-m-resources" onClick={() => setResOpen((o) => !o)}>
            Resources
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
          </button>
          <div className="nav-m-sub" id="nav-m-resources" hidden={!resOpen}>
            {resourceLinks.map((l) => <a key={l.href} href={l.href} onClick={closeMenu}>{l.label}</a>)}
          </div>
          <div className="nav-m-ctas">
            <a href="/contact" className="btn btn-ghost" onClick={closeMenu}>Contact Us</a>
            <a href={window.SITE_CONFIG.CONSULT_FORM} target="_blank" rel="noopener" className="btn btn-primary" onClick={closeMenu}>Book Free Consultation</a>
          </div>
        </div>
      </div>
      <div className={`nav-scrim ${menuOpen ? 'is-open' : ''}`} onClick={closeMenu} hidden={!menuOpen}></div>
    </nav>);
};
window.Nav = Nav;

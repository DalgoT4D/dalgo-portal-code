// One-time home-page pop-up for the current SITE_CONFIG.EVENT_BANNER event. Shows once per
// browser (localStorage flag keyed on the event link, so a new event pops up again on its own)
// and is gone entirely once EVENT_BANNER is set to null.
const EventPopup = () => {
  const banner = window.SITE_CONFIG && window.SITE_CONFIG.EVENT_BANNER;
  const storageKey = banner ? 'dalgo-evt-popup-seen:' + banner.href : null;
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!banner) return;
    try {
      if (window.localStorage.getItem(storageKey)) return;
    } catch (e) { /* private mode / storage disabled — fall through and show it */ }
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  if (!banner) return null;
  const close = () => {
    setOpen(false);
    try { window.localStorage.setItem(storageKey, '1'); } catch (e) { /* ignore */ }
  };
  return (
    <div className={'evt-popup-overlay' + (open ? ' is-open' : '')} role="dialog" aria-modal="true" aria-labelledby="evt-popup-title" hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="evt-popup-card">
        <button type="button" className="evt-popup-close" aria-label="Close" onClick={close}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>
        </button>
        <p className="evt-popup-eyebrow">{banner.popupEyebrow}</p>
        <h2 className="evt-popup-title" id="evt-popup-title">{banner.popupTitle}</h2>
        <div className="evt-popup-body">
          {banner.popupLines.map((line, i) => <p key={i}>{line}</p>)}
        </div>
        <a className="evt-popup-cta btn btn-primary" href={banner.href} target="_blank" rel="noopener" onClick={close}>{banner.cta}</a>
      </div>
    </div>
  );
};
window.EventPopup = EventPopup;

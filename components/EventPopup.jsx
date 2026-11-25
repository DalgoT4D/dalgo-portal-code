// One-time home-page pop-up for the current SITE_CONFIG.EVENT_BANNER events. Shows once per
// browser and is gone entirely once EVENT_BANNER is set to null.
//
// The localStorage flag is keyed on THE EVENT LIST, not a single link. It used to key off
// banner.href; when EVENT_BANNER was restructured to events[] that field disappeared, so the key
// silently became "…:undefined" — stable, which still suppressed the pop-up after one view, but
// permanently: it could never change again, so the next event would never re-show for anyone who
// had dismissed the last one. Keying on the joined hrefs restores that: add, remove or swap an
// event and the key changes, so the pop-up comes back exactly once for the new line-up.
//
// Design-system + a11y pass (26 Aug 2026):
//   - the eyebrow now uses the site's one eyebrow treatment (12.5 / 700 / .14em), not a third variant
//   - the event image is shown, reusing .nav-dd-featimg's 800/420 figure treatment
//   - FOCUS IS MANAGED. It is declared role="dialog" aria-modal="true", which promises the
//     keyboard is confined to it; previously focus stayed on the page behind, Tab walked out of
//     the dialog, and closing left focus nowhere. Now focus moves in on open, Tab cycles inside,
//     and the previously focused element gets it back on close.
const EventPopup = () => {
  const banner = window.SITE_CONFIG && window.SITE_CONFIG.EVENT_BANNER;
  const storageKey = (banner && banner.events && banner.events.length)
    ? 'dalgo-evt-popup-seen:' + banner.events.map(function (e) { return e.href; }).join('|')
    : null;
  // Review affordance (Stuti, 15 Sep): ?popup=1 forces the pop-up even in a browser that has
  // already dismissed it. The seen-flag is written on ANY close — backdrop click included — so
  // during review the pop-up is gone after one stray click and there was no way back short of
  // clearing localStorage by hand. That is what made a working pop-up look broken.
  const forced = /[?&]popup=1(?:&|$)/.test(window.location.search);
  const [open, setOpen] = React.useState(false);
  const cardRef = React.useRef(null);
  const returnFocusTo = React.useRef(null);

  const close = React.useCallback(() => {
    setOpen(false);
    // Don't record a dismissal when the pop-up was forced open for review.
    if (!forced) { try { window.localStorage.setItem(storageKey, '1'); } catch (e) { /* private mode — ignore */ } }
    const back = returnFocusTo.current;
    if (back && typeof back.focus === 'function') back.focus();
  }, [storageKey, forced]);

  React.useEffect(() => {
    if (!banner) return;
    if (!forced) {
      try {
        if (window.localStorage.getItem(storageKey)) return;
      } catch (e) { /* storage disabled — fall through and show it */ }
    }
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Focus in on open, trap Tab, Escape closes, focus restored by close().
  React.useEffect(() => {
    if (!open) return;
    returnFocusTo.current = document.activeElement;
    const card = cardRef.current;
    const focusables = () => Array.from(
      card ? card.querySelectorAll('a[href], button:not([disabled])') : []
    ).filter((el) => el.offsetParent !== null);
    const first = focusables()[0];
    if (first) first.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) return;
      const lo = f[0], hi = f[f.length - 1];
      if (e.shiftKey && document.activeElement === lo) { e.preventDefault(); hi.focus(); }
      else if (!e.shiftKey && document.activeElement === hi) { e.preventDefault(); lo.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!banner || !banner.events || !banner.events.length) return null;
  const events = banner.events;
  // The dialog is named by its own visible heading (aria-labelledby), not by a config string.
  // It used to be labelled from banner.popupEyebrow because there WAS no heading — the card
  // opened on the word UPCOMING and went straight into the rows, so a screen reader announced a
  // name that no sighted user could see.
  //
  // The layout is NOT count-dependent (8 Oct). It used to branch: ONE event led with the poster
  // under that event's own title; SEVERAL got heading + supporting line + cards. So removing
  // Bangalore would have silently swapped the approved hierarchy — the heading would have become
  // "Data Decoded with Dalgo", the supporting line would have disappeared entirely, and the Delhi
  // card would have become a poster. Heading → short description → city/date → Register is the
  // design, not a two-event special case, so one event now renders exactly like two.
  const headingId = 'evt-popup-h';
  const heading = banner.popupHeading || events[0].title;
  return (
    <div className={'evt-popup-overlay' + (open ? ' is-open' : '')} role="dialog" aria-modal="true" aria-labelledby={headingId} hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="evt-popup-card is-list" ref={cardRef}>
        <button type="button" className="evt-popup-close" aria-label="Close" onClick={close}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>
        </button>

        <h2 className="evt-popup-title" id={headingId}>{heading}</h2>
        {banner.popupSub && <p className="evt-popup-sub">{banner.popupSub}</p>}

        {/* One card per event. Each row carries only what DIFFERS between events — the city,
            then the date — because the shared title already sits in the heading above. The row
            IS the registration link, so the whole card is clickable and the chip beside it is
            the visible affordance, not a second target. */}
        <ul className="evt-popup-list">
          {events.map((e, i) => (
            <li key={i}>
              <a className="evt-popup-row" href={window.withUtm(e.href, 'event_popup')} target="_blank" rel="noopener" data-cta-location="event_popup" onClick={close}
                 /* Name follows the row's VISIBLE reading order — city, date, then action — so
                    the accessible name contains the visible label in the order it is read
                    (WCAG 2.5.3). */
                 aria-label={(e.where ? e.where + ', ' : '') + e.when + ' — ' + banner.cta}>
                {e.img && (
                  /* The Luma poster. Decorative here (alt=""): the city, date and action beside
                     it already carry the whole message, so a real alt would read the same row
                     twice. Eager, not lazy — the dialog opens 800ms after load, and a lazy image
                     inside a hidden container arrives a beat late and pops in. */
                  <span className="evt-popup-thumb">
                    <img src={e.img} alt="" width="1600" height="840" loading="eager" decoding="async" />
                  </span>
                )}
                <span className="evt-popup-rowtext">
                  <span className="evt-popup-rowtitle">{e.where || e.title}</span>
                  <span className="evt-popup-rowmeta">{e.when}</span>
                </span>
                <span className="evt-popup-rowcta" aria-hidden="true">
                  {banner.cta}
                  <svg viewBox="0 0 24 24" focusable="false"><path d="M5 12h13M12 5l7 7-7 7"></path></svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
window.EventPopup = EventPopup;

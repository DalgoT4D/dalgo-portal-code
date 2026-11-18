// NewsletterPopup — one email field, shown once per visitor per 30 days.
//
// RULES, all three from FLOW-BLUEPRINT 4.5, and each one is a reason this is not a naive modal:
//   1. once per visitor per 30 days — a timestamp in localStorage, not a session flag
//   2. after 50% scroll, or on desktop exit intent — never on a timer, which interrupts someone
//      mid-sentence and is the single thing the teardowns criticise most
//   3. never on a resource page after the form has been submitted — ResourceForm writes
//      `dalgo_np_suppress` on success, and this checks it on every would-be open
//
// Exit intent is desktop only on purpose: `mouseleave` toward the top of the viewport has no
// meaning on a touch screen, where it fires on ordinary scrolling.
//
// Accessibility: it is a real dialog — focus moves in, Escape closes, Tab is trapped, and focus
// returns to whatever had it before. A pop-up that traps a keyboard user is worse than none.

const NP_KEY = 'dalgo_np_last';
const NP_SUPPRESS = 'dalgo_np_suppress';
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

function npAllowed() {
  try {
    if (localStorage.getItem(NP_SUPPRESS)) return false;
    const last = Number(localStorage.getItem(NP_KEY) || 0);
    return !last || (Date.now() - last) > THIRTY_DAYS;
  } catch (e) { return false; }   // storage blocked ⇒ we cannot honour "once per 30 days", so never show
}

const NewsletterPopup = () => {
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const cardRef = React.useRef(null);
  const returnTo = React.useRef(null);

  const close = React.useCallback(function () {
    setOpen(false);
    if (returnTo.current && returnTo.current.focus) returnTo.current.focus();
  }, []);

  React.useEffect(function () {
    if (!npAllowed()) return undefined;
    let fired = false;
    const fire = function () {
      if (fired || !npAllowed()) return;
      fired = true;
      returnTo.current = document.activeElement;
      try { localStorage.setItem(NP_KEY, String(Date.now())); } catch (e) {}
      setOpen(true);
      if (window.dalgoTrack) window.dalgoTrack('newsletter_popup_view', { path: window.location.pathname });
      cleanup();
    };

    // The library already ends in a newsletter band making the identical offer. At 50% scroll
    // the pop-up lands straight on top of it, so the visitor is asked the same question twice
    // in one screen. Both are in the brief, so neither is dropped: the pop-up simply waits
    // until the band is not on screen, and on pages with no band it behaves as specified.
    const bandVisible = function () {
      const band = document.querySelector('.rsl-news');
      if (!band) return false;
      const b = band.getBoundingClientRect();
      return b.top < window.innerHeight && b.bottom > 0;
    };
    const onScroll = function () {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0 && (window.scrollY / h) >= 0.5 && !bandVisible()) fire();
    };
    const onLeave = function (e) { if (e.clientY <= 0 && !bandVisible()) fire(); };
    const desktop = window.matchMedia('(min-width: 1025px)').matches;

    function cleanup() {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onLeave);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    if (desktop) document.addEventListener('mouseleave', onLeave);
    return cleanup;
  }, []);

  // Focus management lives in its own effect so it runs when the dialog actually opens.
  React.useEffect(function () {
    if (!open) return undefined;
    const card = cardRef.current;
    if (!card) return undefined;
    const input = card.querySelector('input, button');
    if (input) input.focus();

    const onKey = function (e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      const f = card.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return function () { document.removeEventListener('keydown', onKey); };
  }, [open, close]);

  if (!open) return null;

  const submit = function (e) {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!email) return;
    window.subscribeNewsletter(email, 'popup');
    setDone(true);
    setTimeout(close, 1600);
  };

  return (
    <div className="np-scrim" onClick={function (e) { if (e.target === e.currentTarget) close(); }}>
      <div className="np-card" ref={cardRef} role="dialog" aria-modal="true" aria-labelledby="np-h">
        <button type="button" className="np-x" onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <h2 className="np-h" id="np-h">One practical data read a month</h2>
        {done ? (
          <p className="np-done" role="status">Thanks — you&rsquo;re on the list.</p>
        ) : (
          <React.Fragment>
            <p className="np-sub">What we are learning with nonprofit teams, and the guides we publish next.</p>
            <form className="np-form" onSubmit={submit}>
              <label className="x-sr-only" htmlFor="np-email">Work email</label>
              <input id="np-email" name="email" type="email" required placeholder="Work email" />
              <button className="btn btn-primary" type="submit">Subscribe</button>
            </form>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

window.NewsletterPopup = NewsletterPopup;

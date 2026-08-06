// ===== Contact page =====
// The form is a Fillout embed (form id gqutoqyytm). It replaces a native form that posted
// to a Google Form with placeholder entry.* ids — that form also returns HTTP 401
// (sign-in required), so it could never accept an anonymous submission, and because the
// old code used mode:'no-cors' the page reported success regardless. Fillout actually
// delivers and keeps a record. See Linear BM-374.
const FILLOUT_ID = 'gqutoqyytm';

const ContactHero = () => (
  <SiteHero
    eyebrow="Contact"
    headline={<>Get in <span className="cvh-hl">touch</span></>}
    body="Tell us about your data challenges and we'll show you exactly how Dalgo can help."
    help={<>Email: <a href="mailto:support@dalgo.org">support@dalgo.org</a></>}
  />
);

// Fillout's script scans for [data-zite-id] at load and mounts the form into it. Load it
// once per page, after the node exists; on re-mount, re-run its scan if it exposes one.
const ContactForm = () => {
  const host = React.useRef(null);

  React.useEffect(() => {
    const SRC = 'https://server.fillout.com/embed/v2-zite/';
    let s = document.querySelector('script[src="' + SRC + '"]');
    if (!s) {
      s = document.createElement('script');
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="ct-form">
      <div
        ref={host}
        className="ct-fillout"
        data-zite-id={FILLOUT_ID}
        data-zite-embed-type="standard"
        data-zite-inherit-parameters=""
      />
      <noscript>
        <p className="ct-noscript">
          This form needs JavaScript. Email us at <a href="mailto:support@dalgo.org">support@dalgo.org</a> instead.
        </p>
      </noscript>
    </div>
  );
};

const ContactBody = () => (
  <section className="ct-section">
    <div className="container">
      <ContactForm />
    </div>
  </section>
);

window.ContactHero = ContactHero;
window.ContactForm = ContactForm;
window.ContactBody = ContactBody;

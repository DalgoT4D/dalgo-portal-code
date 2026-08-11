// ===== Privacy Policy page =====
const PrivacyHero = () => (
  <SiteHero
    id="privacy"
    eyebrow="Legal"
    headline={<>Privacy <span className="cvh-hl">Policy</span></>}
    body="Dalgo takes your privacy seriously. This policy explains how your personal information is collected, used, and processed — in full compliance with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000."
    help={<>Last updated: June 22, 2026</>}
  />
);

const PrivacyBody = () => {
  const sections = [
    {
      h: 'Collection of routine information',
      body: (
        <p>
          Our websites <a href="https://dalgo.org/" target="_blank" rel="noopener">dalgo.org</a> and{' '}
          <a href="https://insights.dalgo.org/" target="_blank" rel="noopener">insights.dalgo.org</a>{' '}
          (“the Websites”) track basic information about their visitors. This includes, but is not
          limited to, IP addresses, browser details, timestamps and referring pages. None of this
          information can personally identify specific visitors. It is tracked for routine
          administration and maintenance purposes.
        </p>
      ),
    },
    {
      h: 'Collection of personal information',
      body: (
        <p>
          While using our Websites, we may ask you to provide certain personally identifiable
          information that can be used to contact or identify you. This may include, but is not
          limited to, your name, email address, phone number, or other information (“Personal
          Information”).
        </p>
      ),
    },
    {
      h: 'Purpose of data collection',
      body: (
        <>
          <p>We collect your personal information to provide better services to you. Specifically, the information you share may be used for the following purposes:</p>
          <ul className="legal-list">
            <li>For the provision of our services.</li>
            <li>For contacting you with newsletters, marketing or promotional materials, and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications by following the unsubscribe link or instructions provided in any email we send.</li>
          </ul>
        </>
      ),
    },
    {
      h: 'Cookies',
      body: (
        <p>
          Cookies are small pieces of data sent by a website and stored on a visitor’s computer,
          which help the website keep track of the visitor’s preferences. Where necessary, the
          Websites use cookies in order to better serve the visitor and/or present customized content.
        </p>
      ),
    },
    {
      h: 'Advertisement and other third-party sites and services',
      body: (
        <p>
          Advertising partners and other third parties may use cookies, scripts and/or web beacons to
          track visitor activities on these websites in order to display advertisements and other
          useful information. Our Websites may also include links to third-party websites for your use
          and reference. Any data collection or tracking done by such third parties is conducted
          through their own servers and is subject to their own privacy policies, which may differ from
          this Policy. We have no access or control over these tools. You can{' '}
          <a href="https://www.google.com/privacy_ads.html" target="_blank" rel="noopener">learn how to opt out of Google’s cookie usage</a>.
        </p>
      ),
    },
    {
      h: 'Security',
      body: (
        <p>
          The security of your personal information is important to us, but remember that no method of
          transmission over the Internet, or method of electronic storage, is 100% secure. While we
          strive to use commercially acceptable means to protect your personal information, we cannot
          guarantee its absolute security.
        </p>
      ),
    },
    {
      h: 'Changes to this Privacy Policy',
      body: (
        <>
          <p>
            This Privacy Policy is effective as of 22nd June 2026 and will remain in effect except with
            respect to any changes in its provisions in the future, which will be in effect immediately
            after being posted on this page.
          </p>
          <p>
            We reserve the right to update or change our Privacy Policy at any time and you should check
            this page periodically. If we make any material changes, we will notify you either through
            the email address you have provided us, or by placing a prominent notice on our website.
          </p>
        </>
      ),
    },
    {
      h: 'Contact information',
      body: (
        <>
          <p>For any questions or concerns regarding this Privacy Policy, please reach us at:</p>
          <ul className="legal-list">
            <li>Email: <a href="mailto:support@dalgo.org">support@dalgo.org</a></li>
            <li>Contact form: <a href="/contact">dalgo.org/contact</a></li>
          </ul>
        </>
      ),
    },
  ];
  return (
    <section className="pg-section legal-section">
      <div className="container legal-wrap">
        <p className="legal-intro">
          We will not use or share your information with anyone except as described in this Privacy
          Policy. By visiting our website, using our services, or providing your information to us, you
          expressly agree to be bound by the terms of this Privacy Policy and the applicable
          service/product terms, and agree to be governed by the laws of India, including those
          applicable to data protection and privacy.
        </p>
        {sections.map((s, i) => (
          <div key={i} className="legal-block">
            <h2 className="legal-h">{s.h}</h2>
            {s.body}
          </div>
        ))}
      </div>
    </section>
  );
};

window.PrivacyHero = PrivacyHero;
window.PrivacyBody = PrivacyBody;

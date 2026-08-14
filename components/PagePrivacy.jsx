// ===== Privacy Policy page =====
// Copy is verbatim from Stuti's policy doc (14 Aug 2026) — legal text, never paraphrased or
// trimmed. Two deliberate changes from the previous version, both driven by that doc:
//   1. The old "Advertisement and other third-party sites" section is gone. It described
//      advertising partners setting cookies and web beacons, which contradicts the new
//      explicit no-advertising statement — and would have undermined Google API verification.
//   2. New "Data retention and deletion" and "Limited Use" sections.
const PrivacyHero = () => (
  <SiteHero
    id="privacy"
    eyebrow="Legal"
    headline={<>Privacy <span className="cvh-hl">Policy</span></>}
    body={'Dalgo takes your privacy seriously. This Privacy Policy (“Policy”) is aimed to better inform you about how your personal information is collected, used or processed. This Privacy Policy applies to Dalgo, an open-source data platform operated by Project Tech4Dev, including the Dalgo web application and our websites.'}
    help={<>Last updated: August 14, 2026</>}
  />
);

// Retention periods reuse the ONE table pattern the design system already owns
// (.faq-a-tablewrap / .faq-a-table, extended to .legal-table* rather than restyled).
// The wrapper scrolls on its own so the page body never scrolls horizontally.
const RETENTION = [
  ['Account and profile information (name, email address, organisation)',
   'For the life of your Dalgo account, and deleted within 60 days of account closure'],
  ['OAuth credentials, access tokens and refresh tokens for connected data sources',
   'Retained only while the connection is active. Deleted immediately when you disconnect the source, revoke access, or delete your account'],
  ['Records we are required to retain under Indian law',
   'For the statutory period applicable to that record, after which they are deleted'],
];

const PrivacyBody = () => {
  const sections = [
    {
      h: 'Collection of routine information',
      body: (
        <p>
          Our websites <a href="https://dalgo.org/" target="_blank" rel="noopener">dalgo.org</a> and{' '}
          <a href="https://insights.dalgo.org/" target="_blank" rel="noopener">insights.dalgo.org</a>{' '}
          (“the Websites”) track basic information about their visitors. This information includes, but
          is not limited to, IP addresses, browser details, timestamps and referring pages. None of this
          information can personally identify specific visitors to these Websites. The information is
          tracked for routine administration and maintenance purposes.
        </p>
      ),
    },
    {
      h: 'Collection of personal information',
      body: (
        <p>
          While using our Websites, we may ask you to provide us with certain personally identifiable
          information that can be used to contact or identify you. Personally identifiable information
          may include, but is not limited to, your name, email address, phone number, or other
          information (“Personal Information”).
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
            <li>For contacting you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.</li>
          </ul>
        </>
      ),
    },
    {
      h: 'Data retention and deletion',
      body: (
        <>
          <p>
            We retain personal information only for as long as necessary to fulfil the purposes described
            in this Privacy Policy, unless a longer retention period is required or permitted by law. When
            the retention period for a category of data expires, or when the data is no longer needed for
            the purpose for which it was collected, we delete or irreversibly destroy it.
          </p>
          <div className="legal-tablewrap">
            <table className="legal-table">
              <thead>
                <tr>
                  <th scope="col">Category of data</th>
                  <th scope="col">Retention period</th>
                </tr>
              </thead>
              <tbody>
                {RETENTION.map(([cat, period]) => (
                  <tr key={cat}>
                    <th scope="row">{cat}</th>
                    <td>{period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            You may request deletion of your personal information at any time by writing to{' '}
            <a href="mailto:support@dalgo.org">support@dalgo.org</a> or through{' '}
            <a href="/contact">dalgo.org/contact</a>. We will action verified deletion requests within
            60 days, except where continued retention is required by law.
          </p>
          <p>
            Dalgo generally acts as a Data Processor on behalf of client organisations. Where we process
            data on a client’s instructions, deletion is carried out in accordance with our agreement
            with that organisation as Data Fiduciary.
          </p>
        </>
      ),
    },
    {
      h: 'Limited Use',
      body: (
        <p>
          Dalgo’s use and transfer of information received from Google APIs to any other app adheres to
          the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener">Google API Services User Data Policy</a>,
          including the Limited Use requirements.
        </p>
      ),
    },
    {
      h: 'Cookies',
      body: (
        <p>
          Cookies are small pieces of data that are sent by a website and stored on a visitor’s computer,
          that help the website keep track of the visitor’s preferences. Where necessary, the Websites use
          cookies in order to better serve the visitor and/or present the visitor with customized content.
        </p>
      ),
    },
    {
      h: 'Third-party sites and services',
      body: (
        <>
          <p>
            Our Websites may include links to third-party websites for your reference. Any data collection
            or tracking carried out by such third parties happens on their own servers and is governed by
            their own privacy policies, which may differ from this Policy. We have no access to or control
            over those tools.
          </p>
          <p>
            Dalgo does not serve advertising. We do not use any data collected through our Websites or
            services — including any Google user data — for advertising, ad targeting, ad personalisation
            or ad measurement, and we do not share it with advertising networks or data brokers.
          </p>
        </>
      ),
    },
    {
      h: 'Security',
      body: (
        <>
          <p>
            Security procedures are in place to protect the confidentiality of your data. We encrypt data
            in transit using TLS and encrypt data at rest. Credentials and access tokens are stored
            encrypted in a dedicated secrets store. Access to production systems is restricted to
            authorised personnel through role-based access controls, and is logged and reviewed.
          </p>
          <p>
            That said, no method of transmission over the Internet, or method of electronic storage, is
            100% secure. While we strive to use commercially acceptable means to protect your personal
            information, we cannot guarantee its absolute security.
          </p>
        </>
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
            this Privacy Policy periodically. If we make any material changes to this Privacy Policy, we
            will notify you either through the email address you have provided us, or by placing a
            prominent notice on our website.
          </p>
        </>
      ),
    },
    {
      h: 'Contact information',
      body: (
        <>
          <p>For any questions or concerns regarding the privacy policy, please reach us on:</p>
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
          Policy. We ensure that your personal data is collected and processed only in compliance with
          all applicable legislations, including the Digital Personal Data Protection Act, 2023, and the
          Information Technology Act, 2000. By visiting our website, using our services, or providing
          your information to us, you expressly agree to be bound by the terms and conditions of this
          Privacy Policy and the applicable service/product terms and conditions, and agree to be
          governed by the laws of India including but not limited to the laws applicable to data
          protection and privacy.
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

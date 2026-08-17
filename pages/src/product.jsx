// Product page flow (Stuti, 15 Aug 2026) — product-led, benefit-focused, conversion-oriented:
//   hero (with product video) -> testimonials -> demo tour -> workflow -> trial CTA
//   -> dashboards -> final CTA
// ProductProof (the Chetan Pruthi quote band) is intentionally NOT in this flow: the brief's
// section list is exhaustive, and ProofCollage now carries the testimonial job right under the
// hero, so a second single-quote band would repeat it. The component still exists and is still
// exported, so restoring it is a one-word change.
const App = () => (
  <React.Fragment>
    <Nav />
    <main>
      <AboutHero />
      <ProofCollage />
      <DemoTour />
      <PlatformFor />
      <TrialCTA />
      <DashboardShowcase />
      <ProductFinalCTA />
    </main>
    <FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

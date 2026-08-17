;(function(){
// Product page flow (Stuti, 15 Aug 2026) — product-led, benefit-focused, conversion-oriented:
//   hero (with product video) -> testimonials -> demo tour -> workflow -> trial CTA
//   -> dashboards -> final CTA
// ProductProof (the Chetan Pruthi quote band) is intentionally NOT in this flow: the brief's
// section list is exhaustive, and ProofCollage now carries the testimonial job right under the
// hero, so a second single-quote band would repeat it. The component still exists and is still
// exported, so restoring it is a one-word change.
const App=()=>/*#__PURE__*/React.createElement(React.Fragment,null,/*#__PURE__*/React.createElement(Nav,null),/*#__PURE__*/React.createElement("main",null,/*#__PURE__*/React.createElement(AboutHero,null),/*#__PURE__*/React.createElement(ProofCollage,null),/*#__PURE__*/React.createElement(DemoTour,null),/*#__PURE__*/React.createElement(PlatformFor,null),/*#__PURE__*/React.createElement(TrialCTA,null),/*#__PURE__*/React.createElement(DashboardShowcase,null),/*#__PURE__*/React.createElement(ProductFinalCTA,null)),/*#__PURE__*/React.createElement(FooterV2,null));ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(App,null));
})();
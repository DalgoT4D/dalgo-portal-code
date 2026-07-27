const App = () => (
  <React.Fragment>
    <Nav /><main><PricingHero /><PricingPlans /><FeatureGrid /><HowWeWork /><ProBonoBand /><PricingProof /><PricingFAQ /><FaqMini page="pricing" /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

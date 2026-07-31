const App = () => (
  <React.Fragment>
    <Nav /><main><PricingHero /><PricingPlans /><FeatureGrid /><CostsToPlanFor /><HowWeWork /><ProBonoBand /><PricingProof /><PricingFAQ /><FaqMini page="pricing" /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

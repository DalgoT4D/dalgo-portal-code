const App = () => (
  <React.Fragment>
    <Nav /><main><PricingHero /><PricingPlans /><CostsToPlanFor /><PricingProof /><FaqMini page="pricing" /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

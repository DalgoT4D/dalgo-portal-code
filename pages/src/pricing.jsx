const App = () => (
  <React.Fragment>
    <Nav /><main><PricingHero /><PricingPlans /><CostsToPlanFor /><FaqMini page="pricing" /><PricingProof /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

const App = () => (
  <React.Fragment>
    <Nav /><main><ImpactHero /><BrowseCaseStudies /><Marquee /><StirSpotlight /><FaqMini page="impact" /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

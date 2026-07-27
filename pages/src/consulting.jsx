const App = () => (
  <React.Fragment>
    <Nav /><main><ConsultingHero /><ConsultingPillars /><ConsultingOfferings /><FaqMini page="consulting" /><FinalCTA /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

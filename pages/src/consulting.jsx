const App = () => (
  <React.Fragment>
    <Nav /><main><ConsultingHero /><ConsultingPackages /><ConsultantsDesk /><ConsultingFinalCTA /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

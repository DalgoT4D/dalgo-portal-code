const App = () => (
  <React.Fragment>
    <Nav /><main><PrivacyHero /><PrivacyBody /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

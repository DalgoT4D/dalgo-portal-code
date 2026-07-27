const App = () => (
  <React.Fragment>
    <Nav /><main><FaqHero /><FaqMaster /><FaqStillBand /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

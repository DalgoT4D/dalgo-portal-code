const App = () => (
  <React.Fragment>
    <Nav /><main><ContactHero /><ContactBody /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

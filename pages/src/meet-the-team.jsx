const App = () => (
  <React.Fragment>
    <Nav /><main><TeamHero /><TeamGrid /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

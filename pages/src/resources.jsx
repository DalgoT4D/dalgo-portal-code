const App = () => (
  <React.Fragment>
    <Nav /><main><ResourceLibrary /></main><FooterV2 /><NewsletterPopup />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

const App = () => (
  <React.Fragment>
    <Nav /><main><PageResource /></main><FooterV2 /><NewsletterPopup />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

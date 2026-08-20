const App = () => (
  <React.Fragment>
    <Nav /><main><Hero /><Marquee /><HowDalgoHelps /><CaseStudy /><Nurture /><FaqMini page="home" /><FinalCTA /></main><FooterV2 /><EventPopup />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

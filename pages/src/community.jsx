const App = () => (
  <React.Fragment>
    <Nav /><main><CommunityHero /><CommunityWebinar /><CommunityNewsletters /><CommunityBlogs /><CommunityVideos /><CommunityWhatsApp /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

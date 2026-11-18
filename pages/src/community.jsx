const App = () => (
  <React.Fragment>
    <Nav /><main><CommunityHero /><CommunityVideos /><CommunityLibraryBand /><CommunityNewsletters /><CommunityBlogs /><CommunityWhatsApp /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

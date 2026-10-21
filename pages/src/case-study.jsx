// One entry for EVERY /case-studies/<slug> page. The slug arrives as window.__caseStudySlug,
// stamped into each generated HTML file by scripts/gen-case-studies.mjs — the same trick Nav.jsx
// already uses with window.__currentPage. Twelve pages, one bundle: a per-organisation entry
// file would be twelve near-identical downloads and twelve things to keep in step.
const App = () => (
  <React.Fragment>
    <Nav /><main><PageCaseStudy /></main><FooterV2 />
  </React.Fragment>
);
ReactDOM.createRoot(document.getElementById("app")).render(<App />);

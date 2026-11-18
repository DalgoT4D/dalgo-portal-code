;(function(){
// One entry for EVERY /case-studies/<slug> page. The slug arrives as window.__caseStudySlug,
// stamped into each generated HTML file by scripts/gen-case-studies.mjs — the same trick Nav.jsx
// already uses with window.__currentPage. Twelve pages, one bundle: a per-organisation entry
// file would be twelve near-identical downloads and twelve things to keep in step.
const App=()=>/*#__PURE__*/React.createElement(React.Fragment,null,/*#__PURE__*/React.createElement(Nav,null),/*#__PURE__*/React.createElement("main",null,/*#__PURE__*/React.createElement(PageCaseStudy,null)),/*#__PURE__*/React.createElement(FooterV2,null));ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(App,null));
})();
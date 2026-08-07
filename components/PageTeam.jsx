// ===== Team page =====
const TeamHero = () => (
  <SiteHero
    eyebrow="Our team"
    headline={<>The people powering <span className="cvh-hl">Dalgo</span></>}
    body="Dalgo is built and run by a small, dedicated team alongside the nonprofits we serve — spanning product, consulting, data engineering, and community. We also work with local partners to design and deliver our programs. Meet the people powering the work."
  />
);

const TeamGrid = () => {
  // Real roster from dalgo.org/team (photos + LinkedIn). Titles are not published there, so omitted rather than invented.
  const members = [
    { name: 'Abhishek Nair', role: 'Sr. Product Manager', li: 'https://www.linkedin.com/in/abhishek-nair-14484a125/', img: 'assets/team/abhishek-nair.svg' },
    { name: 'Akansha Mandal', role: 'Associate - Product Designer', li: 'https://www.linkedin.com/in/akansha-mandal/', img: 'assets/team/akansha-mandal.webp' },
    { name: 'Anusha Ganapathi', role: 'Manager - Consulting', li: 'https://www.linkedin.com/in/anushaganapathi/', img: 'assets/team/anusha-ganapathi.webp' },
    { name: 'Ashwin Srinivasan', role: 'Dalgo Head', li: 'https://www.linkedin.com/in/ashwin-108/', img: 'assets/team/ashwin-srinivasan.webp' },
    { name: 'Donald Lobo', role: 'Founder', li: 'https://www.linkedin.com/in/donald-lobo/', img: 'assets/team/donald-lobo.webp' },
    { name: 'Erica Arya', role: 'India Head', li: 'https://www.linkedin.com/in/erica-arya/', img: 'assets/team/erica-arya.webp' },
    { name: 'Himanshu Dube', role: 'Software Developer', li: 'https://www.linkedin.com/in/himanshu-dube-b2344918b/', img: 'assets/team/himanshu-dube.webp' },
    { name: 'Ishan Koradiya', role: 'Software Developer', li: 'https://www.linkedin.com/in/ishan-koradia/', img: 'assets/team/ishan-koradiya.svg' },
    { name: 'Naveen Kumar', role: 'Software Developer', li: 'https://www.linkedin.com/in/naveen-kumar-30b023254/', img: 'assets/team/naveen-kumar.webp' },
    { name: 'Pradeep Kaushik', role: 'Associate Director', li: 'https://www.linkedin.com/in/pradnk/', img: 'assets/team/pradeep-kaushik.webp' },
    { name: 'Pratiksha Rao', role: 'Data Engineer', li: 'https://www.linkedin.com/in/patrao99/', img: 'assets/team/pratiksha-rao.webp' },
    { name: 'Priyesh Sikariwal', role: 'Business Development Lead', li: 'https://www.linkedin.com/in/priyesh-sikariwal-tiss-iiit/', img: 'assets/team/priyesh-sikariwal.webp' },
    { name: 'Ritabrata Roy', role: 'Associate - Data Engineer', li: 'https://www.linkedin.com/in/ritabrata-roy/', img: 'assets/team/ritabrata-roy.webp' },
    { name: 'Siddhant Singh', role: 'Software Developer', li: 'https://www.linkedin.com/in/ssiddhant/', img: 'assets/team/siddhant-singh.webp' },
    { name: 'Stuti', role: 'Product Marketing Lead', li: 'https://www.linkedin.com/in/stutinabazza/', img: 'assets/team/stuti.webp' },
    { name: 'Vinod Rajasekaran', role: 'Fractional CxO', li: 'https://www.linkedin.com/in/vinod-rajasekaran-b737b25a/', img: 'assets/team/vinod-rajasekaran.webp' },
  ];
  return (
    <section className="pg-section" id="team">
      <div className="container">
        <div className="section-head section-head-center">
          <h2 className="pg-h2">Meet the <span className="hl-underline">team</span></h2>
        </div>
        <p className="team-intro">
          Dalgo is built and run by a small, dedicated team alongside the nonprofits we serve — spanning
          product, consulting, data engineering, and community. We also work with local partners to design
          and deliver our programs. Meet the people powering the work.
        </p>
        <div className="team-grid">
          {members.map((m, i) => (
            <a key={i} href={m.li} target="_blank" rel="noopener" className="team-card">
              <div className="team-avatar" style={{overflow:'hidden'}}>
                <img src={m.img} alt={m.name} loading="lazy" style={{width:'100%', height:'100%', objectFit:'cover'}} />
              </div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
              <div className="team-li">LinkedIn →</div>
            </a>
          ))}
        </div>
        <div className="team-partner">
          <div className="tp-eyebrow">Our Implementation Partner</div>
          <div className="tp-badge">
            <img loading="lazy" width="385" height="83" src="assets/logos/goalkeep.png" alt="Goalkeep" />
          </div>
        </div>
      </div>
    </section>
  );
};

window.TeamHero = TeamHero;
window.TeamGrid = TeamGrid;

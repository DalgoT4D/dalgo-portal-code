// ===== Team page =====
const TeamHero = () => (
  <SiteHero
    eyebrow="Why We Exist"
    headline={<>The idea behind <span className="cvh-hl">Dalgo</span></>}
    body="Why we exist, who makes it possible, and how we deliver — the purpose, the people, and the platform behind the work."
  />
);

const TeamGrid = () => {
  // Real roster from dalgo.org/team (photos + LinkedIn). Titles are not published there, so omitted rather than invented.
  const members = [
    { name: 'Abhishek Nair', role: 'Sr. Product Manager', li: 'https://www.linkedin.com/in/abhishek-nair-14484a125/', img: 'https://dalgo.org/wp-content/uploads/2023/08/Abhishek-Nair.svg' },
    { name: 'Akansha Mandal', role: 'Associate - Product Designer', li: 'https://www.linkedin.com/in/akansha-mandal/', img: 'https://projecttech4dev.org/wp-content/uploads/2026/04/Website-team-images-3.png' },
    { name: 'Anusha Ganapathi', role: 'Manager - Consulting', li: 'https://www.linkedin.com/in/anushaganapathi/', img: 'https://i0.wp.com/dalgo.org/wp-content/uploads/2025/11/Dalgo-website-team-page-1.png?fit=768%2C768&ssl=1' },
    { name: 'Ashwin Srinivasan', role: 'Dalgo Head', li: 'https://www.linkedin.com/in/ashwin-108/', img: 'https://i0.wp.com/dalgo.org/wp-content/uploads/2025/10/Dalgo-website-team-page-2.png?fit=768%2C768&ssl=1' },
    { name: 'Donald Lobo', role: 'Founder', li: 'https://www.linkedin.com/in/donald-lobo/', img: 'https://i0.wp.com/dalgo.org/wp-content/uploads/2025/10/Dalgo-website-team-page.png?fit=768%2C768&ssl=1' },
    { name: 'Erica Arya', role: 'India Head', li: 'https://www.linkedin.com/in/erica-arya/', img: 'https://projecttech4dev.org/wp-content/uploads/2024/07/Ellipse-166.png' },
    { name: 'Himanshu Dube', role: 'Software Developer', li: 'https://www.linkedin.com/in/himanshu-dube-b2344918b/', img: 'https://i0.wp.com/dalgo.org/wp-content/uploads/2024/11/himanshu.png?fit=722%2C710&ssl=1' },
    { name: 'Ishan Koradiya', role: 'Software Developer', li: 'https://www.linkedin.com/in/ishan-koradia/', img: 'https://dalgo.org/wp-content/uploads/2023/08/Ishan-Koradiya.svg' },
    { name: 'Naveen Kumar', role: 'Software Developer', li: 'https://www.linkedin.com/in/naveen-kumar-30b023254/', img: 'https://projecttech4dev.org/wp-content/uploads/2026/01/naveen.png' },
    { name: 'Noopur Varma', role: 'Design Manager', li: 'https://www.linkedin.com/in/noopurvarma/', img: 'https://projecttech4dev.org/wp-content/uploads/2026/02/Noopur.png' },
    { name: 'Pradeep Kaushik', role: 'Associate Director', li: 'https://www.linkedin.com/in/pradnk/', img: 'https://i0.wp.com/dalgo.org/wp-content/uploads/2025/10/Copy-of-Copy-of-R.png?fit=768%2C768&ssl=1' },
    { name: 'Pratiksha Rao', role: 'Data Engineer', li: 'https://www.linkedin.com/in/patrao99/', img: 'https://i0.wp.com/dalgo.org/wp-content/uploads/2024/11/pratiksha-1-e1731076956925.jpeg?fit=581%2C614&ssl=1' },
    { name: 'Priyesh Sikariwal', role: 'Business Development Lead', li: 'https://www.linkedin.com/in/priyesh-sikariwal-tiss-iiit/', img: 'https://i0.wp.com/dalgo.org/wp-content/uploads/2025/10/logos-10.png?fit=768%2C768&ssl=1' },
    { name: 'Ritabrata Roy', role: 'Associate - Data Engineer', li: 'https://www.linkedin.com/in/ritabrata-roy/', img: 'https://i0.wp.com/dalgo.org/wp-content/uploads/2025/10/logos-11.png?fit=768%2C768&ssl=1' },
    { name: 'Siddhant Singh', role: 'Software Developer', li: 'https://www.linkedin.com/in/ssiddhant/', img: 'https://i0.wp.com/dalgo.org/wp-content/uploads/2025/10/Ellipse-173.png?fit=200%2C200&ssl=1' },
    { name: 'Stuti', role: 'Product Marketing Lead', li: 'https://www.linkedin.com/in/stutinabazza/', img: 'https://i0.wp.com/dalgo.org/wp-content/uploads/2025/10/1605928111138.jpg?fit=560%2C560&ssl=1' },
    { name: 'Vinod Rajasekaran', role: 'Fractional CxO', li: 'https://www.linkedin.com/in/vinod-rajasekaran-b737b25a/', img: 'https://i0.wp.com/dalgo.org/wp-content/uploads/2025/10/Dalgo-website-team-page-1.png?fit=768%2C768&ssl=1' },
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

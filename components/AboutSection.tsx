import { Arrow } from "./Arrow";

export function AboutSection() {
  return (
    <>
      <section className="statement section-shell" id="about">
        <p className="eyebrow">About</p>
        <h2>Full-stack developer<br /><em>from Nepal.</em></h2>
        <div className="statement-bottom"><p>I&apos;m Nishan Poudel. I build web and mobile products, APIs, dashboards, and internal tools for real users.</p><a className="text-link" href="https://www.linkedin.com/in/nishan-poudel-dev/" target="_blank" rel="noreferrer">LinkedIn <Arrow direction="right" /></a></div>
      </section>
      <section className="principles section-shell" aria-label="How Nishan works">
        <div className="principle-card"><h3>Frontend</h3><p>React, Next.js, React Native, Chart.js, Tailwind CSS.</p></div>
        <div className="principle-card principle-card-highlight"><h3>Backend</h3><p>Node.js, Express, Django, Odoo, REST APIs.</p></div>
        <div className="principle-card"><h3>Data &amp; tools</h3><p>PostgreSQL, MySQL, Prisma, Redis, Docker, Git.</p></div>
      </section>
    </>
  );
}

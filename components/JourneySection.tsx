import { experience, tools } from "@/data/portfolio";

export function JourneySection() {
  return (
    <section className="journey section-shell">
      <div className="section-heading"><div><p className="eyebrow">Experience</p><h2>Where I&apos;ve worked.</h2></div></div>
      <div className="journey-list">{experience.map((item) => <div className="journey-item" key={item.company}><span>{item.period}</span><strong>{item.company}</strong><p>{item.description}</p></div>)}</div>
      <div className="toolbelt"><span>Works with</span>{tools.map((tool) => <b key={tool}>{tool}</b>)}</div>
      <p className="education-line">B.E. Computer Engineering · Nepal College of Information Technology · Pokhara University</p>
    </section>
  );
}

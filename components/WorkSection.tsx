"use client";

import { useState } from "react";
import { projectFilters, projects } from "@/data/portfolio";
import { Arrow } from "./Arrow";

export function WorkSection() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const visibleProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  return (
    <section className="work section-shell" id="work">
      <div className="section-heading"><div><p className="eyebrow">Work</p><h2>Selected work.</h2></div></div>
      <div className="filter-row" aria-label="Filter projects">
        {projectFilters.map((item) => <button className={filter === item ? "filter active" : "filter"} key={item} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="project-list">
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className={`project-visual visual-${project.color}`}><div className="visual-noise" /><span className="project-number">{project.number}</span>
              {project.category === "Product" && <div className="health-orb"><span>10k+</span><small>vaccines tracked</small></div>}
              {project.category === "Web" && <div className="lumen-window"><i /><i /><i /></div>}
              {project.category === "Brand" && <div className="morrow-type">M<br />P</div>}
            </div>
            <div className="project-info"><div><p className="project-tag">{project.tag}</p><h3>{project.title}</h3><p>{project.description}</p></div><a className="round-link" href="#contact" aria-label={`Ask about ${project.title}`}><Arrow /></a></div>
          </article>
        ))}
      </div>
    </section>
  );
}

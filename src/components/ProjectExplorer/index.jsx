"use client";

import { useMemo, useState } from "react";

import { trackEvent } from "../../lib/analytics";
import ProjectCard from "../ProjectCard";
import styles from "./index.module.css";

const ALL = "All";

// Only offer a filter for tags that actually group things together. A tag
// used once is a label, not a filter.
function usefulTags(projects) {
  const counts = new Map();

  for (const project of projects) {
    for (const tag of project.tech) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([tag, count]) => ({ tag, count }));
}

export default function ProjectExplorer({ projects }) {
  const [active, setActive] = useState(ALL);
  const tags = useMemo(() => usefulTags(projects), [projects]);

  const visible = useMemo(
    () =>
      active === ALL
        ? projects
        : projects.filter((project) => project.tech.includes(active)),
    [active, projects],
  );

  function choose(tag) {
    setActive(tag);
    trackEvent("project_filter", { tag });
  }

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter projects">
        <button
          type="button"
          className={`${styles.filter} ${active === ALL ? styles.filterActive : ""}`}
          onClick={() => choose(ALL)}
          aria-pressed={active === ALL}
        >
          All <span className={styles.count}>{projects.length}</span>
        </button>
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            type="button"
            className={`${styles.filter} ${active === tag ? styles.filterActive : ""}`}
            onClick={() => choose(tag)}
            aria-pressed={active === tag}
          >
            {tag} <span className={styles.count}>{count}</span>
          </button>
        ))}
      </div>

      <p className={styles.resultCount} aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
        {active === ALL ? "" : ` tagged ${active}`}
      </p>

      <div className={styles.grid}>
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}

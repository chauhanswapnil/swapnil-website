import TrackedLink from "../TrackedLink";

import styles from "./index.module.css";

export default function ProjectCard({ project }) {
  const links = [
    project.githubUrl ? { label: "GitHub", href: project.githubUrl, external: true } : null,
    project.demoUrl ? { label: "Open", href: project.demoUrl, external: false } : null,
    project.blogUrl ? { label: "Write-up", href: project.blogUrl, external: false } : null,
  ].filter(Boolean);

  return (
    <article className={`${styles.card} surfaceCard`}>
      <div className={styles.header}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
      </div>

      <p className={styles.hook}>{project.hook}</p>
      <p className={styles.summary}>{project.summary}</p>

      <ul className={styles.techList}>
        {project.tech.map((item) => (
          <li key={item} className={styles.techTag}>
            {item}
          </li>
        ))}
      </ul>

      {links.length ? (
        <div className={styles.linkRow}>
          {links.map((link) => (
            <TrackedLink
              key={link.label}
              href={link.href}
              className="accentLink"
              external={link.external}
              eventName="project_link_click"
              eventParams={{
                location: "project_card",
                project_slug: project.slug,
                link_type:
                  link.label === "GitHub"
                    ? "github"
                    : link.label === "Open"
                      ? "project_demo"
                      : "project_writeup",
                target_url: link.href,
              }}
            >
              {link.label}
            </TrackedLink>
          ))}
        </div>
      ) : null}
    </article>
  );
}

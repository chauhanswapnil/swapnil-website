import Link from "next/link";

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
          {links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="accentLink"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className="accentLink">
                {link.label}
              </Link>
            ),
          )}
        </div>
      ) : null}
    </article>
  );
}

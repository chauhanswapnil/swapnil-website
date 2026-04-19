import ProjectCard from "../components/ProjectCard";
import TrackedLink from "../components/TrackedLink";
import { featuredProjects, projectsPageCopy } from "../content/projects";
import styles from "./projects.module.css";

export default function Projects() {
  return (
    <div className={`pageShell ${styles.page}`}>
      <section className={styles.hero}>
        <p className={`${styles.eyebrow} mutedText`}>{projectsPageCopy.eyebrow}</p>
        <h1 className={styles.title}>{projectsPageCopy.title}</h1>
        <p className={`${styles.description} softText`}>{projectsPageCopy.description}</p>
        <div className={styles.ctaRow}>
          <TrackedLink
            href={projectsPageCopy.githubUrl}
            external
            className="accentLink"
            eventName="profile_link_click"
            eventParams={{
              location: "projects_page",
              link_type: "github",
              target_url: projectsPageCopy.githubUrl,
            }}
          >
            GitHub
          </TrackedLink>
          <TrackedLink
            href={projectsPageCopy.linkedinUrl}
            external
            className="accentLink"
            eventName="profile_link_click"
            eventParams={{
              location: "projects_page",
              link_type: "linkedin",
              target_url: projectsPageCopy.linkedinUrl,
            }}
          >
            LinkedIn
          </TrackedLink>
        </div>
      </section>

      <section className={styles.grid}>
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}

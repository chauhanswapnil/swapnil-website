import ProjectCard from "../components/ProjectCard";
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
          <a href={projectsPageCopy.githubUrl} target="_blank" rel="noreferrer" className="accentLink">
            GitHub
          </a>
          <a href={projectsPageCopy.linkedinUrl} target="_blank" rel="noreferrer" className="accentLink">
            LinkedIn
          </a>
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

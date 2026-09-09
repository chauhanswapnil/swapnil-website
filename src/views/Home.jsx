import BlogPreview from "../components/BlogPreview";
import LoxTerminal from "../components/LoxTerminal";
import ProjectCard from "../components/ProjectCard";
import ShortcutHint from "../components/ShortcutHint";
import TrackedLink from "../components/TrackedLink";
import { heroProgram, site } from "../content/site";
import styles from "./home.module.css";

export default function Home({ featuredPosts, featuredProjects }) {
  return (
    <div className={`pageShell ${styles.page}`}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={`${styles.eyebrow} mutedText`}>
            Backend engineer <span aria-hidden="true">·</span> London → the Bay
            Area
          </p>
          <h1 className={styles.name}>{site.name}</h1>
          <p className={styles.lead}>{site.tagline}</p>

          <div className={styles.ctaRow}>
            <TrackedLink
              href="/blog"
              className={styles.primaryCta}
              eventName="content_link_click"
              eventParams={{
                location: "home_hero",
                link_type: "blog_archive",
                target_url: "/blog",
              }}
            >
              Read the writing
            </TrackedLink>
            <TrackedLink
              href="/projects"
              className={styles.ghostCta}
              eventName="content_link_click"
              eventParams={{
                location: "home_hero",
                link_type: "projects",
                target_url: "/projects",
              }}
            >
              See what I’ve built
            </TrackedLink>
          </div>

          <ShortcutHint
            className={styles.shortcutHint}
            kbdClassName={styles.kbd}
          />
        </div>

        <div className={styles.heroTerminal}>
          <LoxTerminal program={heroProgram} />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="writing-heading">
        <div className={styles.sectionHeader}>
          <h2 id="writing-heading" className="sectionTitle">
            I write sometimes
          </h2>
          <TrackedLink
            href="/blog"
            className={styles.sectionLink}
            eventName="content_link_click"
            eventParams={{
              location: "home",
              link_type: "blog_archive",
              target_url: "/blog",
            }}
          >
            Browse all posts →
          </TrackedLink>
        </div>
        <div className={styles.postList}>
          {featuredPosts.map((post) => (
            <BlogPreview
              key={post.slug}
              date={post.dateLabel}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              readingMinutes={post.readingMinutes}
              location="home"
            />
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="projects-heading">
        <div className={styles.sectionHeader}>
          <h2 id="projects-heading" className="sectionTitle">
            Things I’ve built
          </h2>
          <TrackedLink
            href="/projects"
            className={styles.sectionLink}
            eventName="content_link_click"
            eventParams={{
              location: "home",
              link_type: "projects",
              target_url: "/projects",
            }}
          >
            All projects →
          </TrackedLink>
        </div>
        <div className={styles.projectGrid}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

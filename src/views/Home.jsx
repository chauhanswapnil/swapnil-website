import BlogPreview from "../components/BlogPreview";
import TrackedLink from "../components/TrackedLink";
import styles from "./home.module.css";

export default function Home({ featuredPosts }) {
  return (
    <div className={`pageShell ${styles.page}`}>
        <p className={styles.secondaryText}>
          I’m a backend software engineer with a deep love for programming languages. You could say I’m on a never-ending quest to find the perfect syntax, or at least the one that sparks the most joy. Whether it’s the memory safety of Rust or the simplicity of Go, I’m always eager to dive into something new and add another language to my growing collection.
        </p>

        <div className={styles.loxContainer}>
          <h2 className="sectionTitle">
            <TrackedLink
              href="/playground"
              style={{ color: "inherit" }}
              eventName="content_link_click"
              eventParams={{ location: "home", link_type: "playground", target_url: "/playground" }}
            >
              Lox Playground
            </TrackedLink>
          </h2>
          <p>
            Check out Lox playground which is an online repl for the interpreter
            I made in Java for Lox Language.
          </p>
        </div>

        <div className={styles.sections}>
          <div className={styles.sectionHeader}>
            <h2 className="sectionTitle">I write sometimes</h2>
            <TrackedLink
              href="/blog"
              className={styles.sectionLink}
              eventName="content_link_click"
              eventParams={{ location: "home", link_type: "blog_archive", target_url: "/blog" }}
            >
              Browse all posts
            </TrackedLink>
          </div>
          {featuredPosts.map((post) => (
            <BlogPreview
              key={post.slug}
              date={post.dateLabel}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              location="home"
            />
          ))}
        </div>
    </div>
  );
}

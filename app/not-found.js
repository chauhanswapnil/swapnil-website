import TrackedLink from "../src/components/TrackedLink";
import { getFeaturedBlogPosts } from "../src/content/blogs";
import styles from "../src/views/notFound.module.css";

export const metadata = {
  title: "Page not found",
  description: "That page does not exist.",
  robots: { index: false, follow: true },
};

const DESTINATIONS = [
  { href: "/", label: "Home", note: "Start from the top" },
  { href: "/blog", label: "Blog", note: "Everything I have written" },
  { href: "/projects", label: "Projects", note: "Interpreters and experiments" },
  { href: "/playground", label: "Playground", note: "Write and run some Lox" },
];

export default function NotFound() {
  const recent = getFeaturedBlogPosts(2);

  return (
    <div className={`pageShell ${styles.page}`}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Undefined variable &lsquo;page&rsquo;.</h1>
      <p className={styles.body}>
        Nothing lives at this address. It may have moved, or the link may have
        been wrong to begin with. Here is where everything else is.
      </p>

      <ul className={styles.grid}>
        {DESTINATIONS.map((destination) => (
          <li key={destination.href} className={`${styles.card} surfaceCard`}>
            <TrackedLink
              href={destination.href}
              className={styles.cardLink}
              eventName="content_link_click"
              eventParams={{
                location: "not_found",
                link_type: "recovery",
                target_url: destination.href,
              }}
            >
              <span className={styles.cardLabel}>{destination.label}</span>
              <span className={styles.cardNote}>{destination.note}</span>
            </TrackedLink>
          </li>
        ))}
      </ul>

      {recent.length ? (
        <section className={styles.recent}>
          <h2 className={styles.recentTitle}>Or read something recent</h2>
          <ul className={styles.recentList}>
            {recent.map((post) => (
              <li key={post.slug}>
                <TrackedLink
                  href={`/blog/${post.slug}`}
                  className="accentLink"
                  eventName="content_link_click"
                  eventParams={{
                    location: "not_found",
                    link_type: "blog_post",
                    slug: post.slug,
                    target_url: `/blog/${post.slug}`,
                  }}
                >
                  {post.title}
                </TrackedLink>
                <span className={styles.recentMeta}>
                  {post.dateLabel} · {post.readingMinutes} min read
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

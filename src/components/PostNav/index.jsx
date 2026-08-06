import TrackedLink from "../TrackedLink";
import styles from "./index.module.css";

export default function PostNav({ neighbours, slug }) {
  const { newer, older } = neighbours || {};

  if (!newer && !older) {
    return null;
  }

  return (
    <nav className={styles.postNav} aria-label="More posts">
      {older ? (
        <TrackedLink
          href={`/blog/${older.slug}`}
          className={`${styles.card} surfaceCard`}
          eventName="content_link_click"
          eventParams={{
            location: "blog_article",
            link_type: "older_post",
            slug,
            target_url: `/blog/${older.slug}`,
          }}
        >
          <span className={styles.direction}>← Older</span>
          <span className={styles.title}>{older.title}</span>
          <span className={styles.date}>{older.dateLabel}</span>
        </TrackedLink>
      ) : (
        <span />
      )}

      {newer ? (
        <TrackedLink
          href={`/blog/${newer.slug}`}
          className={`${styles.card} ${styles.cardRight} surfaceCard`}
          eventName="content_link_click"
          eventParams={{
            location: "blog_article",
            link_type: "newer_post",
            slug,
            target_url: `/blog/${newer.slug}`,
          }}
        >
          <span className={styles.direction}>Newer →</span>
          <span className={styles.title}>{newer.title}</span>
          <span className={styles.date}>{newer.dateLabel}</span>
        </TrackedLink>
      ) : (
        <span />
      )}
    </nav>
  );
}

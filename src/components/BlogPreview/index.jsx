import styles from "./index.module.css";
import TrackedLink from "../TrackedLink";

export default function BlogPreview({
  date,
  title,
  excerpt,
  slug,
  readingMinutes,
  location = "blog_preview",
}) {
  const linkParams = {
    location,
    link_type: "blog_post",
    slug,
    target_url: `/blog/${slug}`,
  };

  return (
    <article className={`${styles.previewContainer} surfaceCard`}>
      <p className={styles.meta}>
        <span>{date}</span>
        {readingMinutes ? (
          <>
            <span className={styles.metaDot} aria-hidden="true">
              ·
            </span>
            <span>{readingMinutes} min read</span>
          </>
        ) : null}
      </p>
      <h3 className={styles.blogTitle}>
        <TrackedLink
          href={`/blog/${slug}`}
          className={styles.titleLink}
          eventName="content_link_click"
          eventParams={linkParams}
        >
          {title}
        </TrackedLink>
      </h3>
      <p className={styles.blogPreviewText}>{excerpt}</p>
      <TrackedLink
        href={`/blog/${slug}`}
        className={`${styles.blogReadMoreLink} accentLink`}
        eventName="content_link_click"
        eventParams={linkParams}
      >
        Read more →
      </TrackedLink>
    </article>
  );
}

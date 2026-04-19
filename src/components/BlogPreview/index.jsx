import styles from "./index.module.css";
import TrackedLink from "../TrackedLink";

export default function BlogPreview({ date, title, excerpt, slug, location = "blog_preview" }) {
  return (
    <article className={`${styles.previewContainer} surfaceCard`}>
      <h6 className={styles.dateText}>{date}</h6>
      <h5 className={styles.blogTitle}>{title}</h5>
      <p className={styles.blogPreviewText}>{excerpt}</p>
      <TrackedLink
        href={`/blog/${slug}`}
        style={{ color: "inherit" }}
        className={`${styles.blogReadMoreLink} accentLink`}
        eventName="content_link_click"
        eventParams={{
          location,
          link_type: "blog_post",
          slug,
          target_url: `/blog/${slug}`,
        }}
      >
        Read More
      </TrackedLink>
    </article>
  );
}

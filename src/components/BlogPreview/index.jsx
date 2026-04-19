import styles from "./index.module.css";
import Link from "next/link";

export default function BlogPreview({ date, title, excerpt, slug }) {
  return (
    <article className={`${styles.previewContainer} surfaceCard`}>
      <h6 className={styles.dateText}>{date}</h6>
      <h5 className={styles.blogTitle}>{title}</h5>
      <p className={styles.blogPreviewText}>{excerpt}</p>
      <Link
        href={`/blog/${slug}`}
        style={{ color: "inherit" }}
        className={`${styles.blogReadMoreLink} accentLink`}
      >
        Read More
      </Link>
    </article>
  );
}

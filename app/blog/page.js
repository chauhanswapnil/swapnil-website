import BlogPreview from "../../src/components/BlogPreview";
import { getAllBlogPosts } from "../../src/content/blogs";
import styles from "../../src/views/blogList.module.css";

export const metadata = {
  title: "Blog",
  description: "Essays, engineering notes, and programming write-ups by Swapnil Chauhan.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className={`pageShell ${styles.page}`}>
      <section className={styles.hero}>
        <p className={`${styles.eyebrow} mutedText`}>Writing</p>
        <h1 className={styles.title}>Notes on engineering, learning, and life.</h1>
        <p className={`${styles.description} softText`}>
          A cleaner archive for the posts that used to live only on the homepage.
        </p>
      </section>

      <section className={styles.listContainer}>
        {posts.map((post) => (
          <BlogPreview
            key={post.slug}
            date={post.dateLabel}
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
          />
        ))}
      </section>
    </div>
  );
}

import BlogPreview from "../../src/components/BlogPreview";
import { getAllBlogPosts } from "../../src/content/blogs";
import styles from "../../src/views/blogList.module.css";

export const metadata = {
  title: "Blog",
  description: "Essays, engineering notes, and programming write-ups by Swapnil Chauhan.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Swapnil Chauhan",
    description: "Essays, engineering notes, and programming write-ups by Swapnil Chauhan.",
    url: "https://swapnilchauhan.com/blog",
    type: "website",
    images: [
      {
        url: "/og/blog.svg",
        width: 1200,
        height: 630,
        alt: "Blog | Swapnil Chauhan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/blog.svg"],
  },
};

function groupByYear(posts) {
  const years = new Map();

  for (const post of posts) {
    const year = new Date(post.date).getUTCFullYear();
    if (!years.has(year)) {
      years.set(year, []);
    }
    years.get(year).push(post);
  }

  return [...years.entries()];
}

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const totalMinutes = posts.reduce((sum, post) => sum + post.readingMinutes, 0);

  return (
    <div className={`pageShell ${styles.page}`}>
      <section className={styles.hero}>
        <p className={`${styles.eyebrow} mutedText`}>Writing</p>
        <h1 className={styles.title}>Notes on engineering, learning, and life.</h1>
        <p className={`${styles.description} softText`}>
          Essays about the parts of the job nobody writes tickets for, plus
          write-ups of whatever I have been building.
        </p>
        <p className={styles.stats}>
          {posts.length} posts <span aria-hidden="true">·</span> about{" "}
          {totalMinutes} minutes of reading
        </p>
      </section>

      {groupByYear(posts).map(([year, yearPosts]) => (
        <section key={year} className={styles.yearGroup} aria-label={`Posts from ${year}`}>
          <h2 className={styles.year}>{year}</h2>
          <div className={styles.listContainer}>
            {yearPosts.map((post) => (
              <BlogPreview
                key={post.slug}
                date={post.dateLabel}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                readingMinutes={post.readingMinutes}
                location="blog_archive"
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

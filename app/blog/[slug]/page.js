import { notFound } from "next/navigation";

import BlogContent from "../../../src/components/BlogContent";
import { getAllBlogPosts, getBlogPostBySlug } from "../../../src/content/blogs";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Swapnil Chauhan`,
      description: post.description,
      url: `https://swapnilchauhan.com/blog/${post.slug}`,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Swapnil Chauhan"],
      images: [
        {
          url: `/og/blog/${post.slug}.svg`,
          width: 1200,
          height: 630,
          alt: `${post.title} | Swapnil Chauhan`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Swapnil Chauhan`,
      description: post.description,
      images: [`/og/blog/${post.slug}.svg`],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    url: `https://swapnilchauhan.com/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Swapnil Chauhan",
      url: "https://swapnilchauhan.com",
    },
    publisher: {
      "@type": "Person",
      name: "Swapnil Chauhan",
      url: "https://swapnilchauhan.com",
    },
    mainEntityOfPage: `https://swapnilchauhan.com/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogContent post={post} />
    </>
  );
}

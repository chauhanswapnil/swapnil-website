import Home from "../src/views/Home";
import { getFeaturedBlogPosts } from "../src/content/blogs";

export const metadata = {
  title: "Swapnil Chauhan",
  description:
    "Backend software engineer writing about programming languages, engineering, and things worth learning slowly.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Swapnil Chauhan",
    description:
      "Backend software engineer writing about programming languages, engineering, and things worth learning slowly.",
    url: "https://swapnilchauhan.com",
    type: "website",
    images: [
      {
        url: "/og/site.svg",
        width: 1200,
        height: 630,
        alt: "Swapnil Chauhan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/site.svg"],
  },
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Swapnil Chauhan",
        url: "https://swapnilchauhan.com",
        jobTitle: "Backend Software Engineer",
        sameAs: [
          "https://github.com/chauhanswapnil",
          "https://x.com/swapstar",
        ],
      },
      {
        "@type": "WebSite",
        name: "Swapnil Chauhan",
        url: "https://swapnilchauhan.com",
        author: {
          "@type": "Person",
          name: "Swapnil Chauhan",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Home featuredPosts={getFeaturedBlogPosts(3)} />
    </>
  );
}

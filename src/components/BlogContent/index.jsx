import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import TrackedLink from "../TrackedLink";
import styles from "./index.module.css";

export default function BlogContent({ post }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.blogContainer}>
        <header>
          <p className={styles.backLinkWrapper}>
            <TrackedLink
              className="accentLink"
              href="/blog"
              eventName="content_link_click"
              eventParams={{
                location: "blog_article",
                link_type: "back_to_blog",
                slug: post.slug,
                target_url: "/blog",
              }}
            >
              Back to all posts
            </TrackedLink>
          </p>
        </header>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p({ children, ...props }) {
              return <p {...props}>{children}</p>;
            },
            img({ alt, src, ...props }) {
              return <img alt={alt} src={src} loading="lazy" {...props} />;
            },
            a({ href, children, ...props }) {
              const isExternal = href?.startsWith("http");

              if (!href) {
                return <span>{children}</span>;
              }

              if (!isExternal && href.startsWith("/")) {
                return (
                  <TrackedLink
                    className="accentLink"
                    href={href}
                    eventName="content_link_click"
                    eventParams={{
                      location: "blog_article",
                      link_type: "internal",
                      slug: post.slug,
                      target_url: href,
                    }}
                  >
                    {children}
                  </TrackedLink>
                );
              }

              return (
                <TrackedLink
                  className="accentLink"
                  href={href}
                  external
                  eventName="content_link_click"
                  eventParams={{
                    location: "blog_article",
                    link_type: "external",
                    slug: post.slug,
                    target_url: href,
                  }}
                  {...props}
                >
                  {children}
                </TrackedLink>
              );
            },
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  customStyle={{ borderRadius: "10px", padding: "1.25rem" }}
                  language={match[1]}
                  style={oneDark}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./index.module.css";

export default function BlogContent({ post }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.blogContainer}>
        <header className={styles.blogHeader}>
          <p className={styles.backLinkWrapper}>
            <Link className="accentLink" href="/blog">
              Back to all posts
            </Link>
          </p>
          <p className={styles.blogMeta}>{post.dateLabel}</p>
          <h1 className={styles.blogTitle}>{post.title}</h1>
          <p className={styles.blogDescription}>{post.description}</p>
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
                  <Link className="accentLink" href={href}>
                    {children}
                  </Link>
                );
              }

              return (
                <a
                  className="accentLink"
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                  {...props}
                >
                  {children}
                </a>
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

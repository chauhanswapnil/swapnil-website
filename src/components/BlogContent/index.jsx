import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import recentPRMerged from "../../images/recent-pr-merged.png";
import TrackedLink from "../TrackedLink";
import styles from "./index.module.css";

const blogImages = {
  "recent-pr-merged.png": recentPRMerged.src,
};

function cleanFootnoteHref(href) {
  return href
    ?.replace(/^#user-content-fn-(\d+)$/, "#reference-$1")
    .replace(/^#user-content-fnref-(\d+)$/, "#footnote-citation-$1");
}

function cleanFootnoteReferenceId(id) {
  return id?.replace(/^user-content-fn-(\d+)$/, "reference-$1");
}

function cleanFootnoteCitationId(id) {
  return id?.replace(/^user-content-fnref-(\d+)$/, "footnote-citation-$1");
}

function textFromChildren(children) {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }

  return children?.props?.children ? textFromChildren(children.props.children) : "";
}

function slugifyHeading(children) {
  return (
    textFromChildren(children)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section"
  );
}

export default function BlogContent({ post }) {
  const headingCounts = new Map();

  function headingId(children) {
    const baseId = slugifyHeading(children);
    const count = headingCounts.get(baseId) || 0;
    headingCounts.set(baseId, count + 1);
    return count === 0 ? baseId : `${baseId}-${count + 1}`;
  }

  function renderHeading(Tag) {
    return function Heading({ children, id: existingId, level, node, ...props }) {
      if (existingId === "footnote-label") {
        return (
          <Tag id={existingId} {...props}>
            {children}
          </Tag>
        );
      }

      const id = existingId || headingId(children);

      return (
        <Tag id={id} {...props}>
          {children}
          <a
            className={styles.headingAnchor}
            href={`#${id}`}
            aria-label={`Link to ${textFromChildren(children)}`}
          >
            #
          </a>
        </Tag>
      );
    };
  }

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
            h1: renderHeading("h1"),
            h2: renderHeading("h2"),
            h3: renderHeading("h3"),
            h4: renderHeading("h4"),
            p({ children, ...props }) {
              return <p {...props}>{children}</p>;
            },
            img({ alt, src, title, ...props }) {
              return (
                <span className={styles.imageWrapper}>
                  <img
                    alt={alt}
                    src={blogImages[src] || src}
                    loading="lazy"
                    {...props}
                  />
                  {title ? <span className={styles.imageCaption}>{title}</span> : null}
                </span>
              );
            },
            a({ href, id, target, rel, children, ...props }) {
              const cleanedHref = cleanFootnoteHref(href);
              const cleanedId = cleanFootnoteCitationId(id);
              const isExternal = cleanedHref?.startsWith("http");

              if (!cleanedHref) {
                return <span>{children}</span>;
              }

              if (cleanedHref.startsWith("#")) {
                return (
                  <a className="accentLink" href={cleanedHref} id={cleanedId} {...props}>
                    {children}
                  </a>
                );
              }

              if (!isExternal && cleanedHref.startsWith("/")) {
                return (
                  <TrackedLink
                    className="accentLink"
                    href={cleanedHref}
                    eventName="content_link_click"
                    eventParams={{
                      location: "blog_article",
                      link_type: "internal",
                      slug: post.slug,
                      target_url: cleanedHref,
                    }}
                  >
                    {children}
                  </TrackedLink>
                );
              }

              return (
                <TrackedLink
                  className="accentLink"
                  href={cleanedHref}
                  external
                  eventName="content_link_click"
                  eventParams={{
                    location: "blog_article",
                    link_type: "external",
                    slug: post.slug,
                    target_url: cleanedHref,
                  }}
                  id={cleanedId}
                  {...props}
                >
                  {children}
                </TrackedLink>
              );
            },
            li({ id, ordered, children, ...props }) {
              return (
                <li id={cleanFootnoteReferenceId(id)} {...props}>
                  {children}
                </li>
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

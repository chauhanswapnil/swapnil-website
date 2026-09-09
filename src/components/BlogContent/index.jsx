import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import recentPRMerged from "../../images/recent-pr-merged.png";
import { slugifyHeading } from "../../lib/markdown.mjs";
import CodeBlock from "../CodeBlock";
import PostNav from "../PostNav";
import ReadingProgress from "../ReadingProgress";
import TableOfContents from "../TableOfContents";
import TrackedLink from "../TrackedLink";
import styles from "./index.module.css";

const ARTICLE_ID = "article-body";

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

export default function BlogContent({ post, neighbours }) {
  const hasTableOfContents = post.headings.length >= 3;

  // The contents list is built from the raw markdown in blogs.js; the article
  // body is built from rendered React children. Rather than slugify twice and
  // hope the two agree, walk the list blogs.js already produced and hand each
  // h2–h4 the id the sidebar is going to link to.
  //
  // h1 is deliberately outside that walk: extractHeadings only collects h2–h4,
  // so letting an h1 draw from the queue would shift every id after it.
  const tocQueue = (post.headings || []).map((heading) => ({ ...heading }));

  // Every id the contents list is going to link to, claimed up front. An h1
  // that happens to repeat an h2's wording then has to pick a different id
  // rather than minting a duplicate of one already spoken for.
  const usedIds = new Set(tocQueue.map((heading) => heading.id));

  function localId(text) {
    const baseId = slugifyHeading(text);

    let candidate = baseId;
    let suffix = 1;
    while (usedIds.has(candidate)) {
      suffix += 1;
      candidate = `${baseId}-${suffix}`;
    }

    usedIds.add(candidate);
    return candidate;
  }

  function headingId(text, fromToc) {
    if (fromToc) {
      const slug = slugifyHeading(text);
      const match = tocQueue.find(
        (heading) => !heading.used && slugifyHeading(heading.text) === slug,
      );

      if (match) {
        match.used = true;
        return match.id;
      }
    }

    return localId(text);
  }

  function renderHeading(Tag) {
    const fromToc = Tag !== "h1";

    return function Heading({ children, id: existingId, level, node, ...props }) {
      if (existingId === "footnote-label") {
        return (
          <Tag id={existingId} {...props}>
            {children}
          </Tag>
        );
      }

      const id = existingId || headingId(textFromChildren(children), fromToc);

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
      <ReadingProgress targetId={ARTICLE_ID} />

      <div
        className={`${styles.layout} ${
          hasTableOfContents ? "" : styles.layoutWithoutSidebar
        }`}
      >
        <article className={styles.blogContainer}>
          <header className={styles.articleHeader}>
            <TrackedLink
              className={styles.backLink}
              href="/blog"
              eventName="content_link_click"
              eventParams={{
                location: "blog_article",
                link_type: "back_to_blog",
                slug: post.slug,
                target_url: "/blog",
              }}
            >
              ← All posts
            </TrackedLink>

            <h1 className={styles.articleTitle}>{post.title}</h1>

            <p className={styles.articleMeta}>
              <time dateTime={post.date}>{post.dateLabel}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <span>{post.wordCount.toLocaleString("en-GB")} words</span>
            </p>
          </header>

          <div id={ARTICLE_ID} className={styles.articleBody}>
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
                    <CodeBlock
                      language={match[1]}
                      code={String(children).replace(/\n$/, "")}
                    />
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

          <PostNav neighbours={neighbours} slug={post.slug} />
        </article>

        {hasTableOfContents ? (
          <aside className={styles.sidebar}>
            <TableOfContents headings={post.headings} />
          </aside>
        ) : null}
      </div>
    </div>
  );
}

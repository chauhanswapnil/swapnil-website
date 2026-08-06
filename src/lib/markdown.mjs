// Markdown helpers shared by the site and the feed script. Kept free of any
// Next or React import so the plain Node scripts under scripts/ can use it
// too — src/content/blogs.js is server-only and cannot be imported there.

export function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

// Reduce heading text to the form both sides of the contents list agree on.
// The table of contents reads raw markdown while the article body reads
// rendered React children, so links, emphasis and inline code have to come
// off before either one is slugified.
export function normaliseHeadingText(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

export function slugifyHeading(text) {
  return (
    normaliseHeadingText(text)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section"
  );
}

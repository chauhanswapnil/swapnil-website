import "server-only";
import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";

const BLOG_POSTS_DIRECTORY = path.join(process.cwd(), "src", "blogmd");

function stripMarkdown(markdown) {
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

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateString));
}

const WORDS_PER_MINUTE = 220;

function countWords(markdown) {
  const words = stripMarkdown(markdown).split(/\s+/).filter(Boolean);
  return words.length;
}

function slugifyHeading(text) {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section"
  );
}

// Pull the section headings out of a post so article pages can render a
// contents list. Fenced code blocks are skipped so a shell comment like
// `## build` never turns into a heading.
//
// Posts do not agree on a starting level — some open sections with h3,
// others with h4 — so depth is measured relative to the shallowest heading
// in the post rather than assumed to be h2.
function extractHeadings(markdown) {
  const seen = new Map();
  const headings = [];
  let insideFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) {
      continue;
    }

    const match = /^(#{2,4})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) {
      continue;
    }

    const text = match[2].replace(/[*_`]/g, "").trim();
    const baseId = slugifyHeading(text);
    const count = seen.get(baseId) || 0;
    seen.set(baseId, count + 1);

    headings.push({
      id: count === 0 ? baseId : `${baseId}-${count + 1}`,
      text,
      level: match[1].length,
    });
  }

  if (headings.length === 0) {
    return headings;
  }

  const shallowest = Math.min(...headings.map((heading) => heading.level));
  return headings.map((heading) => ({
    ...heading,
    depth: Math.min(2, heading.level - shallowest),
  }));
}

const DATE_LINE = /^[A-Z][a-z]{2,8}\.?\s+\d{1,2},\s+\d{4}\.?$/;

// Every post opens by repeating its own title, sometimes under a rule and a
// hand-written date. The article page renders that header from frontmatter
// instead, so trim the hand-written version off the top. Anything that does
// not match the expected shape is left alone.
function stripLeadingTitleBlock(markdown) {
  const lines = markdown.split("\n");
  let cursor = 0;

  const skipBlanks = () => {
    while (cursor < lines.length && lines[cursor].trim() === "") {
      cursor += 1;
    }
  };

  skipBlanks();

  if (!/^#\s+\S/.test(lines[cursor] || "")) {
    return markdown;
  }
  cursor += 1;
  skipBlanks();

  if (/^-{3,}$/.test((lines[cursor] || "").trim())) {
    cursor += 1;
    skipBlanks();
  }

  if (DATE_LINE.test((lines[cursor] || "").trim())) {
    cursor += 1;
  }

  skipBlanks();

  return lines.slice(cursor).join("\n");
}

function readPostFromFile(filename) {
  const fullPath = path.join(BLOG_POSTS_DIRECTORY, filename);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content: rawContent } = matter(source);
  const content = stripLeadingTitleBlock(rawContent);
  const dateLabel = formatDate(data.date);
  const excerpt = data.excerpt || `${stripMarkdown(content).slice(0, 220).trimEnd()}...`;
  const wordCount = countWords(content);

  return {
    slug: data.slug,
    title: data.title,
    date: data.date,
    dateLabel,
    description: data.description,
    excerpt,
    featured: data.featured ?? false,
    tags: data.tags ?? [],
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    headings: extractHeadings(content),
    content,
  };
}

export const getAllBlogPosts = cache(() => {
  return fs
    .readdirSync(BLOG_POSTS_DIRECTORY)
    .filter((filename) => filename.endsWith(".md"))
    .map(readPostFromFile)
    .sort((left, right) => (left.date < right.date ? 1 : -1));
});

export function getFeaturedBlogPosts(limit = 3) {
  return getAllBlogPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getBlogPostBySlug(slug) {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

// Everything except the raw markdown, so lists and the search index stay
// small when they cross the server/client boundary.
export function getBlogPostSummaries() {
  return getAllBlogPosts().map(({ content, headings, ...summary }) => summary);
}

// Posts are newest first, so the "older" neighbour sits later in the list.
export function getAdjacentPosts(slug) {
  const posts = getAllBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { newer: null, older: null };
  }

  const toLink = (post) =>
    post ? { slug: post.slug, title: post.title, dateLabel: post.dateLabel } : null;

  return {
    newer: toLink(posts[index - 1]),
    older: toLink(posts[index + 1]),
  };
}

// Writes public/feed.xml before each build. The site is a static export, so
// the feed is generated as a plain file rather than served by a route.

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { stripMarkdown } from "../src/lib/markdown.mjs";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "src", "blogmd");
const OUTPUT_FILE = path.join(ROOT, "public", "feed.xml");

const SITE_URL = "https://swapnilchauhan.com";
const SITE_TITLE = "Swapnil Chauhan";
const SITE_DESCRIPTION =
  "Essays, engineering notes, and programming write-ups by Swapnil Chauhan.";
const AUTHOR = "Swapnil Chauhan";

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

// A post missing its slug or date would otherwise reach subscribers as a link
// to /blog/undefined/ with an Invalid Date on it. Fail the build instead.
function readPost(filename) {
  const source = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(source);

  for (const field of ["slug", "title", "date"]) {
    if (!data[field]) {
      throw new Error(`${filename}: frontmatter is missing "${field}".`);
    }
  }

  const date = new Date(data.date);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${filename}: "${data.date}" is not a date.`);
  }

  return {
    slug: data.slug,
    title: data.title,
    date,
    description:
      data.description ||
      data.excerpt ||
      `${stripMarkdown(content).slice(0, 240).trimEnd()}...`,
  };
}

function readPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .map(readPost)
    .sort((left, right) => right.date - left.date);
}

function renderItem(post) {
  const url = `${SITE_URL}/blog/${post.slug}/`;

  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
}

// Both dates track the newest post rather than the wall clock. The feed is
// committed to the repo, so a build-time stamp would rewrite the file on every
// build and leave a dirty tree behind.
function renderFeed(posts) {
  const latest = posts[0]?.date ?? new Date(0);

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/blog/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <managingEditor>mail@swapnilchauhan.com (${escapeXml(AUTHOR)})</managingEditor>
    <pubDate>${latest.toUTCString()}</pubDate>
    <lastBuildDate>${latest.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map(renderItem).join("\n")}
  </channel>
</rss>
`;
}

const posts = readPosts();
fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, renderFeed(posts), "utf8");

console.log(`Wrote feed.xml with ${posts.length} posts.`);

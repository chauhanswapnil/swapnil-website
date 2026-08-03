// Writes public/feed.xml before each build. The site is a static export, so
// the feed is generated as a plain file rather than served by a route.

import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

function readPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const source = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data, content } = matter(source);

      return {
        slug: data.slug,
        title: data.title,
        date: new Date(data.date),
        description:
          data.description ||
          data.excerpt ||
          `${stripMarkdown(content).slice(0, 240).trimEnd()}...`,
      };
    })
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

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "src", "blogmd");
const OUTPUT_DIR = path.join(ROOT, "public", "og");
const BLOG_OUTPUT_DIR = path.join(OUTPUT_DIR, "blog");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(text, maxCharsPerLine = 26, maxLines = 3) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxCharsPerLine) {
      current = next;
      continue;
    }
    if (current) {
      lines.push(current);
    }
    current = word;
    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (lines.length < maxLines && current) {
    lines.push(current);
  }

  if (words.join(" ").length > lines.join(" ").length && lines.length > 0) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[. ]+$/, "")}...`;
  }

  return lines;
}

function renderSvg({ eyebrow, title, description }) {
  const titleLines = wrapText(title, 28, 3);
  const descriptionLines = wrapText(description, 52, 2);

  const titleText = titleLines
    .map(
      (line, index) =>
        `<tspan x="88" dy="${index === 0 ? 0 : 74}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  const descriptionText = descriptionLines
    .map(
      (line, index) =>
        `<tspan x="88" dy="${index === 0 ? 0 : 38}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1E2732"/>
  <rect x="40" y="40" width="1120" height="550" rx="28" fill="#232D3A"/>
  <circle cx="1045" cy="132" r="112" fill="#87CEEB" fill-opacity="0.09"/>
  <circle cx="1095" cy="508" r="154" fill="#87CEEB" fill-opacity="0.06"/>
  <rect x="88" y="112" width="146" height="38" rx="19" fill="#161B22"/>
  <text x="161" y="136" text-anchor="middle" fill="#87CEEB" font-family="Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="1.8">${escapeXml(eyebrow.toUpperCase())}</text>
  <text x="88" y="232" fill="#FEFEFE" font-family="Arial, sans-serif" font-size="60" font-weight="700">${titleText}</text>
  <text x="88" y="452" fill="#D5DBE2" font-family="Arial, sans-serif" font-size="28" font-weight="400">${descriptionText}</text>
  <line x1="88" y1="522" x2="260" y2="522" stroke="#87CEEB" stroke-width="4" stroke-linecap="round"/>
  <text x="88" y="566" fill="#FEFEFE" font-family="Arial, sans-serif" font-size="28" font-weight="600">Swapnil Chauhan</text>
</svg>`;
}

function writeSvg(relativePath, config) {
  const filePath = path.join(OUTPUT_DIR, relativePath);
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, renderSvg(config), "utf8");
}

function readPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const source = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data } = matter(source);
      return data;
    });
}

ensureDir(OUTPUT_DIR);
ensureDir(BLOG_OUTPUT_DIR);

writeSvg("site.svg", {
  eyebrow: "Site",
  title: "Swapnil Chauhan",
  description:
    "Backend software engineer writing about programming languages, engineering, and things worth learning.",
});

writeSvg("blog.svg", {
  eyebrow: "Blog",
  title: "Notes on engineering, learning, and life",
  description:
    "Essays, engineering notes, and programming write-ups by Swapnil Chauhan.",
});

writeSvg("projects.svg", {
  eyebrow: "Projects",
  title: "Some of the things I have built",
  description:
    "A collection of interpreters, tools, experiments, and write-ups.",
});

writeSvg("playground.svg", {
  eyebrow: "Playground",
  title: "Lox Playground",
  description:
    "An online playground for Java implementation of the Lox language.",
});

for (const post of readPosts()) {
  writeSvg(`blog/${post.slug}.svg`, {
    eyebrow: "Blog Post",
    title: post.title,
    description: post.description,
  });
}

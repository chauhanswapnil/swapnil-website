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

function readPostFromFile(filename) {
  const fullPath = path.join(BLOG_POSTS_DIRECTORY, filename);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);
  const dateLabel = formatDate(data.date);
  const excerpt = data.excerpt || `${stripMarkdown(content).slice(0, 220).trimEnd()}...`;

  return {
    slug: data.slug,
    title: data.title,
    date: data.date,
    dateLabel,
    description: data.description,
    excerpt,
    featured: data.featured ?? false,
    tags: data.tags ?? [],
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

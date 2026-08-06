import "server-only";

import { getBlogPostSummaries } from "./blogs";
import { featuredProjects } from "./projects";
import { site } from "./site";

const STATIC_PAGES = [
  {
    id: "page-home",
    kind: "page",
    title: "Home",
    subtitle: "The front page",
    href: "/",
    keywords: ["home", "about", "start"],
  },
  {
    id: "page-blog",
    kind: "page",
    title: "Blog",
    subtitle: "Every post, newest first",
    href: "/blog",
    keywords: ["writing", "posts", "essays", "archive"],
  },
  {
    id: "page-projects",
    kind: "page",
    title: "Projects",
    subtitle: "Interpreters, emulators, and experiments",
    href: "/projects",
    keywords: ["work", "code", "github", "built"],
  },
  {
    id: "page-playground",
    kind: "page",
    title: "Lox Playground",
    subtitle: "Run Lox against the Java interpreter",
    href: "/playground",
    keywords: ["lox", "repl", "interpreter", "editor", "run"],
  },
];

const LINKS = [
  {
    id: "link-github",
    kind: "link",
    title: "GitHub",
    subtitle: "chauhanswapnil",
    href: site.githubUrl,
    external: true,
    keywords: ["source", "repos", "code"],
  },
  {
    id: "link-x",
    kind: "link",
    title: "X",
    subtitle: "@swapstar",
    href: site.xUrl,
    external: true,
    keywords: ["twitter", "social"],
  },
  {
    id: "link-linkedin",
    kind: "link",
    title: "LinkedIn",
    subtitle: "chauhanswapnil",
    href: site.linkedinUrl,
    external: true,
    keywords: ["work", "cv", "resume"],
  },
  {
    id: "link-email",
    kind: "link",
    title: "Email",
    subtitle: site.email,
    href: `mailto:${site.email}`,
    external: true,
    keywords: ["contact", "mail", "hire", "say hello"],
  },
];

// One flat list the palette can search. Built once at build time and
// handed to the client, so there is nothing to fetch at runtime.
export function buildSearchIndex() {
  const posts = getBlogPostSummaries().map((post) => ({
    id: `post-${post.slug}`,
    kind: "post",
    title: post.title,
    subtitle: `${post.dateLabel} · ${post.readingMinutes} min read`,
    href: `/blog/${post.slug}`,
    keywords: [...post.tags, post.excerpt.slice(0, 140)],
  }));

  const projects = featuredProjects.map((project) => ({
    id: `project-${project.slug}`,
    kind: "project",
    title: project.title,
    subtitle: project.hook,
    // Projects with nowhere of their own to point at fall back to the
    // projects page rather than becoming a dead row.
    href: project.demoUrl || project.blogUrl || project.githubUrl || "/projects",
    external: Boolean(
      project.githubUrl && !project.demoUrl && !project.blogUrl,
    ),
    keywords: project.tech,
  }));

  return [...STATIC_PAGES, ...posts, ...projects, ...LINKS];
}

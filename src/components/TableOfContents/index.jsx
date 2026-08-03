"use client";

import { useEffect, useState } from "react";

import styles from "./index.module.css";

// Sticky contents list with a scroll spy. The heading ids come from the
// same slugifier the article body uses, so the anchors always line up.
export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) {
      return undefined;
    }

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean);

    if (elements.length === 0) {
      return undefined;
    }

    function measure() {
      // The heading whose top has most recently passed under the navbar.
      const cutoff = 140;
      let current = elements[0];

      for (const element of elements) {
        if (element.getBoundingClientRect().top <= cutoff) {
          current = element;
        }
      }

      // At the very bottom the last heading wins, even if it never crossed
      // the cutoff, so short trailing sections still highlight.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 4;

      setActiveId(atBottom ? elements[elements.length - 1].id : current.id);
    }

    let frame = null;
    function onScroll() {
      if (frame === null) {
        frame = window.requestAnimationFrame(() => {
          frame = null;
          measure();
        });
      }
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [headings]);

  if (headings.length < 3) {
    return null;
  }

  return (
    <nav className={styles.toc} aria-labelledby="toc-heading">
      <p id="toc-heading" className={styles.tocTitle}>
        On this page
      </p>
      <ul className={styles.list}>
        {headings.map((heading) => (
          <li key={heading.id} className={styles[`depth${heading.depth || 0}`]}>
            <a
              href={`#${heading.id}`}
              className={`${styles.link} ${
                heading.id === activeId ? styles.linkActive : ""
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

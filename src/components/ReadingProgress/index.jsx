"use client";

import { useEffect, useState } from "react";

import styles from "./index.module.css";

// A hairline under the navbar showing how far through the article you are.
// Measured against the article element, so the footer does not count as
// unread text.
export default function ReadingProgress({ targetId }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = null;

    function measure() {
      frame = null;

      const article = document.getElementById(targetId);
      if (!article) {
        return;
      }

      const { top, height } = article.getBoundingClientRect();
      const readable = height - window.innerHeight;

      if (readable <= 0) {
        setProgress(1);
        return;
      }

      setProgress(Math.min(1, Math.max(0, -top / readable)));
    }

    function onScroll() {
      if (frame === null) {
        frame = window.requestAnimationFrame(measure);
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
  }, [targetId]);

  return (
    <div className={styles.track} aria-hidden="true">
      <div
        className={styles.bar}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

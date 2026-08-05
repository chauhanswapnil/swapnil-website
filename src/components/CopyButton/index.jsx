"use client";

import { useEffect, useState } from "react";

import useIsMac from "../../lib/useIsMac";
import styles from "./index.module.css";

// Kept apart from CodeBlock so the syntax highlighter can stay on the
// server and out of the page's JavaScript bundle.
export default function CopyButton({ code }) {
  const [label, setLabel] = useState("Copy");
  const isMac = useIsMac();

  useEffect(() => {
    if (label === "Copy") {
      return undefined;
    }
    const timer = setTimeout(() => setLabel("Copy"), 1800);
    return () => clearTimeout(timer);
  }, [label]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setLabel("Copied");
    } catch {
      setLabel(isMac ? "Press ⌘C" : "Press Ctrl+C");
    }
  }

  return (
    <button type="button" className={styles.copy} onClick={copy}>
      {label}
    </button>
  );
}

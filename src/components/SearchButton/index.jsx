"use client";

import useIsMac from "../../lib/useIsMac";
import styles from "./index.module.css";

// The visible half of the command palette. The palette itself lives in the
// layout and listens for this event, so the two can sit anywhere.
export default function SearchButton() {
  const modifier = useIsMac() ? "⌘" : "Ctrl";

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
      aria-label="Search this site"
      title="Search this site"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span className={styles.label}>Search</span>
      <kbd className={styles.shortcut}>{modifier}K</kbd>
    </button>
  );
}

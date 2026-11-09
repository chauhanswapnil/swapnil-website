"use client";

import { useEffect, useState } from "react";

import styles from "./agentcam.module.css";

export default function CopyCommand({ code }) {
  const [label, setLabel] = useState("Copy");

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
      setLabel("Select and copy");
    }
  }

  return (
    <button type="button" className={styles.copyButton} onClick={copy}>
      <span aria-live="polite">{label}</span>
    </button>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import styles from "./index.module.css";

const Documentation = dynamic(() => import("../Documentation"), {
  loading: () => <p className={styles.loading}>Loading examples...</p>,
});

export default function PlaygroundDocsGate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.section}>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => {
          setIsOpen((current) => !current);
        }}
        aria-expanded={isOpen}
      >
        {isOpen ? "Hide documentation" : "Show documentation"}
      </button>
      {isOpen ? <Documentation /> : null}
    </section>
  );
}

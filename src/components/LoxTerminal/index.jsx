"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "./index.module.css";

const KEYWORDS = new Set([
  "and",
  "class",
  "else",
  "false",
  "for",
  "fun",
  "if",
  "nil",
  "or",
  "print",
  "return",
  "super",
  "this",
  "true",
  "var",
  "while",
]);

// A display-only tokenizer. It colours the sample in the terminal; the real
// parsing happens on the Lox server behind the playground.
function tokenizeForDisplay(source) {
  const pattern =
    /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([^\s])/g;

  const tokens = [];
  let match;

  while ((match = pattern.exec(source)) !== null) {
    const [text, comment, string, number, word] = match;

    if (comment) {
      tokens.push({ text, kind: "comment" });
    } else if (string) {
      tokens.push({ text, kind: "string" });
    } else if (number) {
      tokens.push({ text, kind: "number" });
    } else if (word) {
      tokens.push({ text, kind: KEYWORDS.has(word) ? "keyword" : "ident" });
    } else {
      tokens.push({ text, kind: "plain" });
    }
  }

  return tokens;
}

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return prefersReduced;
}

export default function LoxTerminal({ program, href = "/playground" }) {
  const tokens = useMemo(() => tokenizeForDisplay(program.source), [program.source]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [typed, setTyped] = useState(0);
  const [outputShown, setOutputShown] = useState(0);
  const [runId, setRunId] = useState(0);

  const total = program.source.length;
  const finishedTyping = typed >= total;

  useEffect(() => {
    if (prefersReducedMotion) {
      setTyped(total);
      setOutputShown(program.output.length);
      return undefined;
    }

    setTyped(0);
    setOutputShown(0);

    let frame = 0;
    let position = 0;

    const timer = setInterval(() => {
      frame += 1;
      // Type in small bursts so it reads like someone at a keyboard rather
      // than a character-per-frame ticker.
      position = Math.min(total, position + (frame % 3 === 0 ? 3 : 2));
      setTyped(position);

      // Stop at the end of the program. React bails out of the re-render once
      // the value stops changing, so without this the interval would go on
      // firing for as long as the page stayed open.
      if (position >= total) {
        clearInterval(timer);
      }
    }, 26);

    return () => clearInterval(timer);
  }, [prefersReducedMotion, total, program.output.length, runId]);

  useEffect(() => {
    if (!finishedTyping || prefersReducedMotion) {
      return undefined;
    }

    const timers = program.output.map((_, index) =>
      setTimeout(() => setOutputShown(index + 1), 320 + index * 260),
    );

    return () => timers.forEach(clearTimeout);
  }, [finishedTyping, prefersReducedMotion, program.output, runId]);

  // Render only the characters typed so far, keeping each token's colour.
  let remaining = typed;
  const visible = [];

  for (const token of tokens) {
    if (remaining <= 0) {
      break;
    }
    const slice = token.text.slice(0, remaining);
    remaining -= slice.length;
    visible.push({ text: slice, kind: token.kind });
  }

  const replay = () => {
    setTyped(0);
    setOutputShown(0);
    setRunId((current) => current + 1);
  };

  return (
    <figure className={styles.terminal}>
      <figcaption className={styles.bar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.filename}>{program.filename}</span>
        <button
          type="button"
          className={styles.replay}
          onClick={replay}
          disabled={!finishedTyping}
        >
          Replay
        </button>
      </figcaption>

      <div className={styles.body}>
        <pre className={styles.code}>
          <code>
            {visible.map((token, index) => (
              <span key={index} className={styles[token.kind]}>
                {token.text}
              </span>
            ))}
            {!finishedTyping && !prefersReducedMotion ? (
              <span className={styles.caret} aria-hidden="true" />
            ) : null}
          </code>
        </pre>

        <div className={styles.output} aria-live="off">
          {/* Keyed by position, not by text: a program that prints the same
              line twice is ordinary, and duplicate keys are not. */}
          {program.output.slice(0, outputShown).map((line, index) => (
            <p key={index} className={styles.outputLine}>
              <span className={styles.arrow} aria-hidden="true">
                ›
              </span>
              {line}
            </p>
          ))}
        </div>
      </div>

      <a className={styles.cta} href={href}>
        Run your own Lox →
      </a>
    </figure>
  );
}

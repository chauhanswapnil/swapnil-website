"use client";

import CodeEditor from "@uiw/react-textarea-code-editor";
import { useCallback, useEffect, useState } from "react";

import { defaultExample, loxExamples } from "../../content/loxExamples";
import { trackEvent } from "../../lib/analytics";
import TrackedLink from "../TrackedLink";
import styles from "./index.module.css";

const LOX_API = "https://loxapi.swapnilchauhan.com/loxJava";
const SOURCE_REPO = "https://github.com/chauhanswapnil/Slox";

// Programs travel in the URL fragment so a link carries the code with it
// and nothing has to be stored anywhere.
function encodeProgram(code) {
  return btoa(unescape(encodeURIComponent(code)));
}

function decodeProgram(encoded) {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return null;
  }
}

export default function Editor() {
  const [code, setCode] = useState(defaultExample.code);
  const [activeExample, setActiveExample] = useState(defaultExample.id);
  const [output, setOutput] = useState(null);
  const [status, setStatus] = useState("idle");
  const [shareLabel, setShareLabel] = useState("Copy link");
  const [modifier, setModifier] = useState("⌘");

  useEffect(() => {
    if (!/Mac|iPhone|iPad/.test(window.navigator.platform)) {
      setModifier("Ctrl");
    }

    if (window.location.hash.startsWith("#code=")) {
      const decoded = decodeProgram(window.location.hash.slice("#code=".length));
      if (decoded) {
        setCode(decoded);
        setActiveExample(null);
      }
    }
  }, []);

  const runCode = useCallback(async () => {
    setStatus("running");
    setOutput(null);
    trackEvent("playground_run", { example: activeExample || "custom" });

    try {
      const response = await fetch(LOX_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const result = await response.text();

      if (!response.ok) {
        setOutput(
          result.trim() ||
            `The interpreter server answered with status ${response.status}.`,
        );
        setStatus("error");
        return;
      }

      setOutput(result.trim() || "The program finished without printing anything.");
      setStatus("success");
    } catch {
      // A rejected fetch means the request never landed: the server is down,
      // or something on the network blocked it.
      setStatus("offline");
      setOutput(null);
    }
  }, [activeExample, code]);

  // Cmd/Ctrl+Enter runs from anywhere on the page, including the editor.
  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        runCode();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [runCode]);

  function loadExample(example) {
    setCode(example.code);
    setActiveExample(example.id);
    setOutput(null);
    setStatus("idle");
    window.history.replaceState(null, "", window.location.pathname);
    trackEvent("playground_example_load", { example: example.id });
  }

  async function copyShareLink() {
    const url = `${window.location.origin}${window.location.pathname}#code=${encodeProgram(code)}`;

    try {
      await navigator.clipboard.writeText(url);
      window.history.replaceState(null, "", url);
      setShareLabel("Copied");
      trackEvent("playground_share", {});
    } catch {
      setShareLabel("Could not copy");
    }

    setTimeout(() => setShareLabel("Copy link"), 1800);
  }

  const failed = status === "error" || status === "offline";

  return (
    <section className={styles.playground} aria-labelledby="editor-heading">
      <h2 id="editor-heading" className="srOnly">
        Lox editor
      </h2>

      <div className={styles.examples} role="group" aria-label="Example programs">
        <span className={styles.examplesLabel}>Examples</span>
        {loxExamples.map((example) => (
          <button
            key={example.id}
            type="button"
            className={`${styles.example} ${
              example.id === activeExample ? styles.exampleActive : ""
            }`}
            onClick={() => loadExample(example)}
            title={example.description}
          >
            {example.label}
          </button>
        ))}
      </div>

      <div className={styles.panes}>
        <div className={styles.pane}>
          <div className={styles.paneBar}>
            <span className={styles.paneTitle}>main.lox</span>
            <span className={styles.paneHint}>{modifier} + Enter to run</span>
          </div>
          <div className={styles.editorScroll}>
            <CodeEditor
              value={code}
              language="java"
              placeholder="Write some Lox here."
              onChange={(event) => {
                setCode(event.target.value);
                setActiveExample(null);
              }}
              padding={16}
              className={styles.editor}
              minHeight={420}
              aria-label="Lox source code"
              spellCheck={false}
            />
          </div>
        </div>

        <div className={styles.pane}>
          <div className={styles.paneBar}>
            <span className={styles.paneTitle}>Output</span>
            <span
              className={`${styles.statusDot} ${styles[`dot_${status}`]}`}
              aria-hidden="true"
            />
          </div>
          <div
            className={styles.outputArea}
            role={failed ? "alert" : "status"}
            aria-live={failed ? "assertive" : "polite"}
          >
            {status === "idle" ? (
              <p className={styles.placeholder}>
                Press Run to send this program to the interpreter.
              </p>
            ) : null}

            {status === "running" ? (
              <p className={styles.placeholder}>Running…</p>
            ) : null}

            {status === "success" ? (
              <pre className={styles.stream}>{output}</pre>
            ) : null}

            {status === "error" ? (
              <>
                <p className={styles.errorTitle}>The interpreter rejected this.</p>
                <pre className={`${styles.stream} ${styles.errorStream}`}>
                  {output}
                </pre>
              </>
            ) : null}

            {status === "offline" ? (
              <div className={styles.offline}>
                <p className={styles.errorTitle}>
                  The interpreter server is not answering.
                </p>
                <p className={styles.offlineBody}>
                  This playground sends your code to a Java service that runs the
                  Lox interpreter, and that service is not reachable right now.
                  Your code is safe — use Copy link to keep it and try again
                  later.
                </p>
                <TrackedLink
                  href={SOURCE_REPO}
                  external
                  className="accentLink"
                  eventName="playground_link_click"
                  eventParams={{
                    location: "playground_offline",
                    link_type: "github",
                    project_slug: "slox",
                    target_url: SOURCE_REPO,
                  }}
                >
                  Read the interpreter source instead →
                </TrackedLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <button
          id="run-code"
          type="button"
          onClick={runCode}
          className={styles.runButton}
          disabled={status === "running"}
        >
          {status === "running" ? "Running…" : "Run"}
        </button>
        <button
          type="button"
          onClick={copyShareLink}
          className={styles.secondaryButton}
        >
          {shareLabel}
        </button>
        <TrackedLink
          href={SOURCE_REPO}
          external
          className={styles.secondaryButton}
          eventName="playground_link_click"
          eventParams={{
            location: "playground",
            link_type: "github",
            project_slug: "slox",
            target_url: SOURCE_REPO,
          }}
        >
          View source
        </TrackedLink>
      </div>
    </section>
  );
}

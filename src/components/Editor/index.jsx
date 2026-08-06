"use client";

import CodeEditor from "@uiw/react-textarea-code-editor";
import { useCallback, useEffect, useRef, useState } from "react";

import { defaultExample, loxExamples } from "../../content/loxExamples";
import { trackEvent } from "../../lib/analytics";
import useIsMac from "../../lib/useIsMac";
import TrackedLink from "../TrackedLink";
import styles from "./index.module.css";

const LOX_API = "https://loxapi.swapnilchauhan.com/loxJava";
const SOURCE_REPO = "https://github.com/chauhanswapnil/Slox";

// Give up on the interpreter after this long. Without it a server that accepts
// the connection and then goes quiet leaves the page stuck on "Running…" with
// no way out but a reload.
const RUN_TIMEOUT_MS = 15000;

// Browsers and servers start dropping URLs somewhere above 2000 characters, and
// base64 adds a third on top of the source. Refuse to build a link that would
// arrive truncated — a truncated program is worse than no link.
const MAX_SHARE_URL = 2000;

// Programs travel in the URL fragment so a link carries the code with it
// and nothing has to be stored anywhere.
function encodeProgram(code) {
  const bytes = new TextEncoder().encode(code);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function decodeProgram(encoded) {
  try {
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
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
  const isMac = useIsMac();
  const modifier = isMac ? "⌘" : "Ctrl";

  const running = status === "running";
  const shareTimer = useRef(null);

  useEffect(() => {
    if (window.location.hash.startsWith("#code=")) {
      const decoded = decodeProgram(window.location.hash.slice("#code=".length));
      if (decoded) {
        setCode(decoded);
        setActiveExample(null);
      }
    }
  }, []);

  useEffect(() => () => clearTimeout(shareTimer.current), []);

  const runCode = useCallback(async () => {
    setStatus("running");
    setOutput(null);
    trackEvent("playground_run", { example: activeExample || "custom" });

    try {
      const response = await fetch(LOX_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        signal: AbortSignal.timeout(RUN_TIMEOUT_MS),
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
      // Either the request never landed — server down, network blocked it — or
      // it landed and the answer never came and the timeout fired. Both leave
      // the reader in the same place, so both read the same way.
      setStatus("offline");
      setOutput(null);
    }
  }, [activeExample, code]);

  // Cmd/Ctrl+Enter runs from anywhere on the page, including the editor. The
  // Run button is disabled while a program is in flight; the shortcut has to
  // check for itself, or holding the keys queues up overlapping requests and
  // whichever answers last wins the output pane.
  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        if (!running) {
          runCode();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [runCode, running]);

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

    clearTimeout(shareTimer.current);

    if (url.length > MAX_SHARE_URL) {
      setShareLabel("Program too long to link");
    } else {
      try {
        await navigator.clipboard.writeText(url);
        window.history.replaceState(null, "", url);
        setShareLabel("Copied");
        trackEvent("playground_share", {});
      } catch {
        setShareLabel("Could not copy");
      }
    }

    shareTimer.current = setTimeout(() => setShareLabel("Copy link"), 2400);
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

            {running ? <p className={styles.placeholder}>Running…</p> : null}

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
          disabled={running}
        >
          {running ? "Running…" : "Run"}
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

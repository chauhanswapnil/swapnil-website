"use client";

import { useState } from "react";
import TrackedLink from "../TrackedLink";

import styles from "./index.module.css";

export default function Editor() {
  const [code, setCode] = useState(`// Hello, Welcome to the Lox Playground
// Use this space to play around with the language.


print "Hi, Thank you for coming to my site.";`);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      const response = await fetch("https://server.swapnilchauhan.com/loxJava", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const out = await response.text();
      setOutput(out);
    } catch {
      setOutput("Unable to run code right now. Please try again in a moment.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="text-center">
      <div className={styles.editorContainer}>
        <label className={styles.editorLabel} htmlFor="lox-editor">
          Lox editor
        </label>
        <textarea
          id="lox-editor"
          value={code}
          placeholder="Please enter Lox code."
          onChange={(event) => {
            setCode(event.target.value);
          }}
          className={styles.editor}
          spellCheck="false"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>
      <div className={styles.buttonsContainer}>
        <button onClick={runCode} className={styles.runButton} disabled={isRunning}>
          {isRunning ? "Running..." : "Run"}
        </button>
        <TrackedLink
          href="https://www.github.com/chauhanswapnil/Slox"
          external
          className={styles.runButton}
          eventName="playground_link_click"
          eventParams={{
            location: "playground",
            link_type: "github",
            project_slug: "slox",
            target_url: "https://www.github.com/chauhanswapnil/Slox",
          }}
        >
          View Source
        </TrackedLink>
      </div>
      {output ? <pre className={styles.outputArea}>{output}</pre> : null}
    </div>
  );
}

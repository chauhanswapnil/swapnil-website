"use client";

import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";
import TrackedLink from "../TrackedLink";

import styles from "./index.module.css";

export default function Editor() {
  const [code, setCode] = useState(`// Hello, Welcome to the Lox Playground
// Use this space to play around with the language.


print "Hi, Thank you for coming to my site.";`);
  const [output, setOutput] = useState(null);
  const [status, setStatus] = useState("idle");

  const runCode = async () => {
    setStatus("running");
    setOutput(null);
    const body = {
      code: `${code}`,
    };
    try {
      const response = await fetch("https://loxapi.swapnilchauhan.com/loxJava", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.text();

      if (!response.ok) {
        throw new Error(result || `The server returned status ${response.status}.`);
      }

      setOutput(result || "The program finished without producing output.");
      setStatus("success");
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "The program could not be run.");
      setStatus("error");
    }
  };

  return (
    <section className="text-center" aria-labelledby="editor-heading">
      <h2 id="editor-heading" className={styles.editorHeading}>Try Lox code</h2>
      <p id="editor-instructions" className={styles.instructions}>
        Enter Lox code below, then use the Run button. Tab moves to Run; Shift+Tab moves backward.
      </p>
      <div className={styles.editorContainer}>
        <CodeEditor
          value={code}
          language="java"
          placeholder="Please enter Lox code."
          onChange={(evn) => {
            setCode(evn.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Tab" && !event.shiftKey) {
              event.preventDefault();
              document.getElementById("run-code")?.focus();
              return false;
            }
          }}
          padding={15}
          className={styles.editor}
          minHeight={500}
          aria-labelledby="editor-heading"
          aria-describedby="editor-instructions"
          spellCheck={false}
        />
      </div>
      <div className={styles.buttonsContainer}>
        <button id="run-code" type="button" onClick={runCode} className={styles.runButton} disabled={status === "running"}>
          {status === "running" ? "Running…" : "Run"}
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
      <section className={styles.results} aria-labelledby="output-heading">
        <h2 id="output-heading" className={styles.outputHeading}>Run results</h2>
        <div
          className={`${styles.outputArea} ${status === "error" ? styles.error : ""}`}
          role={status === "error" ? "alert" : "status"}
          aria-live={status === "error" ? "assertive" : "polite"}
          aria-atomic="true"
        >
          {status === "idle" && "Run the code to see its output here."}
          {status === "running" && "Running code…"}
          {status === "success" && <><strong>Program output:</strong>{"\n"}{output}</>}
          {status === "error" && <><strong>Could not run code:</strong>{"\n"}{output}</>}
        </div>
      </section>
    </section>
  );
}

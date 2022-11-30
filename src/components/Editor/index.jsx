import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";

import styles from "./index.module.css";

export default function Editor() {
  const [code, setCode] = useState(`// Hello, Welcome to the Lox Playground
// Use this space to play around with the language.


print "Hi, Thank you for coming to my site.";`);
  const [output, setOutput] = useState(null);

  const runCode = () => {
    const body = {
      code: `${code}`,
    };
    fetch("https://server.swapnilchauhan.com/loxJava", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        // setOutput(res.text.toString())
        res.text().then((out) => {
          console.log(out);
          setOutput(out);
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="text-center">
      <div className={styles.editorContainer}>
        <CodeEditor
          value={code}
          language="java"
          placeholder="Please enter Lox code."
          onChange={(evn) => {
            setCode(evn.target.value);
          }}
          padding={15}
          className={styles.editor}
          minHeight={500}
        />
      </div>
      <div className={styles.buttonsContainer}>
        <button onClick={runCode} className={styles.runButton}>
          Run
        </button>
        <a target="_blank" href="https://www.github.com/chauhanswapnil/Slox" rel="noreferrer">
          <button className={styles.runButton}>View Source</button>
        </a>
      </div>
      {output ? <p className={styles.outputArea}>{output}</p> : <></>}
    </div>
  );
}

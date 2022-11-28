import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";
import { Button } from "react-bootstrap";

import styles from "./index.module.css";

export default function Editor() {
  const [code, setCode] = useState(`// Printing numbers from 1 to 10
for (var i = 1; i <= 10; i=i+1) {
    print i;
}`);
  const [output, setOutput] = useState(null);

  const runCode = () => {
    const body = {
      code: `${code}`,
    };

    fetch("http://server.swapnilchauhan.com/loxJava", {
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
          minHeight={250}
        />
      </div>
      <Button onClick={runCode}>Run Code</Button>
      {output ? <p style={{ whiteSpace: "pre" }}>{output}</p> : <></>}
    </div>
  );
}

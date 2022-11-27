import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";

import styles from "./index.css";

export default function Editor() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  return (
    <div className={styles.editorContainer}>
      <CodeEditor
        value={code}
        language="java"
        placeholder="Please enter JS code."
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        className={styles.editor}
      />
    </div>
  );
}

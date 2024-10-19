import CodeEditor from "@uiw/react-textarea-code-editor";

import styles from "./index.module.css";

export default function DocsEditor({ code }) {
  return (
    <div>
      <CodeEditor
        value={code}
        language="java"
        // placeholder="Please enter Lox code."
        padding={15}
        className={styles.editor}
        minHeight={200}
        disabled={true}
      />
    </div>
  );
}

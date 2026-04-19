"use client";

import CodeEditor from "@uiw/react-textarea-code-editor";

import styles from "./index.module.css";

export default function DocsEditor({ code }) {
  const lineCount = code.split("\n").length;
  const minHeight = Math.max(140, lineCount * 26 + 28);

  return (
    <div>
      <CodeEditor
        value={code}
        language="java"
        padding={12}
        className={styles.editor}
        minHeight={minHeight}
        disabled={true}
      />
    </div>
  );
}

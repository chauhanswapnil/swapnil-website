import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import CopyButton from "../CopyButton";
import styles from "./index.module.css";

// A server component on purpose: highlighting happens at build time, so the
// only JavaScript that reaches the reader is the copy button.
export default function CodeBlock({ language, code }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        {language ? <span className={styles.language}>{language}</span> : <span />}
        <CopyButton code={code} />
      </div>
      <SyntaxHighlighter
        customStyle={{
          margin: 0,
          borderRadius: "0 0 10px 10px",
          padding: "1.25rem",
        }}
        language={language}
        style={oneDark}
        PreTag="div"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

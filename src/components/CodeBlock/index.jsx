import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import CopyButton from "../CopyButton";
import styles from "./index.module.css";

// A server component on purpose: highlighting happens at build time, so the
// only JavaScript that reaches the reader is the copy button.
//
// useInlineStyles is off so the highlighter emits bare `token` class names and
// the colours come from the same --code* variables as the rest of the site.
// A baked-in theme could only be one of light or dark, and the site is both.
export default function CodeBlock({ language, code }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        {language ? <span className={styles.language}>{language}</span> : <span />}
        <CopyButton code={code} />
      </div>
      <SyntaxHighlighter
        language={language}
        useInlineStyles={false}
        className={styles.code}
        PreTag="div"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

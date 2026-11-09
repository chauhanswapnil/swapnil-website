import styles from "./agentcam.module.css";

// A plain browser window around a screenshot, with the local address agentcam
// serves on, so it reads as an app on your machine rather than a website.
export default function BrowserFrame({ path = "/", children, className = "" }) {
  return (
    <figure className={`${styles.browser} ${className}`}>
      <div className={styles.browserBar} aria-hidden="true">
        <span className={styles.browserDots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.browserUrl}>127.0.0.1:4747{path}</span>
      </div>
      <div className={styles.browserBody}>{children}</div>
    </figure>
  );
}

import ReactMarkdown from 'react-markdown';
import styles from "./index.module.css";
import { Link } from "react-router-dom/";

export default function BlogPreview({ date, title, previewText, linkText }) {
  return (
    <div className={styles.previewContainer}>
      <h6 className={styles.dateText}>{date}</h6>
      <h5 className={styles.blogTitle}>{title}</h5>
      <ReactMarkdown 
        className={styles.blogPreviewText} 
        children={previewText} 
        components={{
          a({ node, children, ...props }) {
          return (
            <a className={styles.blogLink} {...props}>
              {children}
            </a>
          );
          },
        }}
      />
      <Link to={linkText} style={{ color: "inherit" }} className={styles.blogReadMoreLink}>
        Read More
      </Link>
    </div>
  );
}

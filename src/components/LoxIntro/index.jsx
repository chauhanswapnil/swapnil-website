import styles from "./index.module.css";

export default function LoxIntro() {
  return (
    <header className={styles.introContainer}>
      <h1 className={styles.introHeading}>Lox Playground</h1>
      <h2 className={styles.introSubheading}>What is Lox?</h2>
      <p className={styles.introContent}>
        Lox is a programming language by Bob Nystrom written for the book Crafting Interpreters. It is an excellent book that teaches how to
        build lexers, parsers and interpreters. After reading the book and having implemented the interpreter for Lox in Java, I decided to
        make a playground for it which runs the code on the Java Interpreter for Lox hosted on a server.
      </p>
    </header>
  );
}

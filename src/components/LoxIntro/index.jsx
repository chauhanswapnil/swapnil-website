import TrackedLink from "../TrackedLink";
import styles from "./index.module.css";

const CRAFTING_INTERPRETERS = "https://craftinginterpreters.com/";

export default function LoxIntro() {
  return (
    <header className={styles.introContainer}>
      <p className={styles.eyebrow}>Playground</p>
      <h1 className={styles.introHeading}>Lox</h1>
      <p className={styles.introContent}>
        Lox is the language Bob Nystrom builds in{" "}
        <TrackedLink
          href={CRAFTING_INTERPRETERS}
          external
          className="accentLink"
          eventName="content_link_click"
          eventParams={{
            location: "playground",
            link_type: "external",
            target_url: CRAFTING_INTERPRETERS,
          }}
        >
          Crafting Interpreters
        </TrackedLink>
        , a book about writing lexers, parsers and interpreters. I worked
        through it and wrote my own interpreter for Lox in Java. Everything you
        run below is sent to that interpreter.
      </p>
    </header>
  );
}

import dynamic from "next/dynamic";

import LoxIntro from "../../src/components/LoxIntro";
import styles from "../../src/views/projects.module.css";

const Editor = dynamic(() => import("../../src/components/Editor"), {
  loading: () => <p className="softText pageShell">Loading playground editor...</p>,
});

const PlaygroundDocsGate = dynamic(
  () => import("../../src/components/PlaygroundDocsGate"),
  {
    loading: () => <p className="softText pageShell">Loading documentation...</p>,
  }
);

export const metadata = {
  title: "Lox Playground",
  description:
    "An online playground for Swapnil Chauhan's Java implementation of the Lox language from Crafting Interpreters.",
  alternates: {
    canonical: "/playground",
  },
  openGraph: {
    title: "Lox Playground | Swapnil Chauhan",
    description:
      "An online playground for Swapnil Chauhan's Java implementation of the Lox language from Crafting Interpreters.",
    url: "https://swapnilchauhan.com/playground",
    type: "website",
    images: [
      {
        url: "/og/playground.svg",
        width: 1200,
        height: 630,
        alt: "Lox Playground | Swapnil Chauhan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lox Playground | Swapnil Chauhan",
    description:
      "An online playground for Swapnil Chauhan's Java implementation of the Lox language from Crafting Interpreters.",
    images: ["/og/playground.svg"],
  },
};

export default function PlaygroundPage() {
  return (
    <div>
      <LoxIntro />
      <Editor />
      <section className={`pageShell ${styles.hero}`}>
        <p className="mutedText">Reference</p>
        <h2 className={styles.title}>Built-in language docs</h2>
        <p className={`${styles.description} softText`}>
          Open the examples when you need them, so the editor gets on screen first.
        </p>
      </section>
      <PlaygroundDocsGate />
    </div>
  );
}

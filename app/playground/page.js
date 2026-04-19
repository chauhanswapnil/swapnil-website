import Playground from "../../src/views/Playground";

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
  },
  twitter: {
    card: "summary",
    title: "Lox Playground | Swapnil Chauhan",
    description:
      "An online playground for Swapnil Chauhan's Java implementation of the Lox language from Crafting Interpreters.",
  },
};

export default function PlaygroundPage() {
  return <Playground />;
}

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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lox Playground | Swapnil Chauhan",
    description:
      "An online playground for Swapnil Chauhan's Java implementation of the Lox language from Crafting Interpreters.",
  },
};

export default function PlaygroundPage() {
  return <Playground />;
}

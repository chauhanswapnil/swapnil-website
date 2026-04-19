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
  return <Playground />;
}

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import Footer from "../src/components/Footer";
import Navbar from "../src/components/Navbar";

export const metadata = {
  metadataBase: new URL("https://swapnilchauhan.com"),
  applicationName: "Swapnil Chauhan",
  title: {
    default: "Swapnil Chauhan",
    template: "%s | Swapnil Chauhan",
  },
  description:
    "Backend software engineer writing about programming languages, engineering, and things worth learning.",
  keywords: [
    "Swapnil Chauhan",
    "backend engineer",
    "software engineer",
    "programming languages",
    "Rust",
    "Go",
    "blog",
  ],
  authors: [{ name: "Swapnil Chauhan", url: "https://swapnilchauhan.com" }],
  creator: "Swapnil Chauhan",
  publisher: "Swapnil Chauhan",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://swapnilchauhan.com",
    siteName: "Swapnil Chauhan",
    title: "Swapnil Chauhan",
    description:
      "Backend software engineer writing about programming languages, engineering, and things worth learning.",
    images: [
      {
        url: "/og/site.svg",
        width: 1200,
        height: 630,
        alt: "Swapnil Chauhan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swapnil Chauhan",
    description:
      "Backend software engineer writing about programming languages, engineering, and things worth learning.",
    images: ["/og/site.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var key='theme-preference';var stored=localStorage.getItem(key);var theme=(stored==='light'||stored==='dark')?stored:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.dataset.colorMode=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.dataset.colorMode='dark';document.documentElement.style.colorScheme='dark';}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

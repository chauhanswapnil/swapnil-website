import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import Footer from "../src/components/Footer";
import Navbar from "../src/components/Navbar";

export const metadata = {
  metadataBase: new URL("https://swapnilchauhan.com"),
  title: {
    default: "Swapnil Chauhan",
    template: "%s | Swapnil Chauhan",
  },
  description:
    "Backend software engineer writing about programming languages, engineering, and things worth learning slowly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

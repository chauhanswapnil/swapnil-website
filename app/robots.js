export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://swapnilchauhan.com/sitemap.xml",
    host: "https://swapnilchauhan.com",
  };
}

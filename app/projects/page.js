import Projects from "../../src/views/Projects";

export const metadata = {
  title: "Projects",
  description: "Interpreters, experiments, tools, and side projects by Swapnil Chauhan.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Swapnil Chauhan",
    description: "Interpreters, experiments, tools, and side projects by Swapnil Chauhan.",
    url: "https://swapnilchauhan.com/projects",
    type: "website",
    images: [
      {
        url: "/og/projects.svg",
        width: 1200,
        height: 630,
        alt: "Projects | Swapnil Chauhan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/projects.svg"],
  },
};

export default function ProjectsPage() {
  return <Projects />;
}

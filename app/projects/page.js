import Projects from "../../src/views/Projects";

export const metadata = {
  title: "Projects",
  description: "Selected projects and experiments by Swapnil Chauhan.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Swapnil Chauhan",
    description: "Selected projects and experiments by Swapnil Chauhan.",
    url: "https://swapnilchauhan.com/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <Projects />;
}

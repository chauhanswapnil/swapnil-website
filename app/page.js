import Home from "../src/views/Home";
import { getFeaturedBlogPosts } from "../src/content/blogs";

export const metadata = {
  title: "Swapnil Chauhan",
  description:
    "Backend software engineer writing about programming languages, engineering, and things worth learning slowly.",
};

export default function HomePage() {
  return <Home featuredPosts={getFeaturedBlogPosts(3)} />;
}

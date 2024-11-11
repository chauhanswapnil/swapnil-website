import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Footer from "./components/Footer";
// import Skills from "./pages/Skills/Skills";
import Playground from "./pages/Playground";
import Blog from "./pages/Blog";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/projects" element={<Projects />}></Route>
        <Route exact path="/blog/:title" element={<Blog />}></Route>
        {/* <Route exact path="/skills" element={<Skills />}></Route> */}
        <Route exact path="/playground" element={<Playground />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

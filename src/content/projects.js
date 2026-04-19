export const projectsPageCopy = {
  eyebrow: "Projects",
  title: "Some of the things I have built",
  description:
    "A collection of interpreters, tools, experiments, and write-ups.",
  githubUrl: "https://github.com/chauhanswapnil",
  linkedinUrl: "https://www.linkedin.com/in/chauhanswapnil/",
};

export const featuredProjects = [
  {
    slug: "vidpress",
    title: "VidPress",
    hook: "A video library viewer and compression app for iOS",
    summary:
      "A vibe coded iOS app built over a couple of day. It’s a video library viewer which allows compression of videos without losing metadata. Built to help clean up space in iPhone.",
    tech: ["iOS", "Video Compression"],
    githubUrl: "https://github.com/chauhanswapnil/VidPress",
  },
  {
    slug: "lox-playground",
    title: "Lox Playground",
    hook: "A browser playground for an interpreter I built after reading Crafting Interpreters.",
    summary:
      "An online REPL for my Java implementation of Lox, with an in-browser editor, runnable examples, and built-in language docs.",
    tech: ["Java", "Interpreters", "NodeJS", "Programming Languages"],
    githubUrl: "https://github.com/chauhanswapnil/Slox",
    demoUrl: "/playground",
  },
  {
    slug: "liurnia",
    title: "Liurnia",
    hook: "A custom C-like programming language I designed and am implementing from scratch in Rust.",
    summary:
      "Liurnia is a self-designed C-like programming language. The plan is for it to become a bytecode-compiled language with its own VM and shareable executables, and the current focus is finishing the parser.",
    tech: ["Rust", "Programming Languages", "Virtual Machines"],
    githubUrl: "https://github.com/chauhanswapnil/liurnia",
  },
  {
    slug: "rust-chip8",
    title: "CHIP-8 Emulator in Rust",
    hook: "A retro emulator project built to understand virtual machines, instruction cycles, and low-level graphics.",
    summary:
      "A Rust implementation of the CHIP-8 virtual machine, built as a systems-learning project around emulation, ROM execution, and classic interpreter design.",
    tech: ["Rust", "Emulation", "Virtual Machines", "Graphics"],
    githubUrl: "https://github.com/chauhanswapnil/rust-chip8",
  },
  {
    slug: "n-body-gravity-simulation",
    title: "N-Body Gravity Simulation",
    hook: "A simulation project for visualizing many-body motion under gravity.",
    summary:
      "A physics-flavored programming project focused on simulating gravitational interactions and visualizing motion over time. Made to learn C++.",
    tech: ["Simulation", "Physics", "Visualization", "C++"],
    githubUrl: "https://github.com/chauhanswapnil/n-body-gravity-simulation",
  },
  {
    slug: "clox",
    title: "Clox",
    hook: "A compiler and VM for Lox in C, following the original bytecode path from Crafting Interpreters.",
    summary:
      "An implementation of the bytecode compiler and virtual machine for Lox in C, built as a closer look at the lower-level execution model from the book.",
    tech: ["C", "Compilers", "Virtual Machines", "Bytecode"],
    githubUrl: "https://github.com/chauhanswapnil/clox",
  },
  {
    slug: "pickle-dns",
    title: "Pickle DNS",
    hook: "A recursive DNS resolver in Rust, built to understand the protocol from the packet level up.",
    summary:
      "A systems project focused on DNS packet structure, recursive resolution, and building a resolver by talking directly to the hierarchy.",
    tech: ["Rust", "Networking", "DNS", "Systems"],
    githubUrl: "https://github.com/chauhanswapnil/pickle-dns",
    blogUrl: "/blog/recursive-dns-resolver-part-1",
  },
  {
    slug: "slox",
    title: "Slox",
    hook: "A Java implementation of Lox built while working through Crafting Interpreters.",
    summary:
      "A tree-walk interpreter for Lox in Java, built as the foundation for the playground and as a way to understand interpreter design in detail.",
    tech: ["Java", "Interpreters", "Programming Languages"],
    githubUrl: "https://github.com/chauhanswapnil/Slox",
  },
  {
    slug: "personal-website",
    title: "swapnilchauhan.com",
    hook: "The site itself, rebuilt from an older React setup into a faster static Next app.",
    summary:
      "A personal site focused on writing, projects, and small interactive experiments",
    tech: ["NextJS", "ReactJS", "HTML", "CSS"],
    demoUrl: "/",
  },
  {
    slug: "titanic-disaster-nn",
    title: "Titanic Disaster Neural Network",
    hook: "A deep-learning project built around TensorFlow, Colab, and Kaggle submission flow.",
    summary:
      "A hands-on classification project that focused on model training, data prep, and an end-to-end workflow from notebook to Kaggle predictions.",
    tech: ["TensorFlow", "Python", "Kaggle"],
    githubUrl: "https://github.com/chauhanswapnil/titanic-disaster-nn",
    blogUrl:
      "/blog/titanic-disaster-neural-network-using-tensorflow-and-google-colab-and-uploading-it-to-kaggle",
  },
  {
    slug: "color-switch",
    title: "ColorSwitch",
    hook: "Simple iOS Game",
    summary:
      "A small game experiment inspired by the simple, addictive loop of mobile arcade games, built as an early project while learning iOS development",
    tech: ["Games", "Swift", "iOS"],
    githubUrl: "https://github.com/chauhanswapnil/ColorSwitch",
  },
  {
    slug: "simon-says-game",
    title: "Simon Says Game",
    hook: "Simon Says Game written in Swift and just UIKit.",
    summary:
      "An iOS game project based on the classic Simon memory loop",
    tech: ["Games", "Swift", "iOS"],
    githubUrl: "https://github.com/chauhanswapnil/SimonSaysGame",
  },
];

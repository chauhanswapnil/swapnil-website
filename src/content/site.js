// Site-wide facts, kept in one place so the hero, footer, palette and
// feed all read from the same source.

export const site = {
  name: "Swapnil Chauhan",
  url: "https://swapnilchauhan.com",
  email: "mail@swapnilchauhan.com",
  githubUrl: "https://github.com/chauhanswapnil",
  linkedinUrl: "https://www.linkedin.com/in/chauhanswapnil/",
  xUrl: "https://x.com/swapstar",
  tagline:
    "I build backends for a living and programming languages for fun. Rust, Go, and whatever else is worth learning next.",
};

// Short "what I'm up to" notes. Each one points at something on the site
// that backs it up.
export const currently = [
  {
    // Deliberately says what Orion is rather than what this week's task is —
    // a "currently adding X" line goes stale in days.
    label: "Building",
    title: "Orion",
    body: "An iOS running app built on Apple Health. It turns runs into routes, splits, streaks, records, and deep training analytics, all computed on the device. This is the one I’m building at the moment.",
    href: "/projects",
    linkLabel: "See the projects",
  },
  {
    label: "Moving",
    title: "London → the Bay Area",
    body: "After three years shipping software in London, I’m off to start a Master’s in Engineering Management.",
    href: "/blog/lessons-from-three-years-as-a-software-engineer-in-london",
    linkLabel: "Read the write-up",
  },
  {
    label: "Playing with",
    title: "Liurnia",
    body: "A C-like language of my own design, written in Rust. Working through the parser before the bytecode VM.",
    href: "https://github.com/chauhanswapnil/liurnia",
    external: true,
    linkLabel: "See it on GitHub",
  },
];

// The program the homepage terminal types out. The output below is what
// this program prints.
export const heroProgram = {
  filename: "greeting.lox",
  source: `class Language {
  init(name, why) {
    this.name = name;
    this.why = why;
  }

  pitch() {
    print this.name + " — " + this.why;
  }
}

var shelf = Language("Rust", "memory safety without a collector");
shelf.pitch();

var go = Language("Go", "simplicity that scales");
go.pitch();`,
  output: [
    "Rust — memory safety without a collector",
    "Go — simplicity that scales",
  ],
};

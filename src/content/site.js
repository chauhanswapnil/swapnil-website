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

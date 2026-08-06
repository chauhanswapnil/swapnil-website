import SearchButton from "../SearchButton";
import ThemeToggle from "../ThemeToggle";
import TrackedLink from "../TrackedLink";
import styles from "./index.module.css";

// The narrowest phones cannot fit all three links beside the search and
// theme controls. Playground drops out there — the homepage links to it and
// so does the search palette.
const LINKS = [
  { href: "/blog", label: "Blog", type: "blog" },
  { href: "/projects", label: "Projects", type: "projects" },
  { href: "/playground", label: "Playground", type: "playground", wide: true },
];

const Navbar = () => {
  return (
    <nav className={styles.navbarCustom}>
      <div className={styles.navbarContainer}>
        <TrackedLink
          className={styles.brandLink}
          href="/"
          eventName="nav_link_click"
          eventParams={{ location: "navbar", link_type: "home", target_url: "/" }}
        >
          Swapnil Chauhan
        </TrackedLink>

        <div className={styles.navLinks}>
          <div className={styles.pageLinks}>
            {LINKS.map((link) => (
              <TrackedLink
                key={link.href}
                className={`${styles.navLink} ${link.wide ? styles.wideOnly : ""}`}
                href={link.href}
                eventName="nav_link_click"
                eventParams={{
                  location: "navbar",
                  link_type: link.type,
                  target_url: link.href,
                }}
              >
                {link.label}
              </TrackedLink>
            ))}
          </div>
          <SearchButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

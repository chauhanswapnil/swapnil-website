import ThemeToggle from "../ThemeToggle";
import TrackedLink from "../TrackedLink";
import styles from "./index.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbarCustom}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <h1>
            <TrackedLink
              className={styles.brandLink}
              href="/"
              eventName="nav_link_click"
              eventParams={{ location: "navbar", link_type: "home", target_url: "/" }}
            >
              Swapnil Chauhan
            </TrackedLink>
          </h1>
        </div>
        <div className={styles.navLinks}>
          <TrackedLink
            className={styles.navLink}
            href="/blog"
            eventName="nav_link_click"
            eventParams={{ location: "navbar", link_type: "blog", target_url: "/blog" }}
          >
            Blog
          </TrackedLink>
          <TrackedLink
            className={styles.navLink}
            href="/projects"
            eventName="nav_link_click"
            eventParams={{ location: "navbar", link_type: "projects", target_url: "/projects" }}
          >
            Projects
          </TrackedLink>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

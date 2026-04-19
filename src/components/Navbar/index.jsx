import Link from "next/link";
import ThemeToggle from "../ThemeToggle";
import styles from "./index.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbarCustom}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <h1>
            <Link className={styles.brandLink} href="/">
              Swapnil Chauhan
            </Link>
          </h1>
        </div>
        <div className={styles.navLinks}>
          <Link className={styles.navLink} href="/blog">
            Blog
          </Link>
          <Link className={styles.navLink} href="/projects">
            Projects
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.css";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className={styles.navbarCustom}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <h1>Swapnil Chauhan</h1>
        </div>
        <div className={styles.menuIcon} onClick={handleShowNavbar}>
          <FaBars />
        </div>
        <div className={`${styles.navElements}  ${showNavbar && `${styles.active}`}`}>
          <ul>
            <li>
              <NavLink to="/">home</NavLink>
            </li>
            {/* <li>
              <a target="_blank" href="https://www.linkedin.com/in/chauhanswapnil" rel="noreferrer">
                linkedin
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.github.com/chauhanswapnil" rel="noreferrer">
                github
              </a>
            </li> */}
            <li>
              <NavLink to="/projects">projects</NavLink>
            </li>
            <li>
              <NavLink to="/playground">lox playground</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

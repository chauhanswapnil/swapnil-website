import styles from "./index.module.css";

const Navbar = () => {

  return (
    <nav className={styles.navbarCustom}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <h1><a href="/" style={{color: "inherit", textDecoration: "none"}}>Swapnil Chauhan</a></h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

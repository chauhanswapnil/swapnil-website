import styles from "./index.module.css";

const Navbar = () => {

  return (
    <nav className={styles.navbarCustom}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <h1>Swapnil Chauhan</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

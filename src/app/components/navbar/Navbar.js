import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarNav}>
        <li className={styles.navbarItem}>
          <Link className={styles.navbarLink} href="/">
            Todo App
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link className={styles.navbarLink} href="/pages/forms">
            Form Component
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link className={styles.navbarLink} href="/pages/draggableList">
            Draggable Component
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link className={styles.navbarLink} href="/pages/chart">
            Chart Component
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

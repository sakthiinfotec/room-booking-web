import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

export function NavBar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>reServe</h1>
      <div className={styles.navLinksWrapper}>
        <ul className={styles.navLinks}>
          <Link to="/my-bookings" className={styles.link}>
            My Bookings
          </Link>
          <Link to="/book-new" className={`${styles.link} ${styles.linkButton}`}>
            Book a Room
          </Link>
        </ul>
      </div>
    </nav>
  );
}

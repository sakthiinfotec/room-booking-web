import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { LINK_MY_BOOKINGS, LINK_NEW_BOOKING, MY_BOOKINGS_PAGE, NEW_BOOKING_PAGE } from "../../app/config";

export function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarWrapper}>
        <h1 className={styles.logo}>reServe</h1>
        <ul className={styles.navLinks}>
          <Link to={MY_BOOKINGS_PAGE} className={styles.link}>
            {LINK_MY_BOOKINGS}
          </Link>
          <Link to={`${MY_BOOKINGS_PAGE}/${NEW_BOOKING_PAGE}`} className={`${styles.link} ${styles.linkButton}`}>
            {LINK_NEW_BOOKING}
          </Link>
        </ul>
      </div>
    </nav>
  );
}

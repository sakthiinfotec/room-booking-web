import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./NavBar.module.css";
import { LINK_MY_BOOKINGS, LINK_NEW_BOOKING, LOGIN_PAGE, MY_BOOKINGS_PAGE, NEW_BOOKING_PAGE } from "../../app/config";
import { useAuth } from "../auth/auth";

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();
  if (!auth.user) return null;
  return (
    <ul className={styles.navLinks}>
      <div>
        <Link to={MY_BOOKINGS_PAGE} className={styles.link}>
          {LINK_MY_BOOKINGS}
        </Link>
        <Link to={`${MY_BOOKINGS_PAGE}/${NEW_BOOKING_PAGE}`} className={`${styles.link} ${styles.linkButton}`}>
          {LINK_NEW_BOOKING}
        </Link>
      </div>
      <Space size={8}>
        <Avatar size={"large"} className={styles.avatarIcon} icon={<UserOutlined />} />
        <div>
          Welcome {auth.user.name}!
          <div>
            <Button
              type="link"
              size="small"
              className={styles.name}
              onClick={() => auth.signout(() => navigate(LOGIN_PAGE))}
            >
              Signout
            </Button>
          </div>
        </div>
      </Space>
    </ul>
  );
}

export function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarWrapper}>
        <h1 className={styles.logo}>reServe</h1>
        <AuthStatus />
      </div>
    </nav>
  );
}

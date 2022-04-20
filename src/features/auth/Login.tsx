import styles from "./Auth.module.css";
import { Button } from "antd";
import { FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import { Location } from "../../app/types";

function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation() as Location;

  // To redirect to actual referrer page
  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    auth.signin(username, () => navigate(from, { replace: true }));
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <h1 className={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Username: </p>
            <input name="username" type="text" className={styles.username} />
            <p className={styles.btnSubmit}>
              <Button type="primary" htmlType="submit" size="middle">
                Login
              </Button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

import styles from "./Auth.module.css";
import { Button, message } from "antd";
import { FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import { Location } from "../../app/types";
import { setupInitData } from "../booking/BookingAPI";
import { rooms, slots, users } from "../../app/seed-data";
import { INITIAL_DATA_LOADED_MESSAGE } from "../../app/config";

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

  const setupInitialData = async () => {
    await setupInitData(users, rooms, slots).then(() => {
      message.success(INITIAL_DATA_LOADED_MESSAGE);
    });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <h1 className={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <p>User email: </p>
            <input
              name="username"
              type="text"
              placeholder="bob@coke.com or mike@pepsi.com"
              className={styles.username}
              autoFocus
            />
            <p className={styles.btnSubmitWrapper}>
              <Button type="primary" block htmlType="submit" size="middle" className={styles.btnSubmit}>
                Login
              </Button>
            </p>
          </div>
        </form>
        <div className={styles.initSetup}>
          <p>
            <strong>Setup:</strong> In order to use the app first time, load initial data such as users, rooms and time
            slots (one time only).
            <br />
          </p>
          <p>
            <Button type="primary" block htmlType="submit" size="middle" onClick={setupInitialData}>
              Load Initial Data
            </Button>
          </p>
          <p>
            <strong>Note:</strong> Embedded SQLite DB used used as database in API side. In order to reset DB, stop both{" "}
            <code>API</code> and <code>WEB</code> processes and remove <code>db</code> file and start.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

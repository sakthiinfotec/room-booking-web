import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./Home.module.css";
import { fetchInitDataAsync, selectInitDataLoading } from "../booking/bookingSlice";
import { Spin } from "antd";

export function Home() {
  const dispatch = useAppDispatch();
  const initDataLoading = useAppSelector(selectInitDataLoading);

  useEffect(() => {
    dispatch(fetchInitDataAsync());
  }, [dispatch]);

  if (initDataLoading) {
    return (
      <div className={styles.loading}>
        <Spin />
      </div>
    );
  }

  return <Outlet />;
}

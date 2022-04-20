import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import styles from "./Layout.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchInitDataAsync, selectInitDataLoading } from "../booking/bookingSlice";
import { NavBar } from "../navbar/NavBar";

export function Layout() {
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

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

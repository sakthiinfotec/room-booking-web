import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./Home.module.css";
import { fetchInitDataAsync, selectInitDataLoading, selectRooms, selectSlots } from "../booking/bookingSlice";
import { Room, Slot } from "../../app/types";
import { BookingList } from "../booking/BookingList";
import { Spin } from "antd";

export function Home() {
  const dispatch = useAppDispatch();
  const initDataLoading = useAppSelector(selectInitDataLoading);
  const rooms = useAppSelector<Room[]>(selectRooms);
  const slots = useAppSelector<Slot[]>(selectSlots);

  useEffect(() => {
    dispatch(fetchInitDataAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   const eventSource = new EventSource("http://localhost:3000/bookings/sse");
  //   eventSource.onmessage = ({ data }) => {
  //     console.log("New message", JSON.parse(data));
  //   };
  // }, []);

  if (initDataLoading) {
    return (
      <div className={styles.loading}>
        <Spin />
      </div>
    );
  }

  return <BookingList rooms={rooms} slots={slots} />;
}

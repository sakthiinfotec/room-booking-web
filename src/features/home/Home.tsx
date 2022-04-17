import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./Home.module.css";
import {
  fetchInitDataAsync,
  selectBookings,
  selectBookingsLoading,
  selectInitDataLoading,
  selectRooms,
  selectSlots,
} from "../booking/bookingSlice";
import { Booking, BookingRow, Room, Slot } from "../../app/types";
import { BookingList } from "../booking/BookingList";

export function Home() {
  const initDataLoading = useAppSelector(selectInitDataLoading);
  const rooms = useAppSelector<Room[]>(selectRooms);
  const slots = useAppSelector<Slot[]>(selectSlots);
  const bookings = useAppSelector<Booking[]>(selectBookings);
  const bookingsLoading = useAppSelector(selectBookingsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInitDataAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   const eventSource = new EventSource("http://localhost:3000/bookings/sse");
  //   eventSource.onmessage = ({ data }) => {
  //     console.log("New message", JSON.parse(data));
  //   };
  // }, []);

  return (
    // <div className={styles.contentWrapper}>
    <BookingList />
    // </div>
  );
}

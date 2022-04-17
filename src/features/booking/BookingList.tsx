import React, { useCallback, useEffect, useState } from "react";
import { Button, Table, Tag, Space } from "antd";
import moment from "moment";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./BookingList.module.css";
import {
  fetchBookingsAsync,
  fetchInitDataAsync,
  selectBookings,
  selectBookingsLoading,
  selectInitDataLoading,
  selectRooms,
  selectSlots,
} from "./bookingSlice";
import { Booking, BookingRow, Room, Slot } from "../../app/types";
import { columns } from "./TableHelper";

export function BookingList() {
  const initDataLoading = useAppSelector(selectInitDataLoading);
  const rooms = useAppSelector<Room[]>(selectRooms);
  const slots = useAppSelector<Slot[]>(selectSlots);
  const bookings = useAppSelector<Booking[]>(selectBookings);
  const bookingsLoading = useAppSelector(selectBookingsLoading);
  const dispatch = useAppDispatch();

  const pagination = {
    pageSize: 10,
  };

  let data: BookingRow[] = [];
  if (!initDataLoading && !bookingsLoading && bookings.length && rooms.length && slots.length) {
    // console.log(`[BookingList] rooms:${JSON.stringify(rooms, null, 2)}`);
    // console.log(`[BookingList] slots:${JSON.stringify(slots, null, 2)}`);
    data = bookings.map((booking) => {
      const { id, createdDate, roomId, slotId } = booking;
      const room = rooms.find((room) => room.id === roomId);
      const slot = slots.find((slot) => slot.id === slotId);
      return {
        key: `${id}`,
        bookingId: id,
        bookedDate: moment(createdDate).format("lll"),
        room: room?.name || "",
        time: [slot?.name || ""],
      };
    });
  }

  useEffect(() => {
    dispatch(fetchInitDataAsync());
  }, [dispatch]);

  const fetchBookings = useCallback(() => {
    dispatch(fetchBookingsAsync());
  }, [dispatch]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // useEffect(() => {
  //   console.log(`[Bookings] bookings: ${JSON.stringify(bookings, null, 2)}`);
  // }, [bookings]);

  // useEffect(() => {
  //   console.log(`[Bookings] status: ${bookingsLoading}`);
  // }, [bookingsLoading]);

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>My Bookings</h2>
        <div>
          <Button type="primary" loading={bookingsLoading} onClick={fetchBookings}>
            Refresh
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={pagination} />
    </div>
  );
}

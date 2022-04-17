import { useCallback, useEffect, useState } from "react";
import { Button, Table } from "antd";
import moment from "moment";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./BookingList.module.css";
import { fetchBookingsAsync, selectBookings, selectBookingsLoading } from "./bookingSlice";
import { Booking, BookingListProps, BookingRow, ActionLoding } from "../../app/types";
import { columns } from "./TableHelper";

const TitleSection = ({ loading, onClick }: ActionLoding) => (
  <div className={styles.headerWrapper}>
    <h2 className={styles.header}>My Bookings</h2>
    <div>
      <Button type="primary" loading={loading} onClick={onClick}>
        Refresh
      </Button>
    </div>
  </div>
);

export function BookingList({ rooms = [], slots = [] }: BookingListProps) {
  const bookings = useAppSelector<Booking[]>(selectBookings);
  const bookingsLoading = useAppSelector(selectBookingsLoading);
  const dispatch = useAppDispatch();

  const transformBookingsToRowData = (bookings: Booking[]) => {
    return bookings.map((booking) => {
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
  };

  let data: BookingRow[] = [];
  if (!bookingsLoading && bookings.length && rooms.length && slots.length) {
    data = transformBookingsToRowData(bookings);
  }

  const fetchBookings = useCallback(() => {
    dispatch(fetchBookingsAsync());
  }, [dispatch]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div className={styles.contentWrapper}>
      <TitleSection loading={bookingsLoading} onClick={fetchBookings} />
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import styles from "./Bookings.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Booking, BookingRow, Room, Slot } from "../../app/types";
import { TitleSection } from "../../app/components";
import {
  cancelBookingAsync,
  fetchBookingsAsync,
  selectRooms,
  selectSlots,
  selectBookingCancelLoading,
  selectBookings,
  selectBookingsLoading,
} from "./bookingSlice";
import prepareColumns from "./TableHelper";
import {
  BTN_NO_CANCEL as BTN_NO,
  BTN_REFRESH,
  BTN_YES_CANCEL,
  CANCEL_CONFIRM_MESSAGE,
  CANCEL_CONFIRM_TITLE,
  TITLE_MY_BOOKINGS,
} from "../../app/config";

export function BookingList() {
  const rooms = useAppSelector<Room[]>(selectRooms);
  const slots = useAppSelector<Slot[]>(selectSlots);
  const bookings = useAppSelector<Booking[]>(selectBookings);
  const bookingsLoading = useAppSelector(selectBookingsLoading);
  const bookingCancelLoading = useAppSelector(selectBookingCancelLoading);
  const [bookingCancelId, setBookingCancelId] = useState<number>(0);
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

  function confirmCancellation(bookingId: number) {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: CANCEL_CONFIRM_TITLE,
      content: CANCEL_CONFIRM_MESSAGE,
      centered: true,
      okText: BTN_YES_CANCEL,
      cancelText: BTN_NO,
      onOk: () => {
        setBookingCancelId(bookingId);
        dispatch(cancelBookingAsync(bookingId));
      },
    });
  }

  return (
    <div className={styles.contentWrapper}>
      <TitleSection title={TITLE_MY_BOOKINGS}>
        <div>
          <Button type="primary" loading={bookingsLoading} onClick={fetchBookings}>
            {BTN_REFRESH}
          </Button>
        </div>
      </TitleSection>
      <Table
        columns={prepareColumns(confirmCancellation, bookingCancelLoading, bookingCancelId)}
        dataSource={data}
        pagination={{
          pageSize: 7,
        }}
      />
    </div>
  );
}

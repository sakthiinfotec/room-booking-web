import { Button, Tag, Space } from "antd";
import { BookingRow } from "../../app/types";

type ConfirmCancelCallback = (bookindId: number) => void;

export default function prepareColumns(
  confirmCancellation: ConfirmCancelCallback,
  bookingCancelLoading: boolean,
  bookingCancelId: number
) {
  return [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Booked Date",
      dataIndex: "bookedDate",
      key: "bookedDate",
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
      render: (time: string[]) => (
        <>
          {time.map((time) => {
            const color = "geekblue";
            return (
              <Tag color={color} key={time}>
                {time.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: BookingRow) => (
        <Space size={"middle"}>
          <Button
            type="primary"
            size="small"
            loading={bookingCancelLoading && bookingCancelId === record.bookingId}
            onClick={() => confirmCancellation(record.bookingId)}
          >
            Cancel
          </Button>
        </Space>
      ),
    },
  ];
}

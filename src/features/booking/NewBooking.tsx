import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Divider, Row, Space, Spin, Steps } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TitleSection } from "../../app/components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CompanyRooms, ErrorType, Room, Slot } from "../../app/types";
import styles from "./Booking.module.css";
import {
  createBookingAsync,
  createBookingLoading,
  fetchAvailableRoomsAsync,
  fetchAvailableSlotsAsync,
  selectAvaiableRoomsLoading,
  selectAvaiableSlotsLoading,
  selectAvailableRooms,
  selectAvailableSlots,
  selectBookingError,
  selectRooms,
  selectSlots,
} from "./bookingSlice";
import {
  BOOKING_SUCCESS_MESSAGE,
  BTN_BOOK_ROOM,
  BTN_DONE,
  BTN_NEXT,
  BTN_PREVIOUS,
  LOADING_MESSAGE,
  MY_BOOKINGS_PAGE,
  STEP1_TITLE,
  STEP2_TITLE,
  STEP3_TITLE,
  TITLE_NEW_BOOKING,
} from "../../app/config";
import { useAuth } from "../auth/auth";

const NewBooking = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAuth();
  const rooms = useAppSelector<Room[]>(selectRooms);
  const slots = useAppSelector<Slot[]>(selectSlots);
  const availableRooms = useAppSelector<Room[]>(selectAvailableRooms);
  const availableSlots = useAppSelector<Slot[]>(selectAvailableSlots);
  const availableRoomsLoading = useAppSelector<boolean>(selectAvaiableRoomsLoading);
  const availableSlotsLoading = useAppSelector<boolean>(selectAvaiableSlotsLoading);
  const newBookingLoading = useAppSelector(createBookingLoading);
  const bookingError = useAppSelector<ErrorType>(selectBookingError);
  const [selectedRoomId, setSelectedRoom] = useState<number>(0);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);

  const availableRoomsSet = new Set<number>();
  availableRooms.forEach((room) => availableRoomsSet.add(room.id));

  const availableSlotsSet = new Set<number>();
  availableSlots.forEach((slot) => availableSlotsSet.add(slot.id));

  const { Step } = Steps;

  useEffect(() => {
    dispatch(fetchAvailableRoomsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (current === 1) {
      dispatch(fetchAvailableSlotsAsync(selectedRoomId));
    }
  }, [current, dispatch, selectedRoomId]);

  // Handle next click
  const next = () => setCurrent(current + 1);

  // Handle previous click
  const prev = () => setCurrent(current - 1);

  /**
   * Add or toggle time slot selection
   * @param slotId Slot Id
   */
  const handleTimeSlotSelection = (slotId: number) => {
    const set = new Set(selectedTimeSlots);
    if (set.has(slotId)) {
      set.delete(slotId);
    } else {
      set.add(slotId);
    }
    setSelectedTimeSlots(Array.from(set));
  };

  /**
   * Make a room booking request
   */
  const handleBookRoom = async () => {
    const data = {
      userId: auth.user.id,
      roomId: selectedRoomId,
      slots: selectedTimeSlots,
    };
    await dispatch(createBookingAsync(data));
    next();
  };

  const companyRoomsMap: CompanyRooms = rooms.reduce((res: CompanyRooms, room: Room) => {
    if (!res[room.company]) {
      res[room.company] = [];
    }
    res[room.company].push(room);
    return res;
  }, {});

  const RoomButton = ({ room }: { room: Room }) => {
    return (
      <Col span={6}>
        <Button
          size="large"
          onClick={() => setSelectedRoom(room.id)}
          disabled={!availableRoomsSet.has(room.id)}
          type={selectedRoomId === room.id ? "primary" : "default"}
        >
          {room.name}
        </Button>
      </Col>
    );
  };

  const CompanyRooms = ({ company, roomButtons }: { company: string; roomButtons: JSX.Element[] }) => (
    <Col span={12}>
      <Divider orientation="center" orientationMargin="0">
        {company}
      </Divider>
      <Row gutter={[36, 36]}>{roomButtons}</Row>
    </Col>
  );

  const RoomsByCompanyView = ({ companyRooms }: { companyRooms: CompanyRooms }) => (
    <Row gutter={[80, 20]}>
      {Object.entries(companyRooms).map(([company, rooms]) => {
        const roomButtons = rooms.map((room) => <RoomButton key={`${room.id}`} room={room} />);
        return <CompanyRooms key={company} company={company} roomButtons={roomButtons} />;
      })}
    </Row>
  );

  const TimeSlot = ({ slot }: { slot: Slot }) => (
    <Button
      size="large"
      disabled={!availableSlotsSet.has(slot.id)}
      type={selectedTimeSlots.includes(slot.id) ? "primary" : "default"}
      onClick={() => handleTimeSlotSelection(slot.id)}
    >
      {slot.name}
    </Button>
  );

  const SlotSelectionView = ({ slots }: { slots: Slot[] }) => (
    <Row gutter={[80, 20]}>
      {slots.map((slot, index) => (
        <Col key={`${index}`} span={6}>
          <TimeSlot slot={slot} />
        </Col>
      ))}
    </Row>
  );

  const BookingConfirmationView = () => (
    <div className={styles.bookingConfirmation}>
      <Space size={16}>
        {bookingError && bookingError.error ? (
          <>
            <CloseCircleOutlined className={styles.warinngIcon} />
            <p className={styles.confirmMessage}>{bookingError.error}</p>
          </>
        ) : (
          <>
            <CheckCircleOutlined className={styles.checkCircleIcon} />
            <p className={styles.confirmMessage}>{BOOKING_SUCCESS_MESSAGE}</p>
          </>
        )}
      </Space>
    </div>
  );

  const steps = [
    {
      title: STEP1_TITLE,
      content: <RoomsByCompanyView companyRooms={companyRoomsMap} />,
    },
    {
      title: STEP2_TITLE,
      content: <SlotSelectionView slots={slots} />,
    },
    {
      title: STEP3_TITLE,
      content: <BookingConfirmationView />,
    },
  ];

  return (
    <div className={styles.contentWrapper}>
      <TitleSection title={TITLE_NEW_BOOKING} />

      {/* Steps components */}
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      {/* Step content */}
      <div className={styles.stepsContent}>
        {availableRoomsLoading || availableSlotsLoading ? <Spin tip={LOADING_MESSAGE} /> : steps[current].content}
      </div>

      {/* Bottom action buttons */}
      <div className={styles.stepsAction}>
        {((current > 0 && current < steps.length - 1) ||
          (current === steps.length - 1 && bookingError && bookingError.error)) && (
          <Button className={styles.btnPrevious} size="large" onClick={() => prev()}>
            {BTN_PREVIOUS}
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            type="primary"
            size="large"
            className={styles.btnNext}
            disabled={(current === 0 && selectedRoomId === 0) || (current === 1 && selectedTimeSlots.length === 0)}
            loading={newBookingLoading}
            onClick={steps[current].title === STEP2_TITLE ? handleBookRoom : next}
          >
            {steps[current].title === STEP2_TITLE ? BTN_BOOK_ROOM : BTN_NEXT}
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" size="large" className={styles.btnDone} onClick={() => navigate(MY_BOOKINGS_PAGE)}>
            {BTN_DONE}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewBooking;

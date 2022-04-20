export type AsyncRequestState = 'idle' | 'loading' | 'failed'

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  company: string;
}

export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  slotId: number;
  cancelled: boolean;
  createdDate: Date;
  updatedDate: Date;
}

export interface Room {
  id: number;
  name: string;
  company: string;
}

export interface Slot {
  id: number;
  name: string;
}

export interface BookingState {
  initDataStatus: AsyncRequestState;
  rooms: Room[],
  slots: Slot[],
  availableRooms: Room[],
  availableSlots: Slot[],
  getAvailableRoomsStatus: AsyncRequestState;
  getAvailableSlotsStatus: AsyncRequestState;
  listBookingStatus: AsyncRequestState;
  createBookingStatus: AsyncRequestState;
  bookingError: ErrorType;
  bookings: Booking[],
  bookingCancelStatus: AsyncRequestState;
}

export interface ActionLoding {
  onClick: () => void,
  loading: boolean;
}

export interface BookingRow {
  key: string;
  bookingId: number;
  bookedDate: string;
  room: string;
  time: string[];
}

export interface NewRoomBooking {
  userId: number;
  roomId: number;
  slots: number[];
}

export type CompanyRooms = { [key: string]: Room[] }

export interface ErrorType {
  status: number;
  error: string;
}

export interface Location {
  state: { from: { pathname: string } };
}

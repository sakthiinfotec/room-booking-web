export type AsyncRequestState = 'idle' | 'loading' | 'failed'

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
  bookings: Booking[],
  rooms: Room[],
  slots: Slot[],
  bookingStatus: AsyncRequestState;
  initDataStatus: AsyncRequestState;
}

export interface BookingRow {
  key: string;
  bookingId: number;
  bookedDate: string;
  room: string;
  time: string[];
}

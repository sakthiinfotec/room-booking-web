import { AUTH, USERS } from './../../app/config';
import { message } from "antd";
import { BOOKINGS, BOOKING_SUCCESS_MESSAGE, ROOMS, SLOTS } from '../../app/config';
import { Booking, NewRoomBooking, Room, Slot, ErrorType, User } from '../../app/types/index';

/**
 * Fetch initial data such as rooms and slots
 * @returns [rooms[], slots[]]
 */
export async function fetchInitData(): Promise<any> {
  return Promise.all([
    fetch(ROOMS).then(resp => resp.json()),
    fetch(SLOTS).then(resp => resp.json())
  ])
}

/**
 * Setup initial data
 * @returns Loaded result
 */
export async function setupInitData(users: User[], rooms: Room[], slots: Slot[]): Promise<any> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return Promise.all([
    fetch(USERS, { ...options, body: JSON.stringify(users) }).then(resp => resp.json()),
    fetch(ROOMS, { ...options, body: JSON.stringify(rooms) }).then(resp => resp.json()),
    fetch(SLOTS, { ...options, body: JSON.stringify(slots) }).then(resp => resp.json()),
  ])
}

/**
 * Create new room booking
 * @returns bookings[]
 */
export async function createBooking(data: NewRoomBooking): Promise<Booking[] | ErrorType> {
  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };
  return fetch(BOOKINGS, reqOptions)
    .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data) as ErrorType;
        message.error(error.error);
      } else {
        message.success(BOOKING_SUCCESS_MESSAGE);
      }
      return data;
    })
    .catch((err) => console.error(`[BookingAPI] Error while create booking`, err));
}

/**
 * Fetch bookings data
 * @returns bookings[]
 */
export async function fetchBookings(): Promise<Booking[]> {
  return fetch(BOOKINGS)
    .then(response => response.json())
}

/**
 * Fetch available rooms
 * @returns bookings[]
 */
export async function fetchAvailableRooms(): Promise<Room[]> {
  return fetch(`${ROOMS}/available`)
    .then(response => response.json())
}

/**
 * Fetch availble slots by room
 * @returns bookings[]
 */
export async function fetchAvailableSlots(roomId: number): Promise<Slot[]> {
  return fetch(`${SLOTS}/available?roomId=${roomId}`)
    .then(response => response.json())
}

/**
 * Cancel a booking by id
 * @returns Cancel booking confirmation
 */
export async function cancelBooking(bookingId: number): Promise<Booking> {
  return fetch(`${BOOKINGS}/${bookingId}/cancel`)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return ({ id: bookingId, cancelled: true } as Booking)
    })
    .catch(() => ({ id: bookingId, cancelled: false } as Booking));
}

/**
 * Create new room booking
 * @returns bookings[]
 */
export async function login(data: { userId: string }): Promise<any> {
  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };
  return fetch(AUTH, reqOptions)
    .then(response => response.json())
    .catch((err) => console.error(`[BookingAPI] Error while login`, err));
}
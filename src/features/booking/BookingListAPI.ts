import { Booking, Room, Slot } from './../../app/types/index';
const API_BASE_URL = 'http://127.0.0.1:3000';
// const LIST_USERS = `${API_BASE_URL}/users`;
const LIST_ROOMS = `${API_BASE_URL}/rooms`;
const LIST_SLOTS = `${API_BASE_URL}/slots`;
const LIST_BOOKINGS = `${API_BASE_URL}/bookings`;

export async function fetchInitData(): Promise<any> {
  return Promise.all([
    fetch(LIST_ROOMS).then(resp => resp.json()),
    fetch(LIST_SLOTS).then(resp => resp.json())
  ])
}


export async function fetchBookings(): Promise<Booking[]> {
  return fetch(LIST_BOOKINGS)
    .then(response => response.json())
}

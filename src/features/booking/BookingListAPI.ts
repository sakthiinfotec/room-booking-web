import { LIST_BOOKINGS, LIST_ROOMS, LIST_SLOTS } from '../../app/config';
import { Booking } from './../../app/types/index';

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

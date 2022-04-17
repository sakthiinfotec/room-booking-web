// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

const API_BASE_URL = 'http://127.0.0.1:3000';
const LIST_BOOKINGS = `${API_BASE_URL}/bookings`;

export async function fetchBookings(): Promise<any> {
  console.log('[CounterAPI] fetchBookings...')
  return fetch(LIST_BOOKINGS, { mode: 'no-cors' }).then(async resp => await resp.json());
}

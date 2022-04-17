import { BookingState } from '../../app/types';
import bookingReducer from './bookingSlice';

describe('booking reducer', () => {
  // const initialState: BookingState = {
  //   bookings: [],
  //  rooms: [],
  //   slots: [],
  //   bookingStatus: 'idle',
  //   initDataStatus: 'idle',
  // };
  it('should handle initial state', () => {
    expect(bookingReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      bookingStatus: 'idle',
    });
  });
});

import bookingReducer from './bookingSlice';

describe('booking reducer', () => {
  it('should handle initial state', () => {
    expect(bookingReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      bookingStatus: 'idle',
    });
  });
});

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchInitData, fetchBookings } from './BookingListAPI';
import { BookingState } from '../../app/types';

const initialState: BookingState = {
  bookings: [],
  rooms: [],
  slots: [],
  bookingStatus: 'idle',
  initDataStatus: 'idle',
};

export const fetchInitDataAsync = createAsyncThunk('bookings/fetchInitData', fetchInitData);
export const fetchBookingsAsync = createAsyncThunk('bookings/fetchBookings', fetchBookings);

export const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitDataAsync.pending, (state) => {
        state.initDataStatus = 'loading';
      })
      .addCase(fetchInitDataAsync.fulfilled, (state, action) => {
        state.initDataStatus = 'idle';
        const [roomList, slotList] = action.payload;
        state.rooms = roomList;
        state.slots = slotList;
      })
      .addCase(fetchBookingsAsync.pending, (state) => {
        state.bookingStatus = 'loading';
      })
      .addCase(fetchBookingsAsync.fulfilled, (state, action) => {
        state.bookingStatus = 'idle';
        state.bookings = action.payload;
      })
      ;
  },
});

export const selectInitDataLoading = (state: RootState) => state.booking.initDataStatus === 'loading';
export const selectRooms = (state: RootState) => state.booking.rooms;
export const selectSlots = (state: RootState) => state.booking.slots;
export const selectBookings = (state: RootState) => state.booking.bookings;
export const selectBookingsLoading = (state: RootState) => state.booking.bookingStatus === 'loading';


export default bookingSlice.reducer;

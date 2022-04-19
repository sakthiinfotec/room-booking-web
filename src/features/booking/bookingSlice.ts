import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchInitData, fetchBookings, cancelBooking, createBooking, fetchAvailableRooms, fetchAvailableSlots } from './BookingListAPI';
import { RootState } from '../../app/store';
import { ErrorType } from './../../app/types/index';
import { BookingState } from '../../app/types';

const initialState: BookingState = {
  bookings: [],
  rooms: [],
  slots: [],
  availableRooms: [],
  availableSlots: [],
  bookingError: { status: 200, error: '' },
  getAvailableRoomsStatus: 'idle',
  getAvailableSlotsStatus: 'idle',
  listBookingStatus: 'idle',
  createBookingStatus: 'idle',
  initDataStatus: 'idle',
  bookingCancelStatus: 'idle',
};

export const fetchInitDataAsync = createAsyncThunk('bookings/fetchInitData', fetchInitData);
export const fetchBookingsAsync = createAsyncThunk('bookings/fetchBookings', fetchBookings);
export const fetchAvailableRoomsAsync = createAsyncThunk('bookings/fetchAvailableRooms', fetchAvailableRooms);
export const fetchAvailableSlotsAsync = createAsyncThunk('bookings/fetchAvailableSlots', fetchAvailableSlots);
export const createBookingAsync = createAsyncThunk('bookings/createBooking', createBooking);
export const cancelBookingAsync = createAsyncThunk('bookings/cancelBooking', cancelBooking);

const addInitDataFetchReducer = (builder: ActionReducerMapBuilder<BookingState>) => {
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
}

const addFetchAvaiableRoomsReducer = (builder: ActionReducerMapBuilder<BookingState>) => {
  builder
    .addCase(fetchAvailableRoomsAsync.pending, (state) => {
      state.getAvailableRoomsStatus = 'loading';
    })
    .addCase(fetchAvailableRoomsAsync.fulfilled, (state, action) => {
      state.getAvailableRoomsStatus = 'idle';
      state.availableRooms = action.payload;
    })
}

const addAvailableSlotsReducer = (builder: ActionReducerMapBuilder<BookingState>) => {
  builder
    .addCase(fetchAvailableSlotsAsync.pending, (state) => {
      state.getAvailableSlotsStatus = 'loading';
    })
    .addCase(fetchAvailableSlotsAsync.fulfilled, (state, action) => {
      state.getAvailableSlotsStatus = 'idle';
      state.availableSlots = action.payload;
    })
}

const addFetchBookingsReducer = (builder: ActionReducerMapBuilder<BookingState>) => {
  builder
    .addCase(fetchBookingsAsync.pending, (state) => {
      state.listBookingStatus = 'loading';
    })
    .addCase(fetchBookingsAsync.fulfilled, (state, action) => {
      state.listBookingStatus = 'idle';
      state.bookings = action.payload;
    })
}

const addCreateBookingReducer = (builder: ActionReducerMapBuilder<BookingState>) => {
  builder
    .addCase(createBookingAsync.pending, (state) => {
      state.bookingError = initialState.bookingError;
      state.createBookingStatus = 'loading';
    })
    .addCase(createBookingAsync.fulfilled, (state, action) => {
      state.createBookingStatus = 'idle';
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        state.bookings = [...state.bookings, ...action.payload];
      } else {
        state.bookingError = action.payload as ErrorType
      }
    })
}

const addCancelBookingReducer = (builder: ActionReducerMapBuilder<BookingState>) => {
  builder
    .addCase(cancelBookingAsync.pending, (state) => {
      state.bookingCancelStatus = 'loading';
    })
    .addCase(cancelBookingAsync.fulfilled, (state, action) => {
      state.bookingCancelStatus = 'idle';
      if (action.payload.cancelled) {
        state.bookings = state.bookings.filter(booking => booking.id !== action.payload.id);
      }
    })
}

export const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    /* Handles sync actions */
  },
  extraReducers: (builder) => {
    /* Handles async action */
    addInitDataFetchReducer(builder);
    addFetchAvaiableRoomsReducer(builder);
    addAvailableSlotsReducer(builder);
    addFetchBookingsReducer(builder);
    addCreateBookingReducer(builder);
    addCancelBookingReducer(builder);
  },
});

export const selectInitDataLoading = (state: RootState) => state.booking.initDataStatus === 'loading';
export const selectRooms = (state: RootState) => state.booking.rooms;
export const selectSlots = (state: RootState) => state.booking.slots;
export const selectAvailableRooms = (state: RootState) => state.booking.availableRooms;
export const selectAvailableSlots = (state: RootState) => state.booking.availableSlots;
export const selectAvaiableRoomsLoading = (state: RootState) => state.booking.getAvailableRoomsStatus === 'loading';
export const selectAvaiableSlotsLoading = (state: RootState) => state.booking.getAvailableSlotsStatus === 'loading';
export const selectBookingsLoading = (state: RootState) => state.booking.listBookingStatus === 'loading';
export const selectBookings = (state: RootState) => state.booking.bookings;
export const selectBookingError = (state: RootState) => state.booking.bookingError;
export const createBookingLoading = (state: RootState) => state.booking.createBookingStatus === 'loading';
export const selectBookingCancelLoading = (state: RootState) => state.booking.bookingCancelStatus === 'loading';


export default bookingSlice.reducer;

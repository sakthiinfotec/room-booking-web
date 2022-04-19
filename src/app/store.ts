import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookingReducer from '../features/booking/bookingSlice';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, RequireAuth } from "./features/auth";
import { Layout } from "./features/layout/Layout";
import LoginPage from "./features/auth/Login";
import NewBooking from "./features/booking/NewBooking";
import { MyBookings } from "./features/booking/MyBookings";
import { LOGIN_PAGE, MY_BOOKINGS_PAGE, NEW_BOOKING_PAGE } from "./app/config";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path={LOGIN_PAGE} element={<LoginPage />} />
            <Route
              index
              element={
                <RequireAuth>
                  <MyBookings />
                </RequireAuth>
              }
            />
            <Route
              path={MY_BOOKINGS_PAGE}
              element={
                <RequireAuth>
                  <MyBookings />
                </RequireAuth>
              }
            />
            <Route
              path={`${MY_BOOKINGS_PAGE}/${NEW_BOOKING_PAGE}`}
              element={
                <RequireAuth>
                  <NewBooking />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./features/home/Home";
import { NavBar } from "./features/navbar/NavBar";
import LoginPage from "./features/auth/Login";
import NewBooking from "./features/booking/NewBooking";
import { BookingList } from "./features/booking/BookingList";
import { HOME_PAGE, LOGIN_PAGE, MY_BOOKINGS_PAGE, NEW_BOOKING_PAGE } from "./app/config";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={HOME_PAGE} element={<Home />}>
          <Route index element={<BookingList />} />
        </Route>
        <Route path={LOGIN_PAGE} element={<LoginPage />} />
        <Route path={MY_BOOKINGS_PAGE} element={<Home />}>
          <Route path={NEW_BOOKING_PAGE} element={<NewBooking />} />
          <Route index element={<BookingList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

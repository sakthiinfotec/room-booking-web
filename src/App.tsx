import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./features/home/Home";
import { NavBar } from "./features/navbar/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-bookings" element={<Home />} />
        <Route path="/book-new" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

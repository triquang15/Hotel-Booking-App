import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import { ExistingRoom } from "./components/room/ExistingRoom.jsx";
import { Home } from "./components/home/Home.jsx";
import { EditRoom } from "./components/room/EditRoom.jsx";
import { AddRoom } from "./components/room/AddRoom.jsx";
import { NavBar } from "./components/layout/NavBar.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { RoomListing } from "./components/room/RoomListing.jsx";
import { Admin } from "./components/admin/Admin.jsx";
import { Checkout } from "./components/bookings/Checkout.jsx";
import { BookingSuccess } from "./components/bookings/BookingSuccess.jsx";
import { Bookings } from "./components/bookings/Bookings.jsx";
import { FindBooking } from "./components/bookings/FindBooking.jsx";

function App() {
  return (
    <>
      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/rooms" element={<ExistingRoom />} />
          <Route path="/book-room/:roomId" element={<Checkout />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/all-rooms" element={<RoomListing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/find-booking" element={<FindBooking />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;

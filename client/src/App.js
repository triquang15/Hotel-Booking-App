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

function App() {
  return (
    <>
      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/rooms" element={<ExistingRoom />} />
          <Route path="/add-room" element={<AddRoom />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import { ExistingRoom } from "./components/room/ExistingRoom.jsx";
import { Home } from "./components/home/Home.jsx";
import { EditRoom } from "./components/room/EditRoom.jsx";
import { AddRoom } from "./components/room/AddRoom.jsx";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/rooms" element={<ExistingRoom />} />
          <Route path="/add-room" element={<AddRoom/>} />
        </Routes>
      </main>
    </>
  );
}

export default App;

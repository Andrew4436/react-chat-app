import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import "./style.css"

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  const socket = io("http://localhost:4040");

  return (
    <>
      <div className="App">
        <Nav props={{ user, setUser }} />
        <Routes>
          <Route path="/" element={<Home user={user} socket={socket} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

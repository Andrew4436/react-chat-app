import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Nav.css";

function Nav({ props }) {
  const navigate = useNavigate();
  return (
    <nav>
      <div id="nav-items">
        <a href="/" id="title">
          <h1>Chat app</h1>
        </a>
        <p
          onClick={() => {
            props.setUser(null);
            sessionStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </p>
      </div>
      <p>{props.user ? props.user.username : ""}</p>
    </nav>
  );
}

export default Nav;

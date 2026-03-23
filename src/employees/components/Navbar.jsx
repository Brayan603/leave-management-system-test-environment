// employee/components/Navbar.jsx

import React from "react";
import "./styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Employee Portal</h2>
      <button onClick={() => {
        localStorage.clear();
        window.location.href = "/login";
      }}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;

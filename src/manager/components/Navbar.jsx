import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">Manager Portal</div>
      <ul className="nav-list">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/manager/pending-tasks">My Pending Tasks</a></li>
        <li><a href="/reports">Reports</a></li>
      </ul>
      <div className="nav-actions">
        <button>Profile</button>
        <button>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;





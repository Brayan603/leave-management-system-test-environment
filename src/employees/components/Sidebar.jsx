// employee/components/Sidebar.jsx

import React from "react";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <p>Dashboard</p>
      <p>My Leaves</p>
      <p>Apply Leave</p>
      <p>Profile</p>
    </div>
  );
};

export default Sidebar;
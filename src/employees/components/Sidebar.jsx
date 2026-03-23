import React from "react";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <p>Dashboard</p>
        <p>Apply Leave</p>
        <p>Leave History</p>
        <p>Leave Balance</p>
        <p>Calendar</p>
      </div>

      <div className="sidebar-footer">
        <p>Settings</p>
      </div>
    </div>
  );
};

export default Sidebar;

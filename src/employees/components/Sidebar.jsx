import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
        <Link to="/apply-leave" className="sidebar-link">Apply Leave</Link>
        <Link to="/leave-history" className="sidebar-link">Leave History</Link>
        <Link to="/leave-balance" className="sidebar-link">Leave Balance</Link>
        <Link to="/calendar" className="sidebar-link">Calendar</Link>
      </div>

      <div className="sidebar-footer">
        <Link to="/settings" className="sidebar-link">Settings</Link>
      </div>
    </div>
  );
};

export default Sidebar;

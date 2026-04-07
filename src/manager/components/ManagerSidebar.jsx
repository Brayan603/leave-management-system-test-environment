import React from "react";
import { Link } from "react-router-dom";
import "../styles/ManagerSidebar.css"; // ✅ Import CSS for styling

const ManagerSidebar = () => {
  return (
    <aside className="manager-sidebar">
      <ul>
        <li><Link to="/manager-dashboard">Dashboard</Link></li>
        <li><Link to="/manager-pending-tasks">Pending Tasks</Link></li>
        <li><Link to="/manager-reports">Reports</Link></li>
      </ul>
    </aside>
  );
};

export default ManagerSidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus2,
  History,
  Wallet,
  CalendarDays,
  Settings,
} from "lucide-react";

import "../styles/sidebar.css";

const modules = [
  { name: "Dashboard", basePath: "/employees",icon: <LayoutDashboard className="sidebar-icon" />, },
  {name: "Apply Leave", basePath: "/employees/apply-leave", icon: <FilePlus2 className="sidebar-icon" />, },
  { name: "Leave History", basePath: "/employees/leave-history", icon: <History className="sidebar-icon" />, },
  { name: "Leave Balance", basePath: "/employees/leave-balance", icon: <Wallet className="sidebar-icon" />, },
  { name: "Calendar",  basePath: "/employees/calendar", icon: <CalendarDays className="sidebar-icon" />, },
  { name: "Settings", basePath: "/employees/settings", icon: <Settings className="sidebar-icon" />, },

];

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">L</div>

        <div className="sidebar-logo-text">
          <h2>LeavePro</h2>
          <span>EMPLOYEE PORTAL</span>
        </div>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        {modules.map((module) => (
          <NavLink
            key={module.name}
            to={module.basePath}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {module.icon}
            <span>{module.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;


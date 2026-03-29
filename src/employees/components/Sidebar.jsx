import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const modules = [
  { name: "Dashboard", basePath: "/employees" }, // default route
  { name: "Apply Leave", basePath: "/employees/apply-leave" },
  { name: "Leave History", basePath: "/employees/leave-history" },
  { name: "Leave Balance", basePath: "/employees/leave-balance" },
  { name: "Calendar", basePath: "/employees/calendar" },
  { name: "Settings", basePath: "/employees/settings" },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        {modules.map((module) => (
          <NavLink
            key={module.name}
            to={module.basePath}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {module.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;


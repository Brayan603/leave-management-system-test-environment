import React from "react";
import { NavLink } from "react-router-dom";

const sidebarItems = [
  { name: "Organization", path: "/admin/entitlements/organization/add" },
  { name: "Departments", path: "/admin/entitlements/departments" },
  { name: "Leave Types", path: "/admin/entitlements/leavetypes" },
  { name: "Users", path: "/admin/entitlements/users" },
  { name: "Limits Roles", path: "/admin/entitlements/limits-roles" },
  { name: "Workflows", path: "/admin/entitlements/workflows" },
];

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      {sidebarItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          style={({ isActive }) =>
            isActive
              ? { ...styles.link, ...styles.activeLink }
              : styles.link
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    minHeight: "calc(100vh - 65px)", // below header
    backgroundColor: "#1e293b",
    display: "flex",
    flexDirection: "column",
    padding: "20px 0",
    boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "12px 20px",
    fontSize: "14px",
    transition: "background 0.2s, color 0.2s",
  },
  activeLink: {
    backgroundColor: "#3b82f6",
    fontWeight: "600",
  },
};

export default Sidebar;
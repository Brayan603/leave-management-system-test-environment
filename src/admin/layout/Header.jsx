import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Entitlements", path: "/admin/entitlements" },
  { name: "User Access Maintenance", path: "/admin/user-access" },
  { name: "Reports", path: "/admin/reports" },
  { name: "Messenger", path: "/admin/messenger" },
  { name: "Service Requests", path: "/admin/service-requests" },
];

function Header() {
  return (
    <header style={styles.header}>
      <nav>
        <ul style={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.name} style={styles.menuItem}>
              <NavLink
                to={item.path}
                style={({ isActive }) =>
                  isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    padding: "0 30px",
    height: "65px",
    backgroundColor: "deepSkyBlue",
    color: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  menu: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: "25px",
  },
  menuItem: {},
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s, transform 0.2s",
  },
  activeLink: {
    color: "#3b82f6",
    fontWeight: "600",
    borderBottom: "2px solid #3b82f6",
  },
};

export default Header;
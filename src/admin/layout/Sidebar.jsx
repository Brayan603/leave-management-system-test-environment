import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const actions = [
  { name: "Add", path: "add" },
  { name: "View", path: "view" },
  { name: "Modify", path: "edit" },
  { name: "Delete", path: "delete" },
];

const modules = [
  { name: "Organization", basePath: "/admin/entitlements/organization" },
  { name: "Departments", basePath: "/admin/entitlements/departments" },
  { name: "Leave Types", basePath: "/admin/entitlements/leavetypes" },
  { name: "Entitlements", basePath: "/admin/entitlements/entitlements" },
  { name: "Users", basePath: "/admin/entitlements/users" },
  { name: "Limits Roles", basePath: "/admin/entitlements/limits-roles" },
  { name: "Workflows", basePath: "/admin/entitlements/workflows" },
];

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <div style={styles.sidebar}>
      {modules.map((module) => {
        const isOpen = openMenu === module.name;

        return (
          <div key={module.name}>
            <div
              style={styles.mainItem}
              onClick={() => toggleMenu(module.name)}
            >
              <span style={styles.icon}>{isOpen ? "−" : "+"}</span>
              <span style={styles.menuText}>{module.name}</span>
            </div>

            {isOpen && (
              <div style={styles.subMenu}>
                {actions.map((action) => (
                  <NavLink
                    key={action.name}
                    to={`${module.basePath}/${action.path}`}
                    style={({ isActive }) =>
                      isActive
                        ? { ...styles.subLink, ...styles.activeLink }
                        : styles.subLink
                    }
                  >
                    {action.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    minHeight: "calc(100vh - 65px)",
    backgroundColor: "#0f172a", // Darker modern background
    display: "flex",
    flexDirection: "column",
    paddingTop: "20px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
  },

  mainItem: {
    color: "white",
    padding: "14px 20px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background 0.2s",
  },

  menuText: {
    flex: 1,
  },

  icon: {
    fontSize: "16px",
    fontWeight: "bold",
    width: "20px",
    display: "inline-block",
    textAlign: "center",
  },

  subMenu: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1e293b",
  },

  subLink: {
    color: "#cbd5f5",
    textDecoration: "none",
    padding: "10px 35px",
    fontSize: "14px",
    transition: "background 0.2s",
  },

  activeLink: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
};

export default Sidebar;
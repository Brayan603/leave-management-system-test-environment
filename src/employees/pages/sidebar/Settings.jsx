import React from "react";
import { Link, useLocation } from "react-router-dom";

const Settings = () => {
  const location = useLocation();
  const isActive = location.pathname === "/settings";

  return (
    <Link to="/settings" className={`sidebar-link ${isActive ? "active" : ""}`}>
      Settings
    </Link>
  );
};

export default Settings;
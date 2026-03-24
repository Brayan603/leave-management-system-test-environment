import React from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardLink = () => {
  const location = useLocation();
  const isActive = location.pathname === "/dashboard";

  return (
    <Link to="/dashboard" className={`sidebar-link ${isActive ? "active" : ""}`}>
      Dashboard
    </Link>
  );
};

export default DashboardLink;
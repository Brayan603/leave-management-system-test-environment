import React from "react";
import { Link, useLocation } from "react-router-dom";

const LeaveHistory = () => {
  const location = useLocation();
  const isActive = location.pathname === "/leave-history";

  return (
    <Link to="/leave-history" className={`sidebar-link ${isActive ? "active" : ""}`}>
      Leave History
    </Link>
  );
};

export default LeaveHistory;
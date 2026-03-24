import React from "react";
import { Link, useLocation } from "react-router-dom";

const LeaveBalance = () => {
  const location = useLocation();
  const isActive = location.pathname === "/leave-balance";

  return (
    <Link to="/leave-balance" className={`sidebar-link ${isActive ? "active" : ""}`}>
      Leave Balance
    </Link>
  );
};

export default LeaveBalance;
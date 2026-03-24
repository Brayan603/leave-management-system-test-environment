import React from "react";
import { Link, useLocation } from "react-router-dom";

const Calendar = () => {
  const location = useLocation();
  const isActive = location.pathname === "/calendar";

  return (
    <Link to="/calendar" className={`sidebar-link ${isActive ? "active" : ""}`}>
      Calendar
    </Link>
  );
};

export default Calendar;
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LeaveTable from "../components/LeaveTable.jsx";
import "../styles/managerDashboard.css";

const ManagerDashboard = () => {
  // Dummy data for now
  const [leaves] = useState([
    {
      _id: "1",
      user: { name: "John Doe" },
      type: "Annual Leave",
      start: "2026-04-01",
      end: "2026-04-05",
      reason: "Vacation",
      status: "pending",
      approvedBy: null,
    },
    {
      _id: "2",
      user: { name: "Jane Smith" },
      type: "Sick Leave",
      start: "2026-03-28",
      end: "2026-03-29",
      reason: "Flu",
      status: "approved",
      approvedBy: "Manager A",
    },
  ]);

  const handleAction = (id, action) => {
    console.log(`Action "${action}" triggered for leave ID: ${id}`);
  };

  return (
    <div className="manager-dashboard">
      <Navbar />
      <div className="dashboard-content">
        <h2 className="dashboard-title">Pending Leave Requests</h2>
        <LeaveTable leaves={leaves} onAction={handleAction} />
      </div>
    </div>
  );
};

export default ManagerDashboard;



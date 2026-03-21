// employee/pages/EmployeeDashboard.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LeaveCard from "../components/LeaveCard";
import { getProfile, getLeaveBalance } from "../../api/employeeApi";
import "../styles/dashboard.css";

const EmployeeDashboard = () => {
  const [user, setUser] = useState(null);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const profile = await getProfile();
      const leaveData = await getLeaveBalance();

      setUser(profile);
      setLeaves(leaveData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          <h2>Welcome, {user?.name}</h2>

          <div className="card-container">
            {leaves.map((leave, index) => (
              <LeaveCard
                key={index}
                title={leave.type}
                days={leave.days}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
import React from "react";
import "../styles/dashboard.css";


const leaveData = [
  {
    title: "Sick Leave",
    used: 5,
    total: 10,
    color: "#ef4444",
  },
  {
    title: "Annual Leave",
    used: 12,
    total: 21,
    color: "#22c55e",
  },
  {
    title: "Casual Leave",
    used: 3,
    total: 7,
    color: "#3b82f6",
  },
];

const EmployeeDashboard = () => {
  const totalEarned = leaveData.reduce((sum, item) => sum + item.total, 0);
  const totalUsed = leaveData.reduce((sum, item) => sum + item.used, 0);

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <h2>Welcome Back 👋</h2>
        <p>Your leave summary overview</p>
      </div>

      {/* Summary Card */}
      <div className="summary-card">
        <div>
          <h3>Total Leave Balance</h3>
          <p className="big-number">{totalEarned - totalUsed} Days</p>
        </div>

        <div className="summary-details">
          <span>Used: {totalUsed}</span>
          <span>Total: {totalEarned}</span>
        </div>
      </div>

      {/* Leave Cards */}
      <div className="leave-grid">
        {leaveData.map((leave) => {
          const percent = (leave.used / leave.total) * 100;

          return (
            <div className="leave-card" key={leave.title}>
              <div className="card-top">
                <h4>{leave.title}</h4>
                <span>{leave.used}/{leave.total}</span>
              </div>

              {/* Progress bar */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${percent}%`,
                    background: leave.color,
                  }}
                ></div>
              </div>

              <div className="card-footer">
                <span>{leave.total - leave.used} Days Left</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default EmployeeDashboard;
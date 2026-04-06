import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

// ✅ KEEP YOUR DESIGN DATA (unchanged)
const leaveData = [
  { title: "Sick Leave", color: "#ef4444" },
  { title: "Annual Leave", color: "#22c55e" },
  { title: "Casual Leave", color: "#3b82f6" },
  { title: "Maternity Leave", color: "#a855f7" },
  { title: "Paternity Leave", color: "#f59e0b" },
];

const EmployeeDashboard = () => {
  const [entitlements, setEntitlements] = useState([]);

  useEffect(() => {
    fetchEntitlements();
  }, []);

  // ============================
  // ✅ FETCH USER ENTITLEMENTS
  // ============================
  const fetchEntitlements = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/leave/my-leave-types",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setEntitlements(res.data || []);
    } catch (err) {
      console.error("Error fetching entitlements:", err);
      setEntitlements([]);
    }
  };

  // ============================
  // ✅ MERGE STATIC + API DATA
  // ============================
  const mergedData = leaveData.map((leave) => {
    const match = entitlements.find(
      (e) => e.leaveType?.name === leave.title
    );

    if (!match) {
      return {
        ...leave,
        notEntitled: true,
        used: 0,
        total: 0,
      };
    }

    return {
      ...leave,
      notEntitled: false,
      used: match.usedDays || 0,
      total: match.totalDays || 0,
    };
  });

  // ============================
  // ✅ SUMMARY CALCULATIONS
  // ============================
  const totalEarned = mergedData.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  const totalUsed = mergedData.reduce(
    (sum, item) => sum + (item.used || 0),
    0
  );

  const totalBalance = totalEarned - totalUsed;

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <p>Welcome Back,</p>
        <h2>Brayan Malova 👋</h2>
        <p>Your leave summary overview</p>
      </div>

      {/* SUMMARY CARD */}
      <div className="summary-card">
        <div className="summary-left">
          <h3>Total Leave Balance</h3>
          <p className="big-number">{totalBalance} Days</p>
        </div>

        <div className="summary-details">
          <span>Used: {totalUsed}</span>
          <span>Total: {totalEarned}</span>
        </div>
      </div>

      {/* LEAVE GRID */}
      <div className="leave-grid">
        {mergedData.map((leave) => {
          const percent =
            leave.total > 0 ? (leave.used / leave.total) * 100 : 0;

          const remaining = leave.total - leave.used;

          return (
            <div className="leave-card" key={leave.title}>
              
              {/* TOP SECTION */}
              <div className="card-top">
                <h4>{leave.title}</h4>

                {leave.notEntitled ? (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Not Entitled
                  </span>
                ) : (
                  <span>
                    {leave.used}/{leave.total}
                  </span>
                )}
              </div>

              {/* PROGRESS BAR */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: leave.notEntitled ? "0%" : `${percent}%`,
                    backgroundColor: leave.color,
                  }}
                />
              </div>

              {/* FOOTER */}
              <div className="card-footer">
                {leave.notEntitled ? (
                  <span style={{ color: "red" }}>
                    No access to this leave
                  </span>
                ) : (
                  <span>{remaining} Days Left</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default EmployeeDashboard;
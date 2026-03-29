import React from "react";
import "../styles/leaveBalance.css";

const LeaveBalance = () => {
  const balances = [
    { type: "Annual Leave", days: 12 },
    { type: "Sick Leave", days: 5 },
    { type: "Maternity Leave", days: 30 }
  ];

  return (
    <div className="page">
      <h1>Leave Balance</h1>

      <div className="balance-grid">
        {balances.map((item, i) => (
          <div className="balance-card" key={i}>
            <h3>{item.type}</h3>
            <p>{item.days} Days</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalance;
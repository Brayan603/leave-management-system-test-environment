// employee/components/LeaveCard.jsx

import React from "react";

const LeaveCard = ({ title, days }) => {
  return (
    <div className="leave-card">
      <h3>{title}</h3>
      <p>{days} Days</p>
    </div>
  );
};

export default LeaveCard;
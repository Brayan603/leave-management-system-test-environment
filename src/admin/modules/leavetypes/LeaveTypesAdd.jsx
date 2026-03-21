// components/leavetypes/LeaveTypesAdd.jsx
import React, { useState, useEffect } from "react";
import { getLeaveTypes } from "./leaveTypeService"; // only need getLeaveTypes now
import "./LeaveTypes.css";

const LeaveTypesAdd = () => {
  const [leaveTypes, setLeaveTypes] = useState([]); // existing leave types from DB
  const [selectedLeaveType, setSelectedLeaveType] = useState(""); // selected leave type from dropdown

  // Fetch leave types from backend on load
  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const res = await getLeaveTypes();
      // If API returns { data: [...] }
      const leaveArray = res.data ? res.data : res;
      setLeaveTypes(leaveArray);
    } catch (err) {
      console.error("Error fetching leave types:", err);
    }
  };

  return (
    <div className="leavetype-form">
      <h3>Existing Leave Types</h3>

      <select
        value={selectedLeaveType}
        onChange={(e) => setSelectedLeaveType(e.target.value)}
      >
        <option value="">-- Select Leave Type --</option>
        {leaveTypes.map((lt) => (
          <option key={lt._id} value={lt._id}>
            {lt.name} ({lt.type === "fixed" ? `${lt.maxDays} days` : `${lt.accrualRate}/month`})
          </option>
        ))}
      </select>

      {selectedLeaveType && (
        <div className="leave-details-box" style={{ marginTop: "10px", border: "1px solid #ddd", padding: "10px", borderRadius: "6px" }}>
          <p>
            <strong>Name:</strong>{" "}
            {leaveTypes.find((lt) => lt._id === selectedLeaveType)?.name}
          </p>
          <p>
            <strong>Type:</strong>{" "}
            {leaveTypes.find((lt) => lt._id === selectedLeaveType)?.type}
          </p>
          <p>
            <strong>
              {leaveTypes.find((lt) => lt._id === selectedLeaveType)?.type === "fixed" ? "Max Days" : "Accrual Rate"}
              :
            </strong>{" "}
            {leaveTypes.find((lt) => lt._id === selectedLeaveType)?.type === "fixed"
              ? `${leaveTypes.find((lt) => lt._id === selectedLeaveType)?.maxDays} days`
              : `${leaveTypes.find((lt) => lt._id === selectedLeaveType)?.accrualRate}/month`}
          </p>
        </div>
      )}
    </div>
  );
};

export default LeaveTypesAdd;
// src/employees/modules/pages/ApplyLeave.jsx
import React, { useState, useEffect } from "react";
import { getUserEntitlements } from "../../../admin/api/entitlementsApi";
import axios from "axios";

const ApplyLeave = () => {
  const userId = localStorage.getItem("userId");
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [form, setForm] = useState({ leaveTypeId: "", startDate: "", endDate: "" });

  useEffect(() => {
    const fetchEntitlements = async () => {
      const data = await getUserEntitlements(userId);
      setLeaveTypes(data);
    };
    fetchEntitlements();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/leaves", { ...form, userId });
    alert("Leave applied!");
    setForm({ leaveTypeId: "", startDate: "", endDate: "" });
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Apply Leave</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <select value={form.leaveTypeId} onChange={(e) => setForm({ ...form, leaveTypeId: e.target.value })} required>
          <option value="">Select Leave Type</option>
          {leaveTypes.map(l => (
            <option key={l._id} value={l.leaveTypeId._id}>
              {l.leaveTypeId.name} ({l.daysAllowed} days)
            </option>
          ))}
        </select>
        <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
        <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default ApplyLeave;
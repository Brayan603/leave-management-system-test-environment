import React, { useState } from "react";

const ApplyLeavePage = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate submission
    setMessage(`Leave applied from ${formData.startDate} to ${formData.endDate} for ${formData.leaveType}`);
    setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Apply Leave</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
          <option value="">Select Leave Type</option>
          <option value="Annual Leave">Annual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Maternity Leave">Maternity Leave</option>
          <option value="Paternity Leave">Paternity Leave</option>
        </select>

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="reason"
          placeholder="Reason for leave"
          value={formData.reason}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit" style={{ padding: "0.7rem", backgroundColor: "#4facfe", color: "#fff", border: "none", borderRadius: "5px" }}>
          Apply Leave
        </button>
      </form>
    </div>
  );
};

export default ApplyLeavePage;
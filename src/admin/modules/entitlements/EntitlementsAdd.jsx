import React, { useState, useEffect } from "react";

const EntitlementAdd = () => {
  const [users, setUsers] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    leaveTypeIds: [], // array for multiple leave types
    totalDays: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchLeaveTypes();
  }, []);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };

  // Fetch leave types
  const fetchLeaveTypes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/leave", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setLeaveTypes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching leave types:", err);
      setLeaveTypes([]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/entitlements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Entitlements assigned!");
        setForm({ userId: "", leaveTypeIds: [], totalDays: "" });
      } else {
        alert(data.message || "Failed to assign entitlements");
      }
    } catch (err) {
      console.error("Error creating entitlement:", err);
      alert("Something went wrong");
    }
  };

  // Handle multi-select for leave types
  const handleLeaveTypeChange = (e) => {
    const options = e.target.options;
    const selectedIds = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selectedIds.push(options[i].value);
    }
    setForm({ ...form, leaveTypeIds: selectedIds });
  };

  return (
    <div className="form-container">
      <h3>Assign Leave Entitlements</h3>

      <form onSubmit={handleSubmit}>

        {/* User Dropdown */}
        <select
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
          required
        >
          <option value="">-- Select User --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.role})
            </option>
          ))}
        </select>

        {/* Leave Types Multi-Select */}
        <select
          multiple
          value={form.leaveTypeIds}
          onChange={handleLeaveTypeChange}
          required
        >
          {leaveTypes.map((lt) => (
            <option key={lt._id} value={lt._id}>
              {lt.name} ({lt.type === "fixed" ? `${lt.maxDays} days` : `${lt.accrualRate}/month`})
            </option>
          ))}
        </select>

        <button type="submit">Assign</button>
      </form>
    </div>
  );
};

export default EntitlementAdd;
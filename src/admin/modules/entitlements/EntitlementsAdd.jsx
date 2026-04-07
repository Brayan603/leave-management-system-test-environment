import React, { useState, useEffect } from "react";

const EntitlementAdd = () => {
  const [users, setUsers] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    leaveTypeIds: [], // multiple leave types
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
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };

 const fetchLeaveTypes = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/leave/types", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const data = await res.json();

    console.log("Leave Types API Response:", data); // 🔍 DEBUG

    setLeaveTypes(Array.isArray(data) ? data : data.data || []);
  } catch (err) {
    console.error("Error fetching leave types:", err);
    setLeaveTypes([]);
  }
};

  // Handle multi-select
  const handleLeaveTypeChange = (e) => {
    const options = e.target.options;
    const selectedIds = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selectedIds.push(options[i].value);
    }
    setForm({ ...form, leaveTypeIds: selectedIds });
  };

  // Submit entitlements
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userId || form.leaveTypeIds.length === 0) {
      alert("Select a user and at least one leave type");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/entitlements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Entitlements assigned!");
        setForm({ userId: "", leaveTypeIds: [] });
      } else {
        alert(data.message || "Failed to assign entitlements");
      }
    } catch (err) {
      console.error("Error creating entitlement:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h3>Assign Leave Entitlements</h3>

      <form onSubmit={handleSubmit}>

        {/* User Dropdown */}
        <label>User:</label>
        <select
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
          required
        >
          <option value="">-- Select User --</option>
          {users.map((u) => (
            <option key={u.id || u._id} value={u.id || u._id}>
              {u.name} ({u.role})
            </option>
          ))}
        </select>

        {/* Leave Types Multi-Select */}
        <label>Leave Types:</label>
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

        {/* Display selected leave types */}
        {form.leaveTypeIds.length > 0 && (
          <div style={{ marginTop: "10px", border: "1px solid #ddd", padding: "10px", borderRadius: "6px" }}>
            <strong>Selected Leave Types:</strong>
            <ul>
              {form.leaveTypeIds.map((id) => {
                const lt = leaveTypes.find((l) => l._id === id);
                if (!lt) return null;
                return (
                  <li key={lt._id}>
                    {lt.name} ({lt.type === "fixed" ? `${lt.maxDays} days` : `${lt.accrualRate}/month`})
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <button type="submit" style={{ marginTop: "10px" }}>Assign</button>
      </form>
    </div>
  );
};

export default EntitlementAdd;
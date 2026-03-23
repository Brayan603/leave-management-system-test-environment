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
      const res = await fetch(`http://localhost:5000/api/user?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });
      const data = await res.json();

      // Normalize user data
      const userArray = Array.isArray(data)
        ? data.map(u => ({
            id: u.id || u._id,
            name: u.name || `${u.firstName || ""} ${u.lastName || ""}`,
            role: u.role,
          }))
        : [];

      console.log("Users fetched:", userArray);
      setUsers(userArray);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };

  // Fetch leave types
  const fetchLeaveTypes = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/leave/leave?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });
      const data = await res.json();

      // Normalize leave types
      const leaveArray = Array.isArray(data)
        ? data.map(lt => ({
            _id: lt._id || lt.id,
            name: lt.name || lt.type,
            type: lt.type,
            maxDays: lt.maxDays || "",
            accrualRate: lt.accrualRate || "",
          }))
        : [];

      console.log("Leave types fetched:", leaveArray);
      setLeaveTypes(leaveArray);
    } catch (err) {
      console.error("Error fetching leave types:", err);
      setLeaveTypes([]);
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userId || form.leaveTypeIds.length === 0) {
      alert("Please select a user and at least one leave type");
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
        setForm({ userId: "", leaveTypeIds: [], totalDays: "" });
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
        <label>Select User:</label>
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
        <label>Select Leave Types:</label>
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
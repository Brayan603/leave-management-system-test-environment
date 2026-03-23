// src/admin/modules/pages/UsersAdd.jsx
import React, { useState } from "react";
import { getU} from "./UserService"; // Import the createUser function from your API service


const UsersAdd = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users", // Replace with your API endpoint
        formData
      );
      setMessage("User created successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "employee",
      });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error creating user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-add-container" style={{ maxWidth: "500px", margin: "auto", padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Create New User</h2>
      {message && (
        <div style={{ marginBottom: "1rem", color: message.includes("success") ? "green" : "red" }}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.7rem",
            backgroundColor: "#4facfe",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UsersAdd;
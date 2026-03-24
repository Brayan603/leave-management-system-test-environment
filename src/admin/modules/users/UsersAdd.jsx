import React, { useState, useEffect } from "react";
import { createUser } from "./UsersService.jsx"; // your user API
import axios from "axios";

const UsersAdd = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "employee",
    organization: "",
    department: "",
    subDepartment: "",
  });

  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load organizations on mount
  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/organizations", {
        headers: { "Cache-Control": "no-cache" }, // avoid cached 304
      });
      if (res.data && res.data.length) setOrganizations(res.data);
    } catch (err) {
      console.error("Error fetching organizations:", err);
      setMessage("Failed to load organizations.");
    }
  };

  // Handle input changes + dynamic dropdowns
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "organization") {
      // reset dependent fields
      setDepartments([]);
      setSubDepartments([]);
      setFormData((prev) => ({ ...prev, department: "", subDepartment: "" }));

      if (!value) return;

      try {
        // Use query param for department
        const res = await axios.get("http://localhost:5000/api/department", {
          params: { organizationId: value },
        });
        setDepartments(res.data || []);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setMessage("Failed to load departments.");
      }
    }

    if (name === "department") {
      setSubDepartments([]);
      setFormData((prev) => ({ ...prev, subDepartment: "" }));

      if (!value) return;

      try {
        // Use query param for subDepartment
        const res = await axios.get("http://localhost:5000/api/subdepartments", {
          params: { departmentId: value },
        });
        setSubDepartments(res.data || []);
      } catch (err) {
        console.error("Error fetching subDepartments:", err);
        setMessage("Failed to load subDepartments.");
      }
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createUser(formData);
      setMessage("User created successfully!");

      // reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "employee",
        organization: "",
        department: "",
        subDepartment: "",
      });
      setDepartments([]);
      setSubDepartments([]);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error creating user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "2rem" }}>
      <h2>Create New User</h2>
      {message && (
        <p style={{ color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* Basic User Info */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Role */}
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        {/* Organization */}
        <select
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          required
        >
          <option value="">Select Organization</option>
          {organizations.map((org) => (
            <option key={org._id} value={org._id}>
              {org.name}
            </option>
          ))}
        </select>

        {/* Department */}
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          disabled={!departments.length}
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep._id} value={dep._id}>
              {dep.name}
            </option>
          ))}
        </select>

        {/* SubDepartment */}
        <select
          name="subDepartment"
          value={formData.subDepartment}
          onChange={handleChange}
          disabled={!subDepartments.length}
        >
          <option value="">Select SubDepartment</option>
          {subDepartments.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UsersAdd;

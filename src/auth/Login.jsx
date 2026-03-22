// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./authApi"; // your API file
import "./login.css";

const Login = ({ setToken }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Redirect based on role
  const handleRedirect = (role) => {
    if (!role) return navigate("/login"); // fallback
    switch (role) {
      case "admin":
        navigate("/admin-home");
        break;
      case "manager":
        navigate("/manager-home");
        break;
      case "employee":
      default:
        navigate("/employee-home");
        break;
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(form); // returns { token, user }

      if (!data || !data.token || !data.user) {
        throw new Error("Invalid credentials");
      }

      // Save token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      if (setToken) setToken(data.token);

      // Redirect based on role
      handleRedirect(data.user.role);

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
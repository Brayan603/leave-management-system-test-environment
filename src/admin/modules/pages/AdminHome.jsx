import React from "react";
import Header from "../../layout/Header"; // Relative path from AdminHome to Header.jsx
import "./AdminHome.css"; // Separate CSS for styling

function AdminHome() {
  return (
    <div className="admin-home-container">
      <div className="app-title">
        PPA Leave Application Management System Administration Panel
      </div>

      <Header />

      <div className="welcome-section">
        <h2>Welcome Brian 👋</h2>
        <p>You have successfully logged into the Admin Panel.</p>
      </div>
    </div>
  );
}

export default AdminHome;
import React from "react";
import Header from "../../layout/Header";
import Sidebar from "../../layout/Sidebar";
import { Outlet } from "react-router-dom"; // for nested routes

function Entitlements() {
  return (
     <div className="admin-home-container">
      <div className="app-title">
        PPA Leave Application Management System Administration Panel
      
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "20px", flex: 1 }}>
          <h2>Entitlements Section</h2>
          <Outlet />
        </div>
      </div>
    </div>
</div>
</div>
  );
}

export default Entitlements;
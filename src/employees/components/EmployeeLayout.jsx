import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // ✅ fixed import

const EmployeeLayout = () => {
  return (
    <div className="employee-layout">
      {/* Top Navbar */}
      <Navbar />

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
          style={{
            marginLeft: "240px",
            marginTop: "30px",
            padding: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1 }}>
            <Outlet /> {/* 🔥 pages render here */}
          </div>

          {/* Footer always at bottom */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;

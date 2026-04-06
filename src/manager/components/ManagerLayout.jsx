import React from "react";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "../components/ManagerSidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ManagerLayout.css"; // custom CSS

const ManagerLayout = () => {
  return (
    <div className="manager-layout">
      {/* Top Navbar */}
      <Navbar />

      <div className="manager-main">
        {/* Sidebar */}
        <ManagerSidebar />

        {/* Main Content */}
        <div className="manager-content">
          <div className="manager-outlet">
            <Outlet /> {/* 🔥 manager pages render here */}
          </div>

          {/* Footer always at bottom */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ManagerLayout;

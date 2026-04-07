import React from "react";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "../components/ManagerSidebar"; // ✅ component import
import Navbar from "../components/Navbar";                 // ✅ component import

// If you have CSS files, import them correctly
// Example: if ManagerLayout.css is inside src/manager/styles/
import "../styles/ManagerLayout.css";

const ManagerLayout = () => {
  return (
    <div className="manager-layout">
      
      {/* 🔝 Navbar */}
      <Navbar />

      <div className="manager-main">
        
        {/* 📌 Sidebar */}
        <ManagerSidebar />

        {/* 📄 Main Content */}
        <div className="manager-content">

          {/* Page Content */}
          <div className="manager-outlet">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManagerLayout;



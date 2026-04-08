import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ user, onClose }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ✅ Safe close function
  const safeClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        safeClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // ✅ Logout handler
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
    safeClose(); // optional: close dropdown on logout
  };

  return (
    <div className="dropdown profile-dropdown" ref={dropdownRef}>
      
      {/* 👤 PROFILE HEADER */}
      <div className="profile-header">
        <img
          src={user?.profilePic || "/default.png"}
          alt="profile"
          className="dropdown-img"
        />

        <div>
          <p className="name">{user?.name || "User"}</p>
          <p className="email">{user?.email || "No email"}</p>
        </div>
      </div>

      <hr />

      {/* 📄 ACTIONS */}
      <button onClick={() => navigate("/employees/profile")}>
        👤 View Profile
      </button>

      <button onClick={() => navigate("/employees/settings")}>
        ⚙️ Settings
      </button>

      <hr />

      {/* 🚪 LOGOUT */}
      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>

    </div>
  );
};

export default ProfileDropdown;
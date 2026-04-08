import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // ✅ Load user
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    setUser(storedUser || {});
  }, []);

  // ✅ Logout function (reused everywhere)
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  // ✅ AUTO LOGOUT ON INACTIVITY
  useEffect(() => {
    let timer;

    const logout = () => {
      alert("Session expired due to inactivity");
      handleLogout();
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, 10 * 60 * 1000); // ⏳ 10 minutes
    };

    // 👇 Detect user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    // Start timer initially
    resetTimer();

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  return (
    <div className="navbar">

      {/* LEFT */}
      <h2>Employee Portal</h2>

      {/* RIGHT */}
      <div className="nav-right">

        {/* 🔔 Notifications */}
        <div onClick={() => setShowNotifications(!showNotifications)}>
          🔔
        </div>

        {showNotifications && <NotificationDropdown />}

        {/* 👤 Profile */}
        <div onClick={() => setShowProfile(!showProfile)}>
          <img
            src={user?.profilePic || "/default.png"}
            alt="profile"
            className="profile-img"
          />
        </div>

        {showProfile && <ProfileDropdown user={user} />}

        {/* 🚪 Logout */}
        <button onClick={handleLogout}>Logout</button>

      </div>
    </div>
  );
};

export default Navbar;

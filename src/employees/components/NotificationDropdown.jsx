import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const NotificationDropdown = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef();

  // ✅ Fetch notifications
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notifications", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        if (onClose) onClose(); // ✅ SAFE CHECK
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <h4>Notifications</h4>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n, i) => (
          <p key={i}>{n.message}</p>
        ))
      )}
    </div>
  );
};

export default NotificationDropdown;
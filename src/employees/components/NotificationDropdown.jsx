import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotifications(res.data || []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="dropdown notification-dropdown">

      {/* HEADER */}
      <div className="dropdown-header">
        <h4>Notifications</h4>
      </div>

      <hr />

      {/* LOADING STATE */}
      {loading && <p className="muted-text">Loading notifications...</p>}

      {/* ERROR STATE */}
      {error && <p className="error-text">{error}</p>}

      {/* EMPTY STATE */}
      {!loading && !error && notifications.length === 0 && (
        <p className="muted-text">No notifications</p>
      )}

      {/* NOTIFICATIONS LIST */}
      {!loading &&
        !error &&
        notifications.length > 0 &&
        notifications.map((n, i) => (
          <div key={n.id || i} className="notification-item">
            <p>{n.message}</p>
          </div>
        ))}
    </div>
  );
};

export default NotificationDropdown;

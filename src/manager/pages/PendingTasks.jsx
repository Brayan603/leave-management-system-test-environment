import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/pendingTasks.css";

const ManagerPendingTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leave/pending", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await axios.put(
        `http://localhost:5000/api/leave/${id}/status`,
        { action },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      fetchTasks(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="manager-pending-container">
      <h2 className="manager-heading">Pending Leave Requests</h2>

      <table className="manager-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Leave Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Days</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th> {/* ✅ removed Approved By */}
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.employee}</td> {/* ✅ name */}
              <td>{t.type}</td>
              <td>{new Date(t.start).toLocaleDateString()}</td>
              <td>{new Date(t.end).toLocaleDateString()}</td>
              <td>{t.leaveDays}</td>
              <td>{t.reason}</td>
              <td className={`status ${t.status.toLowerCase()}`}>
                {t.status}
              </td>

              <td>
                <button
                  className="approve-btn"
                  onClick={() => handleAction(t.id, "approve")}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleAction(t.id, "reject")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerPendingTasks;





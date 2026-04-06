import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/leaveHistory.css";

const LeaveHistory = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null); // track which row menu is open

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leave/history", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let responseData = res.data;
      if (res.data?.leaves) responseData = res.data.leaves;
      else if (res.data?.data) responseData = res.data.data;

      setHistory(Array.isArray(responseData) ? responseData : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setHistory([]);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("en-GB");
  };

  const filteredData =
    filter === "all"
      ? history
      : history.filter(
          (item) =>
            (item.status || "").toLowerCase() === filter.toLowerCase()
        );

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="history-container">
      <h2 className="title">Leave Application History</h2>

      {/* FILTERS */}
      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Approved By</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id || item._id}>
                <td>{item.type || item.leaveType?.name || "-"}</td>
                <td>{formatDate(item.start)}</td>
                <td>{formatDate(item.end)}</td>
                <td>{item.days ?? "-"}</td>
                <td>{item.reason || "-"}</td>
                <td className={(item.status || "").toLowerCase()}>
                  {item.status || "Pending"}
                </td>
                <td>{item.approvedBy || "-"}</td>

                {/* ACTION MENU */}
                <td>
                  <div className="action-menu">
                    <button
                      className="menu-button"
                      onClick={() => toggleMenu(item.id || item._id)}
                    >
                      ⋮
                    </button>
                    {openMenuId === (item.id || item._id) && (
                      <div className="menu-dropdown">
                        {item.status?.toLowerCase() === "approved" && (
                          <>
                            <button className="btn edit">Edit</button>
                            <button className="btn cancel">Cancel</button>
                          </>
                        )}
                        {item.status?.toLowerCase() === "pending" && (
                          <>
                            <button className="btn edit">Edit</button>
                            <button className="btn cancel">Cancel</button>
                          </>
                        )}
                        {item.status?.toLowerCase() === "rejected" && (
                          <>
                            <button className="btn edit">Edit</button>
                            <button className="btn delete">Delete</button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No leave history found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveHistory;

import React, { useState, useEffect, useRef } from "react";
import "../styles/leaveHistory.css";

const initialData = [
  {
    id: 1,
    type: "Annual Leave",
    start: "2026-01-10",
    end: "2026-01-15",
    days: 6,
    reason: "Family trip",
    approvedBy: "HR Manager",
    status: "Approved",
    appliedOn: "2026-01-01",
  },
  {
    id: 2,
    type: "Sick Leave",
    start: "2026-02-02",
    end: "2026-02-03",
    days: 2,
    reason: "Fever",
    approvedBy: "-",
    status: "Pending",
    appliedOn: "2026-01-28",
  },
  {
    id: 3,
    type: "Casual Leave",
    start: "2026-01-05",
    end: "2026-01-06",
    days: 2,
    reason: "Personal work",
    approvedBy: "HR Admin",
    status: "Rejected",
    appliedOn: "2026-01-03",
  },
];

const LeaveHistory = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);

  const menuRef = useRef(null);

  // CLOSE MENU ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // SORT BY APPLIED DATE (latest first)
  const sortedData = [...initialData].sort(
    (a, b) => new Date(b.appliedOn) - new Date(a.appliedOn)
  );

  // FILTER
  const filteredData = sortedData.filter((item) => {
    return (
      (statusFilter === "All" || item.status === statusFilter) &&
      (typeFilter === "All" || item.type === typeFilter)
    );
  });

  return (
    <div className="history-container">
      <h1 className="title">Leave History</h1>

      {/* FILTERS */}
      <div className="filters">
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>

        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Annual Leave">Annual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
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
            <th>Applied On</th>
            <th>Approved By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.type}</td>
              <td>{item.start}</td>
              <td>{item.end}</td>
              <td>{item.days}</td>
              <td>{item.reason}</td>
              <td>{item.appliedOn}</td>
              <td>{item.approvedBy}</td>

              <td className={item.status.toLowerCase()}>
                {item.status}
              </td>

              {/* ACTION MENU */}
              <td>
                <div className="menu-wrapper" ref={menuRef}>
                  <button
                    className="dots-btn"
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === item.id ? null : item.id
                      )
                    }
                  >
                    ⋮
                  </button>

                  {openMenuId === item.id && (
                    <div className="dropdown-menu">
                      {item.status === "Approved" && (
                        <button className="menu-item cancel">
                          Cancel
                        </button>
                      )}

                      {item.status === "Rejected" && (
                        <button className="menu-item edit">
                          Edit
                        </button>
                      )}

                      {item.status === "Pending" && (
                        <>
                          <button className="menu-item edit">
                            Edit
                          </button>
                          <button className="menu-item cancel">
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveHistory;
import React from "react";

const LeaveTable = ({ leaves = [], onAction }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>User</th>
          <th>Type</th>
          <th>Dates</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Approved By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leaves.length > 0 ? (
          leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.user?.name}</td>
              <td>{leave.type}</td>
              <td>{leave.start} - {leave.end}</td>
              <td>{leave.reason}</td>
              <td className={leave.status.toLowerCase()}>{leave.status}</td>
              <td>{leave.approvedBy || "-"}</td>
              <td>
                <button onClick={() => onAction(leave._id, "edit")}>Edit</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No leaves found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default LeaveTable;


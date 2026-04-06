import React from "react";
import ActionMenu from "./ActionMenu";

const LeaveTable = ({ leaves, onAction }) => (
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
      {leaves.map((leave) => (
        <tr key={leave._id}>
          <td>{leave.user?.name}</td>
          <td>{leave.type}</td>
          <td>{leave.start} - {leave.end}</td>
          <td>{leave.reason}</td>
          <td className={leave.status.toLowerCase()}>{leave.status}</td>
          <td>{leave.approvedBy || "-"}</td>
          <td>
            <ActionMenu
              status={leave.status}
              onAction={(action) => onAction(leave._id, action)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default LeaveTable;

import React from "react";
import "../styles/pendingTasks.css";

const PendingTasksTable = ({ tasks = [], onAction }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Employee</th>
        <th>Task</th>
        <th>Reason</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <tr key={task._id}>
            <td>{task.user?.name}</td>
            <td>{task.type}</td>
            <td>{task.reason}</td>
            <td className={task.status.toLowerCase()}>{task.status}</td>
            <td>
              <button
                className="btn approve"
                onClick={() => onAction(task._id, "approve")}
              >
                Approve
              </button>
              <button
                className="btn reject"
                onClick={() => onAction(task._id, "reject")}
              >
                Reject
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5">No pending tasks</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default PendingTasksTable;

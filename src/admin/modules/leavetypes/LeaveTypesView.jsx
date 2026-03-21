// components/leavetypes/LeaveTypesView.jsx
import React, { useEffect, useState } from "react";
import { getLeaveTypes, addLeaveType, updateLeaveType, deleteLeaveType } from "./leaveTypeService";
import "./LeaveTypes.css";

const LeaveTypesView = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", type: "fixed", maxDays: "", accrualRate: "" });
  const [message, setMessage] = useState("");

  const fetchLeaveTypes = async () => {
    try {
      const res = await getLeaveTypes();
      setLeaveTypes(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const startEdit = (leave) => {
    setEditingId(leave._id);
    setEditData({
      name: leave.name,
      type: leave.type,
      maxDays: leave.maxDays || "",
      accrualRate: leave.accrualRate || "",
    });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        name: editData.name,
        type: editData.type,
        maxDays: editData.type === "fixed" ? Number(editData.maxDays) : undefined,
        accrualRate: editData.type === "accrual" ? Number(editData.accrualRate) : undefined,
      };
      await updateLeaveType(editingId, payload);
      setMessage("Leave type updated!");
      setEditingId(null);
      fetchLeaveTypes();
    } catch (error) {
      console.error(error);
      setMessage("Error updating leave type.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this leave type?")) return;
    try {
      await deleteLeaveType(id);
      fetchLeaveTypes();
    } catch (error) {
      console.error(error);
      setMessage("Error deleting leave type.");
    }
  };

  return (
    <div className="leavetype-view">
      <h3>Leave Types</h3>
      {message && <p className={message.includes("updated") || message.includes("updated") ? "success" : "error"}>{message}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Max Days / Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveTypes.map((lt) => (
            <tr key={lt._id}>
              <td>
                {editingId === lt._id ? (
                  <input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                ) : (
                  lt.name
                )}
              </td>
              <td>
                {editingId === lt._id ? (
                  <select value={editData.type} onChange={(e) => setEditData({ ...editData, type: e.target.value })}>
                    <option value="fixed">Fixed</option>
                    <option value="accrual">Accrual</option>
                  </select>
                ) : (
                  lt.type
                )}
              </td>
              <td>
                {editingId === lt._id ? (
                  editData.type === "fixed" ? (
                    <input
                      type="number"
                      value={editData.maxDays}
                      onChange={(e) => setEditData({ ...editData, maxDays: e.target.value })}
                    />
                  ) : (
                    <input
                      type="number"
                      value={editData.accrualRate}
                      onChange={(e) => setEditData({ ...editData, accrualRate: e.target.value })}
                    />
                  )
                ) : lt.type === "fixed" ? (
                  lt.maxDays
                ) : (
                  lt.accrualRate
                )}
              </td>
              <td>
                {editingId === lt._id ? (
                  <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(lt)}>Edit</button>
                    <button onClick={() => handleDelete(lt._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTypesView;
// services/LeaveTypeService.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/leave/types"; // endpoint for leave types

// Get all leave types
export const getLeaveTypes = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

// Add a new leave type
export const addLeaveType = async (data) => {
  const res = await axios.post(API_BASE, data);
  return res.data;
};

// Update existing leave type
export const updateLeaveType = async (id, data) => {
  const res = await axios.put(`${API_BASE}/${id}`, data);
  return res.data;
};

// Delete a leave type
export const deleteLeaveType = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
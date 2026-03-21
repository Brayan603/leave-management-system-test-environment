// SubDepartmentService.js
import axios from "axios";

const API_SUBDEPARTMENT = "http://localhost:5000/api/subdepartments";

/* Get all subdepartments */
export const getSubDepartments = async () => {
  const response = await axios.get(API_SUBDEPARTMENT);
  return response.data;
};

/* Get subdepartments by department ID */
export const getSubDepartmentsByDepartment = async (departmentId) => {
  const response = await axios.get(`${API_SUBDEPARTMENT}/by-department/${departmentId}`);
  return response.data;
};

/* Add a new subdepartment */
export const addSubDepartment = async (data) => {
  // data should be: { name: string, departmentId: string }
  const response = await axios.post(API_SUBDEPARTMENT, data);
  return response.data;
};

/* Update a subdepartment by ID */
export const updateSubDepartment = async (id, data) => {
  const response = await axios.put(`${API_SUBDEPARTMENT}/${id}`, data);
  return response.data;
};

/* Delete a subdepartment by ID */
export const deleteSubDepartment = async (id) => {
  const response = await axios.delete(`${API_SUBDEPARTMENT}/${id}`);
  return response.data;
};
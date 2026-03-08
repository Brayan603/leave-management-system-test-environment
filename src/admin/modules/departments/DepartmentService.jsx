import axios from "axios";

const API = "http://localhost:5000/api/department";

/* Get all departments */
export const getDepartments = async () => {
  const response = await axios.get(API);
  return response.data;
};

/* Get departments by organization */
export const getDepartmentsByOrganization = async (orgId) => {
  const response = await axios.get(`${API}/organization/${orgId}`);
  return response.data;
};

/* Add department */
export const addDepartment = async (data) => {
  const response = await axios.post(API, data);
  return response.data;
};

/* Update department */
export const updateDepartment = async (id, data) => {
  const response = await axios.put(`${API}/${id}`, data);
  return response.data;
};

/* Delete department */
export const deleteDepartment = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};
import axios from "axios";

const API = "http://localhost:5000/api/departments";

/* Get all departments */
export const getDepartments = () => axios.get(API);

/* Get departments by organization */
export const getDepartmentsByOrganization = (orgId) =>
  axios.get(`${API}/department/${orgId}`);

/* Add department */
export const addDepartment = (data) =>
  axios.post(API, data);

/* Update department */
export const updateDepartment = (id, data) =>
  axios.put(`${API}/${id}`, data);

/* Delete department */
export const deleteDepartment = (id) =>
  axios.delete(`${API}/${id}`);
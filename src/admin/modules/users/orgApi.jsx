// src/admin/api/orgApi.js

import axios from "axios";

const BASE = "http://localhost:5000/api";

// ✅ Organizations
export const getOrganizations = async () => {
  const res = await axios.get(`${BASE}/organizations`);
  return res.data;
};

// ✅ Departments (by organization)
export const getDepartment = async (orgId) => {
  const res = await axios.get(`${BASE}/department/${orgId}`);
  return res.data;
};

// ✅ SubDepartments (by department)
export const getSubDepartments = async (deptId) => {
  const res = await axios.get(`${BASE}/subdepartments/${deptId}`);
  return res.data;
};
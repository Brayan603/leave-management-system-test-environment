// src/admin/api/entitlementsApi.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/entitlements";

export const assignLeave = async (data) => {
  const res = await axios.post(API_BASE, data);
  return res.data;
};

export const getUserEntitlements = async (userId) => {
  const res = await axios.get(`${API_BASE}/user/${userId}`);
  return res.data;
};

export const deleteEntitlement = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
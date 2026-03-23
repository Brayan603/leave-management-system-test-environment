// src/admin/api/userApi.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/users"; // your backend URL

export const createUser = async (userData) => {
  const res = await axios.post(API_BASE, userData);
  return res.data;
};

export const getUsers = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

export const updateUser = async (id, updatedData) => {
  const res = await axios.put(`${API_BASE}/${id}`, updatedData);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
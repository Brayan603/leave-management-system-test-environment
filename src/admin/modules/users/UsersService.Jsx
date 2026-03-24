import axios from "axios";

const API_BASE = "http://localhost:5000/api/user";

// ✅ Create axios instance with auth header
const api = axios.create({
  baseURL: API_BASE,
});

// ✅ Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // make sure token is stored after login

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// CREATE USER
export const createUser = async (userData) => {
  const res = await api.post("/", userData);
  return res.data;
};

// GET USERS
export const getUsers = async () => {
  const res = await api.get("/");
  return res.data;
};

// GET USER BY ID
export const getUserById = async (id) => {
  const res = await api.get(`/${id}`);
  return res.data;
};

// UPDATE USER
export const updateUser = async (id, updatedData) => {
  const res = await api.put(`/${id}`, updatedData);
  return res.data;
};

// DELETE USER
export const deleteUser = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};
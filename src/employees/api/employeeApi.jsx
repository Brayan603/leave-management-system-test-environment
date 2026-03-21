// src/api/employeeApi.js

const BASE_URL = "http://localhost:5000/api";

// Get logged-in user profile
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// Get leave balance
export const getLeaveBalance = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/leaves/balance`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};
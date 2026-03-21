// src/api/users.js
import from axios;

export const getUsers = async (token) => {
  const res = await fetch("http://localhost:5000/api/users", {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  return res.json();
};

export const createUser = async (formData, token) => {
  const res = await fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(formData),
  });
  return res.json();
};

// Similarly add updateUser, deleteUser
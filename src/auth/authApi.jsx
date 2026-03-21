// src/api/authApi.js

import axios from "axios";  

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;

  } catch (error) {
    throw error;
  }
};
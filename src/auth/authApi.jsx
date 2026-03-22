import axios from "axios";

const API_URL = "https://leave-application-management-system-up1h.onrender.com/api/auth";

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, formData);

    return response.data;

  } catch (error) {
    // axios error handling
    throw error.response?.data || error;
  }
};

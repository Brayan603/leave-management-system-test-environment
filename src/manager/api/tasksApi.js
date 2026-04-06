import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const getPendingTasks = async () => {
  const res = await axios.get(`${API_URL}/pending`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};

export const approveTask = async (id) => {
  const res = await axios.put(
    `${API_URL}/${id}/approve`,
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return res.data;
};

export const rejectTask = async (id) => {
  const res = await axios.put(
    `${API_URL}/${id}/reject`,
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return res.data;
};

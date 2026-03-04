import axios from "axios";

const API_URL = "http://localhost:5000/api/organizations";

export const getOrganizations = () => {
  return axios.get(API_URL);
};

export const getOrganizationById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const addOrganization = (data) => {
  return axios.post(API_URL, data);
};

export const updateOrganization = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteOrganization = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
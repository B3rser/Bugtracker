import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const apiClient = axios.create({
  baseURL: API_URL,
});

export const getAllIssues = async (params = {}) => {
  try {
    const response = await apiClient.get('/issues', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getIssueById = async (id) => {
  try {
    const response = await apiClient.get(`/issues/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createIssue = async (issueData) => {
  try {
    const response = await apiClient.post('/issues', issueData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateIssue = async (id, issueData) => {
  try {
    const response = await apiClient.put(`/issues/${id}`, issueData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteIssue = async (id) => {
  try {
    const response = await apiClient.delete(`/issues/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

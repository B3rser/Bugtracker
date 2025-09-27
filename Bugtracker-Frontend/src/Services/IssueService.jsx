import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const apiClient = axios.create({
  baseURL: API_URL,
});

const handleError = (error) => {
  if (error.response) {
    console.error('Server Error:', error.response.data);
    throw { error: error.response.data.error || 'An error occurred on the server.' };
  } else if (error.request) {
    console.error('Network Error:', error.request);
    throw { error: 'Network Error: Could not connect to the server.' };
  } else {
    console.error('Error:', error.message);
    throw { error: 'An unexpected error occurred.' };
  }
};

export const getAllIssues = async (params = {}) => {
  try {
    const response = await apiClient.get('/issues', { params });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getIssueById = async (id) => {
  try {
    const response = await apiClient.get(`/issues/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createIssue = async (issueData) => {
  try {
    const response = await apiClient.post('/issues', issueData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateIssue = async (id, issueData) => {
  try {
    const response = await apiClient.put(`/issues/${id}`, issueData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteIssue = async (id) => {
  try {
    const response = await apiClient.delete(`/issues/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

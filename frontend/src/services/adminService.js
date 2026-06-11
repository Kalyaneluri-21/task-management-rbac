import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const updateUserStatus = async (id, status) => {
  const response = await api.patch(
    `/admin/users/${id}/status`,
    { status }
  );

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(
    `/admin/users/${id}`
  );

  return response.data;
};

export const getAllTasks = async () => {
  const response = await api.get("/admin/tasks");
  return response.data;
};

export const deleteAnyTask = async (id) => {
  const response = await api.delete(`/admin/tasks/${id}`);
  return response.data;
};

export const getLogs = async () => {
  const response = await api.get("/admin/logs");
  return response.data;
};

export const getAnalytics = async () => {
  const response = await api.get("/admin/analytics");
  return response.data;
};
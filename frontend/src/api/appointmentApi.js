
import axiosClient from "./axiosClient";

export const listAppointments = () => {
  return axiosClient.get("/api/appointment");
};

export const createAppointment = (payload) => {
  return axiosClient.post("/api/appointment", payload);
};

export const updateAppointment = (id, payload) => {
  return axiosClient.put(`/api/appointment/${id}`, payload);
};

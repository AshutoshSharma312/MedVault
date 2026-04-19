
import axiosClient from "./axiosClient";

export const listDoctors = () => {
  return axiosClient.get("/api/doctor");
};

export const getDoctor = (id) => {
  return axiosClient.get(`/api/doctor/${id}`);
};

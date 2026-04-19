
import axiosClient from "./axiosClient";

const useMock = import.meta.env.VITE_USE_MOCK === "1";

const mockDB = {
  users: [
    { id:1, email:"admin@med.com", password:"admin", role:"ADMIN" },
  ]
};

export const register = (payload) => {
  if (useMock) {
    const exists = mockDB.users.find(u=>u.email===payload.email);
    if (exists) return Promise.reject({ response:{ data: 'Email exists' }});
    mockDB.users.push(payload);
    return Promise.resolve({ data: { message: 'Registered' } });
  }
  return axiosClient.post("/api/auth/register", payload);
};

export const login = (payload) => {
  if (useMock) {
    return Promise.resolve({ data: { token: "MOCK_TOKEN", role: "PATIENT" }});
  }
  return axiosClient.post("/api/auth/login", payload);
};

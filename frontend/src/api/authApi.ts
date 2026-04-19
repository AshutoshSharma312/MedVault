import axiosClient from "./axiosClient";

// If you want demo without backend, set VITE_USE_MOCK=1 in .env
const useMock = import.meta.env.VITE_USE_MOCK === "1";

// simple mock storage
const mockDB: any = {
  users: [
    { id:1, email:"admin@med.com", password:"admin", role:"ADMIN", firstName:"Admin" },
    { id:2, email:"doc@med.com", password:"doc", role:"DOCTOR", firstName:"Dr. Strange" },
    { id:3, email:"pat@med.com", password:"pat", role:"PATIENT", firstName:"Patient One" },
  ]
};

export const register = (payload: any) => {
  if (useMock) {
    const exists = mockDB.users.find((u:any)=>u.email===payload.email);
    if (exists) return Promise.reject({ response:{ data: 'Email exists' }});
    const id = mockDB.users.length+1;
    const user = { id, ...payload };
    mockDB.users.push(user);
    return Promise.resolve({ data: { message: 'Registered' } });
  }
  return axiosClient.post("/api/auth/register", payload);
};

export const login = (payload: any) => {
  if (useMock) {
    const user = mockDB.users.find((u:any)=>u.email===payload.email && u.password===payload.password);
    if (!user) return Promise.reject({ response:{ data: 'Invalid credentials' }});
    const token = "MOCK_TOKEN_"+user.role;
    return Promise.resolve({ data: { token, role:user.role }});
  }
  return axiosClient.post("/api/auth/login", payload);
};

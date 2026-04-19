import axiosClient from "./axiosClient";
const useMock = import.meta.env.VITE_USE_MOCK === "1";

const mockDoctors = [
  { id:1, firstName:"Amit", lastName:"Sharma", specialization:"Cardiology", hospitalName:"City Hospital" },
  { id:2, firstName:"Neha", lastName:"Khan", specialization:"Dermatology", hospitalName:"Skin Care Clinic" },
  { id:3, firstName:"Rohit", lastName:"Sen", specialization:"Orthopedics", hospitalName:"Bone Center" },
];

export const listDoctors = () => {
  if (useMock) return Promise.resolve({ data: mockDoctors });
  return axiosClient.get("/api/doctor");
};

export const getDoctor = (id:number) => {
  if (useMock) {
    const d = mockDoctors.find(d=>d.id===id);
    return Promise.resolve({ data: d });
  }
  return axiosClient.get(`/api/doctor/${id}`);
};

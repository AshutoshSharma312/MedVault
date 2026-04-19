import axiosClient from "./axiosClient";
const useMock = import.meta.env.VITE_USE_MOCK === "1";

let mockAppointments = [
  { id:1, doctorId:1, patientId:3, datetime:"2025-11-25T10:00", status:"CONFIRMED", notes:"Follow-up" },
  { id:2, doctorId:2, patientId:3, datetime:"2025-11-20T12:00", status:"COMPLETED", notes:"Routine check" },
];

export const listAppointments = (role?:string) => {
  if (useMock) return Promise.resolve({ data: mockAppointments });
  return axiosClient.get("/api/appointment");
};

export const createAppointment = (payload:any) => {
  if (useMock) {
    const id = mockAppointments.length+1;
    const ap = { id, ...payload, status:"PENDING" };
    mockAppointments.push(ap);
    return Promise.resolve({ data: ap });
  }
  return axiosClient.post("/api/appointment", payload);
};

export const updateAppointment = (id:number, payload:any) => {
  if (useMock) {
    mockAppointments = mockAppointments.map(a=> a.id===id? {...a, ...payload}: a);
    return Promise.resolve({ data: mockAppointments.find(a=>a.id===id) });
  }
  return axiosClient.put(`/api/appointment/${id}`, payload);
};

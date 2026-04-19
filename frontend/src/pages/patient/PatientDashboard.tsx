import React, { useEffect, useState } from "react";
import { listDoctors } from "../../api/doctorApi";
import { listAppointments, createAppointment } from "../../api/appointmentApi";

export default function PatientDashboard(){
  const [doctors, setDoctors] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [slot, setSlot] = useState("");

  useEffect(()=>{ listDoctors().then(r=>setDoctors(r.data)).catch(()=>{}); listAppointments().then(r=>setAppointments(r.data)).catch(()=>{}); },[]);

  const book = async () => {
    if (!selectedDoctor || !slot) return alert("select doctor and slot");
    const res = await createAppointment({ doctorId:selectedDoctor, patientId:3, datetime:slot });
    setAppointments(prev=>[res.data, ...prev]);
    alert("Appointment requested");
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold">Patient Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Browse Doctors</h2>
          {doctors.map(d=>(
            <div key={d.id} className="border-b py-2">
              <div className="font-semibold">{d.firstName} {d.lastName}</div>
              <div className="text-sm">{d.specialization} - {d.hospitalName}</div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Book Appointment</h2>
          <select className="w-full p-2 border rounded mb-2" onChange={e=>setSelectedDoctor(Number(e.target.value))}>
            <option value="">Select doctor</option>
            {doctors.map(d=> <option key={d.id} value={d.id}>{d.firstName} {d.lastName} ({d.specialization})</option>)}
          </select>
          <input type="datetime-local" className="w-full p-2 border rounded mb-2" value={slot} onChange={e=>setSlot(e.target.value)} />
          <button onClick={book} className="bg-blue-600 text-white p-2 rounded">Request Appointment</button>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">My Appointments</h2>
        {appointments.map(a=>(
          <div key={a.id} className="border-b py-2">
            <div><b>Doctor:</b> {a.doctorId}</div>
            <div><b>Date:</b> {a.datetime}</div>
            <div><b>Status:</b> {a.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

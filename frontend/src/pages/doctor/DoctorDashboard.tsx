import React, { useEffect, useState } from "react";
import { listAppointments, updateAppointment } from "../../api/appointmentApi";

export default function DoctorDashboard(){
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(()=>{ listAppointments().then(r=>setAppointments(r.data)).catch(()=>{}); },[]);

  const accept = async (id:number) => {
    await updateAppointment(id, { status: 'CONFIRMED' });
    setAppointments(prev=> prev.map(a=> a.id===id? {...a, status:'CONFIRMED'}: a));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Appointment Requests</h2>
        {appointments.map(a=>(
          <div key={a.id} className="border-b py-2">
            <div><b>PatientId:</b> {a.patientId}</div>
            <div><b>Date:</b> {a.datetime}</div>
            <div><b>Status:</b> {a.status}</div>
            {a.status === 'PENDING' && <button onClick={()=>accept(a.id)} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">Accept</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

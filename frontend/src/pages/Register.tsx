import React, { useState } from "react";
import { register as registerApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState<any>({ role: "PATIENT" });
  const [err, setErr] = useState<string | null>(null);

  const handle = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      await registerApi(form);
      nav("/login");
    } catch (e: any) {
      setErr(JSON.stringify(e.response?.data || e.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="grid grid-cols-2 gap-4">
        <input name="firstName" onChange={handle} className="p-2 border rounded" placeholder="First name" />
        <input name="lastName" onChange={handle} className="p-2 border rounded" placeholder="Last name" />
        <input name="email" onChange={handle} className="col-span-2 p-2 border rounded" placeholder="Email" />
        <input name="password" type="password" onChange={handle} className="col-span-2 p-2 border rounded" placeholder="Password" />
        <select name="role" onChange={handle} className="p-2 border rounded">
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
        </select>
        <button className="col-span-2 bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}

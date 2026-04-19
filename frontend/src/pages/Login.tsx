import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [err, setErr] = useState<string | null>(null);
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      await login(email, password);
      const r = localStorage.getItem("medvault_role") || role;
      nav(r === "DOCTOR" ? "/doctor" : r === "ADMIN" ? "/admin" : "/patient");
    } catch (e: any) {
      setErr(e.response?.data || e.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {err && <div className="text-red-600 mb-2">{String(err)}</div>}
      <form onSubmit={submit} className="space-y-4">
        <select value={role} onChange={e=>setRole(e.target.value)} className="w-full p-2 border rounded">
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
          <option value="ADMIN">Admin</option>
        </select>
        <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border rounded" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}

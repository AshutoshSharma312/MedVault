import React from "react";

export default function AdminDashboard(){
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <p>Use backend admin APIs to approve/reject users (mock included).</p>
        <p>Stats and management will be added here (simple counts in mock).</p>
      </div>
    </div>
  );
}

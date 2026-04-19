import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <motion.nav initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="text-xl font-bold text-gray-700">MedVault</Link>
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-gray-600">Home</Link>
            {!user ? (
              <>
                <Link to="/login" className="py-2 px-3 bg-blue-600 text-white rounded">Login</Link>
                <Link to="/register" className="py-2 px-3 border rounded">Register</Link>
              </>
            ) : (
              <>
                {user.role === "PATIENT" && <Link to="/patient" className="py-2 px-3">Dashboard</Link>}
                {user.role === "DOCTOR" && <Link to="/doctor" className="py-2 px-3">Dashboard</Link>}
                {user.role === "ADMIN" && <Link to="/admin" className="py-2 px-3">Admin</Link>}
                <button onClick={()=>{ logout(); nav('/login'); }} className="py-2 px-3 border rounded">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

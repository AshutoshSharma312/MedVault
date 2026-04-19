import React from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/hero.jpg";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div initial={{ x:-50, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.6 }}>
          <h1 className="text-4xl font-bold mb-4">MedVault — Your Personal Health Records</h1>
          <p className="mb-4">Book appointments, manage records, and connect with verified doctors.</p>
          <div className="space-x-3">
            <a href="/register" className="bg-green-600 text-white px-4 py-2 rounded">Get Started</a>
            <a href="/login" className="border px-4 py-2 rounded">Login</a>
          </div>
        </motion.div>
        <motion.div initial={{ x:50, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.6 }}>
          <img src={heroImg} alt="hero" className="rounded shadow" />
        </motion.div>
      </div>
    </div>
  );
}

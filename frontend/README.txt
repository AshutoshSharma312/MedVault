MedVault Full Frontend (complete demo-ready)
-------------------------------------------
This frontend runs with Vite + React + TypeScript + Tailwind + Framer Motion.
It has a mock backend fallback. To use mock mode, create a .env file in the frontend folder with:
  VITE_USE_MOCK=1

Steps:
  1. npm install
  2. npm run dev
  3. Open http://localhost:5173

If you want it to connect to your Java backend, set:
  VITE_API_BASE=http://localhost:8080
  VITE_USE_MOCK=0

Default demo accounts (mock):
  admin@med.com / admin
  doc@med.com / doc
  pat@med.com / pat


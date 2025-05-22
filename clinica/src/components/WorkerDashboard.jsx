// src/components/WorkerDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WorkerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Bienvenido, Médico</h1>
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default WorkerDashboard;
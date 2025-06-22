import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white p-4 space-y-4 min-h-screen">
      <h2 className="text-xl font-bold mb-4">🧬 Om Diagnostic</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/doctor" className="hover:text-blue-200">👨‍⚕️ Doctors</Link>
        <Link to="/agent" className="hover:text-blue-200">🧑‍🔬 Lab Agents</Link>
        <Link to="/lab" className="hover:text-blue-200">🧪 Lab</Link>
        <Link to="/lab/upload" className="hover:text-blue-200">📤 Upload Report</Link>
        <Link to="/patient/download" className="hover:text-blue-200">📥 Download Reports</Link>
        <Link to="/admin-dashboard" className="hover:text-blue-200">📊 Admin Dashboard</Link>
        <Link to="/salesman-dashboard" className="hover:text-blue-200">💼 Salesman Dashboard</Link>
      </nav>
    </div>
  );
};

export default Sidebar;

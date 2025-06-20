import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import SalesmanDashboard from './pages/SalesmanDashboard';
import IndexPage from './pages/IndexPage';
import DoctorForm from './pages/DoctorForm';
import AgentForm from './pages/AgentForm';
import LabForm from './pages/LabForm';
import HomePage from './pages/HomePage';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/salesman-dashboard" element={<SalesmanDashboard />} />
          <Route path="/" element={<IndexPage />} />
          <Route path="/doctor" element={<DoctorForm />} />
          <Route path="/agent" element={<AgentForm />} />
          <Route path="/lab" element={<LabForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

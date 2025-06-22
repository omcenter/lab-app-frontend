import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientLogin from './pages/PatientLogin';
import PatientDashboard from './pages/PatientDashboard';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import SalesmanDashboard from './pages/SalesmanDashboard';
import DoctorForm from './pages/DoctorForm';
import AgentForm from './pages/AgentForm';
import LabForm from './pages/LabForm';
import LabUploadPage from './pages/LabUploadPage'; // ✅ Make sure this file exists
import HomePage from './pages/HomePage';
import PatientDownload from './components/PatientDownload';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/patient" element={<PatientLogin />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/patient/download" element={<PatientDownload />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/salesman-dashboard" element={<SalesmanDashboard />} />
          <Route path="/doctor" element={<DoctorForm />} />
          <Route path="/agent" element={<AgentForm />} />
          <Route path="/lab" element={<LabForm />} />
          <Route path="/lab/upload" element={<LabUploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

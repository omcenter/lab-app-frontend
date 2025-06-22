import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientLogin from './pages/PatientLogin';
import PatientDashboard from './pages/PatientDashboard';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import SalesmanDashboard from './pages/SalesmanDashboard';
import DoctorForm from './pages/DoctorForm';
import AgentForm from './pages/AgentForm';
import LabForm from './pages/LabForm';
import LabUploadPage from './pages/LabUploadPage';
import HomePage from './pages/HomePage';
import PatientDownload from './pages/PatientDownload';
import './styles/style.css';
import './styles/sidebar.css';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Router>
      <div className="app-layout">
        {/* Hamburger Icon */}
        <button className="hamburger" onClick={() => setDrawerOpen(!drawerOpen)}>
          ☰
        </button>

        {/* Sidebar Drawer */}
        <aside className={`sidebar ${drawerOpen ? 'open' : ''}`}>
          <h2>Om Lab</h2>
          <nav>
            <Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link>
            <Link to="/doctor" onClick={() => setDrawerOpen(false)}>Doctor</Link>
            <Link to="/agent" onClick={() => setDrawerOpen(false)}>Lab Agent</Link>
            <Link to="/lab" onClick={() => setDrawerOpen(false)}>Lab</Link>
            <Link to="/lab/upload" onClick={() => setDrawerOpen(false)}>Upload Report</Link>
            <Link to="/patient" onClick={() => setDrawerOpen(false)}>Patient Login</Link>
            <Link to="/patient/download" onClick={() => setDrawerOpen(false)}>Download Report</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
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
        </main>
      </div>
    </Router>
  );
}

export default App;

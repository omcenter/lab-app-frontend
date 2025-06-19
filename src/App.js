import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import DoctorForm from './pages/DoctorForm';
import AgentForm from './pages/AgentForm';
import LabForm from './pages/LabForm';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
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

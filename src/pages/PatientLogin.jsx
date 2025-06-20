import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const PatientLogin = () => {
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      navigate(`/patient-dashboard?mobile=${mobile}`);
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  return (
    <div className="login-container">
      <h2>Patient Login</h2>
      <form onSubmit={handleLogin}>
        <label>Mobile Number</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          maxLength="10"
          placeholder="Enter your mobile number"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default PatientLogin;

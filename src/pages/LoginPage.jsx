import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const LoginPage = () => {
  const [role, setRole] = useState('salesman');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple hardcoded login for now
    if (role === 'admin' && email === 'admin@om.com' && password === 'admin123') {
      localStorage.setItem('role', 'admin');
      navigate('/admin-dashboard');
    } else if (role === 'salesman' && email === 'sales@om.com' && password === 'sales123') {
      localStorage.setItem('role', 'salesman');
      navigate('/salesman-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Om Diagnostic Center</h2>
      <form onSubmit={handleLogin}>
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="salesman">Salesman</option>
          <option value="admin">Admin</option>
        </select>

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

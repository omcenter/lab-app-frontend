import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const IndexPage = () => {
  return (
    <div className="homepage">
      <h1>OM Diagnostic Center</h1>
      <div className="box-container">
        <Link to="/doctor" className="home-box">Doctor</Link>
        <Link to="/agent" className="home-box">Lab Agent</Link>
        <Link to="/lab" className="home-box">Lab</Link>
      </div>

      <a href="https://wa.me/919990611114" target="_blank" className="whatsapp">💬</a>
    </div>
  );
};

export default IndexPage;

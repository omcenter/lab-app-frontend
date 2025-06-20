import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const HomePage = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [showWelcome, setShowWelcome] = useState(true);
  const [suggestion, setSuggestion] = useState({ name: '', phone: '', message: '' });

  // ⏰ Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 💥 Welcome animation
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Submit suggestion
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://lab-app-backend.onrender.com/submit-suggestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(suggestion),
    })
      .then(() => alert('Suggestion submitted!'))
      .catch(() => alert('Error submitting suggestion'));
    setSuggestion({ name: '', phone: '', message: '' });
  };

  return (
    <div className="home-container">
      {showWelcome && (
        <div className="welcome-animation">
          <h1>Welcome to Om Diagnostic Center</h1>
          <p style={{ textAlign: 'center', marginBottom: '10px' }}>🕒 {time}</p>
        </div>
      )}

      <h2 className="headline">Welcome to Om Diagnostic Center</h2>

      <div className="card-container">
        <Link to="/doctor" className="card">Doctor</Link>
        <Link to="/agent" className="card">Lab Agent</Link>
        <Link to="/lab" className="card">Lab</Link>
        <Link to="/patient" className="card">Patient</Link>
      </div>

      <form className="suggestion-box" onSubmit={handleSubmit}>
        <h3>Suggestion Box</h3>
        <input
          type="text"
          placeholder="Your Name (optional)"
          value={suggestion.name}
          onChange={(e) => setSuggestion({ ...suggestion, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number (optional)"
          value={suggestion.phone}
          onChange={(e) => setSuggestion({ ...suggestion, phone: e.target.value })}
        />
        <textarea
          placeholder="Your Suggestion"
          required
          value={suggestion.message}
          onChange={(e) => setSuggestion({ ...suggestion, message: e.target.value })}
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      <a
        href="https://wa.me/918882447570"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 Chat
      </a>

      <Footer />
    </div>
  );
};

export default HomePage;

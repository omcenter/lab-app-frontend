import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const HomePage = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [showWelcome, setShowWelcome] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    <div className={`app-layout ${drawerOpen ? 'drawer-open' : ''}`}>
      {/* 🟦 Sidebar */}
      <div className={`sidebar ${drawerOpen ? 'open' : ''}`}>
      <button className="hamburger" onClick={() => setDrawerOpen(!drawerOpen)}>☰</button>
      <div className="main-content">...</div>
        <h2>Navigation</h2>
        <nav>
          <Link to="/doctor" onClick={() => setDrawerOpen(false)}>Doctor</Link>
          <Link to="/agent" onClick={() => setDrawerOpen(false)}>Lab Agent</Link>
          <Link to="/lab" onClick={() => setDrawerOpen(false)}>Lab</Link>
          <Link to="/patient" onClick={() => setDrawerOpen(false)}>Patient</Link>
        </nav>
      </div>

       

      {/* 🔷 Main Content */}
      <div className="main-content">
        {showWelcome && (
          <div className="welcome-animation">
            <h1>Welcome to Om Diagnostic Center</h1>
            <p style={{ textAlign: 'center', marginBottom: '10px' }}>🕒 {time}</p>
          </div>
        )}

        <h2 className="headline">Welcome to Om Diagnostic Center</h2>

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
    </div>
  );
};

export default HomePage;

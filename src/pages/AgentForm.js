import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/style.css';

const AgentForm = () => {
  const [agents, setAgents] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [form, setForm] = useState({
    agent: '',
    address: '',
    phone: '',
    serial: '',
    paymentMode: '',
    notes: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('https://lab-app-backend.onrender.com/api/agents')
      .then(res => setAgents(res.data))
      .catch(() => setAgents([]));

    axios.get('https://lab-app-backend.onrender.com/api/tests')
      .then(res => setTests(res.data))
      .catch(() => setTests([]));
  }, []);

  const addTest = (test) => {
    if (test && test.trim() !== '' && !selectedTests.includes(test)) {
      setSelectedTests([...selectedTests, test.trim()]);
    }
  };

  const removeTest = (test) => {
    setSelectedTests(selectedTests.filter(t => t !== test));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTests.length === 0) return alert('Please add at least one test.');

    try {
      const res = await axios.post(
        'https://lab-app-backend.onrender.com/api/agent/submit',
        { ...form, tests: selectedTests }
      );
      setMessage(res.data.message || 'Form submitted successfully!');
    } catch (err) {
      setMessage('Submission failed. Please try again.');
    }

    setForm({
      agent: '',
      address: '',
      phone: '',
      serial: '',
      paymentMode: '',
      notes: ''
    });
    setSelectedTests([]);
  };

  return (
    <div className="form-container">
      <h2>Lab Agent Submission</h2>
      <form onSubmit={handleSubmit}>
        <select value={form.agent} onChange={e => setForm({ ...form, agent: e.target.value })} required>
          <option value="">Select Agent</option>
          {agents.map((a, idx) => (
            <option key={idx} value={a}>{a}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Patient Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Serial Number"
          value={form.serial}
          onChange={e => setForm({ ...form, serial: e.target.value })}
        />

        <input
          list="testList"
          placeholder="Search Test and press Enter"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTest(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <datalist id="testList">
          {tests.map((test, idx) => <option key={idx} value={test} />)}
        </datalist>

        {selectedTests.length > 0 && (
          <ul className="test-list">
            {selectedTests.map(test => (
              <li key={test} className="test-item">
                {test}
                <button type="button" onClick={() => removeTest(test)}>❌</button>
              </li>
            ))}
          </ul>
        )}

        <select value={form.paymentMode} onChange={e => setForm({ ...form, paymentMode: e.target.value })} required>
          <option value="">Mode of Payment</option>
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
        </select>

        <textarea
          placeholder="Additional Notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default AgentForm;

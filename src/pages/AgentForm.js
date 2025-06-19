import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

const AgentForm = () => {
  const [agents, setAgents] = useState([]);
  const [tests, setTests] = useState([]);
  const [testList, setTestList] = useState([]);
  const [form, setForm] = useState({
    agent: '',
    patientName: '',
    address: '',
    phone: '',
    payment: '',
    notes: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/agents').then(res => setAgents(res.data));
    axios.get('http://localhost:4000/api/tests').then(res => setTests(res.data));
  }, []);

  const addTest = (name, price) => {
    if (!name || !price) return;
    if (testList.some(t => t.name === name)) return;
    setTestList([...testList, { name, price }]);
  };

  const removeTest = (name) => {
    setTestList(testList.filter(t => t.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (testList.length === 0) return alert('Add at least one test');

    const res = await axios.post('http://localhost:4000/api/agent/submit', {
      ...form,
      tests: testList
    });

    setMessage(res.data.message);
    setForm({ agent: '', patientName: '', address: '', phone: '', payment: '', notes: '' });
    setTestList([]);
  };

  return (
    <div className="form-container">
      <h2>Lab Agent Submission</h2>
      <form onSubmit={handleSubmit}>
        <select value={form.agent} onChange={e => setForm({ ...form, agent: e.target.value })} required>
          <option value="">Select Agent</option>
          {agents.map(agent => <option key={agent}>{agent}</option>)}
        </select>

        <input type="text" placeholder="Patient Name" value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })} required />
        <input type="text" placeholder="Patient Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />
        <input type="tel" placeholder="Patient Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />

        <input list="testOptions" placeholder="Search Test" id="testSearch" />
        <datalist id="testOptions">
          {tests.map(test => <option key={test} value={test} />)}
        </datalist>

        <input type="number" id="testPrice" placeholder="Test Price ₹" />
        <button type="button" onClick={() => {
          const testName = document.getElementById('testSearch').value;
          const price = document.getElementById('testPrice').value;
          addTest(testName, price);
          document.getElementById('testSearch').value = '';
          document.getElementById('testPrice').value = '';
        }}>Add Test</button>

        <ul className="test-list">
          {testList.map(test => (
            <li key={test.name} className="test-item">
              {test.name} - ₹{test.price} 
              <button type="button" onClick={() => removeTest(test.name)}>❌</button>
            </li>
          ))}
        </ul>

        <select value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })} required>
          <option value="">Payment Mode</option>
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
          <option>Online</option>
        </select>

        <textarea placeholder="Additional Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}></textarea>
        <button type="submit">Submit</button>
      </form>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default AgentForm;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

const LabForm = () => {
  const [tests, setTests] = useState([]);
  const [testList, setTestList] = useState([]);
  const [form, setForm] = useState({
    patientName: '',
    address: '',
    phone: '',
    lab: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
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

    const res = await fetch('http://localhost:4000/api/lab/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, tests: testList })
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'receipt.pdf';
      a.click();
      setMessage('PDF Receipt downloaded!');
    } else {
      setMessage('Failed to generate PDF.');
    }
  };

  return (
    <div className="form-container">
      <h2>Lab Receipt Generator</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Patient Name" value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })} required />
        <input type="text" placeholder="Patient Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />
        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />

        <select value={form.lab} onChange={e => setForm({ ...form, lab: e.target.value })} required>
          <option value="">Select Lab</option>
          <option>OM Diagnostic Center</option>
          <option>PathCare</option>
          <option>Metropolis</option>
          <option>SRL</option>
        </select>

        <input list="labTestList" placeholder="Search Test" id="labTest" />
        <datalist id="labTestList">
          {tests.map(test => <option key={test} value={test} />)}
        </datalist>

        <input type="number" id="labTestPrice" placeholder="Test Price ₹" />
        <button type="button" onClick={() => {
          const testName = document.getElementById('labTest').value;
          const price = document.getElementById('labTestPrice').value;
          addTest(testName, price);
          document.getElementById('labTest').value = '';
          document.getElementById('labTestPrice').value = '';
        }}>Add Test</button>

        <ul className="test-list">
          {testList.map(test => (
            <li key={test.name} className="test-item">
              {test.name} - ₹{test.price} 
              <button type="button" onClick={() => removeTest(test.name)}>❌</button>
            </li>
          ))}
        </ul>

        <button type="submit">Generate Receipt</button>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default LabForm;

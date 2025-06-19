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
    axios.get('https://lab-app-backend.onrender.com/api/tests')
      .then(res => {
        const rawTests = res.data.tests || res.data;
        const namesOnly = rawTests.map(t => typeof t === 'string' ? t : t.name);
        setTests(namesOnly);
        console.log("Loaded test options:", namesOnly);
      })
      .catch(err => {
        console.error("Error loading tests:", err);
        setTests([]);
      });
  }, []);

  const addTest = () => {
    const name = document.getElementById('labTest').value.trim();
    const price = document.getElementById('labTestPrice').value.trim();

    if (!name || !price) return;
    if (testList.some(t => t.name === name)) return;

    setTestList(prev => [...prev, { name, price }]);
    document.getElementById('labTest').value = '';
    document.getElementById('labTestPrice').value = '';
  };

  const removeTest = (name) => {
    setTestList(testList.filter(t => t.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (testList.length === 0) return alert('Add at least one test');

    try {
      const res = await fetch('https://lab-app-backend.onrender.com/api/lab/submit', {
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
        setMessage('✅ PDF Receipt downloaded!');
      } else {
        setMessage('❌ Failed to generate PDF.');
      }
    } catch (err) {
      console.error('Submit failed:', err);
      setMessage('❌ Submission error occurred.');
    }
  };

  return (
    <div className="form-container">
      <h2>Lab Receipt Generator</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={e => setForm({ ...form, patientName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Patient Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          required
        />

        <select
          value={form.lab}
          onChange={e => setForm({ ...form, lab: e.target.value })}
          required
        >
          <option value="">Select Lab</option>
          <option>OM Diagnostic Center</option>
          <option>PathCare</option>
          <option>Metropolis</option>
          <option>SRL</option>
        </select>

        {/* Searchable test input using datalist */}
        <input
          list="labTestList"
          id="labTest"
          placeholder="Search Test"
        />
        <datalist id="labTestList">
          {tests.map((test, idx) => (
            <option key={idx} value={test}></option>
          ))}
        </datalist>

        <input
          type="number"
          id="labTestPrice"
          placeholder="Test Price ₹"
        />
        <button type="button" onClick={addTest}>
          Add Test
        </button>

        {testList.length > 0 && (
          <ul className="test-list">
            {testList.map(test => (
              <li key={test.name} className="test-item">
                {test.name} - ₹{test.price}
                <button type="button" onClick={() => removeTest(test.name)}>❌</button>
              </li>
            ))}
          </ul>
        )}

        <button type="submit">Generate Receipt</button>
      </form>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default LabForm;

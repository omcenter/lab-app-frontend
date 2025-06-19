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
    lab: '',
    testName: '',
    testPrice: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://lab-app-backend.onrender.com/api/tests')
      .then(res => {
        const rawTests = res.data.tests || res.data;
        const names = rawTests.map(t => typeof t === 'string' ? t : t.name);
        setTests(names);
      })
      .catch(err => {
        console.error("Error fetching tests:", err);
        setTests([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const addTest = () => {
    const name = form.testName.trim();
    const price = form.testPrice.trim();
    if (!name || !price) return;
    if (testList.some(t => t.name === name)) return;
    setTestList([...testList, { name, price }]);
    setForm({ ...form, testName: '', testPrice: '' });
  };

  const removeTest = (name) => {
    setTestList(testList.filter(t => t.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (testList.length === 0) return alert('Add at least one test');

    const res = await fetch('https://lab-app-backend.onrender.com/api/lab/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: form.patientName,
        address: form.address,
        phone: form.phone,
        lab: form.lab,
        tests: testList
      })
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

        {/* ✅ Test input with datalist */}
        <input
          list="labTestList"
          placeholder="Search Test"
          value={form.testName}
          onChange={e => setForm({ ...form, testName: e.target.value })}
        />
        <datalist id="labTestList">
          {tests.map((test, i) => (
            <option key={i} value={test} />
          ))}
        </datalist>

        <input
          type="number"
          placeholder="Test Price ₹"
          value={form.testPrice}
          onChange={e => setForm({ ...form, testPrice: e.target.value })}
        />

        <button type="button" onClick={addTest}>Add Test</button>

        {testList.length > 0 && (
          <ul className="test-list">
            {testList.map(test => (
              <li key={test.name}>
                {test.name} - ₹{test.price}
                <button type="button" onClick={() => removeTest(test.name)}>❌</button>
              </li>
            ))}
          </ul>
        )}

        <button type="submit">Generate Receipt</button>
      </form>

      {loading && <p>Loading tests...</p>}
      {!loading && tests.length === 0 && <p style={{ color: 'red' }}>⚠️ No tests loaded</p>}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default LabForm;

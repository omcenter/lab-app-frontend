import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.css';
import { useNavigate } from 'react-router-dom'; // ✅ For navigating to upload page

const LabForm = () => {
  const [tests, setTests] = useState([]);
  const [testList, setTestList] = useState([]);
  const [selectedTest, setSelectedTest] = useState('');
  const [testPrice, setTestPrice] = useState('');
  const [form, setForm] = useState({
    patientName: '',
    address: '',
    phone: '',
    lab: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://lab-app-backend.onrender.com/api/tests')
      .then(res => {
        const rawTests = res.data.tests || res.data;
        const namesOnly = rawTests.map(t => typeof t === 'string' ? t : t.name);
        setTests(namesOnly);
      })
      .catch(err => {
        console.error("Error fetching tests:", err);
        setTests([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const addTest = () => {
    if (!selectedTest || !testPrice) return;
    if (testList.some(t => t.name === selectedTest)) return;
    setTestList([...testList, { name: selectedTest, price: testPrice }]);
    setSelectedTest('');
    setTestPrice('');
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

        <select value={selectedTest} onChange={e => setSelectedTest(e.target.value)} required>
          <option value="">Select Test</option>
          {tests.map((test, idx) => (
            <option key={idx} value={test}>{test}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Test Price ₹"
          value={testPrice}
          onChange={e => setTestPrice(e.target.value)}
        />

        <button type="button" onClick={addTest}>Add Test</button>

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

      {loading && <p>Loading tests...</p>}
      {!loading && tests.length === 0 && <p style={{ color: 'red' }}>⚠️ No tests loaded</p>}
      {message && <p className="success-message">{message}</p>}

      {/* ✅ Upload Section */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h3>Already Have a Test Report?</h3>
        <p>Upload the final test report and invoice here.</p>
        <button
          type="button"
          onClick={() => navigate('/lab/upload')}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#003366', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
        >
          Upload Report
        </button>
      </div>
    </div>
  );
};

export default LabForm;

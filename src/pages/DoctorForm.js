import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

const DoctorForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [form, setForm] = useState({
    doctor: '',
    patientName: '',
    gender: '',
    age: '',
    notes: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('https://lab-app-backend.onrender.com/api/doctors')
      .then(res => setDoctors(res.data))
      .catch(() => setDoctors([]));

    axios.get('https://lab-app-backend.onrender.com/api/tests')
      .then(res => {
        const raw = res.data.tests || res.data;
        const names = raw.map(t => typeof t === 'string' ? t : t.name);
        setTests(names);
      })
      .catch(() => setTests([]));
  }, []);

  const addTest = (name, price) => {
    if (!name || !price) return;
    if (selectedTests.some(t => t.name === name)) return;
    setSelectedTests([...selectedTests, { name, price }]);
  };

  const removeTest = (name) => {
    setSelectedTests(selectedTests.filter(t => t.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTests.length === 0) return alert('Please add at least one test.');

    try {
      const res = await axios.post(
        'https://lab-app-backend.onrender.com/api/doctor/submit',
        { ...form, tests: selectedTests }
      );
      setMessage(res.data.message || 'Form submitted successfully!');
    } catch (err) {
      setMessage('Submission failed. Please try again.');
    }

    setForm({ doctor: '', patientName: '', gender: '', age: '', notes: '' });
    setSelectedTests([]);
  };

  return (
    <div className="form-container">
      <h2>Doctor Submission</h2>
      <form onSubmit={handleSubmit}>
        <select value={form.doctor} onChange={e => setForm({ ...form, doctor: e.target.value })} required>
          <option value="">Select Doctor</option>
          {doctors.map((doc, idx) => (
            <option key={idx} value={doc}>{doc}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={e => setForm({ ...form, patientName: e.target.value })}
          required
        />

        <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} required>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          placeholder="Age or DOB"
          value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })}
          required
        />

        <select id="doctorTestSelect">
          <option value="">Select Test</option>
          {tests.map((test, idx) => (
            <option key={idx} value={test}>{test}</option>
          ))}
        </select>

        <input type="number" id="doctorTestPrice" placeholder="Test Price ₹" />
        <button
          type="button"
          onClick={() => {
            const testName = document.getElementById('doctorTestSelect').value;
            const price = document.getElementById('doctorTestPrice').value;
            addTest(testName, price);
            document.getElementById('doctorTestSelect').value = '';
            document.getElementById('doctorTestPrice').value = '';
          }}
        >
          Add Test
        </button>

        {selectedTests.length > 0 && (
          <ul className="test-list">
            {selectedTests.map(test => (
              <li key={test.name} className="test-item">
                {test.name} - ₹{test.price}
                <button type="button" onClick={() => removeTest(test.name)}>❌</button>
              </li>
            ))}
          </ul>
        )}

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

export default DoctorForm;

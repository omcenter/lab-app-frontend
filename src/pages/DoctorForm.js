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

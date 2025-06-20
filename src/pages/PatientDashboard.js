import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PatientDashboard = () => {
  const [searchParams] = useSearchParams();
  const mobile = searchParams.get('mobile');
  const [tests, setTests] = useState([]);

  useEffect(() => {
    if (mobile) {
      fetch(`https://lab-app-backend.onrender.com/api/reports/${mobile}`)
        .then(res => res.json())
        .then(data => setTests(data))
        .catch(err => console.error(err));
    }
  }, [mobile]);

  return (
    <div style={{ padding: '30px' }}>
      <h2>Welcome, Patient</h2>
      <p>Mobile: {mobile}</p>
      <h3>Your Test Reports</h3>

      {tests.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul>
          {tests.map((item, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <strong>Test:</strong> {item.testName}<br />
              <strong>Date:</strong> {item.date}<br />
              {item.reportUrl && (
                <a href={item.reportUrl} target="_blank" rel="noopener noreferrer">📄 Download Report</a>
              )}<br />
              {item.invoiceUrl && (
                <a href={item.invoiceUrl} target="_blank" rel="noopener noreferrer">🧾 Download Invoice</a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDashboard;

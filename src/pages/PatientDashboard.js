import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// ✅ Convert Google Drive view link to direct download
function convertToDownloadLink(viewLink) {
  const match = viewLink?.match(/[-\w]{25,}/);
  return match ? `https://drive.google.com/uc?id=${match[0]}&export=download` : viewLink;
}

const PatientDashboard = () => {
  const [searchParams] = useSearchParams();
  const mobile = searchParams.get('mobile');

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!mobile) {
      setError("❌ No mobile number provided in the URL.");
      setLoading(false);
      return;
    }

    fetch(`https://lab-app-backend.onrender.com/api/reports/${mobile}`)
      .then(res => res.json())
      .then(data => {
        setTests(data);
        setError('');
      })
      .catch(err => {
        console.error(err);
        setError("❌ Failed to load reports. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [mobile]);

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#003366', marginBottom: '10px' }}>Welcome, Patient</h2>
      <p><strong>Mobile:</strong> {mobile || 'Not provided'}</p>
      <h3 style={{ marginTop: '20px' }}>Your Test Reports</h3>

      {loading ? (
        <p>🔄 Loading reports...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : tests.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {tests.map((item, index) => (
            <li key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
              <p><strong>Test:</strong> {item.testName}</p>
              <p><strong>Date:</strong> {item.date}</p>
              {item.reportUrl && (
                <p>
                  <a
                    href={convertToDownloadLink(item.reportUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#007BFF', textDecoration: 'underline' }}
                  >
                    📄 Download Report
                  </a>
                </p>
              )}
              {item.invoiceUrl && (
                <p>
                  <a
                    href={convertToDownloadLink(item.invoiceUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#28a745', textDecoration: 'underline' }}
                  >
                    🧾 Download Invoice
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDashboard;

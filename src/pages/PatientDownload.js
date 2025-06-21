import React, { useState } from 'react';
import axios from 'axios';

const PatientDownload = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDownload = async () => {
    if (!mobile.trim()) return alert("Enter mobile number");

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.get(`https://lab-app-backend.onrender.com/api/patient/reports?mobile=${mobile}`);
      const { reportLink, invoiceLink } = res.data;

      // Auto-download both files
      triggerDownload(reportLink);
      triggerDownload(invoiceLink);

      setMessage("✅ Report & Invoice downloaded.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Report not found for this number.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 bg-white shadow rounded max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Download Your Report</h2>

      <input
        type="text"
        placeholder="Enter your mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-3"
      />

      <button
        onClick={handleDownload}
        disabled={loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Fetching...' : 'Download Report'}
      </button>

      {message && <p className="text-center mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default PatientDownload;

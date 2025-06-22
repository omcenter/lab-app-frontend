import React, { useState } from 'react';
import Papa from 'papaparse';

const PatientDownload = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!mobile.trim()) {
      alert("Enter mobile number");
      return;
    }

    setLoading(true);
    setMessage('');
    setResults([]);

    try {
      const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv'; // replace with your CSV URL

      Papa.parse(sheetUrl, {
        download: true,
        header: true,
        complete: (data) => {
          const matches = data.data.filter(row =>
            row["Phone number"]?.trim() === mobile.trim()
          );

          if (matches.length > 0) {
            setResults(matches);
            setMessage(`✅ Found ${matches.length} report(s).`);
          } else {
            setMessage("❌ No report found for this mobile number.");
          }
        },
        error: (err) => {
          console.error(err);
          setMessage("❌ Error reading the sheet.");
        },
        skipEmptyLines: true,
      });
    } finally {
      setLoading(false);
    }
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
        onClick={handleSearch}
        disabled={loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Searching...' : 'Search Report'}
      </button>

      {message && <p className="text-center mt-3 text-sm text-gray-700">{message}</p>}

      {results.length > 0 && (
        <div className="mt-4">
          {results.map((r, idx) => (
            <div key={idx} className="mb-3 border p-3 rounded shadow-sm">
              <p><strong>Patient:</strong> {r["Patient Name"]}</p>
              <p><strong>Test:</strong> {r["Test Name"]} ({r["Test Date"]})</p>
              <a
                href={r["Direct Download Link"]}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                📥 Download Report
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDownload;

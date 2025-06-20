import React, { useState } from 'react';
import '../styles/style.css'; // ✅ make sure this exists

const LabUploadPage = () => {
  const [form, setForm] = useState({
    mobile: '',
    testName: '',
    report: null,
    invoice: null,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.report || !form.invoice) {
      return alert('Please upload both report and invoice.');
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('mobile', form.mobile);
    formData.append('testName', form.testName);
    formData.append('report', form.report);
    formData.append('invoice', form.invoice);

    try {
      const res = await fetch('https://lab-app-backend.onrender.com/api/upload-report', {
        method: 'POST',
        body: formData,
      });

      const result = await res.text();
      alert(result);
    } catch (err) {
      alert('Failed to upload. Please try again.');
      console.error(err);
    }

    setUploading(false);
  };

  return (
    <div className="form-container">
      <h2>Upload Test Report</h2>
      <form onSubmit={handleSubmit}>
        <label>Mobile Number</label>
        <input
          type="text"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          required
        />

        <label>Test Name</label>
        <input
          type="text"
          name="testName"
          value={form.testName}
          onChange={handleChange}
          required
        />

        <label>Upload Report (PDF)</label>
        <input
          type="file"
          name="report"
          accept="application/pdf"
          onChange={handleChange}
          required
        />

        <label>Upload Invoice (PDF)</label>
        <input
          type="file"
          name="invoice"
          accept="application/pdf"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default LabUploadPage;

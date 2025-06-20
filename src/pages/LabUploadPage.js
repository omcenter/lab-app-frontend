import React, { useState } from 'react';

const LabUploadPage = () => {
  const [form, setForm] = useState({
    mobile: '',
    testName: '',
    report: null,
    invoice: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('mobile', form.mobile);
    formData.append('testName', form.testName);
    formData.append('report', form.report);
    formData.append('invoice', form.invoice);

    const res = await fetch('https://lab-app-backend.onrender.com/api/upload-report', {
      method: 'POST',
      body: formData,
    });

    const result = await res.text();
    alert(result);
  };

  return (
    <div className="login-container">
      <h2>Upload Test Report</h2>
      <form onSubmit={handleSubmit}>
        <label>Mobile Number</label>
        <input type="text" name="mobile" required onChange={handleChange} />

        <label>Test Name</label>
        <input type="text" name="testName" required onChange={handleChange} />

        <label>Upload Report (PDF)</label>
        <input type="file" name="report" accept="application/pdf" required onChange={handleChange} />

        <label>Upload Invoice (PDF)</label>
        <input type="file" name="invoice" accept="application/pdf" required onChange={handleChange} />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default LabUploadPage;

import React from 'react';

const LabUploadPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 text-center mb-4">
        Upload Test Report
      </h2>
      <p className="text-center mb-6">
        Please fill out the Google Form below to upload patient reports. The details will automatically sync with the download system.
      </p>

      <div className="shadow-lg border rounded p-4 bg-white">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSc_omc0WCyZ2XQKeW_bFHo75tNw6AjBR4P6chOG9bgYyU_NRQ/viewform?embedded=true"
          width="100%"
          height="800"
          frameBorder="0"
          title="Report Upload Form"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default LabUploadPage;

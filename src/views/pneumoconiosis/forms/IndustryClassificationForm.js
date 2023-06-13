import React from "react";

const IndustryClassificationForm = ({ handlePrev, handleNext }) => {
  return (
    <div className="step-form">
      <h2>Industry Classification</h2>
      {/* Your form elements go here */}
      <button onClick={handlePrev} disabled={true}>
        Previous
      </button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default IndustryClassificationForm;

import React from "react";

const ControlMeasuresForm = ({ handlePrev, handleNext }) => {
  return (
    <div className="step-form">
      <h2>Control Measures</h2>
      {/* Your form elements go here */}
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ControlMeasuresForm;

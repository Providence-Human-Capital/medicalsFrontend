import React from "react";

const MineralDustExposureForm = ({ handlePrev, handleNext }) => {
  return (
    <div className="step-form">
      <h2>Mineral & Dust Exposure</h2>
      {/* Your form elements go here */}
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default MineralDustExposureForm;

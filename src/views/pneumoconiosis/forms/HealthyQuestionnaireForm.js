import React from "react";
import "./FormsStyle.css";

const HealthyQuestionnaireForm = ({ handlePrev, handleSubmit }) => {
  return (
    <div className="step-form">
      <h2>Healthy Questionnaire</h2>
      {/* Your form elements go here */}
      <button onClick={handlePrev} style={{ marginRight: "10px" }}>
        Previous
      </button>
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default HealthyQuestionnaireForm;

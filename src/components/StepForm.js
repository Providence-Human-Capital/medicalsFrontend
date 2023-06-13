import React, { useState, useEffect, Fragment } from "react";
import "./StepForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndustry,
  faCloud,
  faTools,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";

const StepForm = ({ currentStep }) => {
  return (
    <Fragment>
      <section className="step-wizard">
        <ul className="step-wizard-list">
          <li
            className={`step-wizard-item ${
              currentStep === 1 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faIndustry}
                className={`progress-icon ${
                  currentStep === 1 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Industry Classification</span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 2 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faCloud}
                className={`progress-icon ${
                  currentStep === 2 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Mineral & Dust Exposure</span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 3 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faTools}
                className={`progress-icon ${
                  currentStep === 3 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Control Measures</span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 4 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className={`progress-icon ${
                  currentStep === 4 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Healthy Questionnaire</span>
          </li>
        </ul>
      </section>
    </Fragment>
  );
};

export default StepForm;

import React, { Fragment } from "react";
import {
  faUser,
  faXRay,
  faStethoscope,
  faHeartbeat,
  faSmoking,
  faComment,
  faWaveSquare,
  faHeartCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FStepNavigation = ({ currentStep, setCurrentStep }) => {
  const handleStepClick = (step) => {
    setCurrentStep(step);
  };
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
                icon={faStethoscope}
                className={`progress-icon ${
                  currentStep === 1 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleStepClick(1)}
            >
              Physical Examination
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 2 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHeartbeat}
                className={`progress-icon ${
                  currentStep === 2 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleStepClick(2)}
            >
              Illnesses
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 3 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faSmoking}
                className={`progress-icon ${
                  currentStep === 3 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleStepClick(3)}
            >
              Tobbacco Use
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 4 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHeartCircleExclamation}
                className={`progress-icon ${
                  currentStep === 4 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleStepClick(4)}
            >
              Xray, Swab & Hygiene
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 5 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHeartCircleExclamation}
                className={`progress-icon ${
                  currentStep === 5 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleStepClick(5)}
            >
              Swab
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 6 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHeartCircleExclamation}
                className={`progress-icon ${
                  currentStep === 6 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleStepClick(6)}
            >
              Hygiene
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 7 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faComment}
                className={`progress-icon ${
                  currentStep === 7 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleStepClick(7)}
            >
              Obeservation and Remarks
            </span>
          </li>
        </ul>
      </section>
    </Fragment>
  );
};

export default FStepNavigation;

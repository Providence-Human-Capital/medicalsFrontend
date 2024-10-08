import React, { Fragment } from "react";
import "../../../components/StepForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWeight,
  faHospital,
  faSuitcaseMedical,
  faNotesMedical,
  faLungs,
  faHeartCircleCheck,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";

const IStepNavigation = ({ currentStep, setCurrentStep }) => {
  // Handle step click
  const handleStepClick = (step) => {
    setCurrentStep(step);
  };
  return (
    <Fragment>
      <section className="step-wizard">
        <ul
          className="step-wizard-list"
          style={{
            overflowX: "scroll",
          }}
        >
          <li
            className={`step-wizard-item ${
              currentStep === 1 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faSuitcaseMedical}
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
              Vitals
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 2 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faSuitcaseMedical}
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
              Additional Details
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 3 ? "current-item" : ""
            }`}
            onClick={() => handleStepClick(3)}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHospital}
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
              Illness and Injuries
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 4 ? "current-item" : ""
            }`}
            onClick={() => handleStepClick(4)}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faNotesMedical}
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
              Medical Histories
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 5 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faWeight}
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
              Physical Examination
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 6 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHeartCircleCheck}
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
              Cardio Vascular Check
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 7 ? "current-item" : ""
            }`}
            onClick={() => handleStepClick(7)}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faLungs}
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
              Respiratory Systems Check
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 8 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faUserDoctor}
                className={`progress-icon ${
                  currentStep === 8 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleStepClick(8)}
            >
              Comments & Remarks
            </span>
          </li>
        </ul>
      </section>
    </Fragment>
  );
};

export default IStepNavigation;

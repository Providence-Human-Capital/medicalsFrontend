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
  faUserDoctor
} from "@fortawesome/free-solid-svg-icons";

const IStepNavigation = ({ currentStep }) => {
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
                icon={faSuitcaseMedical}
                className={`progress-icon ${
                  currentStep === 1 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Additional Details</span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 2 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHospital}
                className={`progress-icon ${
                  currentStep === 2 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Illness and Injuries</span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 3 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faNotesMedical}
                className={`progress-icon ${
                  currentStep === 3 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Medical Histories</span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 4 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faWeight}
                className={`progress-icon ${
                  currentStep === 4 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Physical Examination</span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 5 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHeartCircleCheck}
                className={`progress-icon ${
                  currentStep === 5 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Cardio Vascular Check</span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 6 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faLungs}
                className={`progress-icon ${
                  currentStep === 6 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Respiratory Systems Check</span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 7 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faUserDoctor}
                className={`progress-icon ${
                  currentStep === 7 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Respiratory Systems Check</span>
          </li>
        </ul>
      </section>
    </Fragment>
  );
};

export default IStepNavigation;

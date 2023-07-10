import React, { useState, useEffect, Fragment } from "react";
import "./StepForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBandage,
  faCapsules,
  faSmoking,
  faHospitalUser,
} from "@fortawesome/free-solid-svg-icons";

const NextPhaseStep = ({ nextPhaseCurrent }) => {
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
              nextPhaseCurrent === 1 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faBandage}
                className={`progress-icon ${
                  nextPhaseCurrent === 1 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Symptoms Test</span>
          </li>
          <li
            className={`step-wizard-item ${
              nextPhaseCurrent === 2 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faCapsules}
                className={`progress-icon ${
                  nextPhaseCurrent === 2 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Medical Conditions Test</span>
          </li>
          <li
            className={`step-wizard-item ${
              nextPhaseCurrent === 3 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faSmoking}
                className={`progress-icon ${
                  nextPhaseCurrent === 3 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Smoking History</span>
          </li>
          <li
            className={`step-wizard-item ${
              nextPhaseCurrent === 4 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHospitalUser}
                className={`progress-icon ${
                  nextPhaseCurrent === 4 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Physical Examination</span>
          </li>
          <li
            className={`step-wizard-item ${
              nextPhaseCurrent === 5 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHospitalUser}
                className={`progress-icon ${
                  nextPhaseCurrent === 5 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Systems Test </span>
          </li>
          <li
            className={`step-wizard-item ${
              nextPhaseCurrent === 6 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHospitalUser}
                className={`progress-icon ${
                  nextPhaseCurrent === 6 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Results and Investigation</span>
          </li>
          <li
            className={`step-wizard-item ${
              nextPhaseCurrent === 7 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHospitalUser}
                className={`progress-icon ${
                  nextPhaseCurrent === 7 ? "current-icon" : ""
                }`}
              />
            </span>

            <span className="progress-label">Additional Test</span>
          </li>
        </ul>
      </section>
    </Fragment>
  );
};

export default NextPhaseStep;

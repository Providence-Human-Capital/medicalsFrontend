import React, { Fragment } from "react";
import { formatDate, options } from "../../../utils/dateConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVialVirus,
  faPrescriptionBottle,
} from "@fortawesome/free-solid-svg-icons";

const ConditionsTestBox = ({ conditions }) => {
  const {
    tb,
    copd,
    pneumonia,
    hypertension,
    chest_injuries,
    asthma,
    diabetes,
    heart_disease,
    hernia,
    hernia_details,
    medical_condition_details,
    updated_at,
  } = conditions || {};
  return (
    <Fragment>
      {conditions && (
        <div class="col-12">
          <div class="media bg-white mb-20">
            <span class="avatar">
              <FontAwesomeIcon
                height="2rem"
                icon={faVialVirus}
                className="mr-2"
                size="2x"
              />{" "}
            </span>
            <div class="media-body">
              <p>
                <strong>Medical Conditions Diagnosis</strong>
              </p>
              <div
                className=""
                style={{
                  marginTop: "1rem",
                }}
              ></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon
                      icon={faPrescriptionBottle}
                      className="mr-2"
                    />{" "}
                    TB
                  </h5>
                  <p className="card-text">
                    {tb === true ? (
                      <span className="badge badge-danger">
                        <strong>Diagnosed</strong>
                      </span>
                    ) : (
                      <span className="badge badge-info">
                        <strong>Not Diagnosed</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon
                      icon={faPrescriptionBottle}
                      className="mr-2"
                    />{" "}
                    COPD
                  </h5>
                  <p className="card-text">
                    {copd === true ? (
                      <span className="badge badge-danger">
                        <strong>Diagnosed</strong>
                      </span>
                    ) : (
                      <span className="badge badge-info">
                        <strong>Not Diagnosed</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon
                      icon={faPrescriptionBottle}
                      className="mr-2"
                    />{" "}
                    Pneumonia
                  </h5>
                  <p className="card-text">
                    {pneumonia === true ? (
                      <span className="badge badge-danger">
                        <strong>Diagnosed</strong>
                      </span>
                    ) : (
                      <span className="badge badge-info">
                        <strong>Not Diagnosed</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon
                      icon={faPrescriptionBottle}
                      className="mr-2"
                    />{" "}
                    Hypertension
                  </h5>
                  <p className="card-text">
                    {hypertension === true ? (
                      <span className="badge badge-danger">
                        <strong>Diagnosed</strong>
                      </span>
                    ) : (
                      <span className="badge badge-info">
                        <strong>Not Diagnosed</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon
                      icon={faPrescriptionBottle}
                      className="mr-2"
                    />{" "}
                    Chest Injuries
                  </h5>
                  <p className="card-text">
                    {chest_injuries === true ? (
                      <span className="badge badge-danger">
                        <strong>Diagnosed</strong>
                      </span>
                    ) : (
                      <span className="badge badge-info">
                        <strong>Not Diagnosed</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon
                      icon={faPrescriptionBottle}
                      className="mr-2"
                    />{" "}
                    Asthma
                  </h5>
                  <p className="card-text">
                    {asthma === true ? (
                      <span className="badge badge-danger">
                        <strong>Diagnosed</strong>
                      </span>
                    ) : (
                      <span className="badge badge-info">
                        <strong>Not Diagnosed</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon
                      icon={faPrescriptionBottle}
                      className="mr-2"
                    />{" "}
                    Diabetes
                  </h5>
                  <p className="card-text">
                    {diabetes === true ? (
                      <span className="badge badge-danger">
                        <strong>Diagnosed</strong>
                      </span>
                    ) : (
                      <span className="badge badge-info">
                        <strong>Not Diagnosed</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon
                      icon={faPrescriptionBottle}
                      className="mr-2"
                    />{" "}
                    Heart Disease
                  </h5>
                  <p className="card-text">
                    {heart_disease === true ? (
                      <span className="badge badge-danger">
                        <strong>Diagnosed</strong>
                      </span>
                    ) : (
                      <span className="badge badge-info">
                        <strong>Not Diagnosed</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon
                      icon={faPrescriptionBottle}
                      className="mr-2"
                    />{" "}
                    Hernia
                  </h5>
                  <p className="card-text">
                    {hernia === true ? (
                      <span className="badge badge-danger">
                        <strong>Diagnosed</strong>
                      </span>
                    ) : (
                      <span className="badge badge-info">
                        <strong>Not Diagnosed</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
                {hernia_details && (
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>Hernia Details</strong>
                    </h5>
                    <p className="card-text">{hernia_details}</p>
                  </div>
                )}

                {medical_condition_details && (
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>Summary On Medical Conditions</strong>
                    </h5>
                    <p className="card-text">{medical_condition_details}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ConditionsTestBox;

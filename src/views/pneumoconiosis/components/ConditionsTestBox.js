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
              <img
                src="/assets/images/stethoscope.svg"
                className="w-100 bg-primary-light rounded10 me-15"
                alt=""
              />{" "}
              {/* stethoscope.svg */}
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
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="/assets/images/checkupd.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> TB</h5>
                      <p className="card-text">
                        {tb === true || tb === 1 ? (
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="/assets/images/checkupd.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> COPD</h5>
                      <p className="card-text">
                        {copd === true || copd === 1 ? (
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="/assets/images/checkupd.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Pneumonia</h5>
                      <p className="card-text">
                        {pneumonia === true || pneumonia === 1 ? (
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="/assets/images/checkupd.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Hypertension</h5>
                      <p className="card-text">
                        {hypertension === true || hypertension === 1 ? (
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="/assets/images/checkupd.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Chest Injuries</h5>
                      <p className="card-text">
                        {chest_injuries === true || chest_injuries === 1 ? (
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="/assets/images/checkupd.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Asthma</h5>
                      <p className="card-text">
                        {asthma === true || asthma === 1 ? (
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="/assets/images/checkupd.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Diabetes</h5>
                      <p className="card-text">
                        {diabetes === true || diabetes === 1 ? (
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="/assets/images/checkupd.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Heart Disease</h5>
                      <p className="card-text">
                        {heart_disease === true || heart_disease === 1 ? (
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="/assets/images/checkupd.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Hernia</h5>
                      <p className="card-text">
                        {hernia === true || hernia === 1 ? (
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

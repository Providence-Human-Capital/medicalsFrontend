import React, { Fragment } from "react";
import { formatDate, options } from "../../../utils/dateConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faStopwatch,
  faIndustry,
  faSkull,
  faVirus,
  faPrescriptionBottleMedical,
  faPrescriptionBottle,
} from "@fortawesome/free-solid-svg-icons";

const SymptomsBox = ({ symptoms }) => {
  const {
    updated_at,
    cough,
    night_sweats,
    shortness_of_breath,
    chest_pains,
    coughing_blood,
    weight_loss,
    appetite_loss,
    chest_tightness,
  } = symptoms || {};
  return (
    <Fragment>
      {symptoms && (
        <div class="col-12">
          <div class="media bg-white mb-20">
            <span class="avatar">
              <FontAwesomeIcon
                height="2rem"
                icon={faPrescriptionBottleMedical}
                className="mr-2"
                size="2x"
              />{" "}
            </span>
            <div class="media-body">
              <p>
                <strong>Patient's Symptoms Check</strong>
              </p>
              <div
                className=""
                style={{
                  marginTop: "1rem",
                }}
              ></div>
              <div></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        // src="/assets/images/patient2.svg"
                        src="/medicals/assets/images/patient2.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Cough (3 weeks long)</h5>
                      <p className="card-text">
                        {cough === true || cough === 1 ? (
                          <span className="badge badge-danger">
                            <strong>Treated</strong>
                          </span>
                        ) : (
                          <span className="badge badge-info">
                            <strong>Not Treated</strong>
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
                        // src="/assets/images/patient1.svg"
                        src="/medicals/assets/images/patient1.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Night Sweats</h5>
                      <p className="card-text">
                        {night_sweats === true || night_sweats === 1 ? (
                          <span className="badge badge-danger">
                            <strong>Treated</strong>
                          </span>
                        ) : (
                          <span className="badge badge-info">
                            <strong>Not Treated</strong>
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
                        // src="/assets/images/shortnessofbreath.svg"
                        src="/medicals/assets/images/shortnessofbreath.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Shortness Of Breath</h5>
                      <p className="card-text">
                        {shortness_of_breath === true || shortness_of_breath === 1 ? (
                          <span className="badge badge-danger">
                            <strong>Treated</strong>
                          </span>
                        ) : (
                          <span className="badge badge-info">
                            <strong>Not Treated</strong>
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
                        // src="/assets/images/chestpains.svg"
                        src="/medicals/assets/images/chestpains.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Chest Pains</h5>
                      <p className="card-text">
                        {chest_pains === true || chest_pains === 1 ? (
                          <span className="badge badge-danger">
                            <strong>Treated</strong>
                          </span>
                        ) : (
                          <span className="badge badge-info">
                            <strong>Not Treated</strong>
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
                        // src="/assets/images/manco.svg"
                        src="/medicals/assets/images/manco.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Coughing Blood</h5>
                      <p className="card-text">
                        {coughing_blood === true || coughing_blood === 1 ? (
                          <span className="badge badge-danger">
                            <strong>Treated</strong>
                          </span>
                        ) : (
                          <span className="badge badge-info">
                            <strong>Not Treated</strong>
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
                        // src="/assets/images/mass.svg"
                        src="/medicals/assets/images/mass.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Weight Loss</h5>
                      <p className="card-text">
                        {weight_loss === true || weight_loss === 1 ? (
                          <span className="badge badge-danger">
                            <strong>Treated</strong>
                          </span>
                        ) : (
                          <span className="badge badge-info">
                            <strong>Not Treated</strong>
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
                        // src="/assets/images/syringe.svg"
                        src="/medicals/assets/images/syringe.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Appetite Loss</h5>
                      <p className="card-text">
                        {appetite_loss === true || appetite_loss === 1 ? (
                          <span className="badge badge-danger">
                            <strong>Treated</strong>
                          </span>
                        ) : (
                          <span className="badge badge-info">
                            <strong>Not Treated</strong>
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
                        // src="/assets/images/cblood.svg"
                        src="/medicals/assets/images/cblood.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title"> Chest Tightness</h5>
                      <p className="card-text">
                        {chest_tightness === true || chest_tightness === 1 ? (
                          <span className="badge badge-danger">
                            <strong>Treated</strong>
                          </span>
                        ) : (
                          <span className="badge badge-info">
                            <strong>Not Treated</strong>
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SymptomsBox;

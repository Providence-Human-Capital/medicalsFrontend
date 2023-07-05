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
  } = symptoms;
  return (
    <Fragment>
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
                <h5 className="card-title">
                  <FontAwesomeIcon
                    icon={faPrescriptionBottle}
                    className="mr-2"
                  />{" "}
                  Cough (3 weeks long)
                </h5>
                <p className="card-text">
                  {cough === true ? (
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
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon
                    icon={faPrescriptionBottle}
                    className="mr-2"
                  />{" "}
                  Night Sweats
                </h5>
                <p className="card-text">
                  {night_sweats === true ? (
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
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon
                    icon={faPrescriptionBottle}
                    className="mr-2"
                  />{" "}
                  Shortness Of Breath
                </h5>
                <p className="card-text">
                  {shortness_of_breath === true ? (
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
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon
                    icon={faPrescriptionBottle}
                    className="mr-2"
                  />{" "}
                  Chest Pains
                </h5>
                <p className="card-text">
                  {chest_pains === true ? (
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
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon
                    icon={faPrescriptionBottle}
                    className="mr-2"
                  />{" "}
                  Coughing Blood
                </h5>
                <p className="card-text">
                  {coughing_blood === true ? (
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
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon
                    icon={faPrescriptionBottle}
                    className="mr-2"
                  />{" "}
                  Weight Loss
                </h5>
                <p className="card-text">
                  {weight_loss === true ? (
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
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon
                    icon={faPrescriptionBottle}
                    className="mr-2"
                  />{" "}
                  Appetite Loss
                </h5>
                <p className="card-text">
                  {appetite_loss === true ? (
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
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon
                    icon={faPrescriptionBottle}
                    className="mr-2"
                  />{" "}
                  Chest Tightness
                </h5>
                <p className="card-text">
                  {chest_tightness === true ? (
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
    </Fragment>
  );
};

export default SymptomsBox;

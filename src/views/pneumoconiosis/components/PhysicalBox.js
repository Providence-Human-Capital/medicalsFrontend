import React, { Fragment, useEffect } from "react";
import { formatDate, options } from "../../../utils/dateConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faStopwatch,
  faIndustry,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import PlaceHolderBox from "../../../components/PlaceHolderBox";

const PhysicalBox = ({ physical, patient }) => {
  const {
    bp_status,
    height,
    weight,
    bmi,
    bmi_status,
    created_at,
    bp_sys,
    bp_dia,
    rhythm,
    pulse,
  } = physical || {};
  const styles = {
    width: {
      width: "100%",
    },
  };

  const convertToTwoDecimalPlaces = (value) => {
    return value.toFixed(2);
  };

  const BP_STATUS = () => {
    if (bp_status === "Low Blood Pressure") {
      return <span className="badge badge-info">{bp_status}</span>;
    } else if (bp_status === "Normal Blood Pressure") {
      return <span className="badge badge-primary">{bp_status}</span>;
    } else if (bp_status === "Pre Hypertension") {
      return <span className="badge badge-warning">{bp_status}</span>;
    } else if (bp_status === "Stage 1 Hypertension") {
      return <span className="badge badge-danger">{bp_status}</span>;
    } else if (bp_status === "Stage 2 Hypertension") {
      return <span className="badge badge-danger">{bp_status}</span>;
    } else if (bp_status === "Hypertensive Crisis") {
      return <span className="badge badge-danger">{bp_status}</span>;
    } else {
      return <span className="badge badge-warning">{bp_status}</span>;
    }
  };

  useEffect(() => {}, []);

  return (
    <Fragment>
      {physical ? (
        <div className="box">
          <div className="box-header">
            <h4 className="box-title">Current Vitals</h4>
            <div className="box-controls pull-right">
              <div className="lookup lookup-circle lookup-right">
                <input type="text" name="s" placeholder="Patients id" />
              </div>
            </div>
          </div>
          <div className="box-body">
            <div className="flexbox bb-1 mb-15">
              <div>
                <p>
                  <span className="text-mute">Patient Name:</span>
                  <strong>
                    {patient.attendee.first_name} {patient.attendee.last_name}
                  </strong>
                </p>
              </div>
              <div>
                <p>
                  <span className="text-mute">Patient Id:</span>
                  <strong> {patient.id}</strong>
                </p>
              </div>
            </div>
            {weight && (
              <div className="row">
                <div className="col-12">
                  <div className="row bb-1 pb-10">
                    <div className="col-4">
                      <img
                        className="img-fluid float-start w-30 mt-10 me-10"
                        src="/assets/images/weight.png"
                        alt=""
                      />
                      <div>
                        <p className="mb-0">
                          <small>Weight</small>
                        </p>
                        <h5 className="mb-0">
                          <strong>{weight} kg</strong>
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 bs-1 be-1">
                      <img
                        className="img-fluid float-start w-30 mt-10 me-10"
                        src="/assets/images/human.png"
                        alt=""
                      />
                      <div>
                        <p className="mb-0">
                          <small>Height</small>
                        </p>
                        <h5 className="mb-0">
                          <strong>{height} m</strong>
                        </h5>
                      </div>
                    </div>
                    <div className="col-4">
                      <img
                        className="img-fluid float-start w-30 mt-10 me-10"
                        src="/assets/images/bmi.png"
                        alt=""
                      />
                      <div>
                        <p className="mb-0">
                          <small>BMI</small>
                        </p>
                        <h5 className="mb-0">
                          <strong>{convertToTwoDecimalPlaces(bmi)}</strong>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <img
                        className="img-fluid float-start w-30 mt-10 me-10"
                        src="/assets/images/bmi.png"
                        alt=""
                      />
                      <div>
                        <p className="mb-2">
                          <small>BMI STATUS</small>
                        </p>
                        <h5 className="mb-2">
                          <strong>{bmi_status}</strong>
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="row pt-5">
                    <div className="col-12">
                      <span className="text-danger">
                        Blood Pressure{" "}
                        <span className="fw-500">
                          {" "}
                          <i className="fa fa-clock-o"></i>{" "}
                          {formatDate(created_at, options)}
                        </span>
                      </span>
                    </div>
                    <div className="col-6">
                      <div className="progress progress-xs mb-0 mt-5 w-40">
                        <div
                          className="progress-bar progress-bar-success progress-bar-striped"
                          role="progressbar"
                          aria-valuenow="60"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={styles.width}
                        ></div>
                      </div>
                      <h2 className="float-start mt-0 mr-10">
                        <strong>{bp_sys}</strong>
                      </h2>
                      <div>
                        <p className="mb-0">
                          <small>Systolic</small>
                        </p>
                        <p className="mb-0 mt-0">
                          <small className="vertical-align-super">mmHg</small>
                        </p>
                      </div>
                    </div>
                    <div className="col-6 bl-1">
                      <div className="progress progress-xs mb-0 mt-5 w-40">
                        <div
                          className="progress-bar progress-bar-success progress-bar-striped"
                          role="progressbar"
                          aria-valuenow="60"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={styles.width}
                        ></div>
                      </div>
                      <h2 className="float-start mt-0 mr-10">
                        <strong>{bp_dia}</strong>
                      </h2>
                      <div>
                        <p className="mb-0">
                          <small>Diastolic</small>
                        </p>
                        <p className="mb-0 mt-0">
                          <small className="vertical-align-super">mmHg</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {bp_status && (
            <div className="box-body">
              <div className="row">
                <h5 className="mb-2">
                  <strong>Blood Pressure Status: {BP_STATUS()}</strong>
                </h5>
              </div>
            </div>
          )}

          <div className="box-body">
            <div className="row">
              <div className="col-md-6">
                <h5
                  className="mb-2"
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  <FontAwesomeIcon
                    height="2rem"
                    icon={faHeartbeat}
                    className="mr-2"
                    size="2x"
                  />{" "}
                  Pulse
                </h5>
                <div>
                  <h4 className="float-start mt-0 mr-10">
                    <strong>{pulse}</strong>{" "}
                  </h4>
                  <div>
                    <p className="mb-0 mt-0">
                      <small className="vertical-align-super"> bpm</small>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h5
                  className="mb-2"
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  <FontAwesomeIcon
                    height="2rem"
                    icon={faHeartbeat}
                    className="mr-2"
                    size="2x"
                  />{" "}
                  Rhythm
                </h5>
                <div>
                  <h4 className="float-start mt-0 mr-10">
                    <strong>{rhythm}</strong>{" "}
                  </h4>
                  <div>
                    <p className="mb-0 mt-0">
                      <small className="vertical-align-super"> BPM</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {created_at && (
            <div className="box-body pt-0">
              <p>
                <small>
                  Recorded on:{" "}
                  <strong>{formatDate(created_at, options)}</strong>{" "}
                </small>
              </p>
            </div>
          )}
        </div>
      ) : (
        <PlaceHolderBox
          title={"Patient's Vitals Record"}
          tag={"NO RECORD AVAILBLE"}
        />
      )}
    </Fragment>
  );
};

export default PhysicalBox;

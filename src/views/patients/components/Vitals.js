import React, { Fragment } from "react";
import { formatDate } from "../../../utils/dateConverter";
import { options } from "../../../utils/dateConverter";

const Vitals = ({ patient, vitals }) => {
  const styles = {
    width: {
      width: "100%",
    },
  };

  const BP_STATUS = () => {
    if (vitals.bp_status === "Low Blood Pressure") {
      return <span className="badge badge-info">{vitals.bp_status}</span>;
    } else if (vitals.bmi_status === "Normal Blood Pressure") {
      return <span className="badge badge-primary">{vitals.bp_status}</span>;
    } else if (vitals.bmi_status === "Pre Hypertension") {
      return <span className="badge badge-warning">{vitals.bp_status}</span>;
    } else if (vitals.bmi_status === "Stage 1 Hypertension") {
      return <span className="badge badge-danger">{vitals.bp_status}</span>;
    } else if (vitals.bmi_status === "Stage 2 Hypertension") {
      return <span className="badge badge-danger">{vitals.bp_status}</span>;
    } else if (vitals.bmi_status === "Hypertensive Crisis") {
      return <span className="badge badge-danger">{vitals.bp_status}</span>;
    } else {
      return <span className="badge badge-warning">{vitals.bp_status}</span>;
    }
  };

  return (
    <Fragment>
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
          {vitals.weight && (
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
                        <strong>{vitals.weight} kg</strong>
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
                        <strong>{vitals.height} m</strong>
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
                        <strong>{vitals.bmi}</strong>
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
                        <strong>{vitals.bmi_status}</strong>
                      </h5>
                    </div>
                  </div>
                </div>

                {vitals.left_vision && vitals.right_vision && (
                  <div className="row mt-2 mb-2">
                    <div className="col-6">
                      <h5 className="mb-2">
                        <strong>LEFT VISION : {vitals.left_vision} /6</strong>
                      </h5>
                    </div>
                    <div className="col-6">
                      <h5 className="mb-2">
                        <strong>RIGH VISION : {vitals.right_vision} /6</strong>
                      </h5>
                    </div>
                  </div>
                )}

                <div className="row pt-5">
                  <div className="col-12">
                    <span className="text-danger">
                      Blood Pressure{" "}
                      <span className="fw-500">
                        {" "}
                        <i className="fa fa-clock-o"></i> {vitals.first_bp_time}
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
                      <strong>{vitals.bp_sys}</strong>
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
                      <strong>{vitals.bp_dia}</strong>
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

                {vitals.bp_repeat_sys && (
                  <div className="row pt-5">
                    <div className="col-12">
                      <span className="text-danger">
                        Blood Pressure Repeat
                        {/* <span className="fw-500"> {}</span> */}
                        <span className="fw-500">
                          {" "}
                          <i className="fa fa-clock-o"></i>{" "}
                          {vitals.last_bp_time}
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
                        <strong>{vitals.bp_repeat_sys}</strong>
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
                        <strong>{vitals.bp_repeat_dia}</strong>
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
                )}
              </div>
            </div>
          )}
        </div>

        {vitals.bp_status && (
          <div className="box-body">
            <div className="row">
              <h5 className="mb-2">
                <strong>Blood Pressure Status: {BP_STATUS()}</strong>
              </h5>
            </div>
          </div>
        )}

        {vitals.created_at && (
          <div className="box-body pt-0">
            <p>
              <small>
                Recorded on:{" "}
                <strong>{formatDate(vitals.created_at, options)}</strong>{" "}
              </small>
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Vitals;

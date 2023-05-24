import React, { Fragment } from "react";

const Vitals = () => {
  const styles = {
    width: {
      width: "100%",
    },
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
                <strong>Jonsahn</strong>
              </p>
            </div>
            <div>
              <p>
                <span className="text-mute">Patient Id:</span>
                <strong>1254896</strong>
              </p>
            </div>
          </div>
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
                      <strong>230 ibs</strong>
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
                      <strong>6’1</strong>
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
                      <strong>30.34</strong>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-12">
                  <span className="text-danger">Blood Pressure</span>
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
                    <strong>150</strong>
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
                    <strong>90</strong>
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
        </div>
        <div className="box-body pt-0">
          <p>
            <small>Recorded on 25/05/2018</small>
          </p>
        </div>
        <div className="box-body bg-danger">
          <img
            src="/assets/images/smoking.png"
            alt=""
            className="float-start me-10"
          />
          <p>Smoking Status : current every day smoker</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Vitals;

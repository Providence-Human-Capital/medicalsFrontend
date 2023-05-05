import React, { Fragment } from "react";

const Vitals = () => {
  const styles = {
    width: {
      width: "100%",
    },
  };
  return (
    <Fragment>
      <div class="box">
        <div class="box-header">
          <h4 class="box-title">Current Vitals</h4>
          <div class="box-controls pull-right">
            <div class="lookup lookup-circle lookup-right">
              <input type="text" name="s" placeholder="Patients id" />
            </div>
          </div>
        </div>
        <div class="box-body">
          <div class="flexbox bb-1 mb-15">
            <div>
              <p>
                <span class="text-mute">Patient Name:</span>
                <strong>Jonsahn</strong>
              </p>
            </div>
            <div>
              <p>
                <span class="text-mute">Patient Id:</span>
                <strong>1254896</strong>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="row bb-1 pb-10">
                <div class="col-4">
                  <img
                    class="img-fluid float-start w-30 mt-10 me-10"
                    src="/assets/images/weight.png"
                    alt=""
                  />
                  <div>
                    <p class="mb-0">
                      <small>Weight</small>
                    </p>
                    <h5 class="mb-0">
                      <strong>230 ibs</strong>
                    </h5>
                  </div>
                </div>
                <div class="col-4 bs-1 be-1">
                  <img
                    class="img-fluid float-start w-30 mt-10 me-10"
                    src="/assets/images/human.png"
                    alt=""
                  />
                  <div>
                    <p class="mb-0">
                      <small>Height</small>
                    </p>
                    <h5 class="mb-0">
                      <strong>6’1</strong>
                    </h5>
                  </div>
                </div>
                <div class="col-4">
                  <img
                    class="img-fluid float-start w-30 mt-10 me-10"
                    src="/assets/images/bmi.png"
                    alt=""
                  />
                  <div>
                    <p class="mb-0">
                      <small>BMI</small>
                    </p>
                    <h5 class="mb-0">
                      <strong>30.34</strong>
                    </h5>
                  </div>
                </div>
              </div>
              <div class="row pt-5">
                <div class="col-12">
                  <span class="text-danger">Blood Pressure</span>
                </div>
                <div class="col-6">
                  <div class="progress progress-xs mb-0 mt-5 w-40">
                    <div
                      class="progress-bar progress-bar-success progress-bar-striped"
                      role="progressbar"
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={styles.width}
                    ></div>
                  </div>
                  <h2 class="float-start mt-0 mr-10">
                    <strong>150</strong>
                  </h2>
                  <div>
                    <p class="mb-0">
                      <small>Systolic</small>
                    </p>
                    <p class="mb-0 mt-0">
                      <small class="vertical-align-super">mmHg</small>
                    </p>
                  </div>
                </div>
                <div class="col-6 bl-1">
                  <div class="progress progress-xs mb-0 mt-5 w-40">
                    <div
                      class="progress-bar progress-bar-success progress-bar-striped"
                      role="progressbar"
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={styles.width}
                    ></div>
                  </div>
                  <h2 class="float-start mt-0 mr-10">
                    <strong>90</strong>
                  </h2>
                  <div>
                    <p class="mb-0">
                      <small>Diastolic</small>
                    </p>
                    <p class="mb-0 mt-0">
                      <small class="vertical-align-super">mmHg</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-body pt-0">
          <p>
            <small>Recorded on 25/05/2018</small>
          </p>
        </div>
        <div class="box-body bg-danger">
          <img
            src="/assets/images/smoking.png"
            alt=""
            class="float-start me-10"
          />
          <p>Smoking Status : current every day smoker</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Vitals;

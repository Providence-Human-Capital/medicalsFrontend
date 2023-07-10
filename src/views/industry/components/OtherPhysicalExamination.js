import React, { Fragment, useEffect, useState } from "react";
import { formatDate } from "../../../utils/dateConverter";
import PlaceHolderBox from "../../../components/PlaceHolderBox";

const OtherPhysicalExamination = ({ physical, vitals }) => {
  const [bmi, setBMI] = useState("");
  const calculateBMI = () => {
    const heightInCm = physical?.height;
    const bmiValue = physical?.weight / (heightInCm * heightInCm);
    const roundedBMI = bmiValue.toFixed(2);

    setBMI(roundedBMI);
  };
  useEffect(() => {
    calculateBMI();
  }, []);

  return (
    <Fragment>
      {!physical ? (
        <PlaceHolderBox
          title={"Patient's Physical Examination"}
          tag={"NO RECORD YET"}
        />
      ) : (
        <div class="col-xl-12 col-12">
          <div class="box">
            <div class="box-header">
              <h4
                class="box-title"
                style={{
                  textTransform: "uppercase",
                }}
              >
                Patient's Physical Examination
              </h4>
              <div class="box-controls pull-right">
                <div class="lookup lookup-circle lookup-right">
                  <input type="text" name="s" placeholder="Patients id" />
                </div>
              </div>
            </div>
            <div class="box-body">
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
                          <strong>{physical.weight} kg</strong>
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
                          <strong>{physical.height} m</strong>
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
                          <strong>{bmi}</strong>
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
                          style={{
                            width: "100%",
                          }}
                        ></div>
                      </div>
                      <h2 class="float-start mt-0 me-10">
                        <strong>{vitals.bp_sys}</strong>
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
                    <div class="col-6 bs-1">
                      <div class="progress progress-xs mb-0 mt-5 w-40">
                        <div
                          class="progress-bar progress-bar-success progress-bar-striped"
                          role="progressbar"
                          aria-valuenow="60"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: "100%",
                          }}
                        ></div>
                      </div>
                      <h2 class="float-start mt-0 me-10">
                        <strong>{vitals.bp_dia}</strong>
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
                <small>Recorded on {formatDate(physical.created_at)}</small>
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
        </div>
      )}
    </Fragment>
  );
};

export default OtherPhysicalExamination;

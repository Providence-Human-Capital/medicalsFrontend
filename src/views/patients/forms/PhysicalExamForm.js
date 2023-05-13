import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";

const PhysicalExamForm = () => {
  const dispatch = useDispatch();

  const styles = {
    textarea: {
      height: "80px",
    },
    seperation: {
      height: "20px",
    },
    formc: {
      marginLeft: "-20px",
    },
    border: {
      border: " 2px solid #e7e7e7",
    },
  };
  return (
    <Fragment>
      <BreadCrumb
        title={"Observation and Remarks"}
        activeTab={"General Observation"}
      />
      <div style={styles.seperation}></div>
      <div className="row">
        <div className="col-xl-12 col-12">
          <div class="box">
            
            <div class="box-body">
              <div class="container">
                <h2>Physical Examination</h2>
                <form>
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="height">Height (in cm)</label>
                      <input
                        type="text"
                        class="form-control"
                        id="height"
                        placeholder="Enter height"
                        name="height"
                        required
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="weight">Weight (in kg)</label>
                      <input
                        type="text"
                        class="form-control"
                        id="weight"
                        placeholder="Enter weight"
                        name="weight"
                        required
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="diastolic_blood_pressure">
                        Diastolic Blood Pressure
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="diastolic_blood_pressure"
                        placeholder="Enter diastolic blood pressure"
                        name="diastolic_blood_pressure"
                        required
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="systolic_blood_pressure">
                        Systolic Blood Pressure
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="systolic_blood_pressure"
                        placeholder="Enter systolic blood pressure"
                        name="systolic_blood_pressure"
                        required
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="left_vision">Left Vision (out of 6)</label>
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          id="left_vision"
                          placeholder="Enter left vision"
                          name="left_vision"
                          required
                        />
                        <div class="input-group-append">
                          <span class="input-group-text">/6</span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="right_vision">Right Vision (out of 6)</label>
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          id="right_vision"
                          placeholder="Enter right vision"
                          name="right_vision"
                          required
                        />
                        <div class="input-group-append">
                          <span class="input-group-text">/6</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Submit Examination
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="box-body">
              <div class="container">
                <h2>Blood Pressure Repeat</h2>
                <form>
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="diastolic_blood_pressure">
                        Diastolic Blood Pressure
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="diastolic_blood_pressure"
                        placeholder="Enter diastolic blood pressure"
                        name="diastolic_blood_pressure"
                        required
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="systolic_blood_pressure">
                        Systolic Blood Pressure
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="systolic_blood_pressure"
                        placeholder="Enter systolic blood pressure"
                        name="systolic_blood_pressure"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Submit BP Repeat
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PhysicalExamForm;

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
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h2>Physical Examination</h2>
                  <form>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="height">Height (in cm)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="height"
                          placeholder="Enter height"
                          name="height"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="weight">Weight (in kg)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="weight"
                          placeholder="Enter weight"
                          name="weight"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="diastolic_blood_pressure">
                          Diastolic Blood Pressure
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="diastolic_blood_pressure"
                          placeholder="Enter diastolic blood pressure"
                          name="diastolic_blood_pressure"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="systolic_blood_pressure">
                          Systolic Blood Pressure
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="systolic_blood_pressure"
                          placeholder="Enter systolic blood pressure"
                          name="systolic_blood_pressure"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="left_vision">Left Vision (out of 6)</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="left_vision"
                            placeholder="Enter left vision"
                            name="left_vision"
                            required
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">/6</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <label for="right_vision">
                          Right Vision (out of 6)
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="right_vision"
                            placeholder="Enter right vision"
                            name="right_vision"
                            required
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">/6</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit Examination
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h2>Blood Pressure Repeat</h2>
                  <form>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="diastolic_blood_pressure">
                          Diastolic Blood Pressure
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="diastolic_blood_pressure"
                          placeholder="Enter diastolic blood pressure"
                          name="diastolic_blood_pressure"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="systolic_blood_pressure">
                          Systolic Blood Pressure
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="systolic_blood_pressure"
                          placeholder="Enter systolic blood pressure"
                          name="systolic_blood_pressure"
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit BP Repeat
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PhysicalExamForm;

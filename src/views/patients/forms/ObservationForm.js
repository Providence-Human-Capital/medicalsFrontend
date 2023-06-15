import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";
import PButtons from "../components/PButtons";
import PatientSideView from "../components/PatientSideView";
import Vitals from "../components/Vitals";
import SaveButton from "../../../components/buttons/SaveButton";

const ObeservationForm = () => {
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );

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
      <div className="separation-div"></div>
      <div className="row">
        <div className="col-xl-8 col-12">
          <PButtons routeId={patientId} />
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h2>General Physical Obeservation and Remarks</h2>

                  <form>
                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label for="previous_health_issues">
                            Previous Health Issues
                          </label>
                          <input
                            type="text"
                            id="previous_health_issues"
                            name="previous_health_issues"
                            className="form-control my-upload"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label for="year_of_diagnosis">
                            Year of Diagnosis
                          </label>
                          <input
                            type="text"
                            id="year_of_diagnosis"
                            name="year_of_diagnosis"
                            className="form-control my-upload"
                            pattern="\d{4}"
                            title="Please enter a valid year (yyyy)"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="comment">Comment</label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows="3"
                        className="form-control my-upload"
                        style={styles.textarea}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label for="chest_x_ray">Chest X Ray Normal</label>
                      <div className="form-check" style={styles.formc}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="yes"
                          id="chestXRayYes"
                        />
                        <label className="form-check-label" for="chestXRayYes">
                          Yes
                        </label>
                      </div>
                      <div className="form-check" style={styles.formc}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="no"
                          id="chestXRayNo"
                        />
                        <label className="form-check-label" for="chestXRayNo">
                          No
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="remarks">Remarks</label>
                      <textarea
                        id="remarks"
                        name="remarks"
                        rows="3"
                        className="form-control my-upload"
                        style={styles.textarea}
                      ></textarea>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="swab_result">Swab Result</label>
                          <input
                            type="text"
                            id="swab_result"
                            name="swab_result"
                            className="form-control my-upload"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="fit_to_work">Fit to Work</label>
                          <select
                            id="fit_to_work"
                            name="fit_to_work"
                            className="form-control my-upload"
                          >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* <button type="submit" className="btn btn-primary">
                      Save Observation
                    </button> */}

                    <SaveButton text={" Save Observation"} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-12">
          <PatientSideView />
          {singlePatient.vitals[0] && (
            <Vitals
              vitals={patientPhysicalExamRecord}
              patient={singlePatient}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ObeservationForm;

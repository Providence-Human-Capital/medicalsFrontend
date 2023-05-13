import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";

const ObeservationForm = () => {
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
                <h2>General Physical Obeservation and Remarks</h2>

                <form>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="previous_health_issues">
                          Previous Health Issues
                        </label>
                        <input
                          type="text"
                          id="previous_health_issues"
                          name="previous_health_issues"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="year_of_diagnosis">Year of Diagnosis</label>
                        <input
                          type="text"
                          id="year_of_diagnosis"
                          name="year_of_diagnosis"
                          class="form-control"
                          pattern="\d{4}"
                          title="Please enter a valid year (yyyy)"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="comment">Comment</label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows="3"
                      class="form-control"
                      style={styles.textarea}
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="chest_x_ray">Chest X Ray Normal</label>
                    <div class="form-check" style={styles.formc}>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="yes"
                        id="chestXRayYes"
                        
                      />
                      <label class="form-check-label" for="chestXRayYes">
                        Yes
                      </label>
                    </div>
                    <div class="form-check" style={styles.formc}>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="no"
                        id="chestXRayNo"
                      />
                      <label class="form-check-label" for="chestXRayNo">
                        No
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="remarks">Remarks</label>
                    <textarea
                      id="remarks"
                      name="remarks"
                      rows="3"
                      class="form-control"
                      style={styles.textarea}
                    ></textarea>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="swab_result">Swab Result</label>
                        <input
                          type="text"
                          id="swab_result"
                          name="swab_result"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="fit_to_work">Fit to Work</label>
                        <select
                          id="fit_to_work"
                          name="fit_to_work"
                          class="form-control"
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Save Observation
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

export default ObeservationForm;

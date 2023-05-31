import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";
import PatientSideView from "../components/PatientSideView";
import { useSelector } from "react-redux";
import Vitals from "../components/Vitals";
import PButtons from "../components/PButtons";

// const diseases = [
//   "Cancer",
//   "Heart Disease",
//   "Diabetes",
//   // ... list of diseases from the database
// ];

const IllnessesForm = () => {
  const [currentDisease, setCurrentDisease] = useState(0);
  const [treatedForDisease, setTreatedForDisease] = useState(false);
  const [yearOfTreatment, setYearOfTreatment] = useState("");

  const diseases = useSelector((state) => state.illness.illnesses)

  const handleNextDisease = () => {
    setCurrentDisease(currentDisease + 1);
    setTreatedForDisease(false);
    setYearOfTreatment("");
  };

  const handlePrevDisease = () => {
    setCurrentDisease(currentDisease - 1);
    setTreatedForDisease(false);
    setYearOfTreatment("");
  };

  const handleTreatedForDisease = (e) => {
    setTreatedForDisease(e.target.value === "yes");
  };

  const handleYearOfTreatment = (e) => {
    setYearOfTreatment(e.target.value);
  };

  const { patientId } = useParams();
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );

  return (
    <Fragment>
      <BreadCrumb title={"Illnesses"} activeTab={"Add Patient Illnesses"} />

      <div className="row">
        <div className="col-xl-9 col-12">
          <PButtons routeId={patientId} />
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h2>Have You Ever Been Treated For Any Of The Illness Listed Below?</h2>
                  <div className="illness-form">
                    <div className="row">
                      
                      <div className="col-md-3">
                        <div
                          className="nav flex-column nav-pills"
                          id="v-pills-tab"
                          role="tablist"
                          aria-orientation="vertical"

                        >
                          {diseases.map((disease, index) => (
                            <a
                            
                              key={index}
                              className={`nav-link fw-500 custom-disease ${
                                index === currentDisease ? "active" : ""
                              }`}
                              id={`v-pills-${index}-tab`}
                              data-toggle="pill"
                              href={`#v-pills-${index}`}
                              role="tab"
                              aria-controls={`v-pills-${index}`}
                              aria-selected={index === currentDisease}
                            >
                              {disease.id} {" - "}{disease.illness_name}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="tab-content" id="v-pills-tabContent">
                          {diseases.map((disease, index) => (
                            <div
                              key={index}
                              className={`tab-pane fade show ${
                                index === currentDisease ? "active" : ""
                              }`}
                              id={`v-pills-${index}`}
                              role="tabpanel"
                              aria-labelledby={`v-pills-${index}-tab`}
                            >
                              <h2>{disease.illness_name}</h2>
                              <div className="form-group">
                                <label>Treated for this disease?</label>
                                <select
                                  className="form-control"
                                  value={treatedForDisease ? "yes" : "no"}
                                  onChange={handleTreatedForDisease}
                                >
                                  <option value="no">No</option>
                                  <option value="yes">Yes</option>
                                </select>
                              </div>
                              {treatedForDisease && (
                                <div className="form-group">
                                  <label>Year of treatment:</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={yearOfTreatment}
                                    onChange={handleYearOfTreatment}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                          <div className="text-right">
                            <button
                              className="btn btn-secondary m-2 "
                              onClick={handlePrevDisease}
                              disabled={currentDisease === 0}
                            >
                              Prev
                            </button>
                            <button
                              className="btn btn-primary m-2"
                              onClick={handleNextDisease}
                              disabled={currentDisease === diseases.length - 1}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-12">
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

export default IllnessesForm;

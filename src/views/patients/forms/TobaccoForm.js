import React, { Fragment, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";
import { useSelector } from "react-redux";
import PatientSideView from "../components/PatientSideView";
import Vitals from "../components/Vitals";
import PButtons from "../components/PButtons";
import { useState } from "react";

const TobaccoForm = () => {
  const { patientId } = useParams();
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );

  const tobaccos = useSelector((state) => state.tobacco.tobaccos);

  const [currentTobacco, setCurrentTobacco] = useState(0);
  const [smokeTobacco, setSmokeTobacco] = useState(false);
  const [howManyPerDay, setHowManyPerDay] = useState("");

  const handleNextTobacco = () => {
    setCurrentTobacco(currentTobacco + 1);
    setSmokeTobacco(false);
    setHowManyPerDay("");
  };

  const handlePrevTobacco = () => {
    setCurrentTobacco(currentTobacco - 1);
    setSmokeTobacco(false);
    setHowManyPerDay("");
  };

  const handleSmokeTobacco = (e) => {
    setSmokeTobacco(e.target.value === "yes");
  };

  const handleHowManyPerDay = (e) => {
    setHowManyPerDay(e.target.value);
  };

  return (
    <Fragment>
      <BreadCrumb title={"Tobacco"} activeTab={"Add Patient Tobacco Use"} />
      <div className="separation-div"></div>
      <div className="row">
        <div className="col-xl-8 col-12">
          <PButtons routeId={patientId} />
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h2>Tobacco Use</h2>
                  <div className="illness-form">
                    <div className="row">
                      <div className="col-md-3">
                        <div
                          className="nav flex-column nav-pills"
                          id="v-pills-tab"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          {tobaccos.map((tobacco, index) => (
                            <a
                              key={index}
                              className={`nav-link fw-500 custom-disease ${
                                index === currentTobacco ? "active" : ""
                              }`}
                              id={`v-pills-${index}-tab`}
                              data-toggle="pill"
                              href={`#v-pills-${index}`}
                              role="tab"
                              aria-controls={`v-pills-${index}`}
                              aria-selected={index === currentTobacco}
                            >
                              {tobacco.id} {" - "}
                              {tobacco.name}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="tab-content" id="v-pills-tabContent">
                          {tobaccos.map((tobacco, index) => (
                            <div
                              key={index}
                              className={`tab-pane fade show ${
                                index === currentTobacco ? "active" : ""
                              }`}
                              id={`v-pills-${index}`}
                              role="tabpanel"
                              aria-labelledby={`v-pills-${index}-tab`}
                            >
                              <h2>{tobacco.name}</h2>
                              <div className="form-group">
                                <label>Do you Smoke?</label>
                                <select
                                  className="form-control my-upload"
                                  value={smokeTobacco ? "yes" : "no"}
                                  onChange={handleSmokeTobacco}
                                >
                                  <option value="no">No</option>
                                  <option value="yes">Yes</option>
                                </select>
                              </div>
                              {smokeTobacco && (
                                <div className="form-group">
                                  <label>How Many Per Day:</label>
                                  <input
                                    type="number"
                                    className="form-control my-upload"
                                    value={howManyPerDay}
                                    onChange={handleHowManyPerDay}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                          <div className="text-right">
                            <button
                              className="btn btn-secondary m-2 "
                              onClick={handlePrevTobacco}
                              disabled={currentTobacco === 0}
                            >
                              Prev
                            </button>
                            <button
                              className="btn btn-primary m-2"
                              onClick={handleNextTobacco}
                              disabled={currentTobacco === tobaccos.length - 1}
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

export default TobaccoForm;

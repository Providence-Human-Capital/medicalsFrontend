import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";
import PatientSideView from "../components/PatientSideView";
import { useSelector } from "react-redux";
import Vitals from "../components/Vitals";
import PButtons from "../components/PButtons";
import ErrorNotification from "../../../components/notifications/ErrorNotification";
import axios from "axios";
import { API } from "../../../config";
import Alert from "../../../components/notifications/Alert";
import Loading from "../../../components/loader/Loading";

const IllnessesForm = () => {
  const [currentDisease, setCurrentDisease] = useState(0);
  const [treatedForDisease, setTreatedForDisease] = useState(false);
  const [yearOfTreatment, setYearOfTreatment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const diseases = useSelector((state) => state.illness.illnesses);

  const navigate = useNavigate();

  const handleNextDisease = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const currentDiseaseId = diseases[currentDisease].id;
      if (treatedForDisease) {
        if (!yearOfTreatment) {
          setError("Year of treatment is required");
          return;
        } else {
          setIsLoading(true);
          const response = await axios.patch(
            `${API}/illness/update/${currentDiseaseId}/${patientId}`,
            {
              has_illness: treatedForDisease ? 1 : 0,
              treatment_year: yearOfTreatment,
            }
          );

          console.log(response);

          if (response.status === 200) {
            if (currentDisease === diseases.length - 1) {
              navigate(`/patients/${patientId}/tobacco`);
            }
            setCurrentDisease(currentDisease + 1);
            setTreatedForDisease(false);
            setYearOfTreatment("");
            setSuccess("You have successfully Updated and Illness");
          } else {
            setError("Failed to connect to from the server.");
          }
        }
      } else {
        setCurrentDisease(currentDisease + 1);
        setTreatedForDisease(false);
        setYearOfTreatment("");
        setIsLoading(false);
      }
    } catch (error) {
      setError("Server might be offline. Please try again later.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
    }
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
    const year = e.target.value;
    const currentYear = new Date().getFullYear();
    const isValidYear = /^\d{4}$/.test(year) && year <= currentYear;
    if (isValidYear) {
      setYearOfTreatment(year);
      setError("");
    } else if (year === "") {
      setYearOfTreatment("");
      setError("Year of treatment is required");
    } else {
      setYearOfTreatment(year);
      setError("Please enter a valid year");
    }
  };

  const { patientId } = useParams();
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );

  return (
    <Fragment>
      <BreadCrumb title={"Illnesses"} activeTab={"Add Patient Illnesses"} />
      <div className="separation-div"></div>
      <div className="row">
        <div className="col-xl-9 col-12">
          <PButtons routeId={patientId} />
          {success && <Alert message={success} />}

          <div className="box">
            {error && <ErrorNotification message={error} />}
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h2>
                    Have You Ever Been Treated For Any Of The Illness Listed
                    Below?
                  </h2>
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
                              {disease.id} {" - "}
                              {disease.illness_name}
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
                                    className={`form-control ${
                                      error ? "is-invalid" : ""
                                    }`}
                                    value={yearOfTreatment}
                                    onChange={handleYearOfTreatment}
                                  />
                                  {error && (
                                    <div className="invalid-feedback">
                                      {error}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}

                          {isLoading ? (
                            <Loading />
                          ) : (
                            <div className="text-right">
                              <button
                                className="btn btn-secondary m-2 "
                                onClick={handlePrevDisease}
                                disabled={currentDisease === 0}
                              >
                                Prev
                              </button>
                              {currentDisease === diseases.length - 1 ? (
                                <button
                                  className="btn btn-primary m-2"
                                  onClick={handleNextDisease}
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  className="btn btn-primary m-2"
                                  onClick={handleNextDisease}
                                  disabled={
                                    currentDisease === diseases.length - 1
                                  }
                                >
                                  Next
                                </button>
                              )}
                            </div>
                          )}
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

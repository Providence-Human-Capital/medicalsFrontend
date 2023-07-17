import React, { Fragment, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import PatientSideView from "../components/PatientSideView";
import Vitals from "../components/Vitals";
import PButtons from "../components/PButtons";
import { useState } from "react";
import axios from "axios";
import { API } from "../../../config";
import Loading from "../../../components/loader/Loading";
import { ToastContainer, toast } from "react-toastify";
import { formsActions } from "../../../redux_store/forms-store";
import FormButton from "../../../components/buttons/FormButton";

const TobaccoForm = ({ handlePrev, handleNext }) => {
  const { patientId } = useParams();
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );
  const tobaccos = useSelector((state) => state.tobacco.tobaccos);
  const [currentTobacco, setCurrentTobacco] = useState(0);
  const [smokeTobacco, setSmokeTobacco] = useState(false);
  const [howManyPerDay, setHowManyPerDay] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const handleNextTobacco = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const currentTobaccoId = tobaccos[currentTobacco].id;
      if (smokeTobacco) {
        if (!howManyPerDay) {
          setError("Please enter how many tobaccos per day");
          return;
        } else {
          setIsLoading(true);
          const response = await axios.patch(
            `${API}/tobacco/update/${currentTobaccoId}/${patientId}`,
            {
              do_smoke: smokeTobacco ? 1 : 0,
              how_many: howManyPerDay,
            }
          );

          console.log("Tobacco..", response);
          if (response.status === 200) {
            if (currentTobacco === tobaccos.length - 1) {
              handleNext();
            }
            setCurrentTobacco(currentTobacco + 1);
            setSmokeTobacco(false);
            setHowManyPerDay("");
            dispatch(
              formsActions.setPatientsTobaccos(response.data.tobacco_uses)
            );
            toast.info(response.data.message);
          } else {
            setError("Failed to connect to from the server.");
          }
        }
      } else {
        setCurrentTobacco(currentTobacco + 1);
        setSmokeTobacco(false);
        setHowManyPerDay("");
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

  const handleCurrentTobaccoOnClick = (index) => { 
    setCurrentTobacco(index);
  }

  return (
    <Fragment>
      <div className="step-form">
        <div className="row">
          <div className="col-xl-12 col-12">
            {/* <PButtons routeId={patientId} /> */}
            <div className="box">
              <div className="custom-form">
                <div className="box-body">
                  <div className="container">
                    <h3
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      <strong>Tobacco Use</strong>
                    </h3>
                    <p>
                      If selected <strong>Yes</strong> Please Specify the Number
                      Per Day{" "}
                    </p>
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
                                onClick={() => handleCurrentTobaccoOnClick(index)}
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

                            {isLoading ? (
                              <Loading />
                            ) : (
                              <div className="text-right">
                                <button
                                  className="btn btn-secondary m-2 "
                                  onClick={handlePrevTobacco}
                                  disabled={currentTobacco === 0}
                                >
                                  Prev
                                </button>
                                {currentTobacco === tobaccos.length - 1 ? (
                                  <button
                                    className="btn btn-primary m-2"
                                    onClick={handleNextTobacco}
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-primary m-2"
                                    onClick={handleNextTobacco}
                                    disabled={
                                      currentTobacco === tobaccos.length - 1
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
                <div
                  className="d-flex"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {/* <button onClick={handlePrev}>Previous</button> */}

                  <FormButton
                    text={"Previous"}
                    direction={"left"}
                    onClick={handlePrev}
                  />
                  <FormButton
                    text={"Next"}
                    direction={"right"}
                    onClick={handleNext}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TobaccoForm;

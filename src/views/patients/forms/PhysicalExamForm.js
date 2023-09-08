import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";
import PatientSideView from "../components/PatientSideView";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import Loading from "../../../components/loader/Loading";
import Vitals from "../components/Vitals";
import { patientActions } from "../../../redux_store/patients-store";
import Alert from "../../../components/notifications/Alert";
import PButtons from "../components/PButtons";
import {
  chechCertificatesStatusUpdate,
  getPatient,
} from "../../../services/api";
import SaveButton from "../../../components/buttons/SaveButton";
import ToggleButton from "../../../components/buttons/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import PrevButton from "../../../components/buttons/PrevButton";
import NextButton from "../../../components/buttons/NextButton";
import { formsActions } from "../../../redux_store/forms-store";
import FormButton from "../../../components/buttons/FormButton";

const PhysicalExamForm = ({ handlePrev, handleNext }) => {
  const location = useLocation();
  const { patientId } = useParams();
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
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [showForm, setShowForm] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const handleButtonClick = () => {
    setShowForm(!showForm);
  };
  const navigate = useNavigate();

  const physicalId = 1;

  const initialValues = {
    weight: "",
    height: "",
    bp_sys: "",
    bp_dia: "",
    pulse: "",
    temp: "",
    left_vision: "",
    right_vision: "",
  };

  const bpRepeatInitialValues = {
    bp_repeat_sys: "",
    bp_repeat_dia: "",
  };

  const validationSchema = yup.object().shape({
    weight: yup.number().required("Please Patient Weight"),
    height: yup.number().required("Please Patient Height"),
    bp_sys: yup.number().required("Please Patient Systolic Bp Reading"),
    pulse: yup.number().nullable(),
    temp: yup.number().nullable(),
    bp_dia: yup
      .number()
      .required("Please Patient Systolic Diastolic Bp Reading"),
  });

  const bpRvalidationSchema = yup.object().shape({
    bp_repeat_sys: yup.number().required("Please Enter Systolic Bp Reading"),
    bp_repeat_dia: yup.number().required("Please Enter Diastolic Bp Reading"),
  });

  const onChangeHeight = (e, setFieldValue) => {
    const inputValue = e.target.value;
    let convertedHeight = "";

    if (inputValue.length === 3) {
      const firstDigit = inputValue.charAt(0);
      const remainingDigits = inputValue.slice(1);
      convertedHeight = `${firstDigit}.${remainingDigits}`;
    } else {
      convertedHeight = inputValue;
    }

    setFieldValue("height", convertedHeight);
  };

  const onSubmit = async (formData, { setSubmitting, resetForm }) => {
    dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
    try {
      const response = await fetch(`${API}/physical/${patientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dispatch(uiActions.setAlert({ setAlert: true }));
      const patientData = await getPatient();
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      dispatch(formsActions.setPhysicalExamination(data.data));
      handleNext();
    } catch (error) {
      console.log("Error", error);
    } finally {
      setTimeout(() => {
        dispatch(uiActions.setAlert({ setAlert: false }));
      }, 4000);
      resetForm();
    }
  };
  const onSubmitRepeat = async (formData, { setSubmitting, resetForm }) => {
    dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
    console.log("Physical Exam Repeat", formData);
    try {
      const response = await fetch(
        `${API}/physical/second_bp/${patientPhysicalExamRecord.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Response...", data);
      dispatch(
        patientActions.setLatestPhysicalExam({ latestPhysicalExam: data.data })
      );
      dispatch(uiActions.setAlert({ setAlert: true }));
      setUpdateStatus(true);
    } catch (error) {
      console.log("Error", error);
    } finally {
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      setTimeout(() => {
        dispatch(uiActions.setAlert({ setAlert: false }));
      }, 4000);
      resetForm();
    }
  };

  const patientPhysicalExamRecord = useSelector(
    (state) => state.forms.fPhysicalExamination
  );

  useEffect(() => {
    // chechCertificatesStatusUpdate(patientId).then((data) => {
    //   console.log("From Certificates Update", data);
    // });
  }, [updateStatus]);
  return (
    <Fragment>
      <div className="step-form">
        <div className="row">
          <div className="col-xl-12 col-12">
            {!showForm && (
              <div className="box">
                <div className="custom-form">
                  <div className="box-body">
                    <div className="container">
                      <h3>
                        <strong>Physical Examination</strong>
                      </h3>
                      <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                      >
                        {({
                          values,
                          isSubmitting,
                          handleSubmit,
                          setFieldValue,
                        }) => (
                          <Form>
                            <div className="row">
                              <div className="form-group col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label htmlFor="height">
                                      <strong>Height (in m)</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <div className="form-floating">
                                      <Field
                                        type="number"
                                        className="form-control"
                                        id="height"
                                        placeholder="Enter height"
                                        name="height"
                                        onChange={(e) =>
                                          onChangeHeight(e, setFieldValue)
                                        }
                                      />
                                      <ErrorMessage
                                        name="height"
                                        component="div"
                                        className="error-message"
                                      />
                                      <label htmlFor="height">
                                        <strong>ENTER CLIENT HEIGHT (m)</strong>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label htmlFor="weight">
                                      <strong>Weight (in kg)</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <div className="form-floating">
                                      <Field
                                        type="number"
                                        className="form-control"
                                        id="weight"
                                        placeholder="Enter weight"
                                        name="weight"
                                      />
                                      <ErrorMessage
                                        name="weight"
                                        component="div"
                                        className="error-message"
                                      />
                                      <label htmlFor="weight">
                                        <strong>
                                          ENTER CLIENT WEIGHT (kg)
                                        </strong>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-6">
                                <div className="row">
                                  <div className="col-md-5">
                                    <label htmlFor="bp_sys">
                                      <strong>Systolic Blood Pressure</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-7">
                                    <div className="form-floating">
                                      <Field
                                        type="number"
                                        className="form-control"
                                        id="bp_sys"
                                        placeholder="Systolic"
                                        name="bp_sys"
                                      />
                                      <ErrorMessage
                                        name="bp_sys"
                                        component="div"
                                        className="error-message"
                                      />
                                      <label htmlFor="bp_sys">
                                        <strong>SYSTOLIC BLOOD PRESSURE</strong>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="form-group col-md-6">
                                <div className="row">
                                  <div className="col-md-5">
                                    <label htmlFor="bp_dia">
                                      <strong>Diastolic Blood Pressure</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-7">
                                    <div className="form-floating">
                                      <Field
                                        type="number"
                                        className="form-control"
                                        id="bp_dia"
                                        placeholder="Diastolic"
                                        name="bp_dia"
                                        required
                                      />
                                      <ErrorMessage
                                        name="bp_dia"
                                        component="div"
                                        className="error-message"
                                      />
                                      <label htmlFor="bp_dia">
                                        <strong>
                                          DIASTOLIC BLOOD PRESSURE
                                        </strong>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      {/* <label htmlFor="left_vision">
                                        <strong>Pulse</strong>
                                      </label> */}
                                      <div className="input-group">
                                        <div className="form-floating">
                                          <Field
                                            type="number"
                                            className="form-control"
                                            id="pulse"
                                            placeholder="BP Test Pulse"
                                            name="pulse"
                                          />
                                          <label htmlFor="pulse">
                                            <strong>PULSE</strong>
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      {/* <label htmlFor="left_vision">
                                        <strong>Temperature</strong>
                                      </label> */}
                                      <div className="input-group">
                                        <div className="form-floating">
                                          <Field
                                            type="number"
                                            className="form-control"
                                            id="temp"
                                            placeholder="Temperature"
                                            name="temp"
                                          />
                                          <label htmlFor="temp">
                                            <strong>TEMPERATURE</strong>
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-6">
                                    <label htmlFor="left_vision">
                                      <strong>Left Vision (out of 6)</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <div className="input-group">
                                        <Field
                                          type="number"
                                          className="form-control"
                                          id="left_vision"
                                          placeholder="Enter left vision"
                                          name="left_vision"
                                          style={{
                                            height: "60px"
                                          }}
                                        />
                                        <div className="input-group-append">
                                          <span className="input-group-text">
                                            /6
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6">
                                    <label htmlFor="right_vision ">
                                      <strong>Right Vision (out of 6)</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <div className="input-group">
                                        <Field
                                          type="number"
                                          className="form-control"
                                          id="right_vision"
                                          placeholder="Enter right vision"
                                          name="right_vision"
                                          style={{
                                            height: "60px"
                                          }}
                                        />
                                        <div className="input-group-append">
                                          <span className="input-group-text">
                                            /6
                                          </span>
                                        </div>
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
                              <FormButton
                                text={"Previous"}
                                direction={"left"}
                                onClick={handlePrev}
                              />

                              {isLoading ? (
                                <Loading />
                              ) : (
                                <FormButton
                                  text={"Next"}
                                  direction={"right"}
                                  onClick={onSubmit}
                                />
                              )}
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleButtonClick}
              className="btn btn-primary me-5 mb-md-0 mb-5 "
              style={{
                borderRadius: "0.9em",
                fontWeight: "bold",
              }}
            >
              <FontAwesomeIcon color="#fff" icon={faWaveSquare} /> {"  "}
              {showForm ? "Hide BP Repeat Form" : "Add BP Repeat"}
            </button>

            <div className="separation-div"></div>

            {showForm && (
              <div className="box">
                <div className="custom-form">
                  <div className="box-body">
                    <div className="container">
                      <h2>Blood Pressure Repeat</h2>
                      <Formik
                        initialValues={bpRepeatInitialValues}
                        onSubmit={onSubmitRepeat}
                        validationSchema={bpRvalidationSchema}
                      >
                        {({ values, isSubmitting, handleSubmit }) => (
                          <Form>
                            <div className="row">
                              <div className="form-group col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label htmlFor="bp_repeat_sys">
                                      <strong>Systolic Blood Pressure</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <Field
                                      type="number"
                                      className="form-control my-upload"
                                      id="bp_repeat_sys"
                                      placeholder="Enter systolic blood pressure"
                                      name="bp_repeat_sys"
                                      required
                                    />
                                    <ErrorMessage
                                      name="bp_repeat_sys"
                                      component="div"
                                      className="error-message"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-group col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label htmlFor="bp_repeat_dia">
                                      <strong>Diastolic Blood Pressure</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <Field
                                      type="number"
                                      className="form-control my-upload"
                                      id="bp_repeat_dia"
                                      placeholder="Enter diastolic blood pressure"
                                      name="bp_repeat_dia"
                                      required
                                    />
                                    <ErrorMessage
                                      name="bp_repeat_dia"
                                      component="div"
                                      className="error-message"
                                    />
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
                              {isLoading ? (
                                <Loading />
                              ) : (
                                <FormButton
                                  text={"Save Reading"}
                                  direction={"right"}
                                  onClick={handleSubmit}
                                />
                              )}
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PhysicalExamForm;

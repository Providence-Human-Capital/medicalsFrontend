import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { getPatient } from "../../../services/api";
import SaveButton from "../../../components/buttons/SaveButton";
import ToggleButton from "../../../components/buttons/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";

const PhysicalExamForm = ({ handlePrev, handleNext }) => {
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
    bp_dia: yup
      .number()
      .required("Please Patient Systolic Diastolic Bp Reading"),
  });

  const bpRvalidationSchema = yup.object().shape({
    bp_repeat_sys: yup.number().required("Please Enter Systolic Bp Reading"),
    bp_repeat_dia: yup.number().required("Please Enter Diastolic Bp Reading"),
  });

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
      dispatch(
        patientActions.setLatestPhysicalExam({ latestPhysicalExam: data.data })
      );
      dispatch(uiActions.setAlert({ setAlert: true }));
      const patientData = await getPatient();
      dispatch(patientActions.setSinglePatient({ singlePatient: patientData }));
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      navigate(`/patients/${patientId}`);
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
      dispatch(
        patientActions.setLatestPhysicalExam({ latestPhysicalExam: data.data })
      );
      dispatch(uiActions.setAlert({ setAlert: true }));
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

  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );
  const addedNew = useSelector((state) => state.ui.showAlert);

  useEffect(() => { }, []);
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
                        {({ values, isSubmitting, handleSubmit }) => (
                          <Form>
                            <div className="row">
                              <div className="form-group col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label for="height">
                                      <strong>Height (in m)</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <Field
                                      type="number"
                                      className="form-control my-upload"
                                      id="height"
                                      placeholder="Enter height"
                                      name="height"
                                    />
                                    <ErrorMessage
                                      name="height"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>


                              </div>
                              <div className="form-group col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label for="weight">
                                      <strong>
                                        Weight (in kg)
                                      </strong>
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <Field
                                      type="number"
                                      className="form-control my-upload"
                                      id="weight"
                                      placeholder="Enter weight"
                                      name="weight"
                                    />
                                    <ErrorMessage
                                      name="weight"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>


                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label for="bp_sys">
                                      <strong>Systolic Blood Pressure</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <Field
                                      type="number"
                                      className="form-control my-upload"
                                      id="bp_sys"
                                      placeholder="Enter systolic blood pressure"
                                      name="bp_sys"
                                    />
                                    <ErrorMessage
                                      name="bp_sys"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>


                              </div>

                              <div className="form-group col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label for="bp_dia">
                                      <strong>
                                        Diastolic Blood Pressure
                                      </strong>

                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <Field
                                      type="number"
                                      className="form-control my-upload"
                                      id="bp_dia"
                                      placeholder="Enter diastolic blood pressure"
                                      name="bp_dia"
                                      required
                                    />
                                    <ErrorMessage
                                      name="bp_dia"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>


                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-6">
                                <label for="left_vision">
                                  Left Vision (out of 6)
                                </label>
                                <div className="input-group">
                                  <Field
                                    type="number"
                                    className="form-control my-upload"
                                    id="left_vision"
                                    placeholder="Enter left vision"
                                    name="left_vision"
                                    required
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text my-upload">
                                      /6
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group col-md-6">
                                <label for="right_vision ">
                                  Right Vision (out of 6)
                                </label>
                                <div className="input-group">
                                  <Field
                                    type="number"
                                    className="form-control my-upload"
                                    id="right_vision"
                                    placeholder="Enter right vision"
                                    name="right_vision"
                                    required
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text my-upload">
                                      /6
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* {isLoading ? (
                              <Loading />
                            ) : (
                              // <button
                              //   type="submit"
                              //   className="btn btn-primary"
                              //   disabled={isSubmitting}
                              //   onClick={handleSubmit}
                              // >
                              //   Submit Examination
                              // </button>
                              <SaveButton
                                text={"Submit Examination"}
                                disable={isSubmitting}
                                onClick={handleSubmit}
                              />
                            )} */}
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
            >
              <FontAwesomeIcon color="#fff" icon={faWaveSquare} /> {"  "}
              {showForm ? "Hide BP Repeat Form" : "Add BP Repeat"}
            </button>
            {/* <ToggleButton
            onClick={handleButtonClick}
            text={showForm ? "Hide BP Repeat Form" : "Show BP Repeat Form"}
          /> */}

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
                                    <label for="bp_repeat_sys">
                                      <strong>
                                        Systolic Blood Pressure
                                      </strong>
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
                                      className="text-danger"
                                    />
                                  </div>
                                </div>


                              </div>
                              <div className="form-group col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label for="bp_repeat_dia">
                                      <strong>
                                        Diastolic Blood Pressure
                                      </strong>
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
                                      className="text-danger"
                                    />
                                  </div>
                                </div>


                              </div>
                            </div>
                            {/* {isLoading ? (
                              <Loading />
                            ) : (
                              // <button type="submit" className="btn btn-primary">
                              //   Submit BP Repeat
                              // </button>
                              <SaveButton
                                text={"Submit BP Repeat"}
                                disable={isSubmitting}
                                onClick={onSubmitRepeat}
                              />
                            )} */}
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div className="col-xl-4 col-12">
            <PatientSideView />
            {singlePatient.vitals.length !== 0 && (
              <Vitals
                vitals={patientPhysicalExamRecord}
                patient={singlePatient}
              />
            )}
          </div> */}
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
          <button onClick={handlePrev} disabled={true}>
            Previous
          </button>

          <button onClick={handleNext}>Next</button>
        </div>
      </div>

    </Fragment>
  );
};

export default PhysicalExamForm;

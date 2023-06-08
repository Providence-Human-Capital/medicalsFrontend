import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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

const PhysicalExamForm = () => {
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
    dispatch(
      uiActions.setLoadingSpinner({
        isLoading: true,
      })
    );
    console.log("Physical Exam", formData);
    try {
      const response = await fetch(`${API}/physical/${patientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Pysical Response", data);

      if (response.ok) {
        dispatch(
          patientActions.setLatestPhysicalExam({
            latestPhysicalExam: { ...data.data },
          }),

          uiActions.setAlert({
            setAlert: true,
          })
        );
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: false,
        })
      );
      setTimeout(() => {
        dispatch(
          uiActions.setAlert({
            setAlert: false,
          })
        );
      }, 4000);

      resetForm();
    }
  };

  const onSubmitRepeat = async (formData, { setSubmitting, resetForm }) => {
    dispatch(
      uiActions.setLoadingSpinner({
        isLoading: true,
      })
    );
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

      const data = await response.json();
      console.log("Pysical Response", data);
      if (response.ok) {
        dispatch(
          patientActions.setLatestPhysicalExam({
            latestPhysicalExam: { ...data.data },
          }),

          uiActions.setAlert({
            setAlert: true,
          })
        );
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: false,
        })
      );

      setTimeout(() => {
        dispatch(
          uiActions.setAlert({
            setAlert: false,
          })
        );
      }, 4000);

      resetForm();
    }
  };

  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );
  const addedNew = useSelector((state) => state.ui.showAlert);

  useEffect(() => {}, []);
  return (
    <Fragment>
      <BreadCrumb
        title={"Observation and Remarks"}
        activeTab={"General Observation"}
      />
      {addedNew && <Alert message={"Physical Exam Successfully Added!"} />}

      <div className="separation-div"></div>
      <div className="row">
        <div className="col-xl-8 col-12">
          <PButtons routeId={patientId} />
          {!showForm && (
            <div className="box">
              <div className="custom-form">
                <div className="box-body">
                  <div className="container">
                    <h2>Physical Examination</h2>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={onSubmit}
                      validationSchema={validationSchema}
                    >
                      {({ values, isSubmitting, handleSubmit }) => (
                        <Form>
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label for="height">Height (in m)</label>
                              <Field
                                type="number"
                                className="form-control"
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
                            <div className="form-group col-md-6">
                              <label for="weight">Weight (in kg)</label>
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
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label for="bp_sys">
                                Systolic Blood Pressure
                              </label>
                              <Field
                                type="number"
                                className="form-control"
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

                            <div className="form-group col-md-6">
                              <label for="bp_dia">
                                Diastolic Blood Pressure
                              </label>
                              <Field
                                type="number"
                                className="form-control"
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
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label for="left_vision">
                                Left Vision (out of 6)
                              </label>
                              <div className="input-group">
                                <Field
                                  type="number"
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
                                <Field
                                  type="number"
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
                          {isLoading ? (
                            <Loading />
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={isSubmitting}
                              onClick={handleSubmit}
                            >
                              Submit Examination
                            </button>
                          )}
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
            className="btn btn-primary me-5 mb-md-0 mb-5 py-3 px-4"
          >
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
                              <label for="bp_repeat_sys">
                                Systolic Blood Pressure
                              </label>
                              <Field
                                type="number"
                                className="form-control"
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
                            <div className="form-group col-md-6">
                              <label for="bp_repeat_dia">
                                Diastolic Blood Pressure
                              </label>
                              <Field
                                type="number"
                                className="form-control"
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
                          {isLoading ? (
                            <Loading />
                          ) : (
                            <button type="submit" className="btn btn-primary">
                              Submit BP Repeat
                            </button>
                          )}
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-xl-4 col-12">
          <PatientSideView />
          {singlePatient.vitals.length !== 0 && (
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

export default PhysicalExamForm;

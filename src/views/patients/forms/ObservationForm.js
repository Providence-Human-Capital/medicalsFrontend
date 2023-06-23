import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";
import PButtons from "../components/PButtons";
import PatientSideView from "../components/PatientSideView";
import Vitals from "../components/Vitals";
import SaveButton from "../../../components/buttons/SaveButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API } from "../../../config";
import { uiActions } from "../../../redux_store/ui-store";
import { formsActions } from "../../../redux_store/forms-store";
import Loading from "../../../components/loader/Loading";

const ObeservationForm = ({ handlePrev, handleNext }) => {
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const navigate = useNavigate();
  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );

  const isLoading = useSelector((state) => state.ui.isLoading);

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

  const validationSchema = Yup.object().shape({
    previous_health_issues: Yup.string().required("Required"),
    year_of_diagnosis: Yup.string()
      .matches(/^\d{4}$/, "Please enter a valid year (yyyy)")
      .required("Required"),
    comment: Yup.string(),
    chest_x_ray: Yup.string(),
    remarks: Yup.string(),
    swab_result: Yup.string(),
    fit_to_work: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    // '/patients/{patientId}/remarks'
    // setTimeout(() => {
    //   console.log(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 400);

    dispatch(uiActions.setLoadingSpinner({ isLoading: true }));

    try {
      const response = await fetch(`${API}/patients/${patientId}/remarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log("Response from server" + responseData);
      dispatch(formsActions.setFoodHandlerRemarks(responseData.data));
      navigate(`/patients/${patientId}`);

      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    } catch (error) {
      console.log("Error", error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };

  return (
    <Fragment>
      <div className="step-form">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="box">
              <div className="custom-form">
                <div className="box-body">
                  <div className="container">
                    <h3
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      <strong>General Physical Obeservation and Remarks</strong>
                    </h3>

                    <Formik
                      initialValues={{
                        previous_health_issues: "",
                        year_of_diagnosis: "",
                        comment: "",
                        chest_x_ray: "",
                        remarks: "",
                        swab_result: "",
                        fit_to_work: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className="row">
                            <div className="col-md-8">
                              <div className="form-group">
                                <label htmlFor="previous_health_issues">
                                  Previous Health Issues
                                </label>
                                <Field
                                  type="text"
                                  id="previous_health_issues"
                                  name="previous_health_issues"
                                  className="form-control my-upload"
                                />
                                <ErrorMessage name="previous_health_issues" />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="year_of_diagnosis">
                                  Year of Diagnosis
                                </label>
                                <Field
                                  type="text"
                                  id="year_of_diagnosis"
                                  name="year_of_diagnosis"
                                  className="form-control my-upload"
                                />
                                <ErrorMessage name="year_of_diagnosis" />
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="comment">Comment</label>
                            <Field
                              as="textarea"
                              id="comment"
                              name="comment"
                              rows="4"
                              className="form-control my-upload"
                              style={styles.textarea}
                            />
                            <ErrorMessage name="comment" />
                          </div>

                          <div className="form-group">
                            <label
                              htmlFor="chest_x_ray"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              <strong>Chest X Ray Normal</strong>
                            </label>
                            <div className="form-check" style={styles.formc}>
                              <Field
                                className="form-check-input"
                                type="radio"
                                value="1"
                                id="chestXRayYes"
                                name="chest_x_ray"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="chestXRayYes"
                              >
                                Yes
                              </label>
                            </div>
                            <div className="form-check" style={styles.formc}>
                              <Field
                                className="form-check-input"
                                type="radio"
                                value="0"
                                id="chestXRayNo"
                                name="chest_x_ray"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="chestXRayNo"
                              >
                                No
                              </label>
                            </div>
                            <ErrorMessage name="chest_x_ray" />
                          </div>

                          <div className="form-group">
                            <label htmlFor="remarks">
                              <strong>Remarks</strong>
                            </label>
                            <Field
                              as="textarea"
                              id="remarks"
                              name="remarks"
                              rows="3"
                              className="form-control my-upload"
                              style={styles.textarea}
                            />
                            <ErrorMessage name="remarks" />
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="swab_result">Swab Result</label>
                                <Field
                                  type="text"
                                  id="swab_result"
                                  name="swab_result"
                                  className="form-control my-upload"
                                />
                                <ErrorMessage name="swab_result" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-8">
                                  <label htmlFor="fit_to_work">
                                    <strong>Fit to Work</strong>
                                  </label>
                                  <p>
                                    Is this patient fit to work ? (Select{" "}
                                    <strong>Yes</strong>) is he/she is.{" "}
                                  </p>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <Field
                                      as="select"
                                      id="fit_to_work"
                                      name="fit_to_work"
                                      className="form-control my-upload"
                                    >
                                      <option value="">Select</option>
                                      <option value="1">Yes</option>
                                      <option value="0">No</option>
                                    </Field>
                                    <ErrorMessage name="fit_to_work" />
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
                            <button onClick={handlePrev} disabled={true}>
                              Previous
                            </button>

                            {isLoading ? (
                              <Loading />
                            ) : (
                              <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                              >
                                Save Obeservation
                              </button>
                            )}
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ObeservationForm;

<form></form>;

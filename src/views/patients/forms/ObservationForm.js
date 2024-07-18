import React, { Fragment, useEffect, useState } from "react";
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
import FormButton from "../../../components/buttons/FormButton";
import { chechCertificatesStatusUpdate } from "../../../services/api";
import { Tooltip } from "react-bootstrap";

const ObeservationForm = ({ handlePrev, handleNext }) => {
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const [updateStatus, setUpdateStatus] = useState(false);
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );

  const isLoading = useSelector((state) => state.ui.isLoading);

  const styles = {
    textarea: {
      height: "100px",
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
    previous_health_issues: Yup.string().nullable(),
    year_of_diagnosis: Yup.string()
      .matches(/^\d{4}$/, "Please enter a valid year (yyyy)")
      .nullable(),
    comment: Yup.string(),
    chest_x_ray: Yup.string(),
    remarks: Yup.string(),
    swab_result: Yup.string(),
    fit_to_work: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
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
      chechCertificatesStatusUpdate(patientId).then((data) => {
        console.log("From Certificates Update", data);
      });
      navigate(`/patients/${patientId}`);

      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    } catch (error) {
      console.log("Error", error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };

  useEffect(() => {}, [updateStatus]);

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
                        previous_health_issues: "N/A",
                        year_of_diagnosis: "",
                        comment: "NAD",
                        chest_x_ray: 1,
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
                                <div className="form-floating">
                                  <Field
                                    type="text"
                                    id="previous_health_issues"
                                    name="previous_health_issues"
                                    className="form-control"
                                    disabled={user.role_id !== 6}
                                  />
                                  <label htmlFor="previous_health_issues">
                                    ANY PREVIOUS HEALTH ISSUES
                                  </label>
                                  <ErrorMessage
                                    name="previous_health_issues"
                                    htmlFor="previous_health_issues"
                                    className="error-message"
                                  />
                                  {user.role_id !== 6 && (
                                      <Tooltip
                                        placement="top"
                                        title="Only a doctor or nurse is allowed to comment on xray"
                                      >
                                        <span className="disabled-field-tooltip">
                                          ℹ
                                        </span>
                                      </Tooltip>
                                    )}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="year_of_diagnosis">
                                  Year of Diagnosis
                                </label>
                                <div className="form-floating">
                                  <Field
                                    type="text"
                                    id="year_of_diagnosis"
                                    name="year_of_diagnosis"
                                    className="form-control"
                                    disabled={user.role_id !== 6}
                                  />
                                  <label htmlFor="year_of_diagnosis">
                                    YEAR OF DIAGNOSIS
                                  </label>
                                  <ErrorMessage
                                    name="year_of_diagnosis"
                                    htmlFor="year_of_diagnosis"
                                    className="error-message"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="comment">Comment</label>
                            <div className="form-floating">
                              <Field
                                as="textarea"
                                id="comment"
                                name="comment"
                                rows="4"
                                className="form-control"
                                style={styles.textarea}
                                disabled={user.role_id !== 6}
                              />
                              <label htmlFor="comment">GENERAL COMMENT</label>
                              <ErrorMessage
                                name="comment"
                                className="error-message"
                              />
                            </div>
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
                                value={1}
                                id="chestXRayYes"
                                name="chest_x_ray"
                                disabled={user.role_id !== 6}
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
                                value={0}
                                id="chestXRayNo"
                                name="chest_x_ray"
                                disabled={user.role_id !== 6}
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
                            <div className="form-floating">
                              <Field
                                as="textarea"
                                id="remarks"
                                name="remarks"
                                rows="3"
                                className="form-control"
                                style={styles.textarea}
                                disabled={user.role_id !== 6}
                              />
                              <label htmlFor="remarks">GENERAL REMARKS</label>
                              <ErrorMessage
                                name="remarks"
                                className="error-message"
                              />
                            </div>
                          </div>

                          <div className="row">
                            {/* <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="swab_result"
                                  style={{
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Swab Result
                                </label>
                                <div className="form-floating">
                                  <Field
                                    type="text"
                                    id="swab_result"
                                    name="swab_result"
                                    className="form-control"
                                    disabled={user.role_id !== 6}
                                  />
                                  <ErrorMessage
                                    name="swab_result"
                                    className="error-message"
                                  />
                                </div>
                              </div>
                            </div> */}
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-8">
                                  <label
                                    htmlFor="fit_to_work"
                                    style={{
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    <strong>Fit to Work</strong>
                                  </label>
                                  <p>
                                    Is this patient fit to work ? (Select{" "}
                                    <strong>Yes</strong>) is he/she is.{" "}
                                  </p>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="form-floating">
                                      <Field
                                        as="select"
                                        id="fit_to_work"
                                        name="fit_to_work"
                                        className="form-select"
                                        disabled={user.role_id !== 6}
                                      >
                                        <option value="">Select</option>
                                        <option value="1">YES</option>
                                        <option value="0">NO</option>
                                      </Field>
                                      <label>FIT TO WORK?</label>
                                      <ErrorMessage name="fit_to_work" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {user.role_id !== 6 ? (
                            <FormButton
                              text={"Previous"}
                              direction={"left"}
                              onClick={handlePrev}
                            />
                          ) : (
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
                                  text={"Save Obeservation"}
                                  direction={"right"}
                                  onClick={onSubmit}
                                />
                              )}
                            </div>
                          )}
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

import React, { Fragment } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import { toast } from "react-toastify";
import { formsActions } from "../../../redux_store/forms-store";
import Loading from "../../../components/loader/Loading";
import FormButton from "../../../components/buttons/FormButton";

const MedicalHistoryForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const HealthSchema = Yup.object().shape({
    // serious_injury: Yup.boolean(),
    // injury_details: Yup.string().when("serious_injury", {
    //   is: true,
    //   then: Yup.string().nullable(),
    // }),
    // admitted: Yup.boolean(),
    // admission_details: Yup.string().when("admitted", {
    //   is: true,
    //   then: Yup.string().nullable(),
    // }),
    // allergies: Yup.boolean().nullable(),
    // allergies_details: Yup.string().when("allergies", {
    //   is: true,
    //   then: Yup.string().nullable(),
    // }),
    // health_state: Yup.string().nullable(),
    // alcohol: Yup.boolean(),
    // alcohol_per_day: Yup.number().when("alcohol", {
    //   is: true,
    //   then: Yup.number().nullable()
    // }),
    // alcohol_per_week: Yup.number().when("alcohol", {
    //   is: true,
    //   then: Yup.number().nullable(),
    // }),
    // exercise: Yup.string().nullable(),
  });

  const onHandleSubmit = async (values) => {
    values.serious_injury = values.serious_injury === "true";
    values.admitted = values.admitted === "true";
    values.allergies = values.allergies === "true";
    values.alcohol = values.alcohol === "true";

    console.log("values", values.serious_injury); 
    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(`${API}/medical/history/${patientId}`, {
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
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      dispatch(formsActions.setMedicalHistory(responseData.data));
      toast.dark("Patient's Medical History Successfully Added");
      handleNext();
    } catch (error) {
      console.log("Error", error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };

  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4
                style={{
                  textTransform: "uppercase",
                }}
              >
                <strong>Patients Medical History (Step 2)</strong>
              </h4>

              <Formik
                initialValues={{
                  serious_injury: false,
                  injury_details: "",
                  admitted: false,
                  admission_details: "",
                  allergies: false,
                  allergies_details: "",
                  health_state: "",
                  alcohol: false,
                  alcohol_per_day: null,
                  alcohol_per_week: null,
                  exercise: "",
                }}
                validationSchema={HealthSchema}
                onSubmit={onHandleSubmit}
              >
                {({ errors, touched, values }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="serious_injury">
                          <strong>Have you had a serious injury?</strong>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <Field
                            as="select"
                            name="serious_injury"
                            className="form-control my-upload"
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    {errors.serious_injury && touched.serious_injury && (
                      <div className="alert alert-danger">
                        {errors.serious_injury}
                      </div>
                    )}
                    {values.serious_injury && (
                      <div className="form-group">
                        <label htmlFor="injury_details">
                          Please provide injury details:
                        </label>
                        <Field
                          type="text"
                          className={`form-control my-upload ${
                            errors.injury_details && touched.injury_details
                              ? "is-invalid"
                              : ""
                          }`}
                          name="injury_details"
                        />
                        <ErrorMessage
                          name="injury_details"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    )}
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="admitted">
                          <strong>
                            Have you ever been admitted to a hospital?
                          </strong>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <Field
                            as="select"
                            name="admitted"
                            className="form-control my-upload"
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    {errors.admitted && touched.admitted && (
                      <div className="alert alert-danger">
                        {errors.admitted}
                      </div>
                    )}
                    {values.admitted && (
                      <div className="form-group">
                        <label htmlFor="admission_details">
                          Please provide details of when you were addmitted:
                        </label>
                        <Field
                          type="text"
                          className={`form-control my-upload ${
                            errors.admission_details &&
                            touched.admission_details
                              ? "is-invalid"
                              : ""
                          }`}
                          name="admission_details"
                        />
                        <ErrorMessage
                          name="admission_details"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    )}
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="allergies">
                          <strong> Do you have any allergies?</strong>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <Field
                            as="select"
                            name="allergies"
                            className="form-control my-upload"
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    {errors.allergies && touched.allergies && (
                      <div className="alert alert-danger">
                        {errors.allergies}
                      </div>
                    )}
                    {values.allergies && (
                      <div className="form-group">
                        <label htmlFor="allergies_details">
                          Please provide details of allergies :
                        </label>
                        <Field
                          type="text"
                          className={`form-control my-upload ${
                            errors.allergies_details &&
                            touched.allergies_details
                              ? "is-invalid"
                              : ""
                          }`}
                          name="allergies_details"
                        />
                        <ErrorMessage
                          name="allergies_details"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    )}
                    <div className="row">
                      <label htmlFor="health_state">Health state</label>
                      <div className="col-md-6">
                        <p>
                          <strong>
                            How do you consider your state of health at present
                            ?
                          </strong>{" "}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <Field
                            as="select"
                            className={`form-control my-upload ${
                              errors.health_state && touched.health_state
                                ? "is-invalid"
                                : ""
                            }`}
                            name="health_state"
                          >
                            <option value="Good">Good</option>
                            <option value="Poor">Poor</option>
                            <option value="Fair">Fair</option>
                            <option value="Very Good">Very Good</option>
                            <option value="Excellent">Excellent</option>
                          </Field>
                          <ErrorMessage
                            name="health_state"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="alcohol">
                          <strong>Do you drink alcohol?</strong>{" "}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <Field
                            as="select"
                            name="alcohol"
                            className="form-control my-upload"
                          >
                            <option value="">Select an option</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    {errors.alcohol && touched.alcohol && (
                      <div className="alert alert-danger">{errors.alcohol}</div>
                    )}
                    {values.alcohol && (
                      <React.Fragment>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="alcohol_per_day">
                                How many drinks per day?
                              </label>
                              <Field
                                type="number"
                                className={`form-control my-upload ${
                                  errors.alcohol_per_day &&
                                  touched.alcohol_per_day
                                    ? "is-invalid"
                                    : ""
                                }`}
                                name="alcohol_per_day"
                              />
                              <ErrorMessage
                                name="alcohol_per_day"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="alcohol_per_week">
                                How many drinks per week?
                              </label>
                              <Field
                                type="number"
                                className={`form-control my-upload ${
                                  errors.alcohol_per_week &&
                                  touched.alcohol_per_week
                                    ? "is-invalid"
                                    : ""
                                }`}
                                name="alcohol_per_week"
                              />
                              <ErrorMessage
                                name="alcohol_per_week"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {/* <button type="submit" className="btn btn-primary">
                      Submit
                    </button> */}

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
                      {/* <button onClick={handleNext}>Temp Next</button> */}

                      {isLoading ? (
                        <Loading />
                      ) : (
                        // <button onClick={onHandleSubmit}>Next</button>
                        <FormButton
                          text={"Next"}
                          direction={"right"}
                          onClick={onHandleSubmit}
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
    </div>
  );
};

export default MedicalHistoryForm;

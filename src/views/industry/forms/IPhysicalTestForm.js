import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uiActions } from "../../../redux_store/ui-store";
import Loading from "../../../components/loader/Loading";
import { API } from "../../../config";
import { toast } from "react-toastify";
import { formsActions } from "../../../redux_store/forms-store";
import FormButton from "../../../components/buttons/FormButton";

const IPhysicalTestForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const [latestVitals, setLatestVitals] = useState({});
  const { patientId } = useParams();

  const validationSchema = Yup.object().shape({
    exercise: Yup.string().nullable(),
    how_often: Yup.string().nullable(),
    how_long: Yup.string().nullable(),
    height: Yup.number().required("Patients Height is required"),
    weight: Yup.number().required("Patients Weight is required"),
    chest_in: Yup.string().nullable(),
    chest_out: Yup.string().nullable(),
    mental_state: Yup.string().nullable(),
    le_glass: Yup.number()
      .typeError("Please enter a valid number")
      .min(1, "Number must be at least 1")
      .max(6, "Number must be at most 6")
      .nullable(),
    le_woglass: Yup.number()
      .typeError("Please enter a valid number")
      .min(1, "Number must be at least 1")
      .max(6, "Number must be at most 6")
      .nullable(),
    re_glass: Yup.number()
      .typeError("Please enter a valid number")
      .min(1, "Number must be at least 1")
      .max(6, "Number must be at most 6")
      .nullable(),
    re_woglass: Yup.number()
      .typeError("Please enter a valid number")
      .min(1, "Number must be at least 1")
      .max(6, "Number must be at most 6")
      .nullable(),
    right_ear: Yup.string().nullable(),
    left_ear: Yup.string().nullable(),
    audiogram_comment: Yup.string().nullable(),
    speech: Yup.string().nullable(),
  });

  const getLatestVitals = async () => {
    try {
      const response = await fetch(`${API}/physical/latest/${patientId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const resp = await response.json();
      if (response.ok) {
        console.log("Latest Physical Exam", resp.data);
        setLatestVitals(resp.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const initialValues = {
    exercise: "",
    how_often: "",
    how_long: "",
    weight: latestVitals ? latestVitals.weight : "",
    height: latestVitals ? latestVitals.height : "",
    chest_in: "",
    chest_out: "",
    mental_state: "",
    le_glass: null,
    le_woglass: null,
    re_glass: null,
    re_woglass: null,
    right_ear: "",
    left_ear: "",
    audiogram_comment: "",
    speech: "",
  };

  const handleInputChange = (event, setFieldValue, glass) => {
    const inputValue = event.target.value;
    const number = parseInt(inputValue);

    if (!isNaN(number) && number >= 1 && number <= 6) {
      setFieldValue(glass, number);
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);

    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(`${API}/other/physical_exam/${patientId}`, {
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
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      dispatch(formsActions.setOtherPhysicalExamination(responseData.data));
      toast.dark("Patient's Medical History Successfully Added");
      handleNext();
    } catch (error) {
      console.log("Error", error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };

  useEffect(() => {
    getLatestVitals()
  }, [])
  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4>
                <strong>Patient Physical Test Examination </strong>
              </h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched, setFieldValue }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        {" "}
                        <label htmlFor="exercise">
                          <strong>What Exercise do you do?</strong>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <p>Specify the Exercise you do</p>
                        <div className="form-group">
                          <Field
                            type="text"
                            name="exercise"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="exercise"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="how_often">
                            <strong>How Often Do You Exercise</strong>
                          </label>
                          <Field
                            type="text"
                            name="how_often"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="how_often"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="how_long">
                            <strong>How Long</strong>
                          </label>
                          <Field
                            type="text"
                            name="how_long"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="how_long"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="height">Height</label>
                              <Field
                                type="number"
                                name="height"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="height"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="weight">Weight</label>
                              <Field
                                type="number"
                                name="weight"
                                className="form-control my-upload"
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
                      <div className="col-md-6">
                        <h4>
                          {" "}
                          <strong>Chest Expansion</strong>{" "}
                        </h4>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="chest_in">Chest In</label>
                              <Field
                                type="text"
                                name="chest_in"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="chest_in"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="chest_out">Chest Out</label>
                              <Field
                                type="text"
                                name="chest_out"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="chest_out"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <h4>
                          <strong>Physical Development</strong>
                        </h4>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="mental_state">Mental State</label>
                          <Field
                            type="text"
                            name="mental_state"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="mental_state"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-center">
                        <strong>Vision (Snellen' standard type)</strong>
                      </h5>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <h4>
                          <strong>Right Eye</strong>
                        </h4>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="re_glass">With Glasses</label>
                              <Field
                                type="number"
                                name="re_glass"
                                className="form-control my-upload"
                                max={6}
                              />
                              <ErrorMessage
                                name="re_glass"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="re_woglass">
                                Without Glasses
                              </label>
                              <Field
                                type="number"
                                name="re_woglass"
                                className="form-control my-upload"
                                max={6}
                              />
                              <ErrorMessage
                                name="re_woglass"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h4>
                          <strong>Left Eye</strong>
                        </h4>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="le_glass">With Glasses</label>
                              <Field
                                type="number"
                                name="le_glass"
                                className="form-control my-upload"
                                max={6}
                              />
                              <ErrorMessage
                                name="le_glass"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="le_woglass">
                                Without Glasses
                              </label>
                              <Field
                                type="number"
                                name="le_woglass"
                                className="form-control my-upload"
                                max={6}
                              />
                              <ErrorMessage
                                name="le_woglass"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-center">
                        <strong>HEARING</strong>
                      </h5>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="right_ear">
                                <strong
                                  style={{
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Right Ear
                                </strong>
                              </label>
                              <Field
                                type="text"
                                name="right_ear"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="right_ear"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="left_ear">
                                <strong
                                  style={{
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Left Ear
                                </strong>
                              </label>
                              <Field
                                type="text"
                                name="left_ear"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="left_ear"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="audiogram_comment">
                            <strong>Audiogram Comment</strong>
                          </label>
                          <Field
                            type="text"
                            name="audiogram_comment"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="audiogram_comment"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="speech">
                        <strong>Speech</strong>
                      </label>
                      <Field
                        type="text"
                        name="speech"
                        className="form-control my-upload"
                      />
                      <ErrorMessage
                        name="speech"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    {/* <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
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

                      {isLoading ? (
                        <Loading />
                      ) : (
                        // <button onClick={handleSubmit}>Next</button>
                        // <button onClick={handleNext}>Temp Next</button>
                        <FormButton
                          text={"Next"}
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
    </div>
  );
};

export default IPhysicalTestForm;

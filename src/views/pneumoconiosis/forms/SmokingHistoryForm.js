import React, { Fragment } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loader/Loading";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { ToastContainer, toast } from "react-toastify";

const SmokingHistoryForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const initialValues = {
    do_smoke: false,
    how_many_per_day: 0,
    how_long: "",

    past_smoker: false,
    for_how_long: "",
  };

  const handleSubmit = async (values) => {
    values.do_smoke = values.do_smoke === "true";
    values.past_smoker = values.past_smoker === "true";
    console.log(values);
    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(
        `${API}/patient/${patientId}/smoking/history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      dispatch(formsActions.setSmokingHistory(responseData.data));
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      toast.dark("Adding Smoking History Was a Success");
    } catch (error) {
      console.log("Error", error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };
  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form"></div>
        <div className="box-body">
          <div className="container">
            <h4
              style={{
                textTransform: "uppercase",
              }}
            >
              <strong>Smoking History : Do you smoke ?</strong>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div
                      className="row"
                      style={{
                        marginTop: "2rem",
                      }}
                    >
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="do_smoke">Do You Smoke</label>
                            </div>
                            <div className="col-md-6">
                              <Field
                                as="select"
                                name="do_smoke"
                                value={values.do_smoke}
                                onChange={handleChange}
                                className="form-control my-upload"
                              >
                                <option value="">Select</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                              </Field>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-8">
                              <label htmlFor="how_many_per_day">
                                <strong>
                                  For How Long (Specify in Years)?
                                </strong>
                              </label>
                              <p></p>
                            </div>
                            <div className="col-md-4">
                              <Field
                                type="number"
                                name="how_many_per_day"
                                className="form-control my-upload"
                                value={values.how_many_per_day}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="how_long">
                                <strong>
                                  For How Long (Specify in Years)?
                                </strong>
                              </label>
                            </div>
                            <div className="col-md-6">
                              <Field
                                type="text"
                                name="how_long"
                                className="form-control my-upload"
                                value={values.how_long}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="past_smoker">
                                <strong>Past Smoker?</strong>
                              </label>
                            </div>
                            <div className="col-md-6">
                              <Field
                                as="select"
                                name="past_smoker"
                                value={values.past_smoker}
                                onChange={handleChange}
                                className="form-control my-upload"
                              >
                                <option value="">Select</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                              </Field>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-8">
                              <label htmlFor="cough">
                                <strong>
                                  For How Long (Specify in Years)?
                                </strong>
                              </label>
                            </div>
                            <div className="col-md-4">
                              <Field
                                type="text"
                                name="for_how_long"
                                className="form-control my-upload"
                                value={values.for_how_long}
                                onChange={handleChange}
                              />
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
                      <button onClick={handlePrev}>Previous</button>
                      {isLoading ? (
                        <Loading />
                      ) : (
                        // <button onClick={handleSubmit}>Next Page (Save)</button>
                        <button onClick={handleNext}>Temp Next Page</button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmokingHistoryForm;

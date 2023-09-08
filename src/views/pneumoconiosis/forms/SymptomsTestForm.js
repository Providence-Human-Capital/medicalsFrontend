import React, { Fragment } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../components/loader/Loading";
import FormButton from "../../../components/buttons/FormButton";

const SymptomsTestForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const initialValues = {
    cough: false,
    night_sweats: false,
    shortness_of_breath: false,
    chest_pains: false,
    coughing_blood: false,
    weight_loss: false,
    appetite_loss: false,
    chest_tightness: false,
    symptoms_comments: "",
  };
  const handleSubmit = async (values) => {
    values.cough = values.cough === "true";
    values.night_sweats = values.night_sweats === "true";
    values.shortness_of_breath = values.shortness_of_breath === "true";
    values.chest_pains = values.chest_pains === "true";
    values.coughing_blood = values.coughing_blood === "true";
    values.weight_loss = values.weight_loss === "true";
    values.appetite_loss = values.appetite_loss === "true";
    values.chest_tightness = values.chest_tightness === "true";

    console.log(values);
    const data = {
      ...values,
      symptoms_comments: values.symptoms_comments,
    };

    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(`${API}/patient/${patientId}/symptom/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      dispatch(formsActions.setSymptomsExamination(responseData.data));
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      toast.dark("Adding Symptoms was a success!");
      handleNext();
    } catch (error) {
      console.log("Error", error);
      // toast.error("Error adding", error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };

  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h3
                style={{
                  textTransform: "uppercase",
                }}
              >
                <strong>Section C: Personal Healthy Questionnaire</strong>
              </h3>
              <h6
                style={{
                  textTransform: "uppercase",
                }}
              >
                <strong>
                  Are you Suffering from any of the following Symptoms ?
                </strong>
              </h6>
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
                            <div className="col-md-8">
                              <label htmlFor="cough">
                                Do you have a cough?{" "}
                                <strong>(longer than 3 weeks)</strong>
                              </label>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  name="cough"
                                  value={values.cough}
                                  onChange={handleChange}
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option value={true}>YES</option>
                                  <option value={false}>NO</option>
                                </Field>
                                <label htmlFor="cough">COUGH</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-8">
                              <label htmlFor="night_sweats">
                                Do you have <strong>Night Sweats</strong>?
                              </label>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  name="night_sweats"
                                  value={values.night_sweats}
                                  onChange={handleChange}
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Field>
                                <label htmlFor="night_sweats">
                                  NIGHT SWEATES
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-8">
                              <label htmlFor="shortness_of_breath">
                                Are you experiencing{" "}
                                <strong>Shortness of Breath</strong>?
                              </label>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  name="shortness_of_breath"
                                  value={values.shortness_of_breath}
                                  onChange={handleChange}
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option value={true}>YES</option>
                                  <option value={false}>NO</option>
                                </Field>
                                <label htmlFor="shortness_of_breath">
                                  S-O-BREATH
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-8">
                              <label htmlFor="chest_pains">
                                Do you have <strong>Chest Pains</strong>?
                              </label>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  name="chest_pains"
                                  value={values.chest_pains}
                                  onChange={handleChange}
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option value={true}>YES</option>
                                  <option value={false}>NO</option>
                                </Field>
                                <label htmlFor="chest_pains">CHEST PAINS</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-8">
                              <label htmlFor="coughing_blood">
                                Are you <strong>Coughing Blood</strong>?
                              </label>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  name="coughing_blood"
                                  value={values.coughing_blood}
                                  onChange={handleChange}
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option value={true}>YES</option>
                                  <option value={false}>NO</option>
                                </Field>
                                <label htmlFor="coughing_blood">
                                  COUGHING BLOOD
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-8">
                              <label htmlFor="weight_loss">
                                Have you experienced{" "}
                                <strong>Weight Loss</strong>?
                              </label>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  name="weight_loss"
                                  value={values.weight_loss}
                                  onChange={handleChange}
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option value={true}>YES</option>
                                  <option value={false}>NO</option>
                                </Field>
                                <label htmlFor="weight_loss">WEIGHT LOSS</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-8">
                              <label htmlFor="appetite_loss">
                                Have you experienced{" "}
                                <strong>Loss of Appetite</strong> ?
                              </label>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  name="appetite_loss"
                                  value={values.appetite_loss}
                                  onChange={handleChange}
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option value={true}>YES</option>
                                  <option value={false}>NO</option>
                                </Field>
                                <label htmlFor="appetite_loss">
                                  APPETITE LOSS
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-8">
                              <label htmlFor="chest_tightness">
                                Do you have <strong>Chest Tightness</strong>?
                              </label>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  name="chest_tightness"
                                  value={values.chest_tightness}
                                  onChange={handleChange}
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option value={true}>YES</option>
                                  <option value={false}>NO</option>
                                </Field>
                                <label htmlFor="chest_tightness">
                                  CHEST TIGHTNESS
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="symptoms_comments">
                        Additional Comments <strong>(Optional)</strong>
                      </label>
                      <div className="form-floating">
                        <Field
                          type="text"
                          name="symptoms_comments"
                          className="form-control"
                          value={values.symptoms_comments}
                          onChange={handleChange}
                        />
                        <label htmlFor="symptoms_comments">
                          ADDITIONAL COMMENT
                        </label>
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
                        disabled={true}
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

export default SymptomsTestForm;

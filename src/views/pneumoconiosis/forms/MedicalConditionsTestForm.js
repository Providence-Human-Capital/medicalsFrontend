import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { ToastContainer, toast } from "react-toastify";
import FormButton from "../../../components/buttons/FormButton";
import Loading from "../../../components/loader/Loading";

const MedicalConditionsTestForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const initialValues = {
    tb: false,
    copd: false,
    pneumonia: false,
    hypertension: false,
    chest_injuries: false,
    asthma: false,
    diabetes: false,
    epilepsy: false,
    heart_disease: false,
    hernia: false,
    hernia_details: " ",
    medical_condition_details: "",
  };

  const validationSchema = Yup.object().shape({
    tb: Yup.boolean(),
    copd: Yup.boolean(),
    pneumonia: Yup.boolean(),
    hypertension: Yup.boolean(),
    chest_injuries: Yup.boolean(),
    asthma: Yup.boolean(),
    diabetes: Yup.boolean(),
    epilepsy: Yup.boolean(),
    heart_disease: Yup.boolean(),
    hernia: Yup.boolean(),
    hernia_details: Yup.string().when("hernia", {
      is: true,
      then: Yup.string().required("Please enter your hernia details"),
    }),
    medical_condition_details: Yup.string(),
  });

  const handleSubmit = async (values) => {
    // /patient/{patientId}/conditions/test

    values.tb = values.tb === "true";
    values.copd = values.copd === "true";
    values.pneumonia = values.pneumonia === "true";
    values.hypertension = values.hypertension === "true";
    values.chest_injuries = values.chest_injuries === "true";
    values.asthma = values.asthma === "true";
    values.diabetes = values.diabetes === "true";
    values.epilepsy = values.epilepsy === "true";
    values.heart_disease = values.heart_disease === "true";
    values.hernia = values.hernia === "true";

    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(
        `${API}/patient/${patientId}/conditions/test`,
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
      dispatch(formsActions.setPneumoConditionsTest(responseData.data));
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      toast.dark("Adding Symptoms was a success!");
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
              <h4>
                <strong>
                  Have You Ever Been Diagnosed Of Any Of The Following Medical
                  Conditions
                </strong>
              </h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange, errors, touched }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tb">TB</label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              className="form-select"
                              id="tb"
                              name="tb"
                              value={values.tb}
                              onChange={handleChange}
                            >
                              <option value="false">Not Diagnosed</option>
                              <option value="true">Diagnosed</option>
                            </Field>
                            <label htmlFor="tb">TUBERCULOSIS</label>
                            <ErrorMessage
                              name="tb"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="copd">COPD</label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              className="form-select"
                              id="copd"
                              name="copd"
                              value={values.copd}
                              onChange={handleChange}
                            >
                              <option value="false">Not Diagnosed</option>
                              <option value="true">Diagnosed</option>
                            </Field>
                            <label htmlFor="copd">COPD</label>
                            <ErrorMessage
                              name="copd"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="pneumonia">Pneumonia</label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              className="form-select"
                              id="pneumonia"
                              name="pneumonia"
                              value={values.pneumonia}
                              onChange={handleChange}
                            >
                              <option value="false">Not Diagnosed</option>
                              <option value="true">Diagnosed</option>
                            </Field>
                            <label htmlFor="pneumonia">PNEUMONIA</label>
                            <ErrorMessage
                              name="pneumonia"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="hypertension">Hypertension</label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              className="form-select"
                              id="hypertension"
                              name="hypertension"
                              value={values.hypertension}
                              onChange={handleChange}
                            >
                              <option value="false">Not Diagnosed</option>
                              <option value="true">Diagnosed</option>
                            </Field>
                            <label htmlFor="hypertension">HYPERTENSION</label>
                            <ErrorMessage
                              name="hypertension"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="chest_injuries">Chest Injuries</label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              className="form-select"
                              id="chest_injuries"
                              name="chest_injuries"
                              value={values.chest_injuries}
                              onChange={handleChange}
                            >
                              <option value="false">Not Diagnosed</option>
                              <option value="true">Diagnosed</option>
                            </Field>
                            <label htmlFor="chest_injuries">
                              CHEST INJURIES
                            </label>
                            <ErrorMessage
                              name="chest_injuries"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="asthma">Asthma</label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              className="form-select"
                              id="asthma"
                              name="asthma"
                              value={values.asthma}
                              onChange={handleChange}
                            >
                              <option value="false">Not Diagnosed</option>
                              <option value="true">Diagnosed</option>
                            </Field>
                            <label htmlFor="asthma">ASTHMA</label>
                            <ErrorMessage
                              name="asthma"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="diabetes">Diabetes</label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              className="form-select"
                              id="diabetes"
                              name="diabetes"
                              value={values.diabetes}
                              onChange={handleChange}
                            >
                              <option value="false">Not Diagnosed</option>
                              <option value="true">Diagnosed</option>
                            </Field>
                            <label htmlFor="diabetes">DIABETES</label>
                            <ErrorMessage
                              name="diabetes"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="epilepsy">Epilepsy</label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              className="form-select"
                              id="epilepsy"
                              name="epilepsy"
                              value={values.epilepsy}
                              onChange={handleChange}
                            >
                              <option value="false">Not Diagnosed</option>
                              <option value="true">Diagnosed</option>
                            </Field>
                            <label htmlFor="epilepsy">EPILEPSY</label>
                            <ErrorMessage
                              name="epilepsy"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="heart_disease">Heart Disease</label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              className="form-select"
                              id="heart_disease"
                              name="heart_disease"
                              value={values.heart_disease}
                              onChange={handleChange}
                            >
                              <option value="false">Not Diagnosed</option>
                              <option value="true">Diagnosed</option>
                            </Field>
                            <label htmlFor="heart_disease">HEART DISEASE</label>
                            <ErrorMessage
                              name="heart_disease"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="hernia">Hernia</label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              className="form-select"
                              id="hernia"
                              name="hernia"
                              value={values.hernia}
                              onChange={handleChange}
                            >
                              <option value="false">Not Diagnosed</option>
                              <option value="true">Diagnosed</option>
                            </Field>
                            <label htmlFor="hernia">HERNIA</label>
                            <ErrorMessage
                              name="hernia"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {values.hernia && (
                      <div className="form-group">
                        <label htmlFor="hernia_details">Hernia Details</label>
                        <div className="form-floating">
                          <Field
                            className="form-control"
                            id="hernia_details"
                            name="hernia_details"
                            value={values.hernia_details}
                            onChange={handleChange}
                          ></Field>
                          <label htmlFor="hernia_details">HERNIA DETAILS</label>
                          <ErrorMessage
                            name="hernia_details"
                            component="div"
                            className="text-danger"
                          />{" "}
                        </div>
                      </div>
                    )}

                    <div className="form-group">
                      <label htmlFor="medical_condition_details">
                        Medical Condition Comments (Optional)
                      </label>
                      <div className="form-floating">
                        <Field
                          className="form-control"
                          id="medical_condition_details"
                          name="medical_condition_details"
                          value={values.medical_condition_details}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="medical_condition_details"
                          style={{
                            textTransform: "uppercase",
                          }}
                        >
                          Medical Condition Comments (Optional)
                        </label>
                        <ErrorMessage
                          name="medical_condition_details"
                          component="div"
                          className="text-danger"
                        />
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

                      {/* <button onClick={handlePrev}>Previous</button> */}

                      {/* <button onClick={handleNext}>Next</button> */}
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

export default MedicalConditionsTestForm;

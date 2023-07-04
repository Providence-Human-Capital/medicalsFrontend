import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

  const handleSubmit = (values) => {
    console.log("Mediiiii", values);
  };
  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4>
                Have You Ever Been Diagnosed Of Any Of The Following Medical
                Conditions
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
                          <Field
                            as="select"
                            className="form-control my-upload"
                            id="tb"
                            name="tb"
                            value={values.tb}
                            onChange={handleChange}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </Field>
                          <ErrorMessage
                            name="tb"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="copd">COPD</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            id="copd"
                            name="copd"
                            value={values.copd}
                            onChange={handleChange}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </Field>
                          <ErrorMessage
                            name="copd"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="pneumonia">Pneumonia</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            id="pneumonia"
                            name="pneumonia"
                            value={values.pneumonia}
                            onChange={handleChange}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </Field>
                          <ErrorMessage
                            name="pneumonia"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="hypertension">Hypertension</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            id="hypertension"
                            name="hypertension"
                            value={values.hypertension}
                            onChange={handleChange}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </Field>
                          <ErrorMessage
                            name="hypertension"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="chest_injuries">Chest Injuries</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            id="chest_injuries"
                            name="chest_injuries"
                            value={values.chest_injuries}
                            onChange={handleChange}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </Field>
                          <ErrorMessage
                            name="chest_injuries"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="asthma">Asthma</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            id="asthma"
                            name="asthma"
                            value={values.asthma}
                            onChange={handleChange}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </Field>
                          <ErrorMessage
                            name="asthma"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="diabetes">Diabetes</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            id="diabetes"
                            name="diabetes"
                            value={values.diabetes}
                            onChange={handleChange}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </Field>
                          <ErrorMessage
                            name="diabetes"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="epilepsy">Epilepsy</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            id="epilepsy"
                            name="epilepsy"
                            value={values.epilepsy}
                            onChange={handleChange}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </Field>
                          <ErrorMessage
                            name="epilepsy"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="heart_disease">Heart Disease</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            id="heart_disease"
                            name="heart_disease"
                            value={values.heart_disease}
                            onChange={handleChange}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </Field>
                          <ErrorMessage
                            name="heart_disease"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="hernia">Hernia</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            id="hernia"
                            name="hernia"
                            value={values.hernia}
                            onChange={handleChange}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </Field>
                          <ErrorMessage
                            name="hernia"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="hernia_details">Hernia Details</label>
                      <Field
                        className="form-control my-upload"
                        id="hernia_details"
                        name="hernia_details"
                        value={values.hernia_details}
                        onChange={handleChange}
                      ></Field>
                      <ErrorMessage
                        name="hernia_details"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="medical_condition_details">
                        Medical Condition Comments (Optional)
                      </label>
                      <Field
                        className="form-control my-upload"
                        id="medical_condition_details"
                        name="medical_condition_details"
                        value={values.medical_condition_details}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="medical_condition_details"
                        component="div"
                        className="text-danger"
                      />
                    </div>
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
                      <button onClick={handlePrev}>Previous</button>

                      <button onClick={handleNext}>Next</button>
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

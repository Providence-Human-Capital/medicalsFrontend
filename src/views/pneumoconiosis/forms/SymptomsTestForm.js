import React, { Fragment } from "react";
import { Formik, Form, Field } from "formik";

const SymptomsTestForm = ({ handlePrev, handleNext }) => {
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
  const handleSubmit = (values) => {
    console.log(values);
    // Submit form data to Laravel API
  };

  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4>Are you Suffering from any of the following Symptoms ?</h4>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="cough">Do you have a cough?</label>
                          <Field
                            as="select"
                            name="cough"
                            value={values.cough}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="night_sweats">
                            Do you have night sweats?
                          </label>
                          <Field
                            as="select"
                            name="night_sweats"
                            value={values.night_sweats}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="shortness_of_breath">
                            Do you have shortness of breath?
                          </label>
                          <Field
                            as="select"
                            name="shortness_of_breath"
                            value={values.shortness_of_breath}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="chest_pains">
                            Do you have chest pains?
                          </label>
                          <Field
                            as="select"
                            name="chest_pains"
                            value={values.chest_pains}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="coughing_blood">
                            Are you coughing blood?
                          </label>
                          <Field
                            as="select"
                            name="coughing_blood"
                            value={values.coughing_blood}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="weight_loss">
                            Have you experienced weight loss?
                          </label>
                          <Field
                            as="select"
                            name="weight_loss"
                            value={values.weight_loss}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="appetite_loss">
                            Have you experienced loss of appetite?
                          </label>
                          <Field
                            as="select"
                            name="appetite_loss"
                            value={values.appetite_loss}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="chest_tightness">
                            Do you have chest tightness?
                          </label>
                          <Field
                            as="select"
                            name="chest_tightness"
                            value={values.chest_tightness}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="symptoms_comments">
                        Additional Comments (optional)
                      </label>
                      <Field
                        type="text"
                        name="symptoms_comments"
                        className="form-control my-upload"
                        value={values.symptoms_comments}
                        onChange={handleChange}
                      />
                    </div>
                    {/* <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button> */}
                  </Form>
                )}
              </Formik>
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

        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default SymptomsTestForm;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ControlMeasuresForm = ({ handlePrev, handleNext }) => {
  const initialValues = {
    wet_method: false,
    contain_and_vent: false,
    monitoring: false,
    ppe: "",
    ppe_details: "",
    other: "",
    other_details: "",
  };

  const validationSchema = Yup.object({
    ppe_details: Yup.string().when("ppe", {
      is: "Yes",
      then: Yup.string().required("PPE details are required"),
    }),
  });

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
              <h4>Details of Control Measures Being Implemented</h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="wet_method">Wet Method</label>
                          <Field
                            as="select"
                            name="wet_method"
                            value={values.wet_method}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="contain_and_vent">
                            Contain and Vent
                          </label>
                          <Field
                            as="select"
                            name="contain_and_vent"
                            value={values.contain_and_vent}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="monitoring">Monitoring</label>
                          <Field
                            as="select"
                            name="monitoring"
                            value={values.monitoring}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="ppe">PPE</label>
                          <Field
                            as="select"
                            name="ppe"
                            value={values.ppe}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value="">Select an option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    {values.ppe === "Yes" && (
                      <div className="form-group">
                        <label htmlFor="ppe_details">PPE Details</label>
                        <Field
                          type="text"
                          name="ppe_details"
                          className="form-control my-upload"
                          value={values.ppe_details}
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="ppe_details"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="other">Other</label>
                      <Field
                        as="select"
                        name="other"
                        value={values.other}
                        onChange={handleChange}
                        className="form-control my-upload"
                      >
                        <option value="">Select an option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Field>
                    </div>
                    {values.other === "Yes" && (
                      <div className="form-group">
                        <label htmlFor="other_details">Other Details</label>
                        <Field
                          type="text"
                          name="other_details"
                          className="form-control my-upload"
                          value={values.other_details}
                          onChange={handleChange}
                        />
                      </div>
                    )}
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

export default ControlMeasuresForm;

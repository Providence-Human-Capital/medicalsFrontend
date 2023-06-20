import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SystemsCheckForm = ({ handlePrev, handleNex }) => {
  const initialValues = {
    respiratory: false,
    cvs: false,
    musculoskeletal: false,
    cns: false,
    skin: false,
    systems_summary: "",
  };

  const validationSchema = Yup.object().shape({
    systems_summary: Yup.string().required(
      "Please provide a summary of your systems check."
    ),
  });

  const handleSubmit = (values) => {
    console.log(values);
    // Submit form data to backend
  };

  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4>Systems Check</h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="respiratory">Respiratory</label>
                        <Field
                          as="select"
                          name="respiratory"
                          value={values.respiratory}
                          onChange={handleChange}
                          className="form-control my-upload"
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Field>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="cvs">Cardiovascular</label>
                        <Field
                          as="select"
                          name="cvs"
                          value={values.cvs}
                          onChange={handleChange}
                          className="form-control my-upload"
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Field>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="musculoskeletal">Musculoskeletal</label>
                        <Field
                          as="select"
                          name="musculoskeletal"
                          value={values.musculoskeletal}
                          onChange={handleChange}
                          className="form-control my-upload"
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Field>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="cns">Central Nervous System</label>
                        <Field
                          as="select"
                          name="cns"
                          value={values.cns}
                          onChange={handleChange}
                          className="form-control my-upload"
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Field>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="skin">Skin</label>
                      <Field
                        as="select"
                        name="skin"
                        value={values.skin}
                        onChange={handleChange}
                        className="form-control my-upload"
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </Field>
                    </div>
                    <div className="form-group">
                      <label htmlFor="systems_summary">Systems Summary</label>
                      <Field
                        as="textarea"
                        name="systems_summary"
                        value={values.systems_summary}
                        onChange={handleChange}
                        className="form-control my-upload"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
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

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SystemsCheckForm;

import React from "react";
import "./FormsStyle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const HealthyQuestionnaireForm = ({ handlePrev, handleSubmit }) => {
  const initialValues = {
    dusty_occupation: false,
    occupation_details: "",
    years_worked: "",
    exposure: "",
  };

  const validationSchema = Yup.object({
    occupation_details: Yup.string().when("dusty_occupation", {
      is: true,
      then: Yup.string().required("Occupation details are required"),
    }),
    years_worked: Yup.string().when("dusty_occupation", {
      is: true,
      then: Yup.string().required("Years worked are required"),
    }),
    exposure: Yup.string().when("dusty_occupation", {
      is: true,
      then: Yup.string().required("Exposure is required"),
    }),
  });

  // const handleSubmit = (values) => {
  //   console.log(values);
  //   // Submit form data to Laravel API
  // };

  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4>Additional Patient Details</h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="dusty_occupation">
                        Any Previous Work History in Dusty Occupation?
                      </label>
                      <Field
                        as="select"
                        name="dusty_occupation"
                        value={values.dusty_occupation}
                        onChange={handleChange}
                        className="form-control my-upload"
                      >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </Field>
                    </div>

                    {values.dusty_occupation && (
                      <>
                        <div className="form-group">
                          <label htmlFor="occupation_details">
                            Occupation Details
                          </label>
                          <Field
                            type="text"
                            name="occupation_details"
                            className="form-control my-upload"
                            value={values.occupation_details}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="occupation_details"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="years_worked">Years Worked</label>
                          <Field
                            type="text"
                            name="years_worked"
                            className="form-control my-upload"
                            value={values.years_worked}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="years_worked"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exposure">Exposure</label>
                          <Field
                            type="text"
                            name="exposure"
                            className="form-control my-upload"
                            value={values.exposure}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="exposure"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </>
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

export default HealthyQuestionnaireForm;

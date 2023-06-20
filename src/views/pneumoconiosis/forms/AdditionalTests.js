import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AdditionalTestsSchema = Yup.object().shape({
  sputum: Yup.boolean(),
  ecg: Yup.boolean(),
  echo: Yup.boolean(),
  chest_scan: Yup.boolean(),
  other: Yup.boolean(),
  other_details: Yup.string().when("other", {
    is: true,
    then: Yup.string().required("Other details are required"),
  }),
});

const AdditionalTests = ({ handlePrev, handleNext }) => {
  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4>Additional Tests Requested</h4>
              <Formik
                initialValues={{
                  sputum: false,
                  ecg: false,
                  echo: false,
                  chest_scan: false,
                  other: false,
                  other_details: "",
                }}
                validationSchema={AdditionalTestsSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ values, errors, touched }) => (
                  <Form>
                    <p>
                      Specify additional tests requested from the list below
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="sputum">Sputum</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            name="sputum"
                          >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="ecg">ECG</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            name="ecg"
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
                          <label htmlFor="echo">Echo</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            name="echo"
                          >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="chest_scan">Chest Scan</label>
                          <Field
                            as="select"
                            className="form-control my-upload"
                            name="chest_scan"
                          >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="other">Other</label>
                      <Field
                        as="select"
                        className="form-control my-upload"
                        name="other"
                      >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </Field>
                    </div>
                    {values.other && (
                      <div className="form-group">
                        <label htmlFor="other_details">Other Details</label>
                        <Field
                          type="text"
                          className={`form-control my-upload ${
                            errors.other_details && touched.other_details
                              ? "is-invalid"
                              : ""
                          }`}
                          name="other_details"
                        />
                        <ErrorMessage
                          name="other_details"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    )}
                    {/* <button type="submit" className="btn btn-primary">
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

export default AdditionalTests;

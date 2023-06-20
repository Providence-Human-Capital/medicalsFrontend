import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const IndustryClassificationForm = ({ handlePrev, handleNext }) => {
  const initialValues = {
    industry: "",
    mineral: "",
    other_details: "",
  };

  const validationSchema = Yup.object({
    industry: Yup.string().required("Industry is required"),
    mineral: Yup.string().when("industry", {
      is: "Mining",
      then: Yup.string().required("Mineral is required"),
    }),
    other_details: Yup.string().when("industry", {
      is: "Other",
      then: Yup.string().required("Other details are required"),
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
            <h4>Industry Classification</h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="form-group row">
                      <label
                        htmlFor="industry"
                        className="col-sm-2 col-form-label"
                      >
                        Industry
                      </label>
                      <div className="col-sm-10">
                        <Field
                          as="select"
                          name="industry"
                          className="form-control my-upload"
                          value={values.industry}
                          onChange={handleChange}
                        >
                          <option value="">Select an industry</option>
                          <option value="Mining">Mining</option>
                          <option value="Quarrying">Quarrying</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Construction">Construction</option>
                          <option value="Agriculture">Agriculture</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage
                          name="industry"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    {values.industry === "Mining" && (
                      <div className="form-group row">
                        <label
                          htmlFor="mineral"
                          className="col-sm-2 col-form-label"
                        >
                          Mineral
                        </label>
                        <div className="col-sm-10">
                          <Field
                            type="text"
                            name="mineral"
                            className="form-control my-upload"
                            value={values.mineral}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="mineral"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    )}

                    {values.industry === "Other" && (
                      <div className="form-group row">
                        <label
                          htmlFor="other_details"
                          className="col-sm-2 col-form-label"
                        >
                          Other Details
                        </label>
                        <div className="col-sm-10">
                          <Field
                            type="text"
                            name="other_details"
                            className="form-control my-upload"
                            value={values.other_details}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="other_details"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    )}

                    {/* <div className="form-group row">
                      <div className="col-sm-10 offset-sm-2">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          Submit
                        </button>
                      </div>
                    </div> */}
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
        <button onClick={handlePrev} disabled={true}>
          Previous
        </button>

        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default IndustryClassificationForm;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MineralDustExposureForm = ({ handlePrev, handleNext }) => {
  const initialValues = {
    mineral_dust_exposure: "",
    other_details: "",
  };
  const validationSchema = Yup.object({
    mineral_dust_exposure: Yup.string().required(
      "Mineral dust exposure is required"
    ),
    other_details: Yup.string().when("mineral_dust_exposure", {
      is: "Other",
      then: Yup.string().required("Other details are required"),
    }),
  });
  const handleSubmit = (values) => {
    console.log(values);
    // Submit form data to Laravel API
  };
  const mineralDustExposureOptions = [
    { label: "Silica", value: "Silica" },
    { label: "Coal", value: "Coal" },
    { label: "Asbestos", value: "Asbestos" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
            <h4>Which Mineral Dust Exposure Is Causing Health Risk?</h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="form-group row">
                      <label
                        htmlFor="mineral_dust_exposure"
                        className="col-sm-2 col-form-label"
                      >
                        Mineral Dust Exposure
                      </label>
                      <div className="col-sm-10">
                        <Field
                          as="select"
                          name="mineral_dust_exposure"
                          className="form-control my-upload "
                          value={values.mineral_dust_exposure}
                          onChange={handleChange}
                        >
                          <option value="">Select mineral dust exposure</option>
                          {mineralDustExposureOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="mineral_dust_exposure"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    {values.mineral_dust_exposure === "Other" && (
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
                            className="form-control my-upload "
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

export default MineralDustExposureForm;

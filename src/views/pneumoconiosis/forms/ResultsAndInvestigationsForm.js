import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ResultsAndInvestigationsForm = ({ handlePrev, handleNext }) => {
  const initialValues = {
    chest_x_ray: false,
    x_ray_comments: "",
    fev1: "",
    fev1_fvc: "",
    fvc: "",
    conclusion: "",
    suitable_for_dusty: false,
    sfde_comment: "",
    other_medical_conditions: false,
    conditions_details: "",
    tb_comment: "",
    referral: false,
    tb_free: false,
    tb_suspect: false,
    tb_confirmed: false,
  };

  const validationSchema = Yup.object().shape({
    x_ray_comments: Yup.string().max(
      255,
      "Comments must be less than 255 characters"
    ),
    fev1: Yup.string().max(10, "FEV1 must be less than 10 characters"),
    fev1_fvc: Yup.string().max(10, "FEV1/FVC must be less than 10 characters"),
    fvc: Yup.string().max(10, "FVC must be less than 10 characters"),
    conclusion: Yup.string().max(
      255,
      "Conclusion must be less than 255 characters"
    ),
    sfde_comment: Yup.string().max(
      255,
      "Comments must be less than 255 characters"
    ),
    conditions_details: Yup.string().max(
      255,
      "Details must be less than 255 characters"
    ),
    tb_comment: Yup.string().max(
      255,
      "Comments must be less than 255 characters"
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
              <h4>Results and Investigations</h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="chest_x_ray">
                        Chest X-Ray Abnormal ?
                      </label>
                      <Field
                        as="select"
                        name="chest_x_ray"
                        value={values.chest_x_ray}
                        onChange={handleChange}
                        className="form-control my-upload"
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </Field>
                    </div>
                    {values.chest_x_ray && (
                      <div className="form-group">
                        <label htmlFor="x_ray_comments">X-Ray Comments</label>
                        <Field
                          type="text"
                          name="x_ray_comments"
                          value={values.x_ray_comments}
                          onChange={handleChange}
                          className="form-control my-upload"
                        />
                      </div>
                    )}
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="fev1">FEV1</label>
                          <Field
                            type="text"
                            name="fev1"
                            value={values.fev1}
                            onChange={handleChange}
                            className="form-control my-upload"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="fev1_fvc">FEV1/FVC</label>
                          <Field
                            type="text"
                            name="fev1_fvc"
                            value={values.fev1_fvc}
                            onChange={handleChange}
                            className="form-control my-upload"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="fvc">FVC</label>
                          <Field
                            type="text"
                            name="fvc"
                            value={values.fvc}
                            onChange={handleChange}
                            className="form-control my-upload"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="conclusion">Conclusion</label>
                      <Field
                        as="select"
                        name="conclusion"
                        value={values.conclusion}
                        onChange={handleChange}
                        className="form-control my-upload"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Restrictive">Restrictive</option>
                        <option value="Obstructive">Obstructive</option>
                        <option value="Obstructive">Mixed</option>
                      </Field>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="suitable_for_dusty">
                            Suitable for Dusty Environment
                          </label>
                          <Field
                            as="select"
                            name="suitable_for_dusty"
                            value={values.suitable_for_dusty}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="other_medical_conditions">
                            Other Medical Conditions
                          </label>
                          <Field
                            as="select"
                            name="other_medical_conditions"
                            value={values.other_medical_conditions}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={null}>Select an option</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    {values.suitable_for_dusty && (
                      <div className="form-group">
                        <label htmlFor="sfde_comment">SFDE Comment</label>
                        <Field
                          type="text"
                          name="sfde_comment"
                          value={values.sfde_comment}
                          onChange={handleChange}
                          className="form-control my-upload"
                        />
                      </div>
                    )}

                    {values.other_medical_conditions && (
                      <div className="form-group">
                        <label htmlFor="conditions_details">
                          Medical Condition Details
                        </label>
                        <Field
                          type="text"
                          name="conditions_details"
                          value={values.conditions_details}
                          onChange={handleChange}
                          className="form-control my-upload"
                        />
                      </div>
                    )}
                    <h5>
                      In your opinion do you consider the examinee:{" "}
                      <strong>(Select Yes where Applicable)</strong>{" "}
                    </h5>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="tb_free">
                            <strong>Free from TB </strong>
                          </label>
                          <Field
                            as="select"
                            name="tb_free"
                            value={values.tb_free}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="tb_suspect">
                            <strong>TB Suspect</strong>
                          </label>
                          <Field
                            as="select"
                            name="tb_suspect"
                            value={values.tb_suspect}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="tb_confirmed">
                            <strong>Confirmed TB </strong>
                          </label>
                          <Field
                            as="select"
                            name="tb_confirmed"
                            value={values.tb_confirmed}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <h5>Worker referred for further tests</h5>
                    <div className="form-group col-md-4">
                      <label htmlFor="referral">
                        <strong>Referral</strong>
                      </label>
                      <Field
                        as="select"
                        name="referral"
                        value={values.referral}
                        onChange={handleChange}
                        className="form-control my-upload"
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </Field>
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

export default ResultsAndInvestigationsForm;

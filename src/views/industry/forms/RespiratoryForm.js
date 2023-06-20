import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RespiratoryForm = ({ handlePrev, handleNext }) => {
  const initialValues = {
    lungs: "",
    x_ray_comment: "",
    spirometry_comment: "",
    fev: "",
    fvc: "",
    sears: "",
    tenderness: "",
    hernia: "",
    organomegaly: "",
    kidney_enlargement: "",
    urine_appear: "",
    sg: "",
    albumin: "",
    sugar: "",
    deposit: "",
    evidence_of_disease: "",
    evidence_of_any_disease: "",
    lmp: "",
    parity: "",
  };

  const validationSchema = Yup.object({
    lungs: Yup.string().required("Required"),
    x_ray_comment: Yup.string().required("Required"),
    spirometry_comment: Yup.string().required("Required"),
    fev: Yup.string().required("Required"),
    fvc: Yup.string().required("Required"),
    sears: Yup.string().required("Required"),
    tenderness: Yup.string().required("Required"),
    hernia: Yup.string().required("Required"),
    organomegaly: Yup.string().required("Required"),
    kidney_enlargement: Yup.string().required("Required"),
    urine_appear: Yup.string().required("Required"),
    sg: Yup.string().required("Required"),
    albumin: Yup.string().required("Required"),
    sugar: Yup.string().required("Required"),
    deposit: Yup.string().required("Required"),
    evidence_of_disease: Yup.string().required("Required"),
    evidence_of_any_disease: Yup.string().required("Required"),
    lmp: Yup.string().required("Required"),
    parity: Yup.string().required("Required"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4
                style={{
                  textTransform: "uppercase",
                }}
              >
                <strong>Raspiratory System Check</strong>
              </h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="lungs">
                          <strong>Lungs</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="lungs"
                            name="lungs"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="lungs"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="x_ray_comment">
                          <strong>X-Ray (where indicated ) Comment</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="x_ray_comment"
                            name="x_ray_comment"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="x_ray_comment"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="spirometry_comment">
                            <strong>
                              {" "}
                              Spirometry (where indicated ) Comment
                            </strong>
                          </label>
                          <Field
                            type="text"
                            id="spirometry_comment"
                            name="spirometry_comment"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="spirometry_comment"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="fev">
                              <strong>FEV =</strong>
                            </label>
                          </div>
                          <div className="col-md-8">
                            {" "}
                            <div className="form-group">
                              <Field
                                type="text"
                                id="fev"
                                name="fev"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="fev"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="fvc">
                              <strong>FVC =</strong>
                            </label>
                          </div>
                          <div className="col-md-8">
                            <div className="form-group">
                              <Field
                                type="text"
                                id="fvc"
                                name="fvc"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="fvc"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="sears">
                          <strong>Sears</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="sears"
                            name="sears"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="sears"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tenderness">
                            <strong>Tenderness</strong>
                          </label>
                          <Field
                            type="text"
                            id="tenderness"
                            name="tenderness"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="tenderness"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="hernia">
                            <strong>Hernia</strong>
                          </label>
                          <Field
                            type="text"
                            id="hernia"
                            name="hernia"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="hernia"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="organomegaly">
                          <strong>Any organomegaly</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="organomegaly"
                            name="organomegaly"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="organomegaly"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="kidney_enlargement">
                          <strong> Kidney Enlargement</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="kidney_enlargement"
                            name="kidney_enlargement"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="kidney_enlargement"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="urine_appear">
                          <strong>Urine Appearance</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="urine_appear"
                            name="urine_appear"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="urine_appear"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="sg">
                            <strong>SG</strong>
                          </label>
                          <Field
                            type="text"
                            id="sg"
                            name="sg"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="sg"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="albumin">
                            <strong>Albumin</strong>
                          </label>
                          <Field
                            type="text"
                            id="albumin"
                            name="albumin"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="albumin"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="sugar">
                            <strong>Sugar</strong>
                          </label>
                          <Field
                            type="text"
                            id="sugar"
                            name="sugar"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="sugar"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="deposit">
                            <strong>Deposit</strong>
                          </label>
                          <Field
                            type="text"
                            id="deposit"
                            name="deposit"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="deposit"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="evidence_of_disease">
                          <strong> Evidence of Disease</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="evidence_of_disease"
                            name="evidence_of_disease"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="evidence_of_disease"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="evidence_of_any_disease">
                          <strong> Evidence of Any other Disease</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="evidence_of_any_disease"
                            name="evidence_of_any_disease"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="evidence_of_any_disease"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <h4>
                          <strong>Females: Menstrual History</strong>
                        </h4>
                      </div>
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="lmp">
                              <strong>LMP =</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <Field
                                type="text"
                                id="lmp"
                                name="lmp"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="lmp"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="parity">
                              <strong>Parity =</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <Field
                                type="text"
                                id="parity"
                                name="parity"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="parity"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default RespiratoryForm;

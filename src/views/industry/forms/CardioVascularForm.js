import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CardioVascularForm = ({ handlePrev, handleNext }) => {
  const initialValues = {
    apex_beat_position: "",
    rate: "",
    rhythm: "",
    sound: "",
    murmurs: "",
    blood_pressure: "",
    exercise_tolerance: "",
  };

  const validationSchema = Yup.object({
    apex_beat_position: Yup.string().required(
      "Please enter apex beat position"
    ),
    rate: Yup.string().required(" Your heartbeat rate"),
    rhythm: Yup.string().required("Required"),
    sound: Yup.string().required("Required"),
    murmurs: Yup.string().required("Required"),
    blood_pressure: Yup.string().required("Required"),
    exercise_tolerance: Yup.string().required("Required"),
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
                <strong>Cardio Vascular System</strong>
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
                        <div className="form-group">
                          <label htmlFor="apex_beat_position">
                            Apex Beat Position
                          </label>
                          <Field
                            type="text"
                            id="apex_beat_position"
                            name="apex_beat_position"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="apex_beat_position"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="rate">Rate</label>
                          <Field
                            type="text"
                            id="rate"
                            name="rate"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="rate"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="rhythm">Rhythm</label>
                          <Field
                            type="text"
                            id="rhythm"
                            name="rhythm"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="rhythm"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="sound">
                          <strong>Sound</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="sound"
                            name="sound"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="sound"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="murmurs">
                          <strong>Murmurs</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="murmurs"
                            name="murmurs"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="murmurs"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="blood_pressure">
                            <strong>Blood Pressure</strong>
                          </label>
                          <Field
                            type="text"
                            id="blood_pressure"
                            name="blood_pressure"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="blood_pressure"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="exercise_tolerance">
                            <strong>
                              Exercise tolerance test when necessary
                            </strong>
                          </label>
                          <Field
                            type="text"
                            id="exercise_tolerance"
                            name="exercise_tolerance"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="exercise_tolerance"
                            component="div"
                            className="text-danger"
                          />
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

export default CardioVascularForm;

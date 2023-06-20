import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faXRay,
    faStethoscope,
    faHeartbeat,
    faSmoking,
    faComment,
    faWaveSquare,
    faEyeSlash,
    faEye
  } from "@fortawesome/free-solid-svg-icons";

const BPRepeatForm = () => {
  return (
    <div>
      <h3>Blood Pressure Repeat</h3>
      <div className="form-group">
        <label htmlFor="bp_repeat_sys">Systolic</label>
        <Field className="form-control" type="number" name="bp_repeat_sys" />
        <ErrorMessage
          name="bp_repeat_sys"
          component="div"
          className="text-danger"
        />
      </div>
      <div className="form-group">
        <label htmlFor="bp_repeat_dia">Diastolic</label>
        <Field className="form-control" type="number" name="bp_repeat_dia" />
        <ErrorMessage
          name="bp_repeat_dia"
          component="div"
          className="text-danger"
        />
      </div>
    </div>
  );
};

const PhysicalTestForm = ({ handlePrev, handleSubmit }) => {
  const [showBPRepeatForm, setShowBPRepeatForm] = useState(false);

  const initialValues = {
    weight: "",
    height: "",
    bp_sys: "",
    bp_dia: "",
    pulse: "",
    rhythm: "",
    general_exam: true,
    abnormal_details: "",
    bp_repeat_sys: "",
    bp_repeat_dia: "",
  };

  const validationSchema = Yup.object({
    weight: Yup.number().required("Weight is required"),
    height: Yup.number().required("Height is required"),
    bp_sys: Yup.number().required("Systolic BP is required"),
    bp_dia: Yup.number().required("Diastolic BP is required"),
    pulse: Yup.string().required("Pulse is required"),
    rhythm: Yup.string().required("Rhythm is required"),
    abnormal_details: Yup.string(),
    bp_repeat_sys: Yup.number(),
    bp_repeat_dia: Yup.number(),
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
              <h4>Physical Examination</h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <Form>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="weight">Weight</label>
                        <Field
                          className="form-control my-upload"
                          type="number"
                          name="weight"
                        />
                        <ErrorMessage
                          name="weight"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="height">Height</label>
                        <Field
                          className="form-control my-upload"
                          type="number"
                          name="height"
                        />
                        <ErrorMessage
                          name="height"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="bp_sys">Systolic BP</label>
                        <Field
                          className="form-control my-upload"
                          type="number"
                          name="bp_sys"
                        />
                        <ErrorMessage
                          name="bp_sys"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="bp_dia">Diastolic BP</label>
                        <Field
                          className="form-control my-upload"
                          type="number"
                          name="bp_dia"
                        />
                        <ErrorMessage
                          name="bp_dia"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="pulse">Pulse</label>
                        <Field
                          className="form-control my-upload"
                          type="text"
                          name="pulse"
                        />
                        <ErrorMessage
                          name="pulse"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="rhythm">Rhythm</label>
                        <Field
                          className="form-control my-upload"
                          type="text"
                          name="rhythm"
                        />
                        <ErrorMessage
                          name="rhythm"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="general_exam">General Exam</label>
                      <Field
                        className="form-control my-upload"
                        as="select"
                        name="general_exam"
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </Field>
                    </div>
                    <div className="form-group">
                      <label htmlFor="abnormal_details">Abnormal Details</label>
                      <Field
                        className="form-control my-upload"
                        type="text"
                        name="abnormal_details"
                      />
                      <ErrorMessage
                        name="abnormal_details"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group">
                    <button 
              type="button" 
              className="btn btn-primary" 
              onClick={() => setShowBPRepeatForm(!showBPRepeatForm)} 
            > 
              {showBPRepeatForm ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} Blood Pressure Repeat Form 
            </button>
                    </div>
                    {showBPRepeatForm && <BPRepeatForm />}
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={!formik.isValid}
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

export default PhysicalTestForm;

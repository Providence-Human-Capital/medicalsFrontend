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
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formsActions } from "../../../redux_store/forms-store";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import Loading from "../../../components/loader/Loading";

const BPRepeatForm = () => {
  return (
    <div>
      <h3>Blood Pressure Repeat</h3>
      <div className="form-group">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="bp_repeat_sys">
              <strong>Systolic Blood Pressure (Repeat)</strong>
            </label>
          </div>
          <div className="col-md-6">
            <Field
              className="form-control my-upload"
              type="number"
              name="bp_repeat_sys"
            />
            <ErrorMessage
              name="bp_repeat_sys"
              component="div"
              className="text-danger"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="bp_repeat_dia">
              <strong>Diastolic Blood Pressure (Repeat)</strong>
            </label>
          </div>
          <div className="col-md-6">
            <Field
              className="form-control my-upload"
              type="number"
              name="bp_repeat_dia"
            />
            <ErrorMessage
              name="bp_repeat_dia"
              component="div"
              className="text-danger"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PhysicalTestForm = ({ handlePrev, handleNext }) => {
  const [showBPRepeatForm, setShowBPRepeatForm] = useState(false);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

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
    pulse: Yup.string().nullable(),
    rhythm: Yup.string().nullable(),
    abnormal_details: Yup.string(),
    bp_repeat_sys: Yup.number().nullable(),
    bp_repeat_dia: Yup.number(),
  });

  const onSubmit = async (values) => {
    // '/patient/${patientId}/pneumo/physicals'
    values.general_exam = values.general_exam === "true";
    console.log(values);
    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(
        `${API}/patient/${patientId}/pneumo/physicals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      dispatch(formsActions.setPneumoPhysicalTests(responseData.data));
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      toast.dark("Physical Tests Successfully Added");
      handleNext();
    } catch (error) {
      console.log("Error", error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
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
                <strong>Section D: Physical Examination</strong>
              </h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <Form>
                    <div
                      className="row"
                      style={{
                        marginTop: "2rem",
                      }}
                    >
                      <div className="form-group col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="weight">
                              <strong>Weight</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
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
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="height">
                              <strong>Height</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
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
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="bp_sys">
                              <strong>Systolic BP</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
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
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="bp_dia">
                              <strong>Diastolic BP</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
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
                      <h4
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        <strong>General Exam</strong>
                      </h4>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="general_exam">
                            <strong>Select (Normal / Abnormal)</strong>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <Field
                            className="form-control my-upload"
                            as="select"
                            name="general_exam"
                          >
                            <option value={true}>Normal</option>
                            <option value={false}>Abnormal</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="abnormal_details">
                        <strong>Specify (if abnormal)</strong>
                      </label>
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
                        {showBPRepeatForm ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}{" "}
                        Blood Pressure Repeat Form
                      </button>
                    </div>
                    {showBPRepeatForm && <BPRepeatForm />}

                    {isLoading ? (
                      <Loading />
                    ) : (
                      <button type="submit">Submit (Save)</button>
                    )}
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
                        onClick={handleNext}
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
                        Temp (Next Step)
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalTestForm;

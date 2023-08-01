import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { toast } from "react-toastify";
import Loading from "../../../components/loader/Loading";
import ErrorBox from "../../../components/ErrorBox";
import FormButton from "../../../components/buttons/FormButton";

const CardioVascularForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const [error, setError] = useState(null);

  const initialValues = {
    apex_beat_position: "",
    rate: "",
    rhythm: "",
    sound: "",
    murmurs: "",
    bp_sys: "",
    bp_dia: "",
    exercise_tolerance: "",
  };

  const validationSchema = Yup.object({
    apex_beat_position: Yup.string().required(
      "Please enter apex beat position"
    ),
    rate: Yup.string().nullable(),
    rhythm: Yup.string().nullable(),
    sound: Yup.string().nullable(),
    murmurs: Yup.string().nullable(),
    bp_sys: Yup.number().required("Please Patient Systolic Bp Reading"),
    bp_dia: Yup.number().required(
      "Please Patient Systolic Diastolic Bp Reading"
    ),
    exercise_tolerance: Yup.string().nullable(),
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(`${API}/cardio/vascular/${patientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const responseData = await response.json();
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      dispatch(formsActions.setOtherCardioVascularCheck(responseData.data));
      toast.dark("Patient's Cardio Data Successfully Added");
      handleNext();
    } catch (error) {
      console.log("Error", error);
      setError(error.message); // Set the error message instead of the entire error object
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };

  useEffect(() => {
    dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
  }, []);

  return (
    <div className="step-form">
      {error && <ErrorBox error={error} />}
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
                        <h5
                          style={{
                            textTransform: "uppercase",
                          }}
                        >
                          Blood Pressure
                        </h5>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <div className="row">
                              <div className="col-md-4">
                                <label for="bp_sys">
                                  <strong>Systolic Blood Pressure</strong>
                                </label>
                              </div>
                              <div className="col-md-8">
                                <Field
                                  type="number"
                                  className="form-control my-upload"
                                  id="bp_sys"
                                  placeholder="Sys BP"
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
                              <div className="col-md-4">
                                <label for="bp_dia">
                                  <strong>Diastolic Blood Pressure</strong>
                                </label>
                              </div>
                              <div className="col-md-8">
                                <Field
                                  type="number"
                                  className="form-control my-upload"
                                  id="bp_dia"
                                  placeholder="Dia BP"
                                  name="bp_dia"
                                  required
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
                    {/* <button onClick={onSubmit} type="submit">
                      Save
                    </button> */}
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
                      {/* <button onClick={handlePrev}>Previous</button> */}
                      <FormButton
                        text={"Previous"}
                        direction={"left"}
                        onClick={handlePrev}
                      />

                      {isLoading ? (
                        <Loading />
                      ) : (
                        // <button onClick={handleNext}>Next</button>
                        <FormButton
                          text={"Next"}
                          direction={"right"}
                          onClick={onSubmit}
                        />
                      )}
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

export default CardioVascularForm;

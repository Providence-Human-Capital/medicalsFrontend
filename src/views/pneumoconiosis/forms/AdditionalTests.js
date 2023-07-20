import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { toast } from "react-toastify";
import Loading from "../../../components/loader/Loading";
import FormButton from "../../../components/buttons/FormButton";

const AdditionalTests = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    sputum: false,
    ecg: false,
    echo: false,
    chest_scan: false,
    other: false,
    other_details: "",
  };

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

  const handleSubmit = async (values) => {
    values.sputum = values.sputum === "true";
    values.ecg = values.ecg === "true";
    values.echo = values.echo === "true";
    values.chest_scan = values.chest_scan === "true";
    values.other = values.other === "true";
    console.log(values);
    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(
        `${API}/patient/${patientId}/additional/tests`,
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
      dispatch(formsActions.setPneumoAdditionalTest(responseData.data));
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      toast.dark("Additional Tests Successfully Added");
      navigate(`/patients/${patientId}`);
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
              <h4>
                <strong>Additional Tests Requested</strong>
              </h4>
              <Formik
                initialValues={initialValues}
                validationSchema={AdditionalTestsSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched }) => (
                  <Form>
                    <p>
                      Specify additional tests requested from the list below
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="sputum">
                                <strong>Sputum</strong>
                              </label>
                            </div>
                            <div className="col-md-6">
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
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="ecg">
                                <strong>ECG</strong>
                              </label>
                            </div>
                            <div className="col-md-6">
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
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="echo">
                                <strong>Echo</strong>
                              </label>
                            </div>
                            <div className="col-md-6">
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
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="chest_scan">
                                <strong>Chest Scan</strong>
                              </label>
                            </div>
                            <div className="col-md-6">
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
                      </div>
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="other">
                        <strong>Other (Additional Test's Done)</strong>
                      </label>
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
                        <label htmlFor="other_details">
                          <strong>Details on Other Additional Tests</strong>
                        </label>
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
                      <FormButton
                        disabled={true}
                        text={"Previous"}
                        direction={"left"}
                        onClick={handlePrev}
                      />
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <FormButton
                          text={"Save "}
                          direction={"right"}
                          onClick={handleSubmit}
                        />
                      )}
                      {/* <button onClick={handlePrev}>Previous</button>

                      <button onClick={handleNext}>Save</button> */}
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

export default AdditionalTests;

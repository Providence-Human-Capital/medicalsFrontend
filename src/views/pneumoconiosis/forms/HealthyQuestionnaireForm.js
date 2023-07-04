import React from "react";
import "./FormsStyle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import Loading from "../../../components/loader/Loading";

const HealthyQuestionnaireForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const initialValues = {
    dusty_occupation: false,
    occupation_details: "",
    years_worked: "",
    exposure: "",
  };

  const validationSchema = Yup.object({
    occupation_details: Yup.string().when("dusty_occupation", {
      is: true,
      then: Yup.string().required("Occupation details are required"),
    }),
    years_worked: Yup.string().when("dusty_occupation", {
      is: true,
      then: Yup.string().required("Years worked are required"),
    }),
    exposure: Yup.string().when("dusty_occupation", {
      is: true,
      then: Yup.string().required("Exposure is required"),
    }),
  });

  const handleSubmitForm = async (values) => {
    values.dusty_occupation = values.dusty_occupation === "true"; //Converting a string to a boolean
    console.log(values);
    

    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(
        `${API}/patient/${patientId}/previous/occupation`,
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
      dispatch(formsActions.setOccupationDetails(responseData.data));
      dispatch(formsActions.togglePneumoNextPhase())
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
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
              <h4>Additional Patient Details</h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitForm}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="dusty_occupation">
                        Any Previous Work History in Dusty Occupation?
                      </label>
                      <Field
                        as="select"
                        name="dusty_occupation"
                        value={values.dusty_occupation}
                        onChange={handleChange}
                        className="form-control my-upload"
                      >
                        <option value="">Select 
                        <strong>(Yes/No)</strong>
                        </option>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </Field>
                    </div>

                    {values.dusty_occupation && (
                      <>
                        <div className="form-group">
                          <label htmlFor="occupation_details">
                            Occupation Details <strong>(Describe What You Did)</strong>
                          </label>
                          <Field
                            type="text"
                            name="occupation_details"
                            className="form-control my-upload"
                            value={values.occupation_details}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="occupation_details"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="years_worked">Years Worked</label>
                          <Field
                            type="text"
                            name="years_worked"
                            className="form-control my-upload"
                            value={values.years_worked}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="years_worked"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exposure">Exposure</label>
                          <Field
                            type="text"
                            name="exposure"
                            className="form-control my-upload"
                            value={values.exposure}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="exposure"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </>
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

                      {isLoading ? (
                        <Loading />
                      ) : (
                        <button
                          onClick={handleSubmitForm}
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

export default HealthyQuestionnaireForm;

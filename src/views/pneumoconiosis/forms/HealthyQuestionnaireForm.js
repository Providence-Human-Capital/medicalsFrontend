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
import FormButton from "../../../components/buttons/FormButton";

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
      dispatch(formsActions.togglePneumoNextPhase());
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
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
              <h4>
                <strong>
                  Patient's Occupation Information (In Dusty Environements)
                </strong>
              </h4>
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
                      <div className="form-floating">
                        <Field
                          as="select"
                          name="dusty_occupation"
                          value={values.dusty_occupation}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="">
                            Select
                            <strong>(Yes/No)</strong>
                          </option>
                          <option value={false}>NO</option>
                          <option value={true}>YES</option>
                        </Field>
                        <label htmlFor="dusty_occupation">
                          SELECT IF YOU'VE WORKED IN DUSTY ENVIRONMENTS
                        </label>
                      </div>
                    </div>

                    {values.dusty_occupation && (
                      <>
                        <div className="form-group">
                          <label htmlFor="occupation_details">
                            Occupation Details{" "}
                            <strong>(Describe What You Did)</strong>
                          </label>
                          <div className="form-floating">
                            <Field
                              type="text"
                              name="occupation_details"
                              className="form-control"
                              value={values.occupation_details}
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="occupation_details"
                              component="div"
                              className="text-danger"
                            />
                            <label htmlFor="occupation_details">
                              OCCUPATION DETAILS
                            </label>
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="years_worked">Years Worked</label>
                          <div className="form-floating">
                            <Field
                              type="text"
                              name="years_worked"
                              className="form-control"
                              value={values.years_worked}
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="years_worked"
                              component="div"
                              className="text-danger"
                            />
                            <label htmlFor="occupation_details">
                              YEARS WORKED
                            </label>
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="exposure">Exposure</label>
                          <div className="form-floating">
                            <Field
                              type="text"
                              name="exposure"
                              className="form-control"
                              value={values.exposure}
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="exposure"
                              component="div"
                              className="text-danger"
                            />
                            <label htmlFor="occupation_details">EXPOSURE</label>
                          </div>
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
                      {/* <button onClick={handlePrev}>Previous</button> */}

                      <FormButton
                        disabled={true}
                        text={"Previous"}
                        direction={"left"}
                        onClick={handlePrev}
                      />

                      {isLoading ? (
                        <Loading />
                      ) : (
                        // <button
                        //   onClick={handleSubmitForm}
                        //   style={{
                        //     backgroundColor: "#007bff",
                        //     color: "#fff",
                        //     border: "none",
                        //     padding: "10px 20px",
                        //     borderRadius: "5px",
                        //     cursor: "pointer",
                        //     fontSize: "16px",
                        //   }}
                        // >
                        //   Submit
                        // </button>
                        <FormButton
                          text={"Next"}
                          direction={"right"}
                          onClick={handleSubmitForm}
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

export default HealthyQuestionnaireForm;

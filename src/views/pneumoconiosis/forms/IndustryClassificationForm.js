import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import Loading from "../../../components/loader/Loading";
import { useParams } from "react-router-dom";
import FormButton from "../../../components/buttons/FormButton";

const IndustryClassificationForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const initialValues = {
    industry: "",
    mineral: "",
    other_details: "",
  };

  const validationSchema = Yup.object({
    industry: Yup.string().required("Industry is required"),
    mineral: Yup.string().when("industry", {
      is: "Mining",
      then: Yup.string().required("Mineral is required"),
    }),
    other_details: Yup.string().when("industry", {
      is: "Other",
      then: Yup.string().required("Other details are required"),
    }),
  });

  const handleSubmit = async (values) => {
    // console.log("These are the values", JSON.stringify(values));
    dispatch(uiActions.setLoadingSpinner({ isLoading: true }));

    console.log(JSON.stringify(values));
    try {
      const response = await fetch(
        `${API}/patient/${patientId}/classification`,
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
      console.log("Classification Response: " + responseData);
      dispatch(formsActions.setIndustryClassification(responseData.data));
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      handleNext();
    } catch (error) {
      console.log("Error", error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };

  useEffect(() => {
    dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
  }, []);

  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4>Industry Classification</h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="form-group row">
                      <label
                        htmlFor="industry"
                        className="col-sm-2 col-form-label"
                      >
                        Industry
                      </label>
                      <div className="col-sm-10">
                        <Field
                          as="select"
                          name="industry"
                          className="form-control my-upload"
                          value={values.industry}
                          onChange={handleChange}
                        >
                          <option value="">Select an industry</option>
                          <option value="Mining">Mining</option>
                          <option value="Quarrying">Quarrying</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Construction">Construction</option>
                          <option value="Agriculture">Agriculture</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage
                          name="industry"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    {values.industry === "Mining" && (
                      <div className="form-group row">
                        <label
                          htmlFor="mineral"
                          className="col-sm-2 col-form-label"
                        >
                          Mineral
                        </label>
                        <div className="col-sm-10">
                          <Field
                            type="text"
                            name="mineral"
                            className="form-control my-upload"
                            value={values.mineral}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="mineral"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    )}

                    {values.industry === "Other" && (
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
                            className="form-control my-upload"
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
                      {/* <button onClick={handlePrev} disabled={true}>
                        Previous
                      </button> */}
                      <FormButton
                        disabled={true}
                        text={"Previous"}
                        direction={"left"}
                        onClick={handlePrev}
                      />

                      {isLoading ? (
                        <Loading />
                      ) : (
                        // <button type="submit" disabled={isSubmitting}>
                        //   Next
                        // </button>
                        // <button onClick={handleNext}> Tempo Next</button>

                        <FormButton
                          text={"Next"}
                          direction={"right"}
                          onClick={handleSubmit}
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

export default IndustryClassificationForm;

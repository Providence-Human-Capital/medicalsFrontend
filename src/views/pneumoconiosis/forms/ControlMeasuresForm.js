import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { uiActions } from "../../../redux_store/ui-store";
import Loading from "../../../components/loader/Loading";

const ControlMeasuresForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const initialValues = {
    wet_method: false,
    contain_and_vent: false,
    monitoring: false,
    ppe: false,
    ppe_details: "",
    other: false,
    other_details: "",
  };

  const validationSchema = Yup.object({
    ppe_details: Yup.string().when("ppe", {
      is: true,
      then: Yup.string().required("PPE details are required"),
    }),
    contain_and_vent: Yup.boolean().nullable(),
  });

  const handleSubmit = async (values) => {
    values.wet_method = values.wet_method === "true";
    values.contain_and_vent = values.contain_and_vent === "true";
    values.monitoring = values.monitoring === "true";
    values.other = values.other === "true";
    const data = { ...values, ppe: values.ppe === "Yes" ? true : false };
    // Submit form data to Laravel API
    dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
    try {
      const response = await fetch(
        `${API}/patient/${patientId}/control/measures`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Classification Response" + responseData);
      dispatch(formsActions.setControlMeasures(responseData.data));
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
                  3. Details of Control Measures Being Implemented
                </strong>
              </h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="wet_method">Wet Method</label>
                          <Field
                            as="select"
                            name="wet_method"
                            value={values.wet_method}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="contain_and_vent">
                            <strong>Containment and Ventilation</strong>
                          </label>
                          <Field
                            as="select"
                            name="contain_and_vent"
                            value={values.contain_and_vent}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value="">Select</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="monitoring">Monitoring</label>
                          <Field
                            as="select"
                            name="monitoring"
                            value={values.monitoring}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="ppe">PPE</label>
                          <Field
                            as="select"
                            name="ppe"
                            value={values.ppe}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value="">Select(Yes/No)</option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    {values.ppe === "Yes" && (
                      <div className="form-group">
                        <label htmlFor="ppe_details">PPE Details</label>
                        <Field
                          type="text"
                          name="ppe_details"
                          className="form-control my-upload"
                          value={values.ppe_details}
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="ppe_details"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="other">Other</label>
                      <Field
                        as="select"
                        name="other"
                        value={values.other}
                        onChange={handleChange}
                        className="form-control my-upload"
                      >
                        <option value="">Select an option</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </Field>
                    </div>
                    {values.other === "true" && (
                      <div className="form-group">
                        <label htmlFor="other_details">Other Details</label>
                        <Field
                          type="text"
                          name="other_details"
                          className="form-control my-upload"
                          value={values.other_details}
                          onChange={handleChange}
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
                      <button onClick={handlePrev}>Previous</button>
                      {isLoading ? (
                        <Loading />
                      ) : (
                        // <button type="submit" onClick={handleSubmit}>
                        //   Next
                        // </button>
                        <button onClick={handleNext}>Temp Next</button>
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

export default ControlMeasuresForm;

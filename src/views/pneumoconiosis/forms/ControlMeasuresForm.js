import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { uiActions } from "../../../redux_store/ui-store";
import Loading from "../../../components/loader/Loading";
import FormButton from "../../../components/buttons/FormButton";

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
    console.log(data);
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
      console.log("Classification Response" + JSON.stringify(responseData));
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
                          <label
                            htmlFor="wet_method"
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "bold",
                            }}
                          >
                            Wet Method
                          </label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              name="wet_method"
                              value={values.wet_method}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value={false}>NO</option>
                              <option value={true}>YES</option>
                            </Field>
                            <label
                              htmlFor="wet_method"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              Wet Method (YES/NO)
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="contain_and_vent"
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
                          <strong>Containment and Ventilation</strong>
                        </label>
                        <div className="form-group">
                          <div className="form-floating">
                            <Field
                              as="select"
                              name="contain_and_vent"
                              value={values.contain_and_vent}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value="">Select</option>
                              <option value={true}>YES</option>
                              <option value={false}>NO</option>
                            </Field>
                            <label
                              htmlFor="contain_and_vent"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              <strong>Containment and Ventilation</strong>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label
                          htmlFor="monitoring"
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
                          Monitoring
                        </label>
                        <div className="form-group">
                          <div className="form-floating">
                            <Field
                              as="select"
                              name="monitoring"
                              value={values.monitoring}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value={false}>NO</option>
                              <option value={true}>YES</option>
                            </Field>
                            <label
                              htmlFor="monitoring"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              Monitoring
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="ppe"
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "bold",
                            }}
                          >
                            PPE
                          </label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              name="ppe"
                              value={values.ppe}
                              onChange={handleChange}
                              className="form-select"
                            >
                                <option value="">Select an option</option>
                              <option value={false}>NO</option>
                              <option value={true}>YES</option>
                            </Field>
                            <label
                              htmlFor="ppe"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              PERSONAL PROTECTIVE EQUIPMENT
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {values.ppe === "true" && (
                      <div className="form-group">
                        <label htmlFor="ppe_details">PPE Details</label>
                        <div className="form-floating">
                          <Field
                            type="text"
                            name="ppe_details"
                            className="form-control"
                            value={values.ppe_details}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="ppe_details"
                            component="div"
                            className="text-danger"
                          />
                          <label htmlFor="ppe_details">
                            DETAILS OF PERSONAL PROTECTIVE EQUIPMENT
                          </label>
                        </div>
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="other"
                      style={{
                        textTransform: "uppercase"
                      }}
                      >Other</label>
                      <div className="form-floating">
                        <Field
                          as="select"
                          name="other"
                          value={values.other}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="">Select an option</option>
                          <option value={true}>YES</option>
                          <option value={false}>NO</option>
                        </Field>
                        <label htmlFor="other">
                          SELECT OTHER PROTECTIVE MEASURES
                        </label>
                      </div>
                    </div>
                    {values.other === "true" && (
                      <div className="form-group">
                        <label htmlFor="other_details">
                          DETAILS ON OTHER PROTECTIVE MEASURES
                        </label>
                        <div className="form-floating">
                          <Field
                            type="text"
                            name="other_details"
                            className="form-control"
                            value={values.other_details}
                            onChange={handleChange}
                          />
                          <label htmlFor="other_details">
                            DETAILS ON OTHER PROTECTIVE MEASURES
                          </label>
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
                        // <button type="submit" onClick={handleSubmit}>
                        //   Next
                        // </button>
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

export default ControlMeasuresForm;

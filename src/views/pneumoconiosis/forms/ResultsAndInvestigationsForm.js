import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { toast } from "react-toastify";
import Loading from "../../../components/loader/Loading";
import FormButton from "../../../components/buttons/FormButton";
import { chechCertificatesStatusUpdate } from "../../../services/api";

const ResultsAndInvestigationsForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const initialValues = {
    chest_x_ray: false,
    x_ray_comments: "",
    fev1: "",
    fev1_fvc: "",
    fvc: "",
    conclusion: "",
    suitable_for_dusty: false,
    sfde_comment: "",
    other_medical_conditions: false,
    conditions_details: "",
    tb_comment: "",
    referral: false,
    tb_free: false,
    tb_suspect: false,
    tb_confirmed: false,
  };

  const validationSchema = Yup.object().shape({
    x_ray_comments: Yup.string().max(
      255,
      "Comments must be less than 255 characters"
    ),
    fev1: Yup.string().max(10, "FEV1 must be less than 10 characters"),
    fev1_fvc: Yup.string().max(10, "FEV1/FVC must be less than 10 characters"),
    fvc: Yup.string().max(10, "FVC must be less than 10 characters"),
    conclusion: Yup.string().max(
      255,
      "Conclusion must be less than 255 characters"
    ),
    sfde_comment: Yup.string().max(
      255,
      "Comments must be less than 255 characters"
    ),
    conditions_details: Yup.string().max(
      255,
      "Details must be less than 255 characters"
    ),
    tb_comment: Yup.string().max(
      255,
      "Comments must be less than 255 characters"
    ),
  });

  const handleSubmit = async (values) => {
    values.chest_x_ray = values.chest_x_ray === "true";
    values.suitable_for_dusty = values.suitable_for_dusty === "true";
    values.other_medical_conditions =
      values.other_medical_conditions === "true";
    values.referral = values.referral === "true";
    values.tb_free = values.tb_free === "true";
    values.tb_suspect = values.tb_suspect === "true";
    values.tb_confirmed = values.tb_confirmed === "true";
    console.log(values);
    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(
        `${API}/patient/${patientId}/results/investigation`,
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
      dispatch(formsActions.setPneumoResultsRemarks(responseData.data));
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      chechCertificatesStatusUpdate(patientId).then((data) => {
        console.log("From Certificates Update", data);
      });
      toast.dark("Physical Tests Successfully Added");
      handleNext();
    } catch (error) {
      console.log("Error", error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }

    // Submit form data to backend
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
                <strong>Section E: Results and Investigations</strong>
              </h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="chest_x_ray">
                            <strong>
                              Chest X-Ray comment by medical officer:
                            </strong>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <strong>(Normal / Abnormal)</strong>
                          </p>
                          <Field
                            as="select"
                            name="chest_x_ray"
                            value={values.chest_x_ray}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={true}>Abnormal</option>
                            <option value={false}>Normal</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    {values.chest_x_ray && (
                      <div className="form-group">
                        <label htmlFor="x_ray_comments">
                          <strong>Please describe any abnormalities</strong>
                        </label>
                        <Field
                          type="text"
                          name="x_ray_comments"
                          value={values.x_ray_comments}
                          onChange={handleChange}
                          className="form-control my-upload"
                        />
                      </div>
                    )}
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="fev1">FEV1</label>
                          <Field
                            type="text"
                            name="fev1"
                            value={values.fev1}
                            onChange={handleChange}
                            className="form-control my-upload"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="fev1_fvc">FEV1/FVC</label>
                          <Field
                            type="text"
                            name="fev1_fvc"
                            value={values.fev1_fvc}
                            onChange={handleChange}
                            className="form-control my-upload"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="fvc">FVC</label>
                          <Field
                            type="text"
                            name="fvc"
                            value={values.fvc}
                            onChange={handleChange}
                            className="form-control my-upload"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="conclusion">Conclusion</label>
                      <Field
                        as="select"
                        name="conclusion"
                        value={values.conclusion}
                        onChange={handleChange}
                        className="form-control my-upload"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Restrictive">Restrictive</option>
                        <option value="Obstructive">Obstructive</option>
                        <option value="Obstructive">Mixed</option>
                      </Field>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="suitable_for_dusty">
                            Suitable for Dusty Environment
                          </label>
                          <Field
                            as="select"
                            name="suitable_for_dusty"
                            value={values.suitable_for_dusty}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="other_medical_conditions">
                            Other Medical Conditions
                          </label>
                          <Field
                            as="select"
                            name="other_medical_conditions"
                            value={values.other_medical_conditions}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={null}>Select an option</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    {values.suitable_for_dusty && (
                      <div className="form-group">
                        <label htmlFor="sfde_comment">SFDE Comment</label>
                        <Field
                          type="text"
                          name="sfde_comment"
                          value={values.sfde_comment}
                          onChange={handleChange}
                          className="form-control my-upload"
                        />
                      </div>
                    )}

                    {values.other_medical_conditions && (
                      <div className="form-group">
                        <label htmlFor="conditions_details">
                          Medical Condition Details
                        </label>
                        <Field
                          type="text"
                          name="conditions_details"
                          value={values.conditions_details}
                          onChange={handleChange}
                          className="form-control my-upload"
                        />
                      </div>
                    )}
                    <h5>
                      In your opinion do you consider the examinee:{" "}
                      <strong>(Select Yes where Applicable)</strong>{" "}
                    </h5>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="tb_free">
                            <strong>Free from TB </strong>
                          </label>
                          <Field
                            as="select"
                            name="tb_free"
                            value={values.tb_free}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="tb_suspect">
                            <strong>TB Suspect</strong>
                          </label>
                          <Field
                            as="select"
                            name="tb_suspect"
                            value={values.tb_suspect}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="tb_confirmed">
                            <strong>Confirmed TB </strong>
                          </label>
                          <Field
                            as="select"
                            name="tb_confirmed"
                            value={values.tb_confirmed}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <h5>Worker referred for further tests</h5>
                    <div className="form-group col-md-4">
                      <label htmlFor="referral">
                        <strong>Referral</strong>
                      </label>
                      <Field
                        as="select"
                        name="referral"
                        value={values.referral}
                        onChange={handleChange}
                        className="form-control my-upload"
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </Field>
                    </div>
                    {/* {
                      isLoading ? (
                        <Loading />
                      ) : (
                        <button type="submit" onClick={handleSubmit}>Save (Test)</button>
                      )
                    } */}

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
                          text={"Next"}
                          direction={"right"}
                          onClick={handleSubmit}
                        />
                      )}
                      {/* <button onClick={handlePrev}>Previous</button>

                      <button onClick={handleNext}>Next</button> */}
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

export default ResultsAndInvestigationsForm;

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { toast } from "react-toastify";
import { uiActions } from "../../../redux_store/ui-store";
import { formsActions } from "../../../redux_store/forms-store";
import Loading from "../../../components/loader/Loading";
import FormButton from "../../../components/buttons/FormButton";

const SystemsCheckForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const initialValues = {
    respiratory: true,
    cvs: true,
    musculoskeletal: true,
    cns: true,
    skin: true,
    systems_summary: "",
  };

  const validationSchema = Yup.object().shape({
    systems_summary: Yup.string().required(
      "Please provide a summary of your systems check."
    ),
  });

  const handleSubmit = async (values) => {
    values.respiratory = values.respiratory === "false";
    values.cvs = values.cvs === "false";
    values.musculoskeletal = values.musculoskeletal === "false";
    values.cns = values.cns === "false";
    values.skin = values.skin === "false";
    console.log(values);
    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(
        `${API}/patient/${patientId}/systems/check`,
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
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      dispatch(formsActions.setPneumoSystemsCheck(responseData.data));
      toast.dark("Systems Check Successfully Added");
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
              <h4>
                <strong>3. Systems</strong> (Select - Normal/Abnormal)
              </h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="respiratory">
                              <strong>Respiratory</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
                            <Field
                              as="select"
                              name="respiratory"
                              value={values.respiratory}
                              onChange={handleChange}
                              className="form-control my-upload"
                            >
                              <option value={true}>Normal</option>
                              <option value={false}>Abnormal</option>
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="cvs">
                              <strong>Cardiovascular</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
                            <Field
                              as="select"
                              name="cvs"
                              value={values.cvs}
                              onChange={handleChange}
                              className="form-control my-upload"
                            >
                              <option value={true}>Normal</option>
                              <option value={false}>Abnormal</option>
                            </Field>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="musculoskeletal">
                              <strong>Musculoskeletal</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
                            <Field
                              as="select"
                              name="musculoskeletal"
                              value={values.musculoskeletal}
                              onChange={handleChange}
                              className="form-control my-upload"
                            >
                              <option value={true}>Normal</option>
                              <option value={false}>Abnormal</option>
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="cns">
                              <strong>Central Nervous System</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
                            <Field
                              as="select"
                              name="cns"
                              value={values.cns}
                              onChange={handleChange}
                              className="form-control my-upload"
                            >
                              <option value={true}>Normal</option>
                              <option value={false}>Abnormal</option>
                            </Field>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="skin">
                            <strong>Skin</strong>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <Field
                            as="select"
                            name="skin"
                            value={values.skin}
                            onChange={handleChange}
                            className="form-control my-upload"
                          >
                            <option value={true}>Normal</option>
                            <option value={false}>Abnormal</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="systems_summary">
                        <strong>
                          Summary of abnormal findings or disability if any:
                        </strong>
                      </label>
                      <Field
                        as="textarea"
                        rows="5"
                        name="systems_summary"
                        value={values.systems_summary}
                        onChange={handleChange}
                        className="form-control my-upload"
                      />
                    </div>

                    {/* {isLoading ? (
                      <Loading />
                    ) : (
                      <button type="submit">Save (Submit) </button>
                    )} */}
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

export default SystemsCheckForm;

import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { uiActions } from "../../../redux_store/ui-store";
import Loading from "../../../components/loader/Loading";
import FormButton from "../../../components/buttons/FormButton";

const RespiratoryForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const initialValues = {
    lungs: "",
    x_ray_comment: "",
    spirometry_comment: "",
    fev: "",
    fvc: "",
    sears: "",
    tenderness: "",
    hernia: "",
    organomegaly: "",
    kidney_enlargement: "",
    urine_appear: "",
    sg: "",
    albumin: "",
    sugar: "",
    deposit: "",
    evidence_of_disease: "",
    evidence_of_any_disease: "",
    lmp: "",
    parity: "",
  };

  const validationSchema = Yup.object({
    lungs: Yup.string().nullable(),
    x_ray_comment: Yup.string().nullable(),
    spirometry_comment: Yup.string().nullable(),
    fev: Yup.string().nullable(),
    fvc: Yup.string().nullable(),
    sears: Yup.string().nullable(),
    tenderness: Yup.string().nullable(),
    hernia: Yup.string().nullable(),
    organomegaly: Yup.string().nullable(),
    kidney_enlargement: Yup.string().nullable(),
    urine_appear: Yup.string().nullable(),
    sg: Yup.string().nullable(),
    albumin: Yup.string().nullable(),
    sugar: Yup.string().nullable(),
    deposit: Yup.string().nullable(),
    evidence_of_disease: Yup.string().nullable(),
    evidence_of_any_disease: Yup.string().nullable(),
    lmp: Yup.string().nullable(),
    parity: Yup.string().nullable(),
  });
  const onSubmit = async (values) => {
    console.log(values);

    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(`${API}/respiratory/${patientId}`, {
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
      dispatch(formsActions.setOtherRespiratoryCheck(responseData.data));
      toast.dark("Patient's Respiratory Data  Successfully Added");
      handleNext();
    } catch (error) {
      console.log("Error", error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };

  useEffect(() => {
    // dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
  }, []);
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
                <strong>Raspiratory System Check</strong>
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
                        <label htmlFor="lungs">
                          <strong>Lungs</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="lungs"
                            name="lungs"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="lungs"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="x_ray_comment">
                          <strong>X-Ray (where indicated ) Comment</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="x_ray_comment"
                            name="x_ray_comment"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="x_ray_comment"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="spirometry_comment">
                            <strong>
                              {" "}
                              Spirometry (where indicated ) Comment
                            </strong>
                          </label>
                          <Field
                            type="text"
                            id="spirometry_comment"
                            name="spirometry_comment"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="spirometry_comment"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="fev">
                              <strong>FEV =</strong>
                            </label>
                          </div>
                          <div className="col-md-8">
                            {" "}
                            <div className="form-group">
                              <Field
                                type="text"
                                id="fev"
                                name="fev"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="fev"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="fvc">
                              <strong>FVC =</strong>
                            </label>
                          </div>
                          <div className="col-md-8">
                            <div className="form-group">
                              <Field
                                type="text"
                                id="fvc"
                                name="fvc"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="fvc"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="sears">
                          <strong>Sears</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="sears"
                            name="sears"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="sears"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tenderness">
                            <strong>Tenderness</strong>
                          </label>
                          <Field
                            type="text"
                            id="tenderness"
                            name="tenderness"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="tenderness"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="hernia">
                            <strong>Hernia</strong>
                          </label>
                          <Field
                            type="text"
                            id="hernia"
                            name="hernia"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="hernia"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="organomegaly">
                          <strong>Any organomegaly</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="organomegaly"
                            name="organomegaly"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="organomegaly"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="kidney_enlargement">
                          <strong> Kidney Enlargement</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="kidney_enlargement"
                            name="kidney_enlargement"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="kidney_enlargement"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="urine_appear">
                          <strong>Urine Appearance</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="urine_appear"
                            name="urine_appear"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="urine_appear"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="sg">
                            <strong>SG</strong>
                          </label>
                          <Field
                            type="text"
                            id="sg"
                            name="sg"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="sg"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="albumin">
                            <strong>Albumin</strong>
                          </label>
                          <Field
                            type="text"
                            id="albumin"
                            name="albumin"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="albumin"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="sugar">
                            <strong>Sugar</strong>
                          </label>
                          <Field
                            type="text"
                            id="sugar"
                            name="sugar"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="sugar"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="deposit">
                            <strong>Deposit</strong>
                          </label>
                          <Field
                            type="text"
                            id="deposit"
                            name="deposit"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="deposit"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="evidence_of_disease">
                          <strong> Evidence of Disease</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="evidence_of_disease"
                            name="evidence_of_disease"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="evidence_of_disease"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="evidence_of_any_disease">
                          <strong> Evidence of Any other Disease</strong>
                        </label>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <Field
                            type="text"
                            id="evidence_of_any_disease"
                            name="evidence_of_any_disease"
                            className="form-control my-upload"
                          />
                          <ErrorMessage
                            name="evidence_of_any_disease"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <h4>
                          <strong>Females: Menstrual History</strong>
                        </h4>
                      </div>
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="lmp">
                              <strong>LMP =</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <Field
                                type="text"
                                id="lmp"
                                name="lmp"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="lmp"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="parity">
                              <strong>Parity =</strong>
                            </label>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <Field
                                type="text"
                                id="parity"
                                name="parity"
                                className="form-control my-upload"
                              />
                              <ErrorMessage
                                name="parity"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <button onClick={onSubmit}>Submit Test</button> */}
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

export default RespiratoryForm;

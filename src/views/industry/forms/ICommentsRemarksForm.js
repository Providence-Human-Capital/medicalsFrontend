import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { toast } from "react-toastify";
import ErrorBox from "../../../components/ErrorBox";
import Loading from "../../../components/loader/Loading";
import FormButton from "../../../components/buttons/FormButton";
import { chechCertificatesStatusUpdate } from "../../../services/api";

const ICommentsRemarksForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [updateStatus, setUpdateStatus] = useState(false);

  const validationSchema = Yup.object().shape({
    doctors_comments: Yup.string().nullable(),
    fit_to_work: Yup.boolean().nullable(),
  });

  const handleSubmit = async (values) => {
    console.log(values);

    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(`${API}/other/comments/${patientId}`, {
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
      dispatch(formsActions.setOtherCommentsAndRemarks(responseData.data));
      toast.dark("Doctors Comments and Remarks Successfully Added");
      navigate(`/patients/${patientId}`);
      chechCertificatesStatusUpdate(patientId).then((data) => {
        console.log("From Certificates Update", data);
      });
    } catch (error) {
      console.log("Error", error);
      setError(error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };

  useEffect(() => {
    chechCertificatesStatusUpdate(patientId).then((data) => {
      console.log("From Certificates Update", data);
    });
  }, [updateStatus]);
  return (
    <div className="step-form">
      {/* {error && <ErrorBox error={error} />} */}
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4
                style={{
                  textTransform: "uppercase",
                }}
              >
                <strong>DOCTOR'S COMMENTS AND REMARKS</strong>
              </h4>

              <Formik
                initialValues={{
                  doctors_comments: "",
                  fit_to_work: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-group">
                      <label
                        htmlFor="doctors_comments"
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Doctor's Comments
                      </label>
                      <div className="form-floating">
                        <Field
                          as="textarea"
                          rows={5}
                          className={
                            "form-control" +
                            (errors.doctors_comments && touched.doctors_comments
                              ? " is-invalid"
                              : "")
                          }
                          id="doctors_comments"
                          name="doctors_comments"
                          style={{
                            minHeight: "300px",
                          }}
                        />
                        <ErrorMessage
                          name="doctors_comments"
                          component="div"
                          className="invalid-feedback"
                        />
                        <label htmlFor="doctors_comments">
                          DOCTOR'S COMMENTS AND REMARKS
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="fit_to_work"
                          style={{
                            textTransform: "uppercase",
                          }}
                        >
                          <strong>Fit to Work</strong>
                        </label>
                        <div className="form-floating">
                          <Field
                            as="select"
                            id="fit_to_work"
                            name="fit_to_work"
                            className="form-select"
                          >
                            <option value="">Select (Yes / No)</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </Field>
                          <label
                            htmlFor="fit_to_work"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            IS CLIENT FIT TO WORK
                          </label>
                          <ErrorMessage
                            name="fit_to_work"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>
                    </div>

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
                        // <button onClick={handleSubmit}>Submit</button>
                        <FormButton
                          text={"Save & Redirect"}
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

export default ICommentsRemarksForm;

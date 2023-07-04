import React, { useState } from "react";
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

const ICommentsRemarksForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    doctors_comments: Yup.string().nullable(),
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
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      dispatch(formsActions.setOtherCommentsAndRemarks(responseData.data));
      toast.dark("Doctors Comments and Remarks Successfully Added");
      navigate(`/patients/${patientId}`);
    } catch (error) {
      console.log("Error", error);
      setError(error);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };
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
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="doctors_comments">
                        Doctor's Comments
                      </label>
                      <Field
                        as="textarea"
                        rows={5}
                        className={
                          "form-control my-upload" +
                          (errors.doctors_comments && touched.doctors_comments
                            ? " is-invalid"
                            : "")
                        }
                        id="doctors_comments"
                        name="doctors_comments"
                      />
                      <ErrorMessage
                        name="doctors_comments"
                        component="div"
                        className="invalid-feedback"
                      />
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
                      <button onClick={handlePrev}>Previous</button>

                      {isLoading ? (
                        <Loading />
                      ) : (
                        <button onClick={handleSubmit}>Submit</button>
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

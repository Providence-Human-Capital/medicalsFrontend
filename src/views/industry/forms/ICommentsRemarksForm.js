import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  doctors_comments: Yup.string().nullable(),
});

const ICommentsRemarksForm = ({ handlePrev, handleNext }) => {
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
                <strong>DOCTOR'S COMMENTS AND REMARKS</strong>
              </h4>

              <Formik
                initialValues={{
                  doctors_comments: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="doctors_comments">
                        Doctor's Comments
                      </label>
                      <Field
                        as="textarea"
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

                   
                  </Form>
                )}
              </Formik>
            </div>
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
        <button onClick={handlePrev}>Previous</button>

        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ICommentsRemarksForm;

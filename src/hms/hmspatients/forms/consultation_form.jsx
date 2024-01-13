import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Select from "react-select";

const ConsultationForm = ({}) => {
  const initialValues = {
    symptoms: "",
    systems_review: "",
    past_medical_diagnosis: false,
    diagnosis_details: "",
    examination: "",
    patient_diagnosis: "",
    patientDiagnoses: [],
  };
  const validationSchema = yup.object().shape({
    symptoms: yup.string().required("Symptoms are required"),
  });
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const consultationData = {};
    console.log("Submitted!");
    console.log(values);
  };

  useEffect(() => {}, []);

  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);

  // State for available diagnoses
  const [diagnoses, setDiagnoses] = useState([
    { value: "flu", label: "Flu" },
    { value: "cold", label: "Common Cold" },
    // Add more diagnoses as needed
  ]);

  // Handler for selecting a diagnosis
  const handleDiagnosisChange = (selectedOption) => {
    setSelectedDiagnosis(selectedOption);
  };

  // Handler for adding a new diagnosis
  const handleAddDiagnosis = () => {
    // Check if the selected or typed diagnosis already exists
    if (
      selectedDiagnosis &&
      !diagnoses.some(
        (diagnosis) => diagnosis.label === selectedDiagnosis.label
      )
    ) {
      // Implement logic to add a new diagnosis to the backend
      // For simplicity, we'll just add it to the local state here
      const newDiagnosis = {
        value: selectedDiagnosis.label,
        label: selectedDiagnosis.label,
      };
      setDiagnoses([...diagnoses, newDiagnosis]);
      setSelectedDiagnosis(newDiagnosis);
      console.log("New diagnosis", newDiagnosis);
    } else {
      console.log("Diagnosis already exists or is empty");
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 60,
    }),
  };

  return (
    <>
      <div className="separation-div"></div>
      <div className="section">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="card">
              <div className="box-body">
                <div>
                  <h4
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    Start New Consultation
                  </h4>
                  <div className="separation-div"></div>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    {({
                      values,
                      isSubmitting,
                      handleSubmit,
                      touched,
                      errors,
                      setFieldValue,
                    }) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-12 col-12">
                            <div className="form-floating">
                              <Field
                                as="textarea"
                                className="form-control"
                                id="symptoms"
                                name="symptoms"
                                style={{
                                  minHeight: "100px",
                                }}
                              />
                              <label
                                htmlFor="symptoms"
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                SYMPTOMS
                              </label>
                              <ErrorMessage
                                name="symptoms"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="separation-div"></div>

                        <div className="row">
                          <div className="col-md-12 col-12">
                            <div className="form-floating">
                              <Field
                                as="textarea"
                                className="form-control"
                                id="systems_review"
                                name="systems_review"
                                style={{
                                  minHeight: "100px",
                                }}
                              />
                              <label
                                htmlFor="systems_review"
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                SYSTEMS REVIEW
                              </label>
                              <ErrorMessage
                                name="systems_review"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Add other fields as needed */}

                        <div className="separation-div"></div>
                        <div className="row">
                          <div className="col-md-12 col-12">
                            <div className="form-check">
                              <Field
                                type="checkbox"
                                className="form-check-input"
                                id="past_medical_diagnosis"
                                name="past_medical_diagnosis"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="past_medical_diagnosis"
                              >
                                Past Medical Diagnosis
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="separation-div"></div>

                        {values.past_medical_diagnosis && (
                          <div className="row">
                            <div className="col-md-12 col-12">
                              <div className="form-floating">
                                <Field
                                  as="textarea"
                                  className="form-control"
                                  id="diagnosis_details"
                                  name="diagnosis_details"
                                  style={{
                                    minHeight: "80px",
                                  }}
                                />
                                <label
                                  htmlFor="diagnosis_details"
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  DIAGNOSIS DETAILS
                                </label>
                                <ErrorMessage
                                  name="diagnosis_details"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="separation-div"></div>

                        <div className="row">
                          <div className="col-md-12 col-12">
                            <div className="form-floating">
                              <Field
                                as="textarea"
                                className="form-control"
                                id="examination"
                                name="examination"
                                style={{
                                  minHeight: "100px",
                                }}
                              />
                              <label
                                htmlFor="examination"
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                EXAMINATION FINDINGS
                              </label>
                              <ErrorMessage
                                name="examination"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="separation-div"></div>

                        {/* Add other form elements or buttons as needed */}
                        <div className="row">
                          <div className="col-md-6 col-12">
                            <Select
                              value={selectedDiagnosis}
                              onChange={handleDiagnosisChange}
                              options={diagnoses}
                              isSearchable
                              placeholder="Search or add a diagnosis..."
                              styles={customStyles}
                            />
                            <div className="separation-div"></div>
                            <button
                              onClick={handleAddDiagnosis}
                              className="btn btn-primary"
                              style={{
                                borderRadius: "10px",
                              }}
                            >
                              Add Diagnosis
                            </button>
                          </div>

                          <div className="col-md-4 col-12">
                            <h4
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                              }}
                            >
                              Diagnosis
                            </h4>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-12 col-12">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={isSubmitting}
                              onClick={handleSubmit}
                            >
                              Submit Examination
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultationForm;

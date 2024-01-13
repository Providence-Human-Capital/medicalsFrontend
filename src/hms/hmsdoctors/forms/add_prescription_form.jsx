import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";

const PrescriptionForm = () => {
  const initialValues = {
    numberOfDrugs: "",
    prescriptions: [
      { drugName: "", dose: "", frequency: "", route: "", duration: "" },
    ],
  };

  const validationSchema = Yup.object().shape({
    numberOfDrugs: Yup.number()
      .required("Please Enter Number Of Drugs")
      .min(1, "Must be at least 1"),
    prescriptions: Yup.array().of(
      Yup.object().shape({
        drugName: Yup.string().required("Required"),
        dose: Yup.string().required("Required"),
        frequency: Yup.string().required("Required"),
        route: Yup.string().required("Required"),
        duration: Yup.string().required("Required"),
      })
    ),
  });

  const onSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <>
      <BreadCrumb title={"Patient Prescription"} activeTab={"Prescription"} />
      <div className="section">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="card">
              <div className="box-body">
                <h4
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  PATIENT DRUG PRESCRIPTION
                </h4>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <Field
                            type="number"
                            id="numberOfDrugs"
                            name="numberOfDrugs"
                            className="form-control"
                          />
                          <label htmlFor="numberOfDrugs">
                            Enter Number Of Drugs to Prescribe:
                          </label>
                          <ErrorMessage
                            name="numberOfDrugs"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <button className="btn btn-primary">ADD ANOTHER</button>
                        <button className="btn btn-primary">REMOVE LAST</button>
                      </div>
                    </div>
                    <div className="separation-div"></div>

                    <div className="row">
                      <FieldArray name="prescriptions">
                        {({ push, remove, form }) => (
                          <div>
                            {Array.from(
                              { length: form.values.numberOfDrugs || 0 },
                              (_, index) => (
                                <div
                                  key={index}
                                  style={{
                                    marginBottom: "20px",
                                  }}
                                  className="row"
                                >
                                  <div className="col-md-4">
                                    <div className="form-floating">
                                      <Field
                                        type="text"
                                        id={`prescriptions.${index}.drugName`}
                                        name={`prescriptions.${index}.drugName`}
                                        className="form-control"
                                      />
                                      <label
                                        htmlFor={`prescriptions.${index}.drugName`}
                                      >
                                        Drug Name:
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-2">
                                    <div className="form-floating">
                                      <Field
                                        type="text"
                                        id={`prescriptions.${index}.dose`}
                                        name={`prescriptions.${index}.dose`}
                                        className="form-control"
                                      />
                                      <label
                                        htmlFor={`prescriptions.${index}.dose`}
                                      >
                                        Dose:
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-2">
                                    <div className="form-floating">
                                      <Field
                                        type="text"
                                        id={`prescriptions.${index}.frequency`}
                                        name={`prescriptions.${index}.frequency`}
                                        className="form-control"
                                      />
                                      <label
                                        htmlFor={`prescriptions.${index}.frequency`}
                                      >
                                        Frequency:
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-2">
                                    <div className="form-floating">
                                      <Field
                                        type="text"
                                        id={`prescriptions.${index}.route`}
                                        name={`prescriptions.${index}.route`}
                                        className="form-control"
                                      />
                                      <label
                                        htmlFor={`prescriptions.${index}.route`}
                                      >
                                        Route:
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-2">
                                    <div className="form-floating">
                                      <Field
                                        type="text"
                                        id={`prescriptions.${index}.duration`}
                                        name={`prescriptions.${index}.duration`}
                                        className="form-control"
                                      />
                                      <label
                                        htmlFor={`prescriptions.${index}.duration`}
                                      >
                                        Duration:
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    <div className="separation-div"></div>
                    <div>
                      <button type="submit" className="btn btn-success">
                        SUBMIT PATIENT'S DRUG PRESCRIPTION
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionForm;

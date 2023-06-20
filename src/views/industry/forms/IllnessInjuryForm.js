import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDisease } from "@fortawesome/free-solid-svg-icons";

const IllnessInjuryForm = ({ handlePrev, handleNext }) => {
  const diseases = useSelector((state) => state.illness.diseases);

  const initialValues = diseases.reduce((acc, disease) => {
    acc[disease.name] = { hasDisease: "", yearTreated: "" };
    return acc;
  }, {});

  const validationSchema = Yup.object().shape({
    ...diseases.reduce((acc, disease) => {
      acc[disease.name] = Yup.object().shape({
        hasDisease: Yup.string().required("Required"),
        yearTreated: Yup.string().when("hasDisease", {
          is: "yes",
          then: Yup.string().required("Required"),
        }),
      });
      return acc;
    }, {}),
  });

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4>
                <strong>Patients Medical History (Step 1)</strong>
              </h4>
              <p>
                Have you ever been treated for any of the illnesses listed below
                ?
              </p>
              <p>
                If <strong>Yes</strong> Provide the <strong>Year</strong> you
                were treated for that illness{" "}
              </p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <Form>
                    <div className="row">
                      {diseases.slice(0, 16).map((disease, index) => (
                        <div className="col-md-6" key={disease.id}>
                          <div className="form-group">
                            <FontAwesomeIcon icon={faDisease} />
                            <label htmlFor={disease.name}>
                              <strong>
                                {index + 1} {disease.name}
                              </strong>
                            </label>
                            <select
                              className="form-control my-upload"
                              name={`${disease.name}.hasDisease`}
                              id={disease.name}
                              value={values[disease.name].hasDisease}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="no">No</option>
                              <option value="yes">Yes</option>
                            </select>
                            {touched[disease.name] &&
                              errors[disease.name]?.hasDisease && (
                                <div className="text-danger">
                                  {errors[disease.name].hasDisease}
                                </div>
                              )}
                            {values[disease.name].hasDisease === "yes" && (
                              <div className="form-group mt-1">
                                <label htmlFor={`${disease.name}.yearTreated`}>
                                  <strong>Year of Treatment ?:</strong>
                                </label>
                                <input
                                  className="form-control my-upload"
                                  type="text"
                                  name={`${disease.name}.yearTreated`}
                                  placeholder="Year Treated"
                                  value={values[disease.name].yearTreated}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>
                            )}
                            {touched[disease.name] &&
                              errors[disease.name]?.yearTreated && (
                                <div className="text-danger">
                                  {errors[disease.name].yearTreated}
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                      {diseases.slice(16, 32).map((disease, index) => (
                        <div className="col-md-6" key={disease.id}>
                          <div className="form-group">
                          <FontAwesomeIcon icon={faDisease} />
                            <label htmlFor={disease.name}>
                              {" "}
                              <strong>
                                {index + 17} {disease.name}
                              </strong>
                            </label>
                            <select
                              className="form-control my-upload"
                              name={`${disease.name}.hasDisease`}
                              id={disease.name}
                              value={values[disease.name].hasDisease}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="no">No</option>
                              <option value="yes">Yes</option>
                            </select>
                            {touched[disease.name] &&
                              errors[disease.name]?.hasDisease && (
                                <div className="text-danger">
                                  {errors[disease.name].hasDisease}
                                </div>
                              )}
                            {values[disease.name].hasDisease === "yes" && (
                              <input
                                className="form-control my-upload"
                                type="text"
                                name={`${disease.name}.yearTreated`}
                                placeholder="Year Treated"
                                value={values[disease.name].yearTreated}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            )}
                            {touched[disease.name] &&
                              errors[disease.name]?.yearTreated && (
                                <div className="text-danger">
                                  {errors[disease.name].yearTreated}
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* <button className="btn btn-primary" type="submit">
                      Submit
                    </button> */}
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

export default IllnessInjuryForm;

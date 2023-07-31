import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDisease } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { uiActions } from "../../../redux_store/ui-store";
import FormButton from "../../../components/buttons/FormButton";
import Swal from "sweetalert2";
import Loading from "../../../components/loader/Loading";

const IllnessInjuryForm = ({ handlePrev, handleNext }) => {
  const diseases = useSelector((state) => state.illness.diseases);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const initialValues = diseases.reduce((acc, disease) => {
    acc[disease.name] = { hasDisease: "", yearTreated: "" };
    return acc;
  }, {});

  const validationSchema = Yup.object().shape({
    ...diseases.reduce((acc, disease) => {
      acc[disease.name] = Yup.object().shape({
        hasDisease: Yup.string().nullable(),
        yearTreated: Yup.string().when("hasDisease", {
          is: "yes",
          then: Yup.string().required("Provide Year of Treatment"),
        }),
      });
      return acc;
    }, {}),
  });

  const onSubmit = async (values) => {
    Swal.fire({
      icon: "warning",
      title: "Confirmation",
      text: "Are you sure you have asked the patient about all injuries and illnesses?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: true,
          })
        );

        const changedDiseases = Object.keys(values).filter((disease) => {
          return (
            values[disease].hasDisease !== "" ||
            values[disease].yearTreated !== ""
          );
        });

        const dataToSend = changedDiseases.map((disease) => {
          return {
            id: diseases.find((item) => item.name === disease).id,
            hasDisease: values[disease].hasDisease,
            yearTreated: values[disease].yearTreated,
          };
        });

        for (const disease of dataToSend) {
          try {
            const response = await axios.patch(
              `${API}/disease/update/${disease.id}/${patientId}`,
              {
                has_disease: disease.hasDisease === "yes" ? true : false,
                date: disease.yearTreated,
              }
            );
            console.log("Disease", response);
            if (response.status === 200) {
              dispatch(
                formsActions.setInjuriesAndIllnesses(response.data.diseases)
              );
              handleNext();
            }
          } catch (error) {
            console.error(error);
            dispatch(
              uiActions.setLoadingSpinner({
                isLoading: false,
              })
            );
          }
        }
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        );
      } else {
        // Logic to handle cancellation
      }
    });
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
                        <FormButton
                          text={"Next"}
                          direction={"right"}
                          onClick={onSubmit}
                        />
                      )}

                      {/* <button onClick={handleNext}>Next</button> */}
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

export default IllnessInjuryForm;

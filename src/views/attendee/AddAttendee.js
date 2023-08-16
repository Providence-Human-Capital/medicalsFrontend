import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import "./components-style/Attendee.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config";
import Loading from "../../components/loader/Loading";
import Alert from "../../components/notifications/Alert";
import { uiActions } from "../../redux_store/ui-store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAttendeeExecel from "./AddAttendeeExecel";
import "./component-css/CustomCss.css";
import SaveButton from "../../components/buttons/SaveButton";

const AddAttendee = () => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);
  const [redirectToPatients, setRedirectToPatients] = useState(false);
  const [continueAddingAttendees, setContinueAddingAttendees] = useState(false);
  const addedNew = useSelector((state) => state.ui.showAlert);

  const styles = {
    formContainer: {
      width: "70%",
      margin: "3rem auto",
    },
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state.company.companies);

  const initialValues = {
    id_type: "zimbabwean_id",
    company_id: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    national_id: "",
    phone_number: "",
    x_ray_status: "PENDING",
    exam_purpose: "",
    employee_number: "",
    country_code: "+263",
    last_x_ray: "N/A",
    category: "",
  };

  // /^(\d{2}-\d{7}-[A-Z]-\d{2})$/
  // /^[A-Z]{2}-\d{7}-[A-Z]{1}-\d{2}$/,

  // national_id: yup
  //     .string()
  //     .when("national_id_type", {
  //       is: "zimbabwean_id",
  //       then: yup.string()
  //     .matches(/^(\d{2}-\d{7}-[A-Z]-\d{2})$/, "Invalid Zimbabwean ID")
  //     .required("Zimbabwean ID is required"),

  const validationSchema = yup.object().shape({
    company_id: yup.number().required("Please select a company"),
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    date_of_birth: yup.string().required("Date of birth is required"),
    gender: yup.string().required("Select your gender"),
    national_id: yup.string().when("id_type", {
      is: "zimbabwean_id",
      then: yup
        .string()

        .required("Zimbabwean ID is required"),
      otherwise: yup.string().notRequired(),
    }),
    country_code: yup.string().required("Select country code"),
    phone_number: yup.string().required("Please enter the Phone Number"),
    x_ray_status: yup.string().required("Please select the X ray Status"),
    exam_purpose: yup.string().required("Please select the Exam Purpose"),
    employee_number: yup.string().required("Employee Number is Required!"),
    category: yup.string().required("Please Category is Required!"),
    last_x_ray: yup
      .string()
      .matches(
        /^(N\/A|\d{4}|\d{4}-\d{2})$/,
        "Please enter a valid year (YYYY) or year and month (YYYY-MM), or N/A"
      ),
  });

  const onSubmit = async (formData, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log("FormData", formData);
    try {
      const response = await fetch(`${API}/attendee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Responsee", data);
      dispatch(
        uiActions.setAlert({
          setAlert: true,
        })
      );

      setRedirectBack(true);
      if ((response.status === 200) | (response.status === 201)) {
        toast("Attendee added successfully");
        if (redirectToPatients) {
          navigate("/patients");
        } else if (continueAddingAttendees) {
          resetForm();
        }
      }

      if (response.status === 400) {
        if (data.error) {
          toast(data.error);
        }
      }

      if (response.status === 500) {
        toast("An internal server error occurred! National ID might be in use");
      }
    } catch (error) {
      console.error("Error Messsage", error);
    } finally {
      setLoading(false);
      setSubmitting(false);
      setTimeout(() => {
        dispatch(
          uiActions.setAlert({
            setAlert: false,
          })
        );
      }, 4000);
    }
  };

  useEffect(() => {
    if (redirectBack) {
    } else {
      return;
    }
  }, [redirectBack, addedNew]);

  const onInputChange = () => {
    dispatch(
      uiActions.setAlert({
        setAlert: false,
      })
    );
  };

  // const handleNationalIdChange = (event, setFieldValue, id_type) => {
  //   const { value } = event.target;
  //   let formattedValue = value
  //     .replace(/[^A-Za-z0-9]/g, "") // Remove non-alphanumeric characters
  //     .slice(0, 16); // Limit the length to 13 characters

  //   if (id_type !== "international_id") {
  //     if (formattedValue.length > 2) {
  //       formattedValue = formattedValue.replace(/(\d{2})/, "$1-");
  //     }
  //     if (formattedValue.length > 10) {
  //       formattedValue = formattedValue.replace(/(\d{4,7})([A-Z])/, "$1-$2-");
  //     }
  //     if (formattedValue.length > 13) {
  //       formattedValue = formattedValue.replace(/([A-Z])(\d{1,2})$/, "$1-$2");
  //     }
  //   }

  //   setFieldValue("national_id", formattedValue);
  // };
  const handleNationalIdChange = (event, setFieldValue, id_type) => {
    const { value } = event.target;
    let formattedValue = value
      .replace(/[^A-Za-z0-9]/g, "") // Remove non-alphanumeric characters
      .slice(0, 16); // Limit the length to 16 characters

    if (id_type !== "international_id") {
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.replace(/(\d{2})/, "$1-");
      }
      if (formattedValue.length > 10) {
        formattedValue = formattedValue.replace(
          /(\d{4,7})([A-Za-z])/,
          "$1-$2-"
        );
      }
      if (formattedValue.length > 13) {
        formattedValue = formattedValue.replace(
          /([A-Za-z])(\d{1,2})$/,
          "$1-$2"
        );
      }
    }

    setFieldValue("national_id", formattedValue);
  };

  return (
    <Fragment>
      <BreadCrumb title={"Add Attendee"} activeTab={"Add Attendee"} />
      {/* {addedNew && <Alert message={"Attendee Successfully Added!"} />} */}

      <Link
        to={"/attendees/add/excel"}
        className="btn btn-primary me-5 mb-md-0 mb-4 excel-btn"
        style={{
          borderRadius: "20px",
        }}
      >
        <i className="fa fa-table" aria-hidden="true"></i>
        {"   "}
        Add Through Excel
      </Link>
      <div className="separation-div"></div>
      <div className="section">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="card">
              <div className="">
                <div className="box-body">
                  <div className="">
                    <h2>Enter New Client</h2>
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
                            <div className="col-md-6">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.first_name && errors.first_name
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="first_name"
                                  placeholder="Enter first name"
                                  name="first_name"
                                />
                                <label htmlFor="first_name">FIRST NAME</label>
                                <ErrorMessage
                                  name="first_name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.last_name && errors.last_name
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="last_name"
                                  placeholder="Enter last name"
                                  name="last_name"
                                />
                                <label htmlFor="last_name">LAST NAME</label>
                                <ErrorMessage
                                  name="last_name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.x_ray_status && errors.x_ray_status
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="x_ray_status"
                                  name="x_ray_status"
                                >
                                  <option value="PENDING">PENDING</option>
                                  <option value="DONE">DONE</option>
                                </Field>
                                <label htmlFor="x_ray_status">
                                  X RAY STATUS
                                </label>
                                <ErrorMessage
                                  name="x_ray_status"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.company_id && errors.company_id
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="company_id"
                                  name="company_id"
                                >
                                  <option value="">Select a company</option>
                                  {companies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                      {company.company_name}
                                    </option>
                                  ))}
                                </Field>
                                <label htmlFor="company_id">COMPANY NAME</label>
                                <ErrorMessage
                                  name="company_id"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.gender && errors.gender
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="gender"
                                  name="gender"
                                >
                                  <option value="">Select Gender</option>
                                  <option value="MALE">Male</option>
                                  <option value="FEMALE">Female</option>
                                </Field>
                                <label htmlFor="gender">GENDER</label>
                                <ErrorMessage
                                  name="gender"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.employee_number &&
                                    errors.employee_number
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="employee_number"
                                  placeholder="Enter Employee Number"
                                  name="employee_number"
                                />
                                <label htmlFor="employee_number">
                                  EMPLOYEE NUMBER
                                </label>
                                <ErrorMessage
                                  name="employee_number"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className="form-select"
                                  id="id_type"
                                  name="id_type"
                                >
                                  <option value="zimbabwean_id">
                                    Zimbabwean ID
                                  </option>
                                  <option value="international_id">
                                    International ID
                                  </option>
                                </Field>
                                <label htmlFor="id_type">ID TYPE</label>
                              </div>
                              <div className="separation-div"></div>
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.national_id && errors.national_id
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="national_id"
                                  placeholder="Enter national ID"
                                  name="national_id"
                                  onChange={(event) =>
                                    handleNationalIdChange(
                                      event,
                                      setFieldValue,
                                      values.id_type
                                    )
                                  }
                                />
                                <label htmlFor="national_id">NATIONAL ID</label>
                                <ErrorMessage
                                  name="national_id"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="phone_number">
                                  Phone Number:
                                </label>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <Field
                                      component="select"
                                      className={`form-control my-upload ${
                                        touched.country_code &&
                                        errors.country_code
                                          ? "error-input"
                                          : ""
                                      }`}
                                      id="country_code"
                                      name="country_code"
                                    >
                                      <option value="+263">+263</option>
                                      <option value="+263">+263</option>
                                    </Field>
                                  </div>
                                  <Field
                                    type="text"
                                    className={`form-control my-upload ${
                                      touched.phone_number &&
                                      errors.phone_number
                                        ? "error-input"
                                        : ""
                                    }`}
                                    id="phone_number"
                                    placeholder="Enter phone number"
                                    name="phone_number"
                                  />
                                </div>
                                <div>
                                  <ErrorMessage
                                    name="phone_number"
                                    component="div"
                                    className="text-danger"
                                  />
                                  <ErrorMessage
                                    name="country_code"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.exam_purpose && errors.exam_purpose
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="exam_purpose"
                                  name="exam_purpose"
                                >
                                  <option value="">
                                    Select Purpose of Exam
                                  </option>
                                  <option value="1">Pre-Placement</option>
                                  <option value="2">Periodical</option>
                                  <option value="3">
                                    Exit(Employment Termination)
                                  </option>
                                  <option value="4">
                                    Post(Employment Employment Follow Up)
                                  </option>
                                </Field>
                                <label htmlFor="exam_purpose">
                                  EXAM PURPOSE
                                </label>
                                <ErrorMessage
                                  name="exam_purpose"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  type="date"
                                  className={`form-control ${
                                    touched.date_of_birth &&
                                    errors.date_of_birth
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="date_of_birth"
                                  placeholder="Enter date of birth"
                                  name="date_of_birth"
                                />
                                <label htmlFor="date_of_birth">
                                  DATE OF BIRTH
                                </label>
                                <ErrorMessage
                                  name="date_of_birth"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.category && errors.category
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="category"
                                  name="category"
                                >
                                  <option value="">Select Category</option>
                                  <option value="1">City Of Harare</option>
                                  <option value="2">Pneumoconiosis</option>
                                  <option value="3">Industry/Security</option>
                                </Field>
                                <label htmlFor="date_of_birth">Category:</label>
                                <ErrorMessage
                                  name="category"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  className={`form-select ${
                                    touched.last_x_ray && errors.last_x_ray
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="last_x_ray"
                                  placeholder="(YYYY-MM) / (YYYY) "
                                  name="last_x_ray"
                                />
                                <label htmlFor="date_of_birth">
                                  Last Chest X-Ray: (YYYY-MM) / (YYYY)
                                </label>
                                <ErrorMessage
                                  name="last_x_ray"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          <div className="row checkbox-row mb-5">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="redirectAfterAdd"
                                checked={redirectToPatients}
                                onChange={(e) =>
                                  setRedirectToPatients(e.target.checked)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="redirectAfterAdd"
                              >
                                Redirect after adding a new attendee
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="continueAddingAttendees"
                                checked={continueAddingAttendees}
                                onChange={(e) =>
                                  setContinueAddingAttendees(e.target.checked)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="continueAddingAttendees"
                              >
                                Continue adding attendees
                              </label>
                            </div>
                          </div>

                          {loading ? (
                            <Loading />
                          ) : (
                            // <button
                            //   type="submit"
                            //   className="btn btn-primary mt-2"
                            //   disabled={isSubmitting}
                            //   onClick={handleSubmit}
                            // >
                            //   Save Attendee
                            // </button>
                            <SaveButton
                              text={"Save Attendee"}
                              onClick={handleSubmit}
                              disable={isSubmitting}
                            />
                          )}
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddAttendee;

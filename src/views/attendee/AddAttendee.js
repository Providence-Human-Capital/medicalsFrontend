import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import "./components-style/Attendee.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../../config";
import Loading from "../../components/loader/Loading";

const AddAttendee = () => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);

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
    company_id: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    national_id: "",
    phone_number: "",
    x_ray_status: "",
    exam_purpose: "",
    employee_number: "",
    country_code: "",
  };

  const validationSchema = yup.object().shape({
    company_id: yup.number().required("Please select a company"),
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    date_of_birth: yup.string().required("Date of birth is required"),
    gender: yup.string().required("Select your gender"),
    national_id: yup.string().required("Please enter the National Id"),
    country_code: yup.string().required("Select country code"),
    phone_number: yup.string().required("Please enter the Phone Number"),
    x_ray_status: yup.string().required("Please select the X ray Status"),
    exam_purpose: yup.string().required("Please select the Exam Purpose"),
    employee_number: yup.string().required("Employee Number is Required!"),
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

      resetForm();
      setRedirectBack(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (redirectBack) {
      navigate("/patients");
    } else {
      return;
    }
  }, [redirectBack]);

  return (
    <Fragment>
      <BreadCrumb title={"Add Attendee"} activeTab={"Add Attendee"} />
      <div className="row">
        <div className="col-xl-12 col-12">
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h2>Enter your Attendes details</h2>

                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ values, isSubmitting, handleSubmit, touched, errors }) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="first_name">First Name:</label>
                              <Field
                                type="text"
                                className={`form-control ${touched.first_name && errors.first_name ? 'error-input' : ''}`}
                                id="first_name"
                                placeholder="Enter first name"
                                name="first_name"
                              />
                              <ErrorMessage
                                name="first_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="last_name">Last Name:</label>
                              <Field
                                type="text"
                                className="form-control"
                                id="last_name"
                                placeholder="Enter last name"
                                name="last_name"
                              />
                              <ErrorMessage
                                name="last_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="x_ray_status">
                                X-ray Status:
                              </label>
                              <Field
                                as="select"
                                className="form-control"
                                id="x_ray_status"
                                name="x_ray_status"
                              >
                                <option value="">Select X-ray Status</option>
                                <option value="PENDING">PENDING</option>
                                <option value="DONE">DONE</option>
                              </Field>
                              <ErrorMessage
                                name="x_ray_status"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="company_id">Company Name:</label>
                              <Field
                                as="select"
                                className="form-control"
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
                              <ErrorMessage
                                name="company_id"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="gender">Gender:</label>
                              <Field
                                as="select"
                                className="form-control"
                                id="gender"
                                name="gender"
                              >
                                <option value="">Select Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                              </Field>
                              <ErrorMessage
                                name="gender"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="employee_number">
                                Employee Number:
                              </label>
                              <Field
                                type="text"
                                className="form-control"
                                id="employee_number"
                                placeholder="Enter Employee Number"
                                name="employee_number"
                              />
                              <ErrorMessage
                                name="employee_number"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="national_id">National ID:</label>
                              <Field
                                type="text"
                                className="form-control"
                                id="national_id"
                                placeholder="Enter national ID"
                                name="national_id"
                              />
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
                                    className="form-control"
                                    id="country_code"
                                    name="country_code"
                                  >
                                    <option value="+263">+263</option>
                                    <option value="+263">+263</option>
                                  </Field>
                                </div>
                                <Field
                                  type="text"
                                  className="form-control"
                                  id="phone_number"
                                  placeholder="Enter phone number"
                                  name="phone_number"
                                />
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
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exam_purpose">
                                Exam Purpose:
                              </label>
                              <Field
                                as="select"
                                className="form-control"
                                id="exam_purpose"
                                name="exam_purpose"
                              >
                                <option value="">Select Purpose of Exam</option>
                                <option value="1">Pre-Placement</option>
                                <option value="2">Periodical</option>
                                <option value="3">
                                  Exit(Employment Termination)
                                </option>
                                <option value="4">
                                  Post(Employment Employment Follow Up)
                                </option>
                              </Field>
                              <ErrorMessage
                                name="exam_purpose"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="date_of_birth">
                                Date of Birth:
                              </label>
                              <Field
                                type="date"
                                className="form-control"
                                id="date_of_birth"
                                placeholder="Enter date of birth"
                                name="date_of_birth"
                              />
                              <ErrorMessage
                                name="date_of_birth"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>

                        {loading ? (
                          <Loading />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                          >
                            Save Attendee
                          </button>
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
    </Fragment>
  );
};

export default AddAttendee;

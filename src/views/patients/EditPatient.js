import React, { Fragment, useEffect, useState } from "react";
import Layout from "../../core/Layout";
import BreadCrumb from "../../components/BreadCrumb";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../components/loader/Loading";
import { API } from "../../config";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const EditPatient = () => {
  const { patientId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const companies = useSelector((state) => state.company.companies);

  const { data: attendeeData, isLoading: isFetching } = useQuery({
    queryKey: ["attendee", patientId],
    queryFn: async () => {
      const response = await fetch(`${API}/attendee/${patientId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch attendee data");
      }
      return response.json();
    },
  });

  const attendee = attendeeData?.data || {};

  const updateAttendeeMutation = useMutation({
    mutationFn: async (values) => {
      const response = await fetch(`${API}/attendee/update/${patientId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to update attendee");
      }
      return response.json();
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Client update was successful!!!",
        timer: 4000,
        confirmButtonColor: "#007a41",
      });
      navigate("/patients");
    },
    onError: (error) => {
      Swal.fire("Something went wrong!", error.message, "error");
    },
  });

  const handleUpdateSubmit = (values) => {
    updateAttendeeMutation.mutate(values);
  };

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    national_id: yup.string().required("National ID is required"),
    phone_number: yup.string().required("Phone number is required"),
    company_id: yup.number().required("Company is required"),
  });

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Fragment>
      <BreadCrumb title={"Edit Patient"} activeTab={"Edit Patient"} />
      <div className="section">
        <div className="row">
          <div className="col-xl-12 col-12" style={{ padding: "20px" }}>
            <div className="box" style={{ padding: "20px" }}>
              <div className="box-body">
                <div className="">
                  <h4
                    style={{ textTransform: "uppercase", fontWeight: "bold" }}
                  >
                    Update Clients Information
                  </h4>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      first_name: attendee.first_name,
                      last_name: attendee.last_name,
                      x_ray_status: attendee.x_ray_status,
                      company_id: attendee.company ? attendee.company.id : "",
                      gender: attendee.gender,
                      employee_number: attendee.employee_number,
                      national_id: attendee.national_id,
                      phone_number: attendee.phone_number,
                      date_of_birth: attendee.date_of_birth,
                      exam_purpose: attendee.exam_purpose,
                      category: attendee.category,
                      last_x_ray: attendee.last_x_ray,
                      attendance_day: attendee.latest_certificate?.created_at,
                    }}
                    onSubmit={handleUpdateSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ values, isSubmitting, handleSubmit }) => (
                      <Form>
                        <div className="row">
                          <div
                            className="col-md-6"
                            style={{ marginBottom: "20px" }}
                          >
                            <div className="form-floating">
                              <Field
                                type="date"
                                className={`form-control `}
                                id="attendance_day"
                                placeholder="Date of Attendance"
                                name="attendance_day"
                              />
                              <label htmlFor="attendance_day">
                                DATE OF ATTENDANCE
                              </label>
                              <ErrorMessage
                                name="attendance_day"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-floating">
                              <Field
                                type="text"
                                className={`form-control`}
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
                                className={`form-control `}
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
                                className={`form-select`}
                                id="x_ray_status"
                                name="x_ray_status"
                              >
                                <option value="">{values.x_ray_status}</option>
                                <option value="PENDING">PENDING</option>
                                <option value="DONE">DONE</option>
                              </Field>
                              <label htmlFor="x_ray_status">X RAY STATUS</label>
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
                                className={`form-select `}
                                id="company_id"
                                name="company_id"
                              >
                                {attendee.company ? (
                                  <option value="">
                                    {attendee.company.company_name}
                                  </option>
                                ) : null}

                                {companies.map((company) => (
                                  <option key={company.id} value={company.id}>
                                    {company.company_name.toUpperCase()}
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
                                className={`form-select`}
                                id="gender"
                                name="gender"
                              >
                                <option value="">{values.gender}</option>
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
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
                                className={`form-control `}
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
                                type="text"
                                className={`form-control `}
                                id="national_id"
                                placeholder="Enter national ID"
                                name="national_id"
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
                            <div className="form-floating">
                              <Field
                                type="text"
                                className={`form-control`}
                                id="phone_number"
                                placeholder="Enter phone number"
                                name="phone_number"
                              />
                              <label htmlFor="phone_number">PHONE NUMBER</label>
                              <ErrorMessage
                                name="phone_number"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="separation-div"></div>
                        <div className="row">
                          <div className="col-md-3">
                            <div className="form-floating">
                              <Field
                                as="select"
                                className={`form-select `}
                                id="exam_purpose"
                                name="exam_purpose"
                              >
                                <option value="">{values.exam_purpose}</option>
                                <option
                                  value="2"
                                  style={{ textTransform: "uppercase" }}
                                >
                                  Periodical
                                </option>
                              </Field>
                              <label htmlFor="exam_purpose">EXAM PURPOSE</label>
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
                                className={`form-control `}
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
                                className={`form-select`}
                                id="category"
                                name="category"
                              >
                                <option value="">{values.category}</option>
                                <option
                                  value="Food Handler (COH)"
                                  style={{ textTransform: "uppercase" }}
                                >
                                  Food Handler
                                </option>
                                <option
                                  value="Pneumoconiosis"
                                  style={{ textTransform: "uppercase" }}
                                >
                                  Pneumoconiosis
                                </option>
                                <option
                                  value="Pre-Employement"
                                  style={{ textTransform: "uppercase" }}
                                >
                                  Pre-Employment
                                </option>
                                <option
                                  value="Exit-Pneumoconiosis"
                                  style={{ textTransform: "uppercase" }}
                                >
                                  Exit (Pneumoconiosis)
                                </option>
                                <option
                                  value="Exit-Employement"
                                  style={{ textTransform: "uppercase" }}
                                >
                                  Exit-Employement
                                </option>
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
                                className={`form-select`}
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
                        {loading ? (
                          <Loading />
                        ) : (
                          <button
                            className="btn btn-primary"
                            type="submit"
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: "500",
                            }}
                          >
                            UPDATE PATIENT
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

export default EditPatient;

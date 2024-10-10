import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";
import BreadCrumb from "../../../components/BreadCrumb";
import { API } from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Form validation schema using Yup
const bookingValidationSchema = Yup.object().shape({
  company_id: Yup.number().nullable(),
  employee_number: Yup.string().nullable(),
  first_name: Yup.string().required("First name is required").max(255),
  last_name: Yup.string().required("Last name is required").max(255),
  date_of_birth: Yup.date().nullable(),
  gender: Yup.string().nullable().max(10),
  national_id: Yup.string().nullable().max(255),
  phone_number: Yup.string().nullable().max(15),
  exam_purpose: Yup.string().nullable().max(255),
  category: Yup.string().nullable().max(255),
  x_ray_status: Yup.string().nullable().max(255),

  last_x_ray: Yup.string().nullable().max(255),
  booking_date: Yup.date().nullable(),
});

// Function to send POST request to the API
const addBooking = async (formData) => {
  const response = await fetch(`${API}/booking`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }
  return response.json();
};

const AddBooking = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const companies = useSelector((state) => state.company.companies);

  // Mutation to handle form submission using react-query
  const mutation = useMutation(addBooking, {
    onSuccess: (data) => {
      // Show success alert on successful booking
      Swal.fire("Success!", "Booking created successfully!", "success");
      queryClient.invalidateQueries("bookings");

      navigate("/booking");
    },
    onError: (error) => {
      // Show error alert if booking fails
      Swal.fire("Error!", error.message, "error");
    },
  });

  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      company_id: "",
      employee_number: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      national_id: "",
      phone_number: "",
      exam_purpose: "",
      category: "",
      x_ray_status: "N/A",

      last_x_ray: "N/A",
      booking_date: "",
    },
    validationSchema: bookingValidationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <>
      <BreadCrumb activeTab={"BOOKING"} title={"ADD BOOKING"} />
      <section className="content">
        <div className="row">
          <div className="mt-4">
            <div className="card">
              <div className="card-body">
                <Link to={"/booking/upload"} className="btn btn-primary mb-5">
                  <i className="fas fa-plus ml-2"></i>
                  ADD BOOKING USING CSV
                </Link>
                <h4 className="mb-4">
                  <strong>ADD MEDICAL BOOKING</strong>
                </h4>

                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3 form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                          placeholder="First Name"
                          onChange={formik.handleChange}
                          value={formik.values.first_name}
                        />
                        <label htmlFor="first_name">First Name</label>
                        {formik.touched.first_name &&
                        formik.errors.first_name ? (
                          <div className="text-danger">
                            {formik.errors.first_name}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="last_name"
                          name="last_name"
                          placeholder="Last Name"
                          onChange={formik.handleChange}
                          value={formik.values.last_name}
                        />
                        <label htmlFor="last_name">Last Name</label>
                        {formik.touched.last_name && formik.errors.last_name ? (
                          <div className="text-danger">
                            {formik.errors.last_name}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="separation-div"></div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3 form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="national_id"
                          name="national_id"
                          placeholder="National ID"
                          onChange={formik.handleChange}
                          value={formik.values.national_id}
                        />
                        <label htmlFor="national_id">National ID</label>
                        {formik.touched.national_id &&
                        formik.errors.national_id ? (
                          <div className="text-danger">
                            {formik.errors.national_id}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 form-floating">
                        <input
                          type="date"
                          className="form-control"
                          id="date_of_birth"
                          name="date_of_birth"
                          placeholder="Date of Birth"
                          onChange={formik.handleChange}
                          value={formik.values.date_of_birth}
                        />
                        <label htmlFor="date_of_birth">Date of Birth</label>
                        {formik.touched.date_of_birth &&
                        formik.errors.date_of_birth ? (
                          <div className="text-danger">
                            {formik.errors.date_of_birth}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 form-floating">
                        <select
                          className="form-select"
                          id="gender"
                          name="gender"
                          onChange={formik.handleChange}
                          value={formik.values.gender}
                        >
                          <option value="">Select Gender</option>{" "}
                          {/* Placeholder option */}
                          <option value="MALE">MALE</option>
                          <option value="FEMALE">FEMALE</option>
                          <option value="OTHER">OTHER</option>
                        </select>
                        <label htmlFor="gender">Gender</label>
                        {formik.touched.gender && formik.errors.gender ? (
                          <div className="text-danger">
                            {formik.errors.gender}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="separation-div"></div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3 form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="phone_number"
                          name="phone_number"
                          placeholder="Phone Number"
                          onChange={formik.handleChange}
                          value={formik.values.phone_number}
                        />
                        <label htmlFor="phone_number">Phone Number</label>
                        {formik.touched.phone_number &&
                        formik.errors.phone_number ? (
                          <div className="text-danger">
                            {formik.errors.phone_number}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 form-floating">
                        <select
                          className="form-select"
                          id="company_id"
                          name="company_id"
                          onChange={formik.handleChange}
                          value={formik.values.company_id}
                        >
                          <option value=""></option>
                          {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                              {company.company_name.toUpperCase()}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="company_id">COMPANY</label>
                        {formik.touched.company_id &&
                        formik.errors.company_id ? (
                          <div className="text-danger">
                            {formik.errors.company_id}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="separation-div"></div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3 form-floating">
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                          onChange={formik.handleChange}
                          value={formik.values.category}
                        >
                          <option value=""></option>
                          <option
                            value="Food Handler (COH)"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            Food Handler
                          </option>
                          <option
                            value="Pneumoconiosis"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            Pneumoconiosis
                          </option>
                          <option
                            value="Pre-Employement"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            Pre-Employment
                          </option>
                          <option
                            value="Exit-Pneumoconiosis"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            Exit (Pneumoconiosis)
                          </option>
                          <option
                            value="Exit-Employement"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            Exit-Employement
                          </option>
                        </select>
                        <label htmlFor="category">Category</label>
                        {formik.touched.category && formik.errors.category ? (
                          <div className="text-danger">
                            {formik.errors.category}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3 form-floating">
                        <select
                          className="form-select"
                          id="exam_purpose"
                          name="exam_purpose"
                          onChange={formik.handleChange}
                          value={formik.values.exam_purpose}
                        >
                          <option value="">Select Exam Purpose</option>{" "}
                          {/* Placeholder option */}
                          <option value="2">Periodical</option>
                          {/* <option value="Pre-employment">Pre-employment</option>
                          <option value="Annual">Annual</option>
                          <option value="Return-to-work">Return-to-work</option>
                          <option value="Other">Other</option>{" "} */}
                          {/* Add more options as needed */}
                        </select>
                        <label htmlFor="exam_purpose">Exam Purpose</label>
                        {formik.touched.exam_purpose &&
                        formik.errors.exam_purpose ? (
                          <div className="text-danger">
                            {formik.errors.exam_purpose}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3 form-floating">
                        <select
                          className="form-select"
                          id="x_ray_status"
                          name="x_ray_status"
                          onChange={formik.handleChange}
                          value={formik.values.x_ray_status}
                        >
                          <option value="">Select X-ray Status</option>{" "}
                          {/* Placeholder option */}
                          <option value="PENDING">PENDING</option>
                          <option value="DONE">DONE</option>
                        </select>
                        <label htmlFor="x_ray_status">X-ray Status</label>
                        {formik.touched.x_ray_status &&
                        formik.errors.x_ray_status ? (
                          <div className="text-danger">
                            {formik.errors.x_ray_status}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3 form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="last_x_ray"
                          name="last_x_ray"
                          placeholder="Last X-ray"
                          onChange={formik.handleChange}
                          value={formik.values.last_x_ray}
                        />
                        <label htmlFor="last_x_ray">Last X-ray</label>
                        {formik.touched.last_x_ray &&
                        formik.errors.last_x_ray ? (
                          <div className="text-danger">
                            {formik.errors.last_x_ray}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="separation-div"></div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3 form-floating">
                        <input
                          type="date"
                          className="form-control"
                          id="booking_date"
                          name="booking_date"
                          placeholder="Booking Date"
                          onChange={formik.handleChange}
                          value={formik.values.booking_date}
                        />
                        <label htmlFor="booking_date">Booking Date</label>
                        {formik.touched.booking_date &&
                        formik.errors.booking_date ? (
                          <div className="text-danger">
                            {formik.errors.booking_date}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Submitting...
                      </>
                    ) : (
                      "Submit Booking"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddBooking;

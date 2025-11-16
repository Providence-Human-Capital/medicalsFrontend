import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "react-query";
import BreadCrumb from "../../../components/BreadCrumb";
import { API } from "../../../config";
import { Link, useNavigate } from "react-router-dom";

// -------- Validation --------
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

// -------- API helpers --------
const addBooking = async (formData) => {
  const res = await fetch(`${API}/booking`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    let msg = "Failed to create booking";
    try {
      const j = await res.json();
      if (j?.message) msg = j.message;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
};

const fetchCompanies = async () => {
  const res = await fetch(`${API}/company`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    let msg = "Failed to load companies";
    try {
      const j = await res.json();
      if (j?.message) msg = j.message;
    } catch {}
    throw new Error(msg);
  }
  const json = await res.json();
  // supports either { data: [...] } or a bare array
  return Array.isArray(json) ? json : json?.data ?? [];
};

const AddBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Companies fetched here (no Redux)
  const {
    data: companies = [],
    isLoading: companiesLoading,
    isError: companiesError,
    error: companiesErrorObj,
    refetch: refetchCompanies,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    staleTime: 10 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Create booking mutation
  const mutation = useMutation(addBooking, {
    onSuccess: () => {
      Swal.fire("Success!", "Booking created successfully!", "success");
      queryClient.invalidateQueries("bookings");
      navigate("/booking");
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error?.message || "Failed to create booking",
        "error"
      );
    },
  });

  // Formik
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
      const payload = {
        ...values,
        company_id:
          values.company_id === "" || values.company_id === null
            ? null
            : Number(values.company_id),
      };
      mutation.mutate(payload);
    },
  });

  return (
    <>
      <BreadCrumb activeTab={"BOOKING"} title={"ADD BOOKING"} />
      <section className="content">
        <div className="row">
          <div className="mt-4">
            <div style={{
              padding: "1rem",
              margin: '1rem'
            }}>
              <Link to={"/booking/upload"} className="btn btn-primary">
                UPLOAD MULTIPLE BOOKINGS
              </Link>
            </div>
            <div className="card">
              <div className="card-body">
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
                          <option value="">Select Gender</option>
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

                    {/* COMPANY SELECT with explicit loading/error states */}
                    <div className="col-md-6">
                      <div className="mb-3 form-floating">
                        <select
                          className="form-select"
                          id="company_id"
                          name="company_id"
                          onChange={(e) => {
                            const v = e.target.value;
                            formik.setFieldValue(
                              "company_id",
                              v === "" ? "" : Number(v)
                            );
                          }}
                          value={formik.values.company_id}
                          disabled={companiesLoading}
                        >
                          {companiesLoading && (
                            <option value="">Loading companies…</option>
                          )}
                          {companiesError && (
                            <option value="">
                              {companiesErrorObj?.message ||
                                "Failed to load companies"}
                            </option>
                          )}
                          {!companiesLoading && !companiesError && (
                            <>
                              <option value="">Select Company</option>
                              {companies.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {(c.company_name || c.name || "")
                                    .toString()
                                    .toUpperCase()}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                        <label htmlFor="company_id">COMPANY</label>

                        {/* Retry if failed */}
                        {companiesError && (
                          <div className="mt-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => refetchCompanies()}
                            >
                              Retry loading companies
                            </button>
                          </div>
                        )}

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
                          <option value="Food Handler (COH)">
                            Food Handler
                          </option>
                          <option value="Pneumoconiosis">Pneumoconiosis</option>
                          <option value="Pre-Employement">
                            Pre-Employment
                          </option>
                          <option value="Exit-Pneumoconiosis">
                            Exit (Pneumoconiosis)
                          </option>
                          <option value="Exit-Employement">
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
                          <option value="">Select Exam Purpose</option>
                          <option value="2">Periodical</option>
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
                          <option value="">Select X-ray Status</option>
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

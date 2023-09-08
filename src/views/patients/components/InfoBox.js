import React, { Fragment, useEffect, useState } from "react";
import { formatDate } from "../../../utils/dateConverter";
import styles from "../patient-css/styles.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { options } from "../../../utils/dateConverter";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./InfoBox.css";
import { API } from "../../../config";
import Loading from "../../../components/loader/Loading";
import HygieneForm from "../forms/HygieneForm";
import SwabForm from "../forms/SwabForm";

const InfoBox = ({ patient }) => {
  const patientsRemarks = useSelector((state) => state.forms.fPatientRemarks);
  const [updating, setUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const initialValues = {
    department: "",
    sub_company: "",
  };

  const validationSchema = yup.object().shape({
    department: yup.string().nullable(),
    sub_company: yup.string().nullable(),
  });

  const patientId = patient.id;

  const onSubmit = async (formData) => {
    console.log("FormData", formData);
    try {
      setUpdating(true);
      const response = await fetch(
        `${API}/patient/update/department/${patientId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setUpdating(false);
      }
    } catch (error) {
      console.error("Error Messsage", error);
      setUpdating(false);
    }
  };

  return (
    <Fragment>
      <div className="box">
        <div className="container">
          <div
            className="mt-3"
            style={{
              margin: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <a
                data-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="advanced"
                style={{
                  fontWeight: "bold",
                }}
              >
                ADD HYGIENE DETAILS <i className="fa fa-angle-down"></i>
              </a>
              {patient?.category === "City Of Harare" && (
                <a
                  data-toggle="collapse"
                  href="#collapseSwab"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseSwab"
                  className="advanced"
                  style={{ fontWeight: "bold" }}
                >
                  ADD SWAB DETAILS <i className="fa fa-angle-down"></i>
                </a>
              )}

              {patient?.category === "In House" && (
                <a
                  data-toggle="collapse"
                  href="#collapseSwab"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseSwab"
                  className="advanced"
                  style={{ fontWeight: "bold" }}
                >
                  ADD SWAB DETAILS <i className="fa fa-angle-down"></i>
                </a>
              )}
            </div>
            <div className="separation-div"></div>
            <div className="collapse" id="collapseExample">
              <div className="">
                <HygieneForm />
              </div>
            </div>
            <div className="collapse" id="collapseSwab">
              <div className="">
                <SwabForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box bg-bubbles-white">
        <div
          className={`box-body text-end min-h-150 ${styles["my-component"]}`}
        ></div>
        <div className="box-body wed-up position-relative">
          <div className="d-md-flex align-items-center">
            <div>
              <div className="image-container">
                <img
                  src={selectedImage || "/assets/images/avatar/2.jpg"}
                  className="bg-success-light rounded50 square-image"
                  alt=""
                  style={{
                    width: "200px",
                    borderRadius: "50%",
                  }}
                />
                <label
                  htmlFor="image-upload"
                  className="upload-button"
                  style={{
                    width: "200px",
                    borderRadius: "50%",
                  }}
                >
                  <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                </label>
              </div>
              <input
                type="file"
                id="image-upload"
                className="image-upload-input hide-input"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="text-center my-10">
                <p className="mb-0">Exam Purpose</p>
                <h4 className="badge badge-dark">{patient.exam_purpose}</h4>
              </div>
            </div>

            <div className="mt-40">
              <h4 className="fw-600 mb-5">
                {patient.attendee.first_name} {patient.attendee.last_name}
              </h4>
              <h5 className="fw-500 mb-5">{patient.attendee.national_id}</h5>
              <p>
                <i className="fa fa-clock-o"></i>{" "}
                {formatDate(patient.created_at, options)}
              </p>
            </div>
          </div>
          <div className="">
            <h5 className="fw-500">
              Gender:
              <span className="fw-200">
                {" "}
                {""}
                {patient.attendee.gender}
              </span>
            </h5>
            {patient.attendee.swab_number && (
              <h5 className="fw-500">
                Swab Number:
                <span className="fw-200">
                  {" "}
                  {""}
                  {patient.attendee.swab_number}
                </span>
              </h5>
            )}
            <h5 className="fw-500">
              X-Ray Status:{" "}
              {patient.attendee.x_ray_status === "PENDING" ? (
                <span className="fw-200 badge badge-danger">
                  {patient.attendee.x_ray_status}
                </span>
              ) : (
                <span className="fw-200 badge badge-success">
                  {patient.attendee.x_ray_status}
                </span>
              )}
            </h5>
            <h5 className="fw-500">
              Phone Number:{" "}
              <span className="fw-200 ">{patient.attendee.phone_number}</span>
            </h5>
          </div>
        </div>
        <div className="container">
          <div className="mt-3">
            <a
              data-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              className="advanced"
              style={{
                fontWeight: "bold",
              }}
            >
              ADD DEPARTMENT OR SUB COMPANY <i className="fa fa-angle-down"></i>
            </a>
            <div className="separation-div"></div>
            <div className="collapse" id="collapseExample">
              <div className="card card-body">
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
                                touched.department && errors.department
                                  ? "error-input"
                                  : ""
                              }`}
                              id="department"
                              placeholder="Enter department"
                              name="department"
                            />
                            <label htmlFor="department">DEPARTMENT</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <Field
                              type="text"
                              className={`form-control ${
                                touched.sub_company && errors.sub_company
                                  ? "error-input"
                                  : ""
                              }`}
                              id="sub_company"
                              placeholder="Enter SUB COMPANY"
                              name="sub_company"
                            />
                            <label htmlFor="sub_company">SUB COMPANY</label>
                          </div>
                        </div>
                        <div className="separation-div"></div>
                        {updating ? (
                          <Loading />
                        ) : (
                          <button
                            className="btn btn-success"
                            style={{
                              width: "fit-content",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              borderRadius: "10px",
                            }}
                            type="submit"
                            onClick={onSubmit}
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>

        {patientsRemarks && (
          <Fragment>
            <div className="box-body pt-0">
              <h4 className="fw-500">Doctor's Comment</h4>
              {patientsRemarks.comment ? (
                <p>{patientsRemarks.comment}</p>
              ) : (
                <p>No comment from the doctor yet.</p>
              )}
            </div>
            <div className="box-body pt-0">
              <h4 className="fw-500">General Observation</h4>
              {patient.general_observation ? (
                <p>{patient.general_observation}</p>
              ) : (
                <p>Now Observation's from the doctor yet.</p>
              )}
            </div>

            <div className="box-body pt-0">
              <h4 className="fw-500">Doctor's Remarks</h4>
              {patientsRemarks.remarks && patientsRemarks.remarks ? (
                <p>{patientsRemarks.remarks}</p>
              ) : (
                <p>No remarks from the doctor yet.</p>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default InfoBox;

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
     
      <div className="box bg-bubbles-white">
        <div
          className={`box-body text-end min-h-150 ${styles["my-component"]}`}
        ></div>
        <div className="box-body wed-up position-relative">
          <div className="d-md-flex align-items-center">
            <div>
              <div className="image-container">
                <img
                  src={selectedImage || "/medicals/assets/images/avatar/avatar12.jpg"}
                  // src={selectedImage || "/assets/images/avatar/2.jpg"}
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

        {patient.medical_record && (
          <Fragment>
            <div className="box-body pt-0">
              <h4 className="fw-500">Doctor's Comment</h4>
              {patient.medical_record.doctor_remarks && patient.medical_record.doctor_remarks.comment ? (
                <p
                  className="badge badge-primary"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {patient.medical_record.doctor_remarks.comment}
                </p>
              ) : (
                <p
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  No comment from the doctor yet.
                </p>
              )}
            </div>

            <div className="box-body pt-0">
              <h4 className="fw-500">Doctor's Remarks</h4>
              {patient.medical_record.doctor_remarks &&
              patient.medical_record.doctor_remarks.remarks ? (
                <p
                  className="badge badge-primary"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {patient.medical_record.doctor_remarks.remarks}
                </p>
              ) : (
                <p>No remarks from the doctor yet..</p>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default InfoBox;

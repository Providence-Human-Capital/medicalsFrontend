import React, { Fragment, useEffect, useState } from "react";
import { formatDate } from "../../../utils/dateConverter";
import styles from "../patient-css/styles.module.css";

import { options } from "../../../utils/dateConverter";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./InfoBox.css";

const InfoBox = ({ patient }) => {
  const patientsRemarks = useSelector((state) => state.forms.fPatientRemarks);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
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

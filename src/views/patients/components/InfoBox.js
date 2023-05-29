import React, { Fragment, useEffect } from "react";
import { formatDate } from "../../../utils/dateConverter";
import styles from "../patient-css/styles.module.css";

import { options } from "../../../utils/dateConverter";

const InfoBox = ({ patient }) => {
  return (
    <Fragment>
      <div className="box bg-bubbles-white">
        <div
          className={`box-body text-end min-h-150 ${styles["my-component"]}`}
        ></div>
        <div className="box-body wed-up position-relative">
          <div className="d-md-flex align-items-center">
            <div className="me-20 text-center text-md-start">
              <img
                src="/assets/images/avatar/2.jpg"
                className="bg-success-light rounded10"
                alt=""
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
                <i className="fa fa-clock-o"></i> { formatDate(patient.created_at, options)}
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
              <span className="fw-200 badge badge-danger">
                {patient.attendee.x_ray_status}
              </span>
            </h5>
            <h5 className="fw-500">
              Phone Number:{" "}
              <span className="fw-200 ">{patient.attendee.phone_number}</span>
            </h5>
          </div>
        </div>
        <div className="box-body pt-0">
          <h4 className="fw-500">Doctor's Comment</h4>
          {patient.comment ? (
            <p>{patient.comment}</p>
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
          {patient.remarks ? (
            <p>{patient.remarks}</p>
          ) : (
            <p>No remarks from the doctor yet.</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default InfoBox;

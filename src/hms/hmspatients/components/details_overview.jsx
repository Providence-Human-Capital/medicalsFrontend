import React, { useEffect } from "react";
import styles from "../../../views/patients/patient-css/styles.module.css";
import { formatDate, options } from "../../../utils/dateConverter";

const DetailsOverView = ({ patient }) => {
  return (
    <>
      <div className="box ">
        <div
          className={`box-body text-end min-h-150 ${styles["my-component2"]}`}
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
                <p
                  className="mb-0"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Account Ownership
                </p>
                <h4>
                  <span
                    className="badge badge-pill badge-info details_text"
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    {patient.role && patient.role.name}
                  </span>
                </h4>
              </div>
            </div>
            <div className="mt-40">
              <h4 className="fw-600 mb-5">
                {patient.first_name} {patient.last_name}
              </h4>
              <h5 className="fw-500 mb-5">
                <span
                  className="badge badge-success"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {patient.national_id}
                </span>
              </h5>
              {patient.created_at && (
                <p>
                  <i className="fa fa-clock-o"></i>{" "}
                  {formatDate(patient.created_at, options)}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="box-body pt-0">
          <div className=" col-xl-12">
            Marital Status:{" "}
            <span className="details_text">{patient.marital_status}</span>
          </div>
          <div className=" col-xl-12">
            Gender: <span className="details_text">{patient.gender}</span>
          </div>
          <div className=" col-xl-12">
            Home Address:{" "}
            <span className="details_text">{patient.home_address}</span>
          </div>
          <div className=" col-xl-12">
            Phone Number (s):{" "}
            <span className="details_text">
              {patient.phone_number} / {patient.phone_number_2}
            </span>
          </div>
          <div className=" col-xl-12">
            Medical Aid Number:{" "}
            <span className="details_text">
              {patient.medical_aid_number ? patient.medical_aid_number : "N/A"}
            </span>
          </div>
          <div className=" col-xl-12">
            Relation To Holder:{" "}
            <span className="badge badge-secondary details_text">
              {patient.relationship}
            </span>
          </div>

          <div className=" col-xl-12">
            Company / Employer :{" "}
            <span className="details_text">
              {" "}
              {patient.company ? patient.company.company_name.toUpperCase() : "N/A"}{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsOverView;

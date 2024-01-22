import React, { Fragment, useEffect, useState } from "react";
import "./Record.css";

const PrintMedicalRecord = ({ patient }) => {
  const record = {
    examDate: "20/01/2024",
  };
  return (
    <>
      <div className="record-container">
        <p
          style={{
            marginBottom: "0px",
          }}
        >
          <img
            src="/assets/images/providence.png"
            style={{
              height: "5rem",
            }}
          />
        </p>
        <p
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            marginTop: "-10px",
          }}
        >
          PERIODIC MEDICAL EXAMINATION RECORD
        </p>
        <p
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          <u>PATIENT DETAILS</u>
          <span style={{ float: "right" }}>
            DATE <span className="underline-span"> {record.examDate} </span>
          </span>
        </p>
        <p
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          NAME{" "}
          <span className="underline-span" style={{ width: "220px" }}>
            {patient.attendee.first_name}
          </span>
          <span
            className="surname-span"
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            SURNAME{" "}
            <span className="underline-span" style={{ width: "250px" }}>
              {patient.attendee.last_name}
            </span>
          </span>
          <span
            className="age-span"
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            AGE{" "}
            <span className="underline-span" style={{ width: "50px" }}>
              {patient.attendee.age}
            </span>
          </span>
        </p>
        <p
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          DATE OF BIRTH{" "}
          <span className="underline-span" style={{ width: "130px" }}>
            {patient.attendee.date_of_birth}
          </span>
          <span>
            SEX:
            <span className="underline-span" style={{ width: "100px" }}>
              {patient.attendee.gender}
            </span>
          </span>
          <span>
            CONTACT NUMBER
            <span className="underline-span" style={{ width: "150px" }}>
              {" "}
              {patient.attendee.phone_number}
            </span>
          </span>
        </p>
        <p
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          EMPLOYEE NO.{" "}
          <span className="underline-span" style={{ width: "80px" }}>
            {" "}
            {patient.attendee.employee_number}
          </span>
          <span>
            DIVISION/COMPANY{" "}
            <span className="underline-span" style={{ width: "160px" }}></span>{" "}
          </span>
          <span>
            ID NUMBER{" "}
            <span className="underline-span" style={{ width: "120px" }}>
              {" "}
              {patient.attendee.national_id}
            </span>{" "}
          </span>
        </p>

        <div className="illness section">
          <p
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            MEDICAL HISTORY
          </p>
        </div>
        <p>PATIENT ILLNESS HISTORY</p>
      </div>
    </>
  );
};

export default PrintMedicalRecord;

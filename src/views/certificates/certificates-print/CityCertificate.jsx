import React, { useState } from "react";
import "./CityCss.css";
import backgroundImage from "../../../assets/coat.png";

const CityCertificate = ({ examData, company, client, index }) => {
  const doctor = {
    name: "DR F MUSHAMBI",
    qualifications: "MD PHD (UNIVERSITY OF ALGIERS)",
    patient: {
      name: "TAFADZWA GASHIRA",
      company: "PROVIDENCE HUMAN CAPITAL"
    },
    date: {
      day: "05",
      month: "JANUARY 2023"
    }
  };

  return (
    <>
      <div className="image-container">
        <div className="certificate-container">
          <div className="top-section">
            <h3 style={{
              fontWeight: "bold",
            }}>City of Harare</h3>
            <h6>CITY HEALTH DEPT</h6>
          </div>
          <div className="second-section">
            <div className="row">
              <div className="grid-container">
                <div className="grid-section-1">
                  <p className="address">
                    All corespondence to be addressed to the
                  </p>
                  <p className="address">DIRECTOR OF HEALTH SERVICES</p>
                  <p className="address">P.O Box 569 Harare</p>
                  <p className="address">Telephone 753326, 753330/1/2</p>
                  <p className="address">Fax +263-4-752093</p>
                </div>
                <div className="grid-section-2">
                  <div className="float-right">
                    <p className="address2">Director of Health Services</p>
                    <p className="address2">Rowan Martin Bldg Civic Centre</p>
                    <p className="address2">Pennefather Avenue,</p>
                    <p className="address2">off Rotten Row</p>
                    <p className="address2">Harare, Zimbabwe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-section">
            <h2 className="header">
              PUBLIC HEALTH (MEDICAL EXAMINATIONS), (FOOD HANDLERS) ORDER, 1994
            </h2>
            <p className="header-section-p">
              (This form must be completed correctly and in BLOCK LETTERS)
            </p>
            <h5 className="header-section-h5">
              {" "}
              <span className="schedula">SCHEDULE</span> (Section3 (2) (a)){" "}
            </h5>
            <h2 className="header">MEDICAL CERTIFICATE</h2>
          </div>
          <div className="details-section">
            <p>
              I{" "}
              <span className="underline-span" style={{ width: "300px" }}>
                {doctor.name}
              </span>{" "}
              (full name) being a Registered Medical Practiober
            </p>
            <p>
              hereby certify that i have medically examined{" "}
              <span
                className="underline-span"
                style={{ width: "220px" }}
              ></span>{" "}
              (full name) on this{" "}
            </p>
            <p
              style={{
                marginBottom: "0px",
              }}
            >
              <span
                className="underline-span"
                style={{ width: "280px" }}
              ></span>{" "}
              day of{" "}
              <span
                className="underline-span"
                style={{ width: "220px" }}
              ></span>{" "}
              and state that:-{" "}
            </p>
            <p
              style={{
                marginTop: "-5px",
              }}
            >
              {" "}
              <span className="date-span">(Date)</span>{" "}
              <span className="month-span">(Month)</span>{" "}
            </p>

            <div className="info-section">
              <p>
                (1){" "}
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  I have cause him/her to undergo an X-Ray of the chest and
                  he/she is not suffering from Pulmonary{" "}
                  <span
                    style={{
                      marginLeft: "30px",
                    }}
                  >
                    Tuberculosis.
                  </span>
                </span>{" "}
              </p>

              <p>
                (2){" "}
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  I have satisfied myself Clinically that he/she is free from
                  any infectious disease.
                </span>
              </p>
              <p>
                (3){" "}
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  He/she is suffering from{" "}
                  <span
                    className="underline-span"
                    style={{ width: "220px" }}
                  ></span>{" "}
                  state disease and should not be <br />
                </span>{" "}
              </p>
              <p
                style={{
                  marginLeft: "30px",
                }}
              >
                {" "}
                employed for a period of{" "}
                <span
                  className="underline-span"
                  style={{ width: "200px" }}
                ></span>{" "}
                days{" "}
              </p>
            </div>
          </div>

          <div className="patial_details_stamp">
            <div className="details-grid">
              <div className="d-grid-1">
                <p>
                  {" "}
                  <span
                    className="underline-span"
                    style={{ width: "312px" }}
                  ></span>{" "}
                  (Signature)
                </p>
                <p>
                  {" "}
                  <span
                    className="underline-span"
                    style={{ width: "240px" }}
                  ></span>
                  (Name in block letters){" "}
                </p>
                <p>
                  <span
                    className="underline-span"
                    style={{ width: "280px" }}
                  ></span>
                  (Qualifications)
                </p>
                <p>
                  <span
                    className="underline-span"
                    style={{ width: "300px" }}
                  ></span>
                  (Designation)
                </p>
                <p>
                  <span
                    className="underline-span"
                    style={{ width: "320px" }}
                  ></span>
                  (Address)
                </p>
                <p>
                  <span
                    className="underline-span"
                    style={{ width: "340px" }}
                  ></span>
                  (Date)
                </p>
              </div>
              <div className="d-grid-2">
                <div className="stamp-pos">
                  <p className="stamp-p">IDENTIFICATION STAMP FOR CLINIC</p>
                  <p className="stamp-p">PRACTICE OR INSTITUTION REQUIRED</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          className="underline-span"
          style={{ width: "100vw",  }}
        ></p>
        <div className="bottom-section">
          <p>
            The name of the person being examined{" "}
            <span
              className="underline-span"
              style={{
                width: "390px",
              }}
            ></span>{" "}
          </p>
          <p>
            Company(Name){" "}
            <span
              className="underline-span"
              style={{
                width: "530px",
              }}
            ></span>{" "}
          </p>
         
          <p>
            Name of the Examiner
            <span
              className="underline-span"
              style={{
                width: "510px",
              }}
            ></span>{" "}
          </p>
          <p>
            Qualification
            <span
              className="underline-span"
              style={{
                width: "570px",
              }}
            ></span>{" "}
          </p>
          <p>
            Signature
            <span
              className="underline-span"
              style={{
                width: "260px",
              }}
            ></span>{" "}
            Date{" "}
            <span
              className="underline-span"
              style={{
                width: "290px",
               

              }}
            ></span>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default CityCertificate;

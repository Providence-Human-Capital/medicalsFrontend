import React, { useEffect, useState } from "react";

const ReferralLetterPrint = ({ patient, vitals }) => {
  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const [currentDate, setCurrentDate] = useState(null);
  useEffect(() => {
    const currentDate = getCurrentDate();
    setCurrentDate(currentDate);
  }, []);
  return (
    <>
      <div
        style={{
          margin: "5rem",
        }}
      >
        <div style={{ clear: "both" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                marginBottom: "0pt",
                textAlign: "right",
                lineHeight: "115%",
                fontSize: "8pt",
              }}
            >
              <img
                src="/assets/images/PHC_Logo.png"
                width={227}
                height={87}
                alt=""
                style={{
                  marginLeft: "-3rem",
                }}
              />
            </p>

            <div>
              <p
                style={{
                  marginBottom: "0pt",
                  textAlign: "right",
                  lineHeight: "0.5",
                  fontSize: "8pt",
                }}
              >
                PROVIDENCE HEALTH CENTRE
              </p>
              <p
                style={{
                  marginBottom: "0pt",
                  textAlign: "right",
                  lineHeight: "0.5",
                  fontSize: "8pt",
                }}
              >
                MEDICAL CENTRE
              </p>
              <p
                style={{
                  marginBottom: "0pt",
                  textAlign: "right",
                  lineHeight: "0.5",
                  fontSize: "8pt",
                }}
              >
                52 BAINES,SUITE 32
              </p>
              <p
                style={{
                  marginBottom: "0pt",
                  textAlign: "right",
                  lineHeight: "0.5",
                  fontSize: "8pt",
                }}
              >
                THIRD FLOOR
              </p>
              <p
                style={{
                  marginBottom: "0pt",
                  textAlign: "right",
                  lineHeight: "0.5",
                  fontSize: "8pt",
                }}
              >
                HARARE
              </p>
              <p
                style={{
                  marginBottom: "0pt",
                  textAlign: "right",
                  lineHeight: "0.5",
                  fontSize: "8pt",
                }}
              >
                Phone:0242 792470
              </p>
            </div>
          </div>

          <p className="Header">
            <span
              style={{ display: "inline-block", fontWeight: "bold" }}
            ></span>
            REFERRAL NOTE
          </p>
        </div>
        <p style={{ lineHeight: "115%", fontSize: "11pt" }}>
          DATE:{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {" "}
            {currentDate}
          </span>
        </p>
        <p style={{ lineHeight: "115%", fontSize: "11pt" }}>
          TO 81 Baines Providence Clinic
        </p>
        <p
          style={{
            lineHeight: "115%",
            fontSize: "11pt",
            textTransform: "uppercase",
          }}
        >
          <u>RE: FROM MEDICAL EXAMINATIONS</u>
        </p>
        <p style={{ lineHeight: "115%", fontSize: "11pt" }}>&nbsp;</p>
        <p style={{ lineHeight: "115%", fontSize: "11pt" }}>
          Kindly assist Miss/Mrs /Mr{" "}
          <u
            style={{
              fontWeight: "bold",
            }}
          >
            {" "}
            {patient.attendee.first_name} {patient.attendee.last_name}
          </u>{" "}
          for further management.
        </p>
        <p style={{ lineHeight: "115%", fontSize: "11pt" }}>&nbsp;</p>
        <h4
          style={{
            fontSize: "11pt",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          <u>Referral Vitals</u>
        </h4>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th
                  className="bb-2"
                  style={{
                    fontSize: "11pt",
                  }}
                >
                  Date
                </th>
                <th
                  className="bb-2"
                  style={{
                    fontSize: "11pt",
                  }}
                >
                  Blood Pressure
                </th>
                <th
                  className="bb-2"
                  style={{
                    fontSize: "11pt",
                  }}
                >
                  Pulse
                </th>
                <th
                  className="bb-2"
                  style={{
                    fontSize: "11pt",
                  }}
                >
                  Temperature
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover-primary">
                <td>{currentDate}</td>
                <td>
                  <sup>{vitals.bp_sys}</sup> /<sub>{vitals.bp_dia} </sub>{" "}
                </td>
                <td> {vitals.pulse}</td>
                <td> {vitals.temp}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ lineHeight: "115%", fontSize: "8pt" }}>&nbsp;</p>
        <p style={{ lineHeight: "115%", fontSize: "8pt" }}>&nbsp;</p>
        <p style={{ lineHeight: "215%", fontSize: "11pt", fontWeight: "bold" }}>
          Comments: <u> {vitals.referral_comment}</u>
        </p>
        <p style={{ lineHeight: "115%", fontSize: "8pt" }}>&nbsp;</p>
        <p style={{ lineHeight: "115%", fontSize: "11pt", fontWeight: "bold" }}>
          Thank you
        </p>
        <p style={{ lineHeight: "115%", fontSize: "11pt" }}>&nbsp;</p>
        <p style={{ lineHeight: "115%", fontSize: "11pt", fontWeight: "bold" }}>
          Signed …………………………………………
        </p>
      </div>
    </>
  );
};

export default ReferralLetterPrint;

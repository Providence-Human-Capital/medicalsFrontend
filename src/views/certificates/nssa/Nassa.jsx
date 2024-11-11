import React, { useState } from "react";
import "./FitnessCertificateDocument.css";

// nssa_logo_
const Nassa = ({ company, person, index, doctor, other }) => {
  const [checkedStates, setCheckedStates] = useState({
    prePlacement: true,
    periodical: false,
    exit: false,
    followUp: false,
  });

  // Toggle checkbox function
  const toggleCheckbox = (name) => {
    setCheckedStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const dobDigits = person.date_of_birth.replace(/\D/g, "").split("");
  const gender = person.gender.toLowerCase();
  const isMale = gender === "male" || gender === "m";
  const isFemale = gender === "female" || gender === "f";


  return (
    <>
      {/* {JSON.stringify(other)} */}
      {/* {JSON.stringify(person)} */}
      <div className="fitness__form_ner">
        <div
          className="nssa_image"
          style={{
            alignContent: "center",
          }}
        >
          <img
            src="/medicals/assets/images/nssa_logo_.png"
            alt="NSSA Logo"
            style={{
              height: "6rem",
            }}
          />
        </div>

        <div className="bordered_container">
          <table className="custom-table">
            <tbody>
              {/* Rows 1 to 5 - Single column rows spanning the entire width */}
              <tr>
                <td
                  colSpan="2"
                  className="title-row"
                  style={{
                    textAlign: "start",
                    paddingTop: "10px",
                  }}
                >
                  <h2>APPLICATION FOR FITNESS CERTIFICATE</h2>
                  <p>
                    (Pneumoconiosis Statutory Medical Examinations:
                    Pneumoconiosis Act Chapter 15:08)
                  </p>
                </td>
              </tr>
              {/* <tr>
                <td colSpan="2" className="purpose-section">
                  <p
                    className="align-text"
                    style={{ fontSize: "10px", marginBottom: "2px" }}
                  >
                    Purpose of the Examination:
                  </p>
                  <div className="checkbox-group">
                    <div className="custom-checkbox">
                      <span></span>
                      <label>Pre-Placement</label>
                    </div>
                    <div className="custom-checkbox">
                      <span></span>
                      <label>Periodical</label>
                    </div>
                    <div className="custom-checkbox">
                      <span></span>
                      <label>Exit (Employment Termination)</label>
                    </div>
                    <div className="custom-checkbox">
                      <span></span>
                      <label>Post Employment Follow Up</label>
                    </div>
                  </div>
                  <div className="section-header"
                   style={{ margin: "14px -6px", paddingTop: "10px" }}
                  >
                    <span>SECTION A: EMPLOYER/OCCUPIER</span>
                    <span className="subtext">
                      (to be completed by employer)
                    </span>
                  </div>
                </td>
              </tr> */}
              <tr>
                <td colSpan="2" className="purpose-section">
                  <p
                    className="align-text"
                    style={{ fontSize: "10px", marginBottom: "2px" }}
                  >
                    Purpose of the Examination:
                  </p>
                  <div className="checkbox-group">
                    <div
                      className="custom-checkbox"
                      onClick={() => toggleCheckbox("prePlacement")}
                    >
                      <span>{checkedStates.prePlacement ? "✔" : ""}</span>
                      <label>Pre-Placement</label>
                    </div>
                    <div
                      className="custom-checkbox"
                      onClick={() => toggleCheckbox("periodical")}
                    >
                      <span>{checkedStates.periodical ? "✔" : ""}</span>
                      <label>Periodical</label>
                    </div>
                    <div
                      className="custom-checkbox"
                      onClick={() => toggleCheckbox("exit")}
                    >
                      <span>{checkedStates.exit ? "✔" : ""}</span>
                      <label>Exit (Employment Termination)</label>
                    </div>
                    <div
                      className="custom-checkbox"
                      onClick={() => toggleCheckbox("followUp")}
                    >
                      <span>{checkedStates.followUp ? "✔" : ""}</span>
                      <label>Post Employment Follow Up</label>
                    </div>
                  </div>
                  <div
                    className="section-header"
                    style={{ margin: "14px -6px", paddingTop: "10px" }}
                  >
                    <span>SECTION A: EMPLOYER/OCCUPIER</span>
                    <span className="subtext">
                      (to be completed by employer)
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "start",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      padding: "0px !important",
                      marginBottom: "3px",
                    }}
                  >
                    1. Details of person conducting the business or undertaking{" "}
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "start",
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Company/Organisation name:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {company?.company_name}
                    </span>
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: "20px",
                  }}
                ></td>
              </tr>

              {/* Rows 6 to 9 - Two columns, 50% width each */}
              <tr>
                <td className="half-width align-text">
                  <p
                    style={{
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Site Address:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {company?.address}
                    </span>
                  </p>
                </td>
                <td className="half-width"></td>
              </tr>
              <tr>
                <td className="half-width  align-text">
                  {" "}
                  <p
                    style={{
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Site Telephone:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {company?.site_telephone}
                    </span>
                  </p>
                </td>
                <td className="half-width align-text">
                  {" "}
                  <p
                    style={{
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Province:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {company?.province}
                    </span>
                  </p>
                </td>
              </tr>
              <tr>
                <td className="half-width align-text">
                  <p
                    style={{
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Contact Person:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {company?.contact_person}
                    </span>
                  </p>
                </td>
                <td className="half-width align-text">
                  <p
                    style={{
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Designation:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {company?.designation}
                    </span>
                  </p>
                </td>
              </tr>
              <tr>
                <td className="half-width align-text">
                  {" "}
                  <p
                    style={{
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Email Address:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {company?.company_email}
                    </span>
                  </p>
                </td>
                <td className="half-width align-text">
                  <p
                    style={{
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Contact Number:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {company?.contact_number}
                    </span>
                  </p>
                </td>
              </tr>

              {/* Row 10 - Single column row spanning the entire width */}
              <tr>
                <td colSpan="2" className="align-text">
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      padding: "0px !important",
                      marginBottom: "3px",
                    }}
                  >
                    2. Details of work environment{" "}
                  </p>
                </td>
              </tr>

              {/* Row 11 - Two columns, 50% width each */}
              <tr>
                {/* <td className="industry-classification half-width">
                  <p className="align-text" style={{ fontSize: "10px" }}>
                    Industry Classification:
                  </p>
                  <div className="checkbox-group">
                    <div className="custom-checkbox">
                      <span></span>
                      <label>
                        Mining (Specify Mineral){" "}
                        <span
                          className="italic-text"
                          style={{
                            display: "none",
                          }}
                        >
                          (Specify Mineral)
                        </span>{" "}
                        ..........................................
                      </label>
                    </div>
                    <div className="custom-checkbox">
                      <span></span>
                      <label>Quarrying,</label>
                    </div>
                    <div className="custom-checkbox">
                      <span></span>
                      <label>Manufacturing,</label>
                    </div>
                    <div className="custom-checkbox">
                      <span></span>
                      <label>Construction,</label>
                    </div>
                    <div className="custom-checkbox">
                      <span></span>
                      <label>Agriculture,</label>
                    </div>
                    <div className="custom-checkbox">
                      <span></span>
                      <label>
                        Other
                        ...........................................................
                      </label>
                    </div>
                  </div>
                </td> */}

                <td className="industry-classification half-width">
                  <p className="align-text" style={{ fontSize: "10px" }}>
                    Industry Classification:
                  </p>
                  <div className="checkbox-group">
                    <div className="custom-checkbox">
                      <span>{other.industryType === "mining" ? "✔" : ""}</span>
                      {other.mining_mineral ? (
                        <>
                          <label>
                            Mining (Specify Mineral){" "}
                            <p
                              className="italic-text"
                              style={{
                                display:
                                  other.industryType === "mining"
                                    ? "inline"
                                    : "none",
                              }}
                            >
                              {other.mining_mineral}
                            </p>{" "}
                          </label>
                        </>
                      ) : (
                        <>
                          <label>
                            Mining (Specify Mineral){" "}
                            ..........................................
                          </label>
                        </>
                      )}
                    </div>
                    <div className="custom-checkbox">
                      <span>
                        {other.industryType === "quarrying" ? "✔" : ""}
                      </span>
                      <label>Quarrying,</label>
                    </div>
                    <div className="custom-checkbox">
                      <span>
                        {other.industryType === "manufacturing" ? "✔" : ""}
                      </span>
                      <label>Manufacturing,</label>
                    </div>
                    <div className="custom-checkbox">
                      <span>
                        {other.industryType === "construction" ? "✔" : ""}
                      </span>
                      <label>Construction,</label>
                    </div>
                    <div className="custom-checkbox">
                      <span>
                        {other.industryType === "agriculture" ? "✔" : ""}
                      </span>
                      <label>Agriculture,</label>
                    </div>
                    <div className="custom-checkbox">
                      <span>{other.industryType === "other" ? "✔" : ""}</span>
                      <label>
                        Other
                        <p
                          className="italic-text"
                          style={{
                            display:
                              other.industryType === "other"
                                ? "inline"
                                : "none",
                            fontWeight: "bold",
                          }}
                        >
                          {other.other_description}
                        </p>{" "}
                        ...........................................................
                      </label>
                    </div>
                  </div>
                </td>

                <td className="mineral-dust-exposure half-width">
                  <p
                    className="align-text"
                    style={{ fontSize: "10px", marginBottom: "3px" }}
                  >
                    Which Mineral dust exposure is causing the <br /> health
                    Risk?
                  </p>
                  <div className="checkbox-group">
                    <div className="custom-checkbox">
                      <span>{other.healthRisk === "silica" ? "✔" : ""}</span>
                      <label>Silica</label>
                    </div>
                    <div className="custom-checkbox">
                      <span>{other.healthRisk === "coal" ? "✔" : ""}</span>
                      <label>Coal</label>
                    </div>
                    <div className="custom-checkbox">
                      <span>{other.healthRisk === "asbestos" ? "✔" : ""}</span>
                      <label>Asbestos</label>
                    </div>
                    {other.healthRisk === "other_health_risk" ? (
                      <>
                        <div className="custom-checkbox">
                          <span></span>
                          <label>
                            Other
                            <p>{other.other_health_risk}</p>
                          </label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="custom-checkbox">
                          <span></span>
                          <label>
                            Other
                            ...........................................................
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="align-text">
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      padding: "0px !important",
                      marginBottom: "3px",
                    }}
                  >
                    3. Details of control measures being implemented:{" "}
                  </p>
                </td>
              </tr>
              <tr>
                {/* wet_method
              containment
              monitoring
              ppe
              ppe_specify
              other_cm */}
                <td colSpan="2">
                  <div
                    className="checkbox-group"
                    style={{
                      paddingTop: "10px",
                    }}
                  >
                    <div className="custom-checkbox">
                      <span>
                        {other.controlMeasure === "wet_method" ? "✔" : ""}
                      </span>
                      <label>Use of wet method</label>
                    </div>
                    <div className="custom-checkbox">
                      <span>
                        {other.controlMeasure === "containment" ? "✔" : ""}
                      </span>
                      <label>Containment and ventilation</label>
                    </div>
                    <div className="custom-checkbox">
                      <span>
                        {other.controlMeasure === "monitoring" ? "✔" : ""}
                      </span>
                      <label>
                        Exposure monitoring (workplace dust level surveys)
                      </label>
                    </div>
                    <div className="custom-checkbox">
                      <span>{other.controlMeasure === "ppe" ? "✔" : ""}</span>
                      <label>PPE (Specify): {other.ppe_specify}</label>
                    </div>
                    <div className="custom-checkbox">
                      <span>
                        {other.controlMeasure === "other_cm" ? "✔" : ""}
                      </span>
                      <label>Other: {other.other_cm_specify}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <div
                    className="section-header"
                    style={{ margin: "14px -6px", paddingTop: "10px" }}
                  >
                    <span>SECTION B: WORKER</span>
                    <span className="subtext">(to be completed by worker)</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="align-text">
                  <p
                    style={{
                      fontSize: "12px",
                      marginBottom: "3px",
                    }}
                  >
                    1. Demographic Details
                  </p>
                </td>
              </tr>
              <tr className="remove-border-left">
                <td
                  className="half-width align-text"
                  style={{
                    border: "none !important",
                  }}
                >
                  <div className="name-field">
                    <span>Surname:</span>
                    <div className="name-line" style={{
                      fontWeight: "bold",
                    }}>{person?.surname}</div>
                  </div>
                </td>
                <td
                  className="half-width align-text"
                  style={{
                    border: "none !important",
                  }}
                >
                  <div className="name-field">
                    <span>First Name:</span>
                    <div className="name-line" style={{
                      fontWeight: "bold",
                    }}>{person?.first_name}</div>
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan="2" className="full-width-row">
                  <div className="row-content">
                    <p
                      style={{
                        marginBottom: "3px",
                        fontSize: "11px",
                      }}
                    >
                      {" "}
                      Date of birth:
                    </p>
                    {/* <div className="dob-boxes">
                      <span className="dob-box"></span>
                      <span className="dob-box"></span>
                      <span className="dob-box"></span>
                      <span className="dob-box"></span>
                      <span className="dob-box"></span>
                      <span className="dob-box"></span>
                      <span className="dob-box"></span>
                      <span className="dob-box"></span>
                    </div> */}
                    <div className="dob-boxes">
                      {dobDigits.map((digit, index) => (
                        <span key={index} className="dob-box" style={{
                          fontWeight: "bold"
                        }}>
                          {digit}
                        </span>
                      ))}
                    </div>
                    <p
                      className="sex-label"
                      style={{
                        marginBottom: "10px",
                        fontSize: "11px",
                      }}
                    >
                      Sex:
                    </p>
                    <div className="sex-options">
                      <label>Male</label>
                      <span className="sex-checkbox">{isMale ? "✔" : ""}</span>
                      <label>Female</label>
                      <span className="sex-checkbox">{isFemale ? "✔" : ""}</span>
                    </div>
                  </div>
                </td>
              </tr>

              {/* Row 12 - Two columns, 50% width each */}
              <tr>
                <td className="half-width align-text">
                  <p
                    style={{
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    National ID number: <span style={{
                      fontWeight: "bold"
                    }}>{ person?.national_id }</span>
                  </p>
                </td>
                <td className="half-width align-text">
                  <p
                    style={{
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Madical Bereau Number:
                  </p>
                </td>
              </tr>

              {/* Row 13 - Two columns, 50% width each */}
              <tr
                style={{
                  margin: "0px !important",
                }}
              >
                <td className="half-width align-text">
                  <p
                    style={{
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Contact Number: <span style={{
                      fontWeight: "bold"
                    }}>{person?.phone_number}</span>
                  </p>
                </td>
                <td className="half-width align-text"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Nassa;

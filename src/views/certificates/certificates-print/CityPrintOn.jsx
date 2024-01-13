import React from "react";
import "./PrintOn.css";

const CityPrintOn = ({ company, client, doctor, examData, index }) => {
  const testData = {
    doctor: {
      name: "DR F MUSHAMBI",
      qualifi: "MD (UNIVERSITY OF ALGIERS)",
      designation: "MD PHD",
    },
    clientInformation: {
      name: "TAFADZWA GASHIRA",
      company: {
        name: "PROVIDENCE HUMAN CAPITAL",
        address: "1 KENILWORTH ROAD, BLOCK D",
      },
    },
    examinationDate: {
      day: "06",
      monthYear: "JANUARY 2024",
    },
  };

  const getDate = (createdAt) => {
    const currentDate = new Date(createdAt);
    const dayNumber = currentDate.getDate();
    const monthYear =
      currentDate.toLocaleString("default", { month: "long" }) +
      " " +
      currentDate.getFullYear();

    return {
      dayNumber,
      monthYear,
    };
  };

  const createdAt = examData.exam_date;
  const date = getDate(createdAt);
  return (
    <>
      <div className="certi-container">
        <div
          className="first-section"
          style={{
            paddingTop: index === 0 ? "19.5rem" : "24rem",
          }}
        >
          <p className="f_doctor_name">{examData.examinerName}</p>
          <p className="f_patient_name">
            {client.first_name} {client.last_name}
          </p>
          <p className="f_date">
            {date.dayNumber}{" "}
            <span className="f_month_year">{date.monthYear}</span>{" "}
          </p>
        </div>
        <div className="second-section">
          <p className="s_patient_name">
            {" "}
            {client.first_name} {client.last_name}
          </p>
          <p className="s_doctors_qualif">{examData.qualifications}</p>
          <p className="s_designation">{examData.designation}</p>
          <p className="s_address">
            {examData.doc_address}
          </p>
          <p className="s_date">
            {date.dayNumber}{" "}
            <span className="s_month_year">{date.monthYear}</span>{" "}
          </p>
        </div>
        <div className="third-section">
          <p className="t_patient_name">
            {" "}
            {client.first_name} {client.last_name}
          </p>
          <p className="t_company_name">{company.company_name}</p>
          <p className="t_address">{company.address}</p>
          <p className="t_examiner">{examData.examinerName}</p>
          <p className="t_qualification">{examData.qualifications}</p>
          <p className="t_date">
            {date.dayNumber}{" "}
            <span className="t_month_year">{date.monthYear}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CityPrintOn;

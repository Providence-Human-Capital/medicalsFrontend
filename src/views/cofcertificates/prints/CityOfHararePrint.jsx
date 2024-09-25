import React from "react";
import './PrintOn.css'

const CityOfHararePrint = ({ doctor, client, index }) => {
  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber - 1];
  };

  const getDate = (dateString) => {
    const dateParts = dateString.split("/");
    const dayNumber = parseInt(dateParts[0]);
    const monthName = getMonthName(parseInt(dateParts[1]));
    const year = parseInt(dateParts[2]);
    const monthYear = `${monthName} ${year}`;

    return {
      dayNumber: dayNumber,
      monthYear: monthYear,
    };
  };

  const examDate = client.date_of_examination;
  const date = getDate(examDate);
  return (
    <>
      <div className="certi-container" >
        <div
          className="first-section"
        //   style={{
        //     paddingTop: index === 0 ? "19.5rem" : "24rem",
        //   }}
          // style={{
          //   paddingTop: index === 0 ? "20rem" : "23.8rem",
          // }}

          style={{
            paddingTop: index === 0 ? "19rem" : "22.8rem",
          }}
        >
          <p className="f_doctor_name">{doctor.examinerName}</p>
          <p className="f_patient_name">
            {client.first_name} {client.surname}
          </p>
          <p className="f_date">
            {date.dayNumber}{" "}
            <span className="f_month_year">{date.monthYear}</span>{" "}
          </p>
        </div>
        <div className="second-section">
          <p className="s_patient_name"> {doctor.examinerName}</p>
          <p className="s_doctors_qualif">{doctor.qualifications}</p>
          <p className="s_designation">{doctor.designation}</p>
          <p className="s_address">{doctor.doc_address}</p>
          <p className="s_date">
            {date.dayNumber}{" "}
            <span className="s_month_year">{date.monthYear}</span>{" "}
          </p>
        </div>
        <div className="third-section">
          <p className="t_patient_name">
            {" "}
            {client.first_name} {client.surname}
          </p>
          <p className="t_company_name">{client.company}</p>
          <p className="t_address" style={{
            color: "transparent"
          }}>ADDRESS</p>
          <p className="t_examiner">{doctor.examinerName}</p>
          <p className="t_qualification">{doctor.qualifications}</p>
          <p className="t_date">
            {date.dayNumber}{" "}
            <span className="t_month_year">{date.monthYear}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CityOfHararePrint;

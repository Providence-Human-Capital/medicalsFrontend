import React, { useEffect } from "react";
import "./Certificate.css";

function ProfessionalCertificatePrint({ company, doctor, person, index }) {
  // patient.created_at

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

  const createdAt = person.patient.created_at;
  const date = getDate(createdAt);
  useEffect(() => {}, []);

  return (
    <>
      <div
        style={{
          fontSize: "15px",
          marginLeft: "5rem",
          marginRight: "5rem",
        }}
      >
        {/* First Section Start */}
        <div
          className="first_section"
          style={{
            paddingTop: index === 0 ? "21rem" : "21rem",
          }}
        >
          <div className="first_section_doc">
            <p className="p_text"> {doctor.examinerName}</p>
          </div>
          <div className="first_section_emp_date">
            <div className="ss_container">
              <div className="ss_element">
                <p className="user_name_details p_text">
                  {person.patient.attendee.first_name} {person.patient.attendee.last_name}
                </p>
              </div>
              <div className="ss_element">
                <p className="overall_date p_text">
                  {date.dayNumber}
                  <span className="year_month">{date.monthYear}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* First Section End */}

        {/* Second Section Start */}
        <div className="second_section">
          <div className="second_section_user boder">
            <p className="ss_user_detaile p_text">
              {person.patient.attendee.first_name} {person.patient.attendee.last_name}
            </p>
          </div>
          <div className="second_section_company boder_company">
            <p className="ss_company p_text"> {company.company_name}</p>
          </div>
          <div className="second_section_company_add boder_company_add">
            <p className="ss_company_add p_text"> {company.address}</p>
          </div>
          <div className="second_section_doc boder_examiner">
            <p className="ss_doc p_text"> {doctor.examinerName}</p>
          </div>
          <div className="second_section_qualif boder_qualif">
            <p className="ss_qualif p_text"> {doctor.qualifications}</p>
          </div>
          <div className="second_section_exam_date boder">
            <p className="ss_exam_date p_text">
              {date.dayNumber}
              {"  "} {date.monthYear}
            </p>
          </div>
        </div>
        {/* Second Section End */}

        {/* Third Section Start */}
        <div className="third_section">
          <div className="third_section_user boder">
            <p className="ts_user_detaile p_text">
              {" "}
              {person.patient.attendee.first_name} {person.patient.attendee.last_name}
            </p>
          </div>
          <div className="third_section_company ts_border_cn">
            <p className="ts_company p_text">{company.company_name}</p>
          </div>
          <div className="third_section_company_add ts_boder_address">
            <p className="ts_company_add p_text">{company.address}</p>
          </div>
          <div className="third_section_doc boder">
            <p className="ts_doc p_text">{doctor.examinerName}</p>
          </div>
          <div className="third_section_qualif">
            <p className="ts_qualif p_text">{doctor.qualifications}</p>
          </div>
          <div className="third_section_exam_date boder">
            <p className="ts_exam_date p_text">
              {" "}
              {date.dayNumber}
              {"  "} {date.monthYear}
            </p>
          </div>
        </div>
        {/* Third Section End */}
      </div>
    </>
  );
}

export default ProfessionalCertificatePrint;

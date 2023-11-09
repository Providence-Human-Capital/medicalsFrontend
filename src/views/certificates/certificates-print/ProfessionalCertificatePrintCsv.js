import React from "react";
import "./Certificate.css";

const ProfessionalCertificatePrintCsv = ({
  examData,
  company,
  client,
  index,
}) => {
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
            <p> {examData.examinerName}</p>
          </div>
          <div className="first_section_emp_date">
            <div className="ss_container">
              <div className="ss_element">
                <p className="user_name_details">
                  {client.first_name} {client.last_name}
                </p>
              </div>
              <div className="ss_element">
                <p className="overall_date">
                  {date.dayNumber}
                  <span className="year_month"> {date.monthYear}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* First Section End */}

        {/* Second Section Start */}
        <div className="second_section">
          <div className="second_section_user boder">
            <p className="ss_user_detaile">
              {client.first_name} {client.last_name}
            </p>
          </div>
          <div className="second_section_company boder_company">
            <p className="ss_company"> {company.company_name}</p>
          </div>
          <div className="second_section_company_add boder_company_add">
            <p className="ss_company_add"> {company.address}</p>
          </div>
          <div className="second_section_doc boder_examiner">
            <p className="ss_doc"> {examData.examinerName}</p>
          </div>
          <div className="second_section_qualif boder_qualif">
            <p className="ss_qualif"> {examData.qualifications}</p>
          </div>
          <div className="second_section_exam_date boder">
            <p className="ss_exam_date">
              {date.dayNumber}
              {"  "} {date.monthYear}
            </p>
          </div>
        </div>
        {/* Second Section End */}

        {/* Third Section Start */}
        <div className="third_section">
          <div className="third_section_user boder">
            <p className="ts_user_detaile">
              {" "}
              {client.first_name} {client.last_name}
            </p>
          </div>
          <div className="third_section_company ts_border_cn">
            <p className="ts_company">{company.company_name}</p>
          </div>
          <div className="third_section_company_add ts_boder_address">
            <p className="ts_company_add">{company.address}</p>
          </div>
          <div className="third_section_doc boder">
            <p className="ts_doc">{examData.examinerName}</p>
          </div>
          <div className="third_section_qualif">
            <p className="ts_qualif">{examData.qualifications}</p>
          </div>
          <div className="third_section_exam_date boder">
            <p className="ts_exam_date">
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
};

export default ProfessionalCertificatePrintCsv;

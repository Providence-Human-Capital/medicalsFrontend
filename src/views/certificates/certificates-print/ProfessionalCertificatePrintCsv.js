import React from "react";
import "./Certificate.css";

const ProfessionalCertificatePrintCsv = ({ examData, company, client }) => {
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
          fontSize: "11pt",
          // height: "1025px",
        }}
      >
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>
          <span style={{ width: "9.6pt", display: "inline-block" }}>
            &nbsp;
          </span>
          <span style={{ width: "40.65pt", display: "inline-block" }}>
            &nbsp;
          </span>
        </p>
        <p style={{ lineHeight: "normal" }}>
          <span style={{ width: "57.6pt", display: "inline-block" }}>
            &nbsp;
          </span>
          <strong>
            <span
              style={{
                fontFamily: '"Cooper Black"',
                textTransform: "uppercase",
              }}
            >
              {examData.examinerName}
            </span>
          </strong>
        </p>
        <p style={{ lineHeight: "normal" }}>
          <strong>
            <span style={{ fontFamily: '"Cooper Black"' }}>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
            </span>
          </strong>
          <strong>
            <span
              style={{
                fontFamily: '"Cooper Black"',
                textTransform: "uppercase",
              }}
            >
              {client.first_name}
              {"  "} {client.last_name}
            </span>
          </strong>
          <strong>
            <span style={{ fontFamily: '"Cooper Black"' }}>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </strong>
          <strong>
            <span style={{ fontFamily: '"Cooper Black"' }}>
              {date.dayNumber}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </strong>
          <strong>
            <span
              style={{
                width: "47.56pt",
                fontFamily: '"Cooper Black"',
                display: "inline-block",
              }}
            >
              &nbsp;
            </span>
          </strong>
          <strong>
            <span
              style={{
                fontFamily: '"Cooper Black"',
                textTransform: "uppercase",
              }}
            >
              {date.monthYear}
            </span>
          </strong>
        </p>
        <p style={{ lineHeight: "normal" }}>
          <strong>
            <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;</span>
          </strong>
        </p>
        <p style={{ lineHeight: "normal" }}>
          <strong>
            <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;</span>
          </strong>
        </p>

        {/* This Is the Second Section  */}
        <div className="second-section-container">
          <p
            style={{
              lineHeight: "10%",
            }}
          >
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;</span>
            </strong>
          </p>
          <p style={{ lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {client.first_name}
                {"  "} {client.last_name}
              </span>
            </strong>
          </p>
          <p style={{ lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {company.company_name}
              </span>
            </strong>
          </p>
          <p style={{ marginTop: "12pt", lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {company.address}
              </span>
            </strong>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;&nbsp;</span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              ></span>
            </strong>
          </p>
          <p style={{ marginTop: "12pt", lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {examData.examinerName}
              </span>
            </strong>
          </p>

          <p style={{ marginTop: "12pt", lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {examData.qualifications}
              </span>
            </strong>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;&nbsp;</span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              ></span>
            </strong>
          </p>
          <p style={{ marginTop: "12pt", lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {date.dayNumber}
              </span>
            </strong>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;&nbsp;</span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {date.monthYear}
              </span>
            </strong>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;&nbsp;</span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              ></span>
            </strong>
          </p>
          <p style={{ lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </strong>
          </p>
        </div>
        {/* End of Second Section */}

        <div className="third-section-container">
          <p style={{ lineHeight: "17%" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;</span>
            </strong>
          </p>
          <p style={{ lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;</span>
            </strong>
          </p>
          <p style={{ marginTop: "12pt", lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;</span>
            </strong>
          </p>
          <p style={{ marginTop: "12pt", lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;</span>
            </strong>
          </p>
          <p style={{ marginTop: "12pt", lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;</span>
            </strong>
          </p>
          <p style={{ marginTop: "12pt", lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;</span>
            </strong>
          </p>
          <p style={{ marginTop: "12pt", lineHeight: "normal" }}>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;&nbsp;</span>
            </strong>
          </p>
          <p
            style={{
              marginTop: "12pt",
              marginBottom: "0pt",
              lineHeight: "normal",
            }}
          >
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {client.first_name}
                {"  "} {client.last_name}
              </span>
            </strong>
          </p>
          <p
            style={{
              marginTop: "8pt",
              marginBottom: "0pt",
              lineHeight: "50%",
            }}
          >
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {company.company_name}
              </span>
            </strong>
          </p>
          <p
            style={{
              marginTop: "12pt",
              marginBottom: "0pt",
              lineHeight: "normal",
            }}
          >
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {company.address}
              </span>
            </strong>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              ></span>
            </strong>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              ></span>
            </strong>
          </p>
          <p
            style={{
              marginTop: "12pt",
              marginBottom: "0pt",
              lineHeight: "normal",
            }}
          >
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {examData.examinerName}
              </span>
            </strong>
          </p>
          <p
            style={{
              marginTop: "12pt",
              marginBottom: "0pt",
              lineHeight: "normal",
            }}
          >
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                MD
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                &nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                PHD
              </span>
            </strong>
          </p>
          <p
            style={{
              marginTop: "12pt",
              marginBottom: "0pt",
              lineHeight: "normal",
            }}
          >
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              >
                {date.dayNumber} {date.monthYear}
              </span>
            </strong>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;&nbsp;</span>
            </strong>
            <strong>
              <span
                style={{
                  fontFamily: '"Cooper Black"',
                  textTransform: "uppercase",
                }}
              ></span>
            </strong>
            <strong>
              <span style={{ fontFamily: '"Cooper Black"' }}>&nbsp;&nbsp;</span>
            </strong>
          </p>
          <p>
            <span style={{ width: "108pt", display: "inline-block" }}>
              &nbsp;
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfessionalCertificatePrintCsv;

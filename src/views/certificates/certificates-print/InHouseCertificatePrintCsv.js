import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

const InHouseCertificatePrintCsv = ({ examData, company, client }) => {
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

  const getSuperscript = (number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const relevantDigits = number % 100;
    const suffix =
      suffixes[(relevantDigits - 20) % 10] ||
      suffixes[relevantDigits] ||
      suffixes[0];
    return number + suffix;
  };

  return <Fragment>
      <div
      style={{
        margin: "30px",
        border: "1px solid black",
        padding: "30px",
        height: "1025px",
        width: "fit-content",
      }}
    >
      <title />
      <p style={{ marginTop: "0pt", marginBottom: "8pt" }}>
        <img
          src="/assets/images/providence.png"
          width={250}
          height={100}
          alt="LogoDescription automatically generated"
        />
      </p>
      <p style={{ marginTop: "0pt", marginBottom: "8pt" }}>&nbsp;</p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          lineHeight: "108%",
          fontSize: "14pt",
        }}
      >
        <strong>
          <span style={{ fontFamily: '"Times New Roman"' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </strong>
        <strong>
          <u>
            <span style={{ fontFamily: '"Cooper Black"' }}>
              MEDICAL CERTIFICATE
            </span>
          </u>
        </strong>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          lineHeight: "200%",
          fontSize: "14pt",
        }}
      >
        <span style={{ fontFamily: '"Times New Roman"' }}>&nbsp;</span>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          textAlign: "justify",
          lineHeight: "200%",
          fontSize: "14pt",
        }}
      >
        <span style={{ fontFamily: '"Times New Roman"' }}>
          I{" "}
          <strong
            style={{
              fontFamily: '"Times New Roman"',
            }}
          >
            <u>{examData.examinerName}</u>
          </strong>{" "}
          being a Registered Medical Practitioner, hereby certify that I have
          medically examined{" "}
          <strong
            style={{
              fontFamily: '"Times New Roman"',
            }}
          >
            <u>
              {client.first_name.toUpperCase()}{" "}
              {client.last_name.toUpperCase()}
            </u>
          </strong>{" "}
          on the
          <span
            style={{
              textTransform: "uppercase",
            }}
          >
            {" "}
            {getSuperscript(date.dayNumber)}{" "}{date.monthYear}{" "}
          </span>
          and state that:
        </span>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          textAlign: "justify",
          lineHeight: "200%",
          fontSize: "14pt",
        }}
      >
        <span style={{ fontFamily: '"Times New Roman"' }}>
          I am satisfied that he/she is clinically free from any medical
          condition and is therefore fit for employment.
        </span>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          lineHeight: "200%",
          fontSize: "14pt",
        }}
      >
        <strong>
          <span style={{ fontFamily: '"Times New Roman"' }}>Company Name:</span>
        </strong>
        <span
          style={{
            width: "11.17pt",
            fontFamily: '"Times New Roman"',
            display: "inline-block",
          }}
        >
          &nbsp;
        </span>
        <span
          style={{ fontFamily: '"Times New Roman"', textTransform: "uppercase" }}
        >
          {company && (
            <strong>
              <u>{company.company_name}</u>
            </strong>
          )}
        </span>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          lineHeight: "200%",
          fontSize: "14pt",
        }}
      >
        <strong>
          <span style={{ fontFamily: '"Times New Roman"' }}>Address:</span>
        </strong>
        <span style={{ fontFamily: '"Times New Roman"' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span
          style={{ fontFamily: '"Times New Roman"', textTransform: "uppercase" }}
        >
          {company && (
            <strong>
              <u>{company.address}</u>
            </strong>
          )}
        </span>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          lineHeight: "200%",
          fontSize: "14pt",
        }}
      >
        <span style={{ fontFamily: '"Times New Roman"' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span style={{ fontFamily: '"Times New Roman"' }}></span>
        <span style={{ fontFamily: '"Times New Roman"' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          lineHeight: "200%",
          fontSize: "14pt",
        }}
      >
        <strong>
          <span style={{ fontFamily: '"Times New Roman"' }}>
            Name of examiner: &nbsp;
          </span>
        </strong>
        <span style={{ fontFamily: '"Times New Roman"' }}>
          <strong>
            <u>{examData.examinerName}</u>
          </strong>
        </span>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          lineHeight: "200%",
          fontSize: "14pt",
        }}
      >
        <strong>
          <span style={{ fontFamily: '"Times New Roman"' }}>Qualification: </span>
        </strong>
        <span style={{ fontFamily: '"Times New Roman"' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span style={{ fontFamily: '"Times New Roman"' }}>
          <strong>
            <u>{examData.qualifications}</u>
          </strong>
        </span>
        <u>
          <span style={{ fontFamily: '"Times New Roman"' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </u>
        <span style={{ fontFamily: '"Times New Roman"' }}>&nbsp;</span>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          lineHeight: "200%",
          fontSize: "14pt",
        }}
      >
        <strong>
          <span style={{ fontFamily: '"Times New Roman"' }}>Signature: </span>
        </strong>
        <span style={{ fontFamily: '"Times New Roman"' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span
          style={{
            width: "11.16pt",
            fontFamily: '"Times New Roman"',
            display: "inline-block",
          }}
        >
          &nbsp;
        </span>
        <span style={{ fontFamily: '"Times New Roman"' }}>&nbsp;………………………</span>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          lineHeight: "200%",
          fontSize: "14pt",
        }}
      >
        <strong>
          <span style={{ fontFamily: '"Times New Roman"' }}>Date</span>
        </strong>
        <strong>
          <span style={{ fontFamily: '"Times New Roman"' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </strong>
        <span
          style={{
            fontFamily: '"Times New Roman"',
            textTransform: "uppercase",
          }}
        >
          <strong>{date.dayNumber}{" "} {date.monthYear}{" "}</strong>
        </span>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginBottom: "8pt",
          lineHeight: "200%",
          fontSize: "8pt",
        }}
      >
        <span style={{ fontFamily: '"Times New Roman"' }}>&nbsp;</span>
      </p>
      <p
        style={{
          marginTop: "0pt",
          marginLeft: "324pt",
          marginBottom: "8pt",
          lineHeight: "200%",
          fontSize: "14pt",
        }}
      >
        <span
          style={{
            lineHeight: "200%",
            fontFamily: '"Times New Roman"',
            fontSize: "8pt",
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span
          style={{
            lineHeight: "200%",
            fontFamily: '"Times New Roman"',
            fontSize: "8pt",
          }}
        >
          CLINIC STAMP
        </span>
        <span style={{ fontFamily: '"Times New Roman"' }}>/</span>
        <span
          style={{
            lineHeight: "200%",
            fontFamily: '"Times New Roman"',
            fontSize: "8pt",
          }}
        >
          INSTITUTE
        </span>
      </p>
    </div>
  </Fragment>;
};

export default InHouseCertificatePrintCsv;

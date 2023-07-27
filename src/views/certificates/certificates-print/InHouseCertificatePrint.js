import React from "react";

function InHouseCertificatePrint({ person, doctor }) {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const getSuperscript = (number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const relevantDigits = number % 100;
    const suffix =
      suffixes[(relevantDigits - 20) % 10] ||
      suffixes[relevantDigits] ||
      suffixes[0];
    return number + suffix;
  };

  const formattedDate = `${getSuperscript(day)} of ${month} ${year}`;

  const normalDate = `${day} ${month} ${year}`;

  
  return (
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
          width={263}
          height={111}
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </strong>
        <strong>
          <u>
            <span style={{ fontFamily: '"Times New Roman"' }}>
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
          <strong>
            <u>{doctor.examinerName}</u>
          </strong>{" "}
          being a Registered Medical Practitioner, hereby certify that I have
          medically examined{" "}
          <strong>
            <u>
              {person.patient.attendee.first_name.toUpperCase()}{" "}
              {person.patient.attendee.last_name.toUpperCase()}
            </u>
          </strong>{" "}
          on the
          <span
            style={{
              textTransform: "uppercase",
            }}
          >
            {" "}
            {formattedDate}{" "}
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
          <span style={{ fontFamily: '"Times New Roman"' }}>Company Name</span>
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
        <span style={{ fontFamily: '"Times New Roman"' }}>
          ………………………………………………
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
          <span style={{ fontFamily: '"Times New Roman"' }}>Address</span>
        </strong>
        <span style={{ fontFamily: '"Times New Roman"' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span style={{ fontFamily: '"Times New Roman"' }}>
          ………………………………………………
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
        <span style={{ fontFamily: '"Times New Roman"' }}>
          ………………………………………………
        </span>
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
            Name of examiner&nbsp;
          </span>
        </strong>
        <span style={{ fontFamily: '"Times New Roman"' }}>
          <strong>
            <u>{doctor.examinerName}</u>
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
          <span style={{ fontFamily: '"Times New Roman"' }}>Qualification</span>
        </strong>
        <span style={{ fontFamily: '"Times New Roman"' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span style={{ fontFamily: '"Times New Roman"' }}>
          <strong>
            <u>{doctor.qualifications}</u>
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
          <span style={{ fontFamily: '"Times New Roman"' }}>Signature</span>
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
          <strong>{normalDate}</strong>
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
  );
}

export default InHouseCertificatePrint;

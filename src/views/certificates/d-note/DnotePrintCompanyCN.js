import React from "react";
import { useSelector } from "react-redux";

const DnotePrintCompanyCN = ({ data }) => {
  const user = useSelector((state) => state.auth.user);
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      {data && (
        <div
          style={{
            margin: "5rem",
            lineHeight: "115% !important",
            fontSize: "11pt",
            fontFamily: "Calibri",
          }}
        >
          <div>
            <style
            // dangerouslySetInnerHTML={{
            //   __html:
            //     "\nbody {\nline-height: 115%;\n",
            // }}
            // dangerouslySetInnerHTML={{
            //   __html:
            //     "\nbody {\nline-height: 115%;\nfont-family: Calibri;\nfont-size: 11pt\n}\n\np {\nmargin: 0pt 0pt 10pt\n}\n\n.BalloonText {\nmargin-bottom: 0pt;\nline-height: normal;\nfont-family: Tahoma;\nfont-size: 8pt\n}\n\n.Footer {\nmargin-bottom: 0pt;\nline-height: normal;\nfont-size: 11pt\n}\n\n.Header {\nmargin-bottom: 0pt;\nline-height: normal;\nfont-size: 11pt\n}\n\nspan.BalloonTextChar {\nfont-family: Tahoma;\nfont-size: 8pt\n}\n",
            // }}
            />
            <p
              style={{
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "8.0pt",
                marginLeft: "0in",
                fontSize: "11.0pt",
                fontFamily: '"Calibri",sans-serif',
              }}
            >
              <img
                src="/assets/images/PHC_Logo.png"
                alt="image"
                style={{ width: "141px", height: "79.0976px" }}
              />
            </p>
            <p
              style={{
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "8.0pt",
                marginLeft: "0in",
                fontSize: "11.0pt",
                fontFamily: '"Calibri",sans-serif',
              }}
            >
              &nbsp;
            </p>
            <p
              style={{
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "8.0pt",
                marginLeft: "0in",
                fontSize: "11.0pt",
                fontFamily: '"Calibri",sans-serif',
              }}
            >
              {data.length > 0 && (
                <strong>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "107%",
                      fontFamily: '"Arial",sans-serif',
                    }}
                  >
                    DELIVERY NOTE TO:{" "}
                    <span style={{ textTransform: "uppercase" }}>
                      {data[0].patient.attendee.company.company_name}
                    </span>
                  </span>
                </strong>
              )}
            </p>
            <p
              style={{
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "8.0pt",
                marginLeft: "0in",
                fontSize: "11.0pt",
                fontFamily: '"Calibri",sans-serif',
              }}
            >
              <strong>
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "107%",
                    fontFamily: '"Arial",sans-serif',
                  }}
                >
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp;&nbsp;
                </span>
              </strong>
            </p>

            {/* Table Place */}

            {data && (
              <div
                style={{
                  marginBottom: "30px",
                }}
                className="table-responsive"
              >
                {" "}
                <table className="table table-striped table-hover">
                  <thead className="dnote-head">
                    <tr>
                      <th
                        style={{
                          width: "30px",
                        }}
                      >
                        NO#
                      </th>
                      <th>NAME</th>
                      <th>SURNAME</th>
                      <th>COMPANY</th>
                      <th>CERT NO.</th>
                      <th>SIGNATURE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((client, index) => (
                      <tr>
                        <th> {index + 1}</th>
                        <th
                          style={{
                            textTransform: "uppercase",
                          }}
                        >
                          {client.patient.attendee.first_name}
                        </th>
                        <th
                          style={{
                            textTransform: "uppercase",
                          }}
                        >
                          {client.patient.attendee.last_name}
                        </th>
                        <th
                          style={{
                            textTransform: "uppercase",
                          }}
                        >
                          {client.patient.attendee.company.company_name}
                        </th>
                        <th>
                          {client.patient.latest_certificate.certificate_number}
                        </th>
                        <th></th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Table Place */}

            <p
              style={{
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "8.0pt",
                marginLeft: "0in",
                fontSize: "11.0pt",
                fontFamily: '"Calibri",sans-serif',
              }}
            >
              <strong>
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "107%",
                    fontFamily: '"Arial",sans-serif',
                  }}
                >
                  &nbsp;
                </span>
              </strong>
            </p>
            <p
              style={{
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "8.0pt",
                marginLeft: "0in",
                fontSize: "11.0pt",
                fontFamily: '"Calibri",sans-serif',
              }}
            >
              <strong>
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "107%",
                    fontFamily: '"Arial",sans-serif',
                  }}
                >
                  &nbsp;
                </span>
              </strong>
            </p>
            <p
              style={{
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "8.0pt",
                marginLeft: "0in",
                fontSize: "11.0pt",
                fontFamily: '"Calibri",sans-serif',
              }}
            >
              <strong>
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "107%",
                    fontFamily: '"Arial",sans-serif',
                  }}
                >
                  &nbsp;
                </span>
              </strong>
            </p>
            <p
              style={{
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "8.0pt",
                marginLeft: "0in",
                fontSize: "11.0pt",
                fontFamily: '"Calibri",sans-serif',
              }}
            >
              <strong>
                <span style={{ fontFamily: '"Arial",sans-serif', textTransform: "uppercase" }}>
                  DISPATCHED BY: {user && user.name}
                </span>
              </strong>
              <strong>
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "107%",
                    fontFamily: '"Arial",sans-serif',
                  }}
                >
                   &nbsp;  &nbsp; 
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                </span>
              </strong>
              <strong>
                <span style={{ fontFamily: '"Arial",sans-serif' }}>DATE: { currentDate }</span>
              </strong>
            </p>
            <p
              style={{
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "8.0pt",
                marginLeft: "0in",
                fontSize: "11.0pt",
                fontFamily: '"Calibri",sans-serif',
              }}
            >
              <strong>
                <span style={{ fontFamily: '"Arial",sans-serif' }}>&nbsp;</span>
              </strong>
            </p>
            <p
              style={{
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "8.0pt",
                marginLeft: "0in",
                fontSize: "11.0pt",
                fontFamily: '"Calibri",sans-serif',
              }}
            >
              <strong>
                <span style={{ fontFamily: '"Arial",sans-serif' }}>&nbsp;</span>
              </strong>
            </p>
            <p
              style={{
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "8.0pt",
                marginLeft: "0in",
                fontSize: "11.0pt",
                fontFamily: '"Calibri",sans-serif',
              }}
            >
              <strong>
                <span style={{ fontFamily: '"Arial",sans-serif' }}>
                  RECEIVED BY:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; DATE:
                </span>
              </strong>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DnotePrintCompanyCN;

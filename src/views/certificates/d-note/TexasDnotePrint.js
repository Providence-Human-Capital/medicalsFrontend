import React from "react";

const TexasDnotePrint = ({ data }) => {
  return (
    <>
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
            <strong>
              <span
                style={{
                  fontSize: "16px",
                  lineHeight: "107%",
                  fontFamily: '"Arial",sans-serif',
                }}
              >
                DELIVERY NOTE TO: TEXAS
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
            >
              {Object.entries(data).map(
                ([companyName, companyData]) =>
                  companyData.patients.length > 0 && (
                    <div key={companyName}>
                      <h4
                        style={{
                          fontSize: "16px",
                          lineHeight: "107%",
                          fontFamily: '"Arial",sans-serif',
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Company Name: {companyName}
                      </h4>
                      <table
                        className="table table-striped mb-0 dnote"
                        style={{
                          border: "1px solid #000",
                        }}
                      >
                        <thead className="thead-dark dnote-head">
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
                          </tr>
                        </thead>
                        <tbody>
                          {companyData.patients.map((patient, index) => (
                            <tr
                              key={index}
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              <td>{index}</td>
                              <td
                                style={{
                                  textTransform: "uppercase",
                                }}
                              >
                                {patient.attendee.first_name}
                              </td>
                              <td
                                style={{
                                  textTransform: "uppercase",
                                }}
                              >
                                {patient.attendee.last_name}
                              </td>
                              <td
                                style={{
                                  textTransform: "uppercase",
                                }}
                              >
                                {companyName}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
              )}
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
              <span style={{ fontFamily: '"Arial",sans-serif' }}>
                DISPATCHED BY
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
                : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
              </span>
            </strong>
            <strong>
              <span style={{ fontFamily: '"Arial",sans-serif' }}>DATE:</span>
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
    </>
  );
};

export default TexasDnotePrint;

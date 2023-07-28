import React, { Fragment, forwardRef, useRef } from "react";
import ReactToPrint from "react-to-print";
import InHouseCertificatePrint from "../certificates-print/InHouseCertificatePrint";

const SingleInHouseCertificate = forwardRef(({ certificateItem, doctor }, ref) => {
  return (
    <div ref={ref}>
      <InHouseCertificatePrint person={certificateItem} doctor={doctor} />
    </div>
  );
});

const CertificatePrintItem = ({ certificateItem, index, handlePrint, doctor, company }) => {
  const inHouseRefs = useRef([]);
  return (
    <Fragment>
      <tr>
        <td>{certificateItem.id}</td>
        <td>{certificateItem.patient.attendee.first_name}</td>
        <td>{certificateItem.patient.attendee.last_name}</td>
        <td>{certificateItem.patient.attendee.gender} </td>
        <td>
          <span className="badge badge-pill badge-primary">
            {certificateItem.patient.attendee.national_id}
          </span>
        </td>
        <td>{certificateItem.patient.attendee.phone_number}</td>
        <td>{certificateItem.validity} Year</td>
        <td>
          <span className="text-fade fw-600 d-block fs-16">
            <div key={index} className="d-flex">
              <div
                style={{
                  border: "1px solid black",
                  display: "none",
                }}
              >
                <SingleInHouseCertificate
                  certificateItem={certificateItem}
                  ref={(el) => (inHouseRefs.current[index] = el)}
                  doctor={doctor}
                />
              </div>
              <ReactToPrint
                trigger={() => (
                  <button
                    className="btn btn-success-light"
                    style={{
                      width: "fit-content",
                      margin: "20px",
                      fontWeight: "bold",
                    }}
                    disabled={!doctor}
                  >
                    Print
                  </button>
                )}
                content={() => inHouseRefs.current[index]}
                onAfterPrint={handlePrint}
                
              />
            </div>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default CertificatePrintItem;

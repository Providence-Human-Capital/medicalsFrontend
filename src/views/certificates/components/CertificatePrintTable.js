import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  Fragment,
} from "react";
import { useSelector } from "react-redux";
import CertificatePrintItem from "./CertificatePrintItem";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import InHouseCertificatePrint from "../certificates-print/InHouseCertificatePrint";

const InHousePrintAllCertificates = forwardRef(({ certificates }, ref) => {
  return (
    <div ref={ref}>
      {certificates.map((certificate, index) => (
        <>
          <div
            key={index}
            style={{
              paddingTop: index === 0 ? 0 : "10px",
            }}
          >
            <InHouseCertificatePrint person={certificate} />
          </div>
        </>
      ))}
    </div>
  );
});

const CertificatePrintTable = () => {
  const inHousePrintAllRef = useRef();

  const handlePrintAll = useReactToPrint({
    content: () => inHousePrintAllRef.current,
  });

  useEffect(() => {}, []);
  const batch = useSelector((state) => state.certificate.certifificateBatch);
  const handlePrint = () => {
    console.log("Printing Certificate");
  };
  return (
    <>
      <div className="row">
        <div
          style={{
            display: "none",
          }}
        >
          <InHousePrintAllCertificates
            certificates={batch}
            ref={inHousePrintAllRef}
          />
        </div>
      </div>
      <div className="col-12">
        <div className="box">
          <div className="box-body">
            <h4 className="box-title">
              <strong>
                List Of Certificates Ready Printing{" "}
                <span>
                  <button
                    className="btn btn-success-light"
                    onClick={handlePrintAll}
                  >
                    Print All
                  </button>
                </span>
              </strong>
            </h4>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="bb-2">No.</th>
                    <th className="bb-2">First Name</th>
                    <th className="bb-2">Last Name</th>
                    <th className="bb-2">Gender</th>
                    <th className="bb-2">National_ID</th>
                    <th className="bb-2">Phone Number</th>
                    <th className="bb-2">Certificate Validity</th>
                    <th className="bb-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {batch.length > 0 &&
                    batch.map((certificateItem, index) => (
                      <CertificatePrintItem
                        key={index}
                        handlePrint={handlePrint}
                        certificateItem={certificateItem}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificatePrintTable;

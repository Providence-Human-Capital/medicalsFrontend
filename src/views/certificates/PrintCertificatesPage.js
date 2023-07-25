import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import CertificatePrintTable from "./components/CertificatePrintTable";

const PrintCertificatesPage = () => {
  const [showPrintByTemplateForm, setShowPrintByTemplateForm] = useState(false);
  const [showBasicPrintForm, setShowBasicPrintForm] = useState(false);

  const handlePrintByTemplateClick = () => {
    setShowPrintByTemplateForm(true);
    setShowBasicPrintForm(false);
  };

  const handleBasicPrintClick = () => {
    setShowPrintByTemplateForm(false);
    setShowBasicPrintForm(true);
  };

  return (
    <>
      <section className="content">
        <BreadCrumb
          title={"Certificate Printing Page"}
          activeTab={"Printing Page"}
        />

        <div
          className="d-flex"
          style={{
            marginBottom: "30px",
          }}
        >
          <button
            className="btn btn-success-light"
            style={{
              borderRadius: "20px",
            }}
            onClick={handlePrintByTemplateClick}
          >
            Print By Template
          </button>
          <button
            className="btn btn-success-light"
            style={{
              borderRadius: "20px",
            }}
            onClick={handleBasicPrintClick}
          >
            Basic Print
          </button>
        </div>

        <CertificatePrintTable />
      </section>
    </>
  );
};

export default PrintCertificatesPage;

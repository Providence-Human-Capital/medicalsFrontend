import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import CertificatePrintTable from "./components/CertificatePrintTable";
import { useDispatch, useSelector } from "react-redux";

const PrintCertificatesPage = () => {
  return (
    <>
      <section className="content">
        <BreadCrumb
          title={"Certificate Printing Page"}
          activeTab={"Printing Page"}
        />
        <CertificatePrintTable />
      </section>
    </>
  );
};

export default PrintCertificatesPage;

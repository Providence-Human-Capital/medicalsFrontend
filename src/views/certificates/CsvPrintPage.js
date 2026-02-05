import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import CsvForm from "./components/CsvForm";

const CsvPrintPage = () => {
  return (
    <>
      <section className="content">
        <BreadCrumb
          title={"Certificate Printing Page"}
          activeTab={"Printing Using Csv"}
        />
        <CsvForm />



        
      </section>
    </>
  );
};

export default CsvPrintPage;

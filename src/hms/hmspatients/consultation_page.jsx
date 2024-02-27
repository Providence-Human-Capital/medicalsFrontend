import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import ConsultationForm from "./forms/consultation_form";

const ConsultationPage = ({}) => {
  return (
    <>
      <BreadCrumb
        title={"New Patient Consultation"}
        activeTab={"Consultation"}
      />
      <div className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <ConsultationForm />
          </div>
          <div
            className="col-xl-4 col-12"
            style={{
              overflowY: "scroll",
              height: "80vh",
              overflowX: "hidden",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ConsultationPage;

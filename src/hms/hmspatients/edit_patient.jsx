import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";

const EditPatientHms = () => {
  return (
    <>
      <BreadCrumb title={"Edit Patient"} activeTab={"Edit Patient Details"} />
      <div className="section">
        <div className="row">
            <h1>Edit Patient Details</h1>
        </div>
      </div>
    </>
  );
};

export default EditPatientHms;

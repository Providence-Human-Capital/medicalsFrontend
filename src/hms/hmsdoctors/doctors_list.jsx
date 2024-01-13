import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import DoctorCard from "./components/doctor_card";

const DoctorsList = ({}) => {
  return (
    <>
      <BreadCrumb title={"Doctors"} activeTab={"Doctors"} />

      <section class="content">
        <div className="row">
          <div className="col-md-8">
            <div class="row">
              <DoctorCard />
              <DoctorCard />
              <DoctorCard />
              <DoctorCard />
              <DoctorCard />
            </div>
          </div>
          <div className="col-md-4">
            <h1>Hello</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorsList;

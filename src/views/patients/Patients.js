import React, { Fragment, useEffect } from "react";
import Layout from "../../core/Layout";
import Loader from "../../components/Loader";
import BreadCrumb from "../../components/BreadCrumb";
import AttendeeTable from "../attendee/components/AttendeeTable";
import PatientTable from "./components/PatientTable";
import { Link } from "react-router-dom";

const Patients = () => {
  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "hidden",
      minWidth: "100%",
    },
  };

  useEffect(() => {}, []);

  return (
    <Fragment>
      <BreadCrumb title={"Patients"} activeTab={"Patients"} />

      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="d-md-flex align-items-center justify-content-between mb-20"></div>
            <div className="box">
              <div className="box-body">
                <div
                  className="table-responsive rounded card-table"
                  style={styles.containerStyles}
                >
                  <PatientTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Patients;

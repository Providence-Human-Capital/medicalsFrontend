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


            <div className="key-container mb-3">
            <h5>Key</h5>
            <div className="d-flex align-items-center mb-2">
              <div
                className="p-2 me-2 bg-primary text-white rounded"
                style={{ width: "90px", height: "20px" }}
              ></div>
              <span>Record of the patient available (table-primary)</span>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="p-2 me-2 bg-warning rounded"
                style={{ width: "90px", height: "20px" }}
              ></div>
              <span>No record available (table-warning)</span>
            </div>
          </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Patients;

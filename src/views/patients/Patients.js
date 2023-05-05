import React, { Fragment } from "react";
import Layout from "../../core/Layout";
import Loader from "../../components/Loader";
import BreadCrumb from "../../components/BreadCrumb";
import AttendeeTable from "../attendee/components/AttendeeTable";
import PatientTable from "./components/PatientTable";

const Patients = () => {
  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "hidden",
    },
  };
  return (
    <Fragment>
      <Layout>
        <BreadCrumb title={"Patients"} activeTab={"Patients"} />

        <section class="content">
          <div class="row">
            <div class="col-12">
              <div class="box">
                <div class="box-body">
                  <div
                    class="table-responsive rounded card-table"
                    style={styles.containerStyles}
                  >
                    <PatientTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};

export default Patients;

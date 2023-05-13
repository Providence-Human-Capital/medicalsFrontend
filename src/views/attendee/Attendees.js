import React, { Fragment } from "react";
import Layout from "../../core/Layout";
import BreadCrumb from "../../components/BreadCrumb";
import AttendeeTable from "./components/AttendeeTable";
import { Link } from "react-router-dom";

const Attendees = ({}) => {
  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "hidden",
    },
  };
  return (
    <Fragment>
      <BreadCrumb title={"Attendees"} activeTab={"Attendees"} />

      <section class="content">
        <div class="row">
          <div class="col-12">
          <div className="d-md-flex align-items-center justify-content-between mb-20">
              <div className="d-flex">
                <Link to={"/attendees/add"} className="btn btn-success">
                  <i className="fa fa-check-circle-o"></i> Add Attendee
                </Link>
              </div>
            </div>
            <div class="box">
              <div class="box-body">
                <div
                  class="table-responsive rounded card-table"
                  style={styles.containerStyles}
                >
                  <AttendeeTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Attendees;

import React, { Fragment } from "react";
import Layout from "../../core/Layout";
import BreadCrumb from "../../components/BreadCrumb";
import AttendeeTable from "./components/AttendeeTable";
import { Link } from "react-router-dom";
import { fadeInAnimation } from "../../animations/animation";
import CreateButton from "../../components/buttons/CreateButton";

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
    <section className="content">
      <div className="row">
        <div className="col-12">
          <div className="box">
            <div className="box-body">
              <div className="d-md-flex align-items-center justify-content-between mb-20">
                <div className="d-flex">
                  <CreateButton text={"Add Attendee"} to={"/attendees/add"} />
                </div>
                <div className="d-flex justify-content-end">
                  <h1 className="mb-0">Registered Attendees</h1>
                </div>
              </div>
              <div
                className="table-responsive rounded card-table"
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

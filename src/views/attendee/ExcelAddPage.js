import React, { Fragment, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import AddAttendeeExecel from "./AddAttendeeExecel";
import { Link } from "react-router-dom";

const ExcelAddPage = () => {
  return (
    <Fragment>
      <BreadCrumb activeTab={"Add Attendee"} title={"Add Using Execel"} />
      <Link
        to={"/attendees/add"}
        className="btn btn-primary me-5 mb-md-0 mb-5 excel-btn"
        style={{
          borderRadius: "20px",
        }}
      >
        <i class="fa fa-long-arrow-left" aria-hidden="true"></i> {"  "}
        Back To Form
      </Link>
      <div className="separation-div"></div>
      <AddAttendeeExecel />
    </Fragment>
  );
};

export default ExcelAddPage;

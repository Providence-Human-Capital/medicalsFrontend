import React, { Fragment } from "react";

const BoxProfile = ({ patient }) => {
  return (
    <Fragment>
      <div className="box" >
        <div className="box-header border-0 pb-0">
          <h4 className="box-title fw-500">Patient Companie's Details</h4>
        </div>
        <div className="box-body box-profile">
          <div className="row">
            <div className="col-12">
              <div>
                <p className="fw-500">
                  Company Name:
                  <span className="text-gray ps-10 fw-200">
                    {patient.attendee.company.company_name}
                  </span>
                </p>
                <p className="fw-500">
                  Company Email :
                  <span className="text-gray ps-10 fw-200">
                    {patient.attendee.company.company_email}
                  </span>
                </p>
                <p className="fw-500">
                  Address :
                  <span className="text-gray ps-10 fw-200">
                    {" "}
                    {patient.attendee.company.address}
                  </span>
                </p>
                <p className="fw-500">
                  Telephone Number:
                  <span className="text-gray ps-10 fw-200">
                    {" "}
                    {patient.attendee.company.site_telephone}
                  </span>
                </p>
                <p className="fw-500">
                  Contact Person:
                  <span className="text-gray ps-10 fw-200">
                    {" "}
                    {patient.attendee.company.contact_person}
                  </span>
                </p>
                <p className="fw-500">
                  Contact Number:
                  <span className="text-gray ps-10 fw-200">
                    {" "}
                    {patient.attendee.company.contact_number}
                  </span>
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="pb-15">
                <p className="mb-10">Social Profile</p>
                <div className="user-social-acount">
                  <button className="btn btn-circle btn-social-icon btn-facebook">
                    <i className="fa fa-facebook"></i>
                  </button>
                  <button className="btn btn-circle btn-social-icon btn-twitter">
                    <i className="fa fa-twitter"></i>
                  </button>
                  <button className="btn btn-circle btn-social-icon btn-instagram">
                    <i className="fa fa-instagram"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /.box-body --> */}
      </div>
    </Fragment>
  );
};

export default BoxProfile;

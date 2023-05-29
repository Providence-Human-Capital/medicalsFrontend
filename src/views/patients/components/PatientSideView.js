import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PatientSideView = () => {
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  return (
    <Fragment>
      <div className="box">
        <div className="box-header border-0 pb-0">
          <h4 className="box-title">Patient Overview</h4>
        </div>
        <div className="box-body">
          <div className="row">
            <div className="col-12">
              <div>
                <p className="fw-800">
                  Patient Name:
                  <span className="text-gray  fw-500">
                    {singlePatient.attendee.first_name} {""}{" "}
                    {singlePatient.attendee.last_name}
                  </span>
                </p>
                <p className="mb-2 fw-800">
                  Exam Purpose : {""}
                  <span className="badge badge-dark">
                    {singlePatient.exam_purpose}
                  </span>
                </p>
                <p className="mb-2 fw-800">
                  National ID : {""}
                  <span className="fw-500">
                    {singlePatient.attendee.national_id}
                  </span>
                </p>

                <p className="mb-2 fw-800">
                  Sex : {""}
                  <span className="fw-500">
                    {singlePatient.attendee.gender}
                  </span>
                </p>
                {singlePatient.attendee.swab_number && (
                  <p className="mb-2 fw-800">
                    Swab Number : {""}
                    <span className="fw-500">
                      {singlePatient.attendee.swab_number}
                    </span>
                  </p>
                )}

                <p className="mb-2 fw-800">
                  Phone Number : {""}
                  <span className="fw-500">
                    {singlePatient.attendee.phone_number}
                  </span>
                </p>

                <p className="mb-2 fw-800">
                  X-Ray Status : {""}
                  <span className="fw-500 badge badge-danger">
                    {singlePatient.attendee.x_ray_status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PatientSideView;

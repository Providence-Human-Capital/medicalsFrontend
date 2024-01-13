import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../redux_store/api/userSlice";
import Loading from "../../components/loader/Loading";
import BreadCrumb from "../../components/BreadCrumb";
import DetailsOverView from "./components/details_overview";

const ClinicPatientDetailsPage = () => {
  const { patientId } = useParams();

  const { data: emp, isFetching, isSuccess } = useGetUserByIdQuery(patientId);

  let content;

  if (isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <>
        <div className="row">
          <div className="col-xl-4 col-12">
            <div className="d-md-flex align-items-center justify-content-between mb-20"></div>

            <DetailsOverView patient={emp.data} />
          </div>
          <div className="col-xl-8 col-12">
            <div className="d-md-flex align-items-center justify-content-between mb-20">
              <Link to={`/hms/patient/edit/${patientId}`} className="btn btn-primary me-5 mb-md-0 mb-5">
                <i className="fa fa-edit"></i> Edit Profile
              </Link>
              <div className="d-flex">
                <a className="btn btn-outline btn-success me-5">
                  <i className="fa fa-times-circle-o"></i> Lab Results
                </a>
                <a className="btn btn-outline btn-success me-5">
                  <i className="fa fa-times-circle-o"></i> Radiology Results
                </a>
                <a className="btn btn-outline btn-success me-5">
                  <i className="fa fa-times-circle-o"></i> Past Diagnosis
                </a>
                <Link
                  to={`/hms/patient/${patientId}/consultation`}
                  className="btn btn-success"
                >
                  <i className="fa fa-check-circle-o"></i> Start Consultation
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4 className="card-title ">Medical History</h4>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BreadCrumb title={"Patient Infomation"} activeTab="Details" />
      <section className="content">{content}</section>
    </>
  );
};

export default ClinicPatientDetailsPage;

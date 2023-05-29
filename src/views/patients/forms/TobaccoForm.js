import React, { Fragment, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";
import { useSelector } from "react-redux";
import PatientSideView from "../components/PatientSideView";
import Vitals from "../components/Vitals";
import PButtons from "../components/PButtons";

const TobaccoForm = () => {
  const { patientId } = useParams();
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );

  return (
    <Fragment>
      <BreadCrumb title={"Tobacco"} activeTab={"Add Patient Tobacco Use"} />
      <div className="row">
        <div className="col-xl-9 col-12">
          <PButtons routeId={patientId} />
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                <h2>Tobacco Usage Form</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-12">
          <PatientSideView />
          {singlePatient.vitals[0] && (
            <Vitals
              vitals={patientPhysicalExamRecord}
              patient={singlePatient}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default TobaccoForm;

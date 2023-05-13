import React, { Fragment } from "react";
import Layout from "../../core/Layout";
import BreadCrumb from "../../components/BreadCrumb";
import PButtons from "./components/PButtons";
import BoxProfile from "./components/BoxProfile";
import DiseaseHistory from "./components/DiseaseHistory";
import Vitals from "./components/Vitals";
import { useParams } from "react-router-dom";

const PatientDetails = () => {
  const { patientId } = useParams();

  

  return (
    <Fragment>
      <BreadCrumb title={"Patient Details"} activeTab={"Patient Details"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <PButtons routeId={patientId} />
            <div className="row">
              <div className="col-xl-6 col-12">
                <BoxProfile />
              </div>
              <div className="col-xl-6 col-12">
                <DiseaseHistory />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-12">
            <Vitals />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default PatientDetails;

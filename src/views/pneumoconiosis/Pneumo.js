import React, { Fragment, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import StepForm from "../../components/StepForm";
import IndustryClassificationForm from "./forms/IndustryClassificationForm";
import MineralDustExposureForm from "./forms/MineralDustExposureForm";
import ControlMeasuresForm from "./forms/ControlMeasuresForm";
import HealthyQuestionnaireForm from "./forms/HealthyQuestionnaireForm";
import PneumoTable from "./components/PneumoTable";

const Pneumo = () => {
  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "hidden",
      minWidth: "100%",
    },
  };
  return (
    <Fragment>
      <BreadCrumb
        title={"Pneumoconiosis Patients"}
        activeTab={"Pneumoconiosis Patients"}
      />
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
                  <PneumoTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Pneumo;

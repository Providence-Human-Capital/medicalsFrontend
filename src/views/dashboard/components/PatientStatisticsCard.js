import React, { Fragment } from "react";

const PatientStatisticsCard = () => {
  return (
    <Fragment>
      <div className="box">
        <div className="box-header">
          <h4 className="box-title">Patient Statistics</h4>
        </div>
        <div className="box-body">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center me-30">
              <div className="bg-gradient-success overflow-h me-10 rounded10 w-50 h-50 l-h-50 fs-18 text-center text-white">
                <i className="fa fa-hospital-o"></i>
              </div>
              <div>
                <p className="fs-14 text-fade mb-0">Admit</p>
                <h5 className="mb-0">2158</h5>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="bg-gradient-primary overflow-h me-10 rounded10 w-50 h-50 l-h-50 fs-18 text-center text-white">
                <i className="fa fa-home"></i>
              </div>
              <div>
                <p className="fs-14 text-fade mb-0">Discharge</p>
                <h5 className="mb-0">1112</h5>
              </div>
            </div>
          </div>
          <div id="overview_trend"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default PatientStatisticsCard;

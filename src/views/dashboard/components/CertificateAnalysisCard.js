import React, { Fragment } from "react";

const CertificateAnalysisCard = () => {
  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">Certificate Analysis</h4>
        </div>
        <div className="box-body pt-0">
          <div id="chart124"></div>
          <div className="row mt-25">
            <div className="col-6">
              <p className="mb-5">
                <span className="badge badge-dot badge-success"></span>
                Cardiology
              </p>
              <p className="mb-5">
                <span className="badge badge-dot badge-info"></span>
                Endocrinology
              </p>
              <p className="mb-0">
                <span className="badge badge-dot badge-danger"></span>
                Physicians
              </p>
            </div>
            <div className="col-6">
              <p className="mb-5">
                <span className="badge badge-dot badge-warning"></span>
                Dermatology
              </p>
              <p className="mb-5">
                <span className="badge badge-dot badge-primary"></span>
                Orthopedics
              </p>
              <p className="mb-0">
                <span className="badge badge-dot badge-secondary"></span>
                Immunology
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CertificateAnalysisCard;

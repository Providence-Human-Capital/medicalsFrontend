import React, { Fragment } from "react";
import "./Dashboard.css";

const DashboardSkeleton = () => {
  return (
    <Fragment>
      <div className="dashboard-skeleton">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="row">
              <div className="card-small"></div>
              <div className="card-small"></div>
              <div className="card-small"></div>
              <div className="card-small"></div>
            </div>
          </div>
          <div className="col-xl-4 col-12">
            <div className="big-card"></div>
            <div className="big-card"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardSkeleton;

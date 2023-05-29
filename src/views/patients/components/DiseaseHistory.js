import React, { Fragment } from "react";
import DiseaseItem from "./DiseaseItem";

const DiseaseHistory = ({ illnesses, health_issue, year_of_diagnosis }) => {
  return (
    <Fragment>
      <div className="box">
        <div className="box-header border-0 pb-0">
          <h4 className="box-title">Disease History</h4>
        </div>
        <div className="box-body">
          <div className="box-body">
            <h5 className="fw-500">
              Previous Health Issue's:{" "}
              {!health_issue ? (
                <span className="fw-200 badge badge-danger">N/A</span>
              ) : (
                <Fragment>
                  <span className="fw-200 badge badge-danger m-2">
                    {health_issue}
                  </span>{" "}
                  <span className="m-2">{year_of_diagnosis}</span>
                </Fragment>
              )}
            </h5>
          </div>
          <div className="widget-timeline-icon">
            <ul>
              {illnesses &&
                illnesses.map((illness) => <DiseaseItem illness={illness} />)}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DiseaseHistory;

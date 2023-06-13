import React, { Fragment } from "react";
import DiseaseItem from "./DiseaseItem";

const DiseaseHistory = ({ illnesses, health_issue, year_of_diagnosis }) => {
  return (
    <Fragment>
      <div className="box">
        <div className="box-header border-0 pb-0">
          <h4 className="box-title">Disease History</h4>
        </div>
        <div
          className="box-body"
          
        >
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
            <div
              className="slimScrollDiv"
              style={{
                position: "relative",
                overflow: "hidden",
                width: "auto",
                height: "298px",
              }}
            >
              <div
                className="inner-user-div2"
                style={{ overflow: "auto", width: "auto", height: "298px" }}
              >
                <div className="widget-timeline-icon">
                  <ul>
                    {illnesses &&
                      illnesses.map((illness) => (
                        <DiseaseItem illness={illness} />
                      ))}
                  </ul>
                </div>
              </div>
              <div
                className="slimScrollBar"
                style={{
                  background: "rgb(0, 0, 0)",
                  width: "4px",
                  right: "1px",
                  zIndex: "99",
                  borderRadius: "7px",
                  opacity: "0.1",
                  height: "165.679px",
                  position: "absolute",
                  top: "23px",
                  display: "none",
                }}
              ></div>
              <div
                className="slimScrollRail"
                style={{
                  width: "4px",
                  height: "100%",
                  position: "absolute",
                  top: "0px",
                  borderRadius: "7px",
                  background: "rgb(51, 51, 51)",
                  opacity: "0.2",
                  zIndex: "90",
                  right: "1px",
                  display: "none",
                }}
              ></div>
            </div>
            ;
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DiseaseHistory;

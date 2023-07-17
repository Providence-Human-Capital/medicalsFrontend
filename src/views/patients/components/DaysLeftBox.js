import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockFour } from "@fortawesome/free-solid-svg-icons";

function DaysLeftBox({ daysLeftData }) {
  // bg-warning
  //   bg-danger

  return (
    <Fragment>
      <div className="col-md-6 col-lg-4">
        <div
          className={`box box-body ${
            daysLeftData.days_left < 30 ? "bg-danger" : "bg-primary"
          }`}
        >
          <div className="flexbox align-items-center justify-content-center">
            <div
              className="text-center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span>
                <FontAwesomeIcon icon={faClockFour} size="2x" />
              </span>
              <span
                style={{
                  paddingLeft: "10px",
                }}
              >
                Certificate Validity (Days Left)
              </span>
              <span className="fs-18 ms-1">
                <strong>{daysLeftData.days_left}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DaysLeftBox;

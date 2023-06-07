import React, { Fragment, useEffect } from "react";
import { IMAGE_URL } from "../../../config";
import { formatDate, options } from "../../../utils/dateConverter";

const XRayBox = ({ x_ray }) => {
  return (
    <Fragment>
      <div className="box">
        <div className="box-header border-0 pb-0">
          <h4 className="box-title fw-500">Patient's XRay</h4>
          <div className="box-body box-profile">
            <div className="row">
              <div className="col-12 mb-3">
                {x_ray[0].status === "POSITIVE" ? (
                  <p className="fw-500 mb-0">
                    XRay Status:{" "}
                    <span className="badge badge-success">
                      {x_ray[0].status}
                    </span>
                  </p>
                ) : (
                  <p className="fw-500 mb-0">
                    XRay Status:{" "}
                    <span className="badge badge-danger">
                      {x_ray[0].status}
                    </span>
                  </p>
                )}
                <p className="fw-500">
                  {" "}
                  <i className="fa fa-clock-o"></i>{" "}
                  {formatDate(x_ray[0].created_at, options)}
                </p>
              </div>
              <div className="col-12">
                <img
                  src={`${IMAGE_URL}/${x_ray[0].image}`}
                  className="img-fluid"
                  alt="Patient's XRay"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default XRayBox;

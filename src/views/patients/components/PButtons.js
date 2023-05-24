import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const PButtons = ({ routeId  }) => {
  return (
    <Fragment>
      <div className="d-md-flex align-items-center justify-content-between mb-20">
        <Link to={"/patients/edit"} className="btn btn-primary me-5 mb-md-0 mb-5">
          <i className="fa fa-edit"></i> Edit Profile
        </Link>
        <div className="d-flex">
          
          <div className="navi-button">
            <Link to={`/patients/${routeId}/physical`} className="btn btn-success">
              <i className="fa fa-check-circle-o"></i> Physical Examination
            </Link>
          </div>
          <div className="navi-button">
            <Link to={"/patients/add"} className="btn btn-success">
              <i className="fa fa-check-circle-o"></i> Illnesses
            </Link>
          </div>
          <div className="navi-button">
            <Link to={"/patients/add"} className="btn btn-success">
              <i className="fa fa-check-circle-o"></i> Tobbacco Use
            </Link>
          </div>
          <div className="navi-button">
            <Link to={`/patients/${routeId}/observation`} className="btn btn-success">
              <i className="fa fa-check-circle-o"></i> Obeservation and Remarks
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PButtons;

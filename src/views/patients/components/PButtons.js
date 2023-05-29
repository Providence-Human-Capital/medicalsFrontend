import React, { Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const PButtons = ({ routeId }) => {
  const location = useLocation();
  useEffect(() => {
    console.log(
      "Current Location",
      location.pathname === `/patients/${routeId}/physical`
    );
  }, []);

  const currentLocation = location.pathname === `/patients/${routeId}/physical`;

  const dynamicButtonRender = () => {
    if (location.pathname === `/patients/${routeId}/physical`) {
      return (
        <Fragment>
          <div className="navi-button">
            <Link
              to={`/patients/${routeId}/illnesses`}
              className="btn btn-success"
            >
              <i className="fa fa-check-circle-o"></i> Illnesses
            </Link>
          </div>

          <div className="navi-button">
            <Link
              to={`/patients/${routeId}/tobacco`}
              className="btn btn-success"
            >
              <i className="fa fa-check-circle-o"></i> Tobbacco Use
            </Link>
          </div>
          <div className="navi-button">
            <Link
              to={`/patients/${routeId}/observation`}
              className="btn btn-success"
            >
              <i className="fa fa-check-circle-o"></i> Obeservation and Remarks
            </Link>
          </div>
        </Fragment>
      );
    } else if (location.pathname === `/patients/${routeId}/illnesses`) {
      return (
        <Fragment>
          <div className="navi-button">
            <Link
              to={`/patients/${routeId}/physical`}
              className="btn btn-success"
            >
              <i className="fa fa-check-circle-o"></i> Physical Examination
            </Link>
          </div>
          <div className="navi-button">
            <Link
              to={`/patients/${routeId}/tobacco`}
              className="btn btn-success"
            >
              <i className="fa fa-check-circle-o"></i> Tobbacco Use
            </Link>
          </div>
          <div className="navi-button">
            <Link
              to={`/patients/${routeId}/observation`}
              className="btn btn-success"
            >
              <i className="fa fa-check-circle-o"></i> Obeservation and Remarks
            </Link>
          </div>
        </Fragment>
      );
    } else if (location.pathname === `/patients/${routeId}/tobacco`) {
      <Fragment>
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/physical`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Physical Examination
          </Link>
        </div>
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/illnesses`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Illnesses
          </Link>
        </div>
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/observation`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Obeservation and Remarks
          </Link>
        </div>
      </Fragment>;
    } else if (location.pathname === `/patients/${routeId}/observation`) {
      <Fragment>
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/physical`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Physical Examination
          </Link>
        </div>
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/illnesses`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Illnesses
          </Link>
        </div>

        <div className="navi-button">
          <Link to={`/patients/${routeId}/tobacco`} className="btn btn-success">
            <i className="fa fa-check-circle-o"></i> Tobbacco Use
          </Link>
        </div>
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/observation`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Obeservation and Remarks
          </Link>
        </div>
      </Fragment>;
    } else {
      <Fragment>
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/physical`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Physical Examination
          </Link>
        </div>
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/illnesses`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Illnesses
          </Link>
        </div>

        <div className="navi-button">
          <Link to={`/patients/${routeId}/tobacco`} className="btn btn-success">
            <i className="fa fa-check-circle-o"></i> Tobbacco Use
          </Link>
        </div>
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/observation`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Obeservation and Remarks
          </Link>
        </div>
      </Fragment>;
    }
  };

  return (
    <Fragment>
      <div className="d-md-flex align-items-center justify-content-between mb-20">
        <Link
          to={"/patients/edit"}
          className="btn btn-primary me-5 mb-md-0 mb-5"
        >
          <i className="fa fa-edit"></i> Return Back
        </Link>
        <div className="d-flex">
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/physical`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Physical Examination
          </Link>
        </div>
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/illnesses`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Illnesses
          </Link>
        </div>

        <div className="navi-button">
          <Link to={`/patients/${routeId}/tobacco`} className="btn btn-success">
            <i className="fa fa-check-circle-o"></i> Tobbacco Use
          </Link>
        </div>
        <div className="navi-button">
          <Link
            to={`/patients/${routeId}/observation`}
            className="btn btn-success"
          >
            <i className="fa fa-check-circle-o"></i> Obeservation and Remarks
          </Link>
        </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PButtons;

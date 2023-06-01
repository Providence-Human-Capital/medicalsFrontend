import React, { Fragment, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const PButtons = ({ routeId }) => {
  const location = useLocation();
  useEffect(() => {
    console.log(
      "Current Location",
      location.pathname === `/patients/${routeId}/physical`
    );
  }, []);

  const currentLocation = location.pathname === `/patients/${routeId}/physical`;
  const navigate = useNavigate();

  const activeStyle = (isActive) => {
    return {
      borderBottom: isActive ? "3px solid #58ad46;" : "3px solid transparent",
    };
  };

  return (
    <Fragment>
      <div className="d-md-flex align-items-center justify-content-between mb-20">
        <a
          onClick={() => navigate(-1)}
          className="btn btn-primary me-5 mb-md-0 mb-5"
        >
          <i className="fa fa-edit"></i> Return Back
        </a>
        <div className="d-flex">
          <ul className="navi-list">
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/physical`}
                className="navi-link"
              >
                Physical Examination
              </NavLink>
            </li>
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/illnesses`}
                className="navi-link"
              >
                Illnesses
              </NavLink>
            </li>
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/tobacco`}
                className="navi-link"
              >
                Tobbacco Use
              </NavLink>
            </li>
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/observation`}
                className="navi-link"
              >
                Obeservation and Remarks
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default PButtons;

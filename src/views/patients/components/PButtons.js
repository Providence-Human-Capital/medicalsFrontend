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
        <NavLink
          to={`/patients/${routeId}`}
          className="btn btn-primary me-5 mb-md-0 mb-5 py-3 px-4"
        >
          <i className="fa fa-home"></i> Return To Profile
        </NavLink>
        <div className="d-flex">
          <ul className="navi-list list-unstyled">
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/xray/add`}
                className="navi-link d-block py-3 px-4"
              >
                <i class="fa fa-bullseye" aria-hidden="true"></i> {" "}
                Add Xray
              </NavLink>
            </li>
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/physical`}
                className="navi-link d-block py-3 px-4"
              >
                <i class="fa fa-smile-o" aria-hidden="true"></i> {" "}
                Physical Examination
              </NavLink>
            </li>
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/illnesses`}
                className="navi-link d-block py-3 px-4"
              >
                <i class="fa fa-thermometer-empty" aria-hidden="true"></i> {" "}
                Illnesses
              </NavLink>
            </li>
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/tobacco`}
                className="navi-link d-block py-3 px-4"
              >
                <i class="fa fa-universal-access" aria-hidden="true"></i> {" "}
                Tobbacco Use
              </NavLink>
            </li>
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/observation`}
                className="navi-link d-block py-3 px-4"
              >
                <i class="fa fa-sticky-note" aria-hidden="true"></i> {" "}
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

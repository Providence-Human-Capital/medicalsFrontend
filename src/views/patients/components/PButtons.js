import React, { Fragment, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  faUser,
  faXRay,
  faStethoscope,
  faHeartbeat,
  faSmoking,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                <FontAwesomeIcon icon={faXRay} /> Add Xray
              </NavLink>
            </li>
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/physical`}
                className="navi-link d-block py-3 px-4"
              >
                <FontAwesomeIcon icon={faStethoscope} /> Physical Examination
              </NavLink>
            </li>
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/illnesses`}
                className="navi-link d-block py-3 px-4"
              >
                <FontAwesomeIcon icon={faHeartbeat} /> Illnesses
              </NavLink>
            </li>
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/tobacco`}
                className="navi-link d-block py-3 px-4"
              >
                <FontAwesomeIcon icon={faSmoking} /> Tobbacco Use
              </NavLink>
            </li>
            <li className="navi-item">
              <NavLink
                to={`/patients/${routeId}/observation`}
                className="navi-link d-block py-3 px-4"
              >
                <FontAwesomeIcon icon={faComment} /> Obeservation and Remarks
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default PButtons;

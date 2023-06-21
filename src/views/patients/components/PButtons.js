import React, { Fragment, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  faUser,
  faXRay,
  faStethoscope,
  faHeartbeat,
  faSmoking,
  faComment,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StepButton from "../../../components/buttons/StepButton";

const PButtons = ({ routeId, patient }) => {
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
          className="btn btn-primary me-5 mb-md-0 "
        >
          <i className="fa fa-home"></i> Return To Profile
        </NavLink>
        <div className="d-flex">
          <ul className="navi-list list-unstyled">
            {patient.category && patient.category === "Industry" && (
              <Fragment>
                <StepButton
                  text={`Update ${patient.category} Patient`}
                  icon={faStethoscope}
                  toLink={`/patient/industry/${routeId}`}
                />
              </Fragment>
            )}

            {patient.category && patient.category === "Pneumoconiosis" && (
              <Fragment>
                <StepButton
                  text={`Update ${patient.category} Patient`}
                  icon={faStethoscope}
                  toLink={`/patient/pneumo/${routeId}`}
                />
              </Fragment>
            )}

            {patient.category && patient.category === "City Of Harare" && (
              <Fragment>
                <StepButton
                  text={`Update ${patient.category} Patient`}
                  icon={faStethoscope}
                  toLink={`/patient/foodhandler/${routeId}`}
                />
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default PButtons;

{
  /* <StepButton
    text={"Physical Examination"}
    icon={faStethoscope}
    toLink={`/patients/${routeId}/physical`}
  />
  <StepButton
    text={"Illnesses"}
    icon={faHeartbeat}
    toLink={`/patients/${routeId}/illnesses`}
  />
  <StepButton
    text={"Tobbacco Use"}
    icon={faSmoking}
    toLink={`/patients/${routeId}/tobacco`}
  />
  <StepButton
    text={"Add Xray"}
    icon={faXRay}
    toLink={`/patients/${routeId}/xray/add`}
  />
  <StepButton
    text={"Obeservation and Remarks"}
    icon={faComment}
    toLink={`/patients/${routeId}/observation`}
  /> */
}

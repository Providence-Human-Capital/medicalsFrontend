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
      <ul className="navi-list list-unstyled">
        {patient.category && patient.category === "Industry" && (
          <Fragment>
            <StepButton
              text={` Edit Patient`}
              icon={faStethoscope}
              toLink={`/patient/industry/${routeId}`}
            />
          </Fragment>
        )}

        {patient.category && patient.category === "Pneumoconiosis" && (
          <Fragment>
            <StepButton
              text={` Edit Patient`}
              icon={faStethoscope}
              toLink={`/patient/pneumo/${routeId}`}
            />
          </Fragment>
        )}

        {patient.category && patient.category === "City Of Harare" && (
          <Fragment>
            <StepButton
              text={` Edit Patient`}
              icon={faStethoscope}
              toLink={`/patient/foodhandler/${routeId}`}
            />
          </Fragment>
        )}
      </ul>
    </Fragment>
  );
};

export default PButtons;

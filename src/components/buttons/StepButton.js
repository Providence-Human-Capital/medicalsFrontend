import React from "react";
import "./StepButton.css";
import {
  faUser,
  faXRay,
  faStethoscope,
  faHeartbeat,
  faSmoking,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";

const StepButton = ({ text, icon, toLink }) => {
  return (
    <li className="step-button">
      <NavLink to={toLink}>
        <button
          class="button"
          style={{
            borderRadius: "20px",
          }}
        >
          <span className="saveico">
            <FontAwesomeIcon color="#172b4c" icon={icon} />
          </span>
          {text}
        </button>
      </NavLink>
    </li>
  );
};

export default StepButton;

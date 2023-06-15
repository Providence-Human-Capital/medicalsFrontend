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
        <button class="button">
          {/* <svg
        class="saveicon"
        stroke="currentColor"
        stroke-width="1.7"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg> */}
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

import React from "react";
// import "./NavButton.css";
import { Link } from "react-router-dom";
import "./ExportExcelCss.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserInjured } from "@fortawesome/free-solid-svg-icons";

const NavButton = ({ text, to }) => {
  return (
    <>
      <Link to={to}>
        <button>
          <span>
            <FontAwesomeIcon icon={faUserInjured} /> {"  "}{" "}
            <span className="label-span">
              <strong>{text}</strong>
            </span>
          </span>
        </button>
      </Link>
    </>
  );
};

export default NavButton;

import React, { Fragment } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ExportExcelCss.css";

const FormButton = ({ direction, text, onClick }) => {
  return (
    <>
      <button style={{
        borderRadius: "0.9em",
        padding: "0.8em 1.2em 0.8em 1em",
        backgroundColor: "#58ad46"
      }}
      onClick={onClick}
      >
        <span>
          {direction === "left" ? (
            <Fragment>
              <FontAwesomeIcon
                icon={direction === "left" ? faArrowLeft : faArrowRight}
              />{" "}
              <span className="label-span">
                <strong>{text}</strong>
              </span>
            </Fragment>
          ) : (
            <Fragment>
              <span className="label-span">
                <strong>{text}</strong>
              </span>{" "}{" "}
              <FontAwesomeIcon
                icon={direction === "left" ? faArrowLeft : faArrowRight}
              />
            </Fragment>
          )}
        </span>
      </button>
    </>
  );
};

export default FormButton;

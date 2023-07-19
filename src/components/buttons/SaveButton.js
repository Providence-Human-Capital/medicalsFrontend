import React from "react";
import "./SaveButton.css";

const SaveButton = ({ text, disable, onClick }) => {
  return (
    <>
      <button className="button2" disabled={disable} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default SaveButton;

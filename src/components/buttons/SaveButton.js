import React from "react";
import "./SaveButton.css";

const SaveButton = ({ text, disable }) => {
  return (
    <>
      <button class="button2" disabled={disable}>
        {text}
      </button>
    </>
  );
};

export default SaveButton;

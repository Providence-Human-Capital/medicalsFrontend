import React from "react";

const ErrorBox = ({ error }) => {
  return <div className="alert alert-danger">{error}</div>;
};

export default ErrorBox;

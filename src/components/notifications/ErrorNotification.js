import React, { Fragment, useEffect, useState } from "react";

const ErrorNotification = ({ message }) => {
  return (
    <Fragment>
      <div className="error-alert" style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}>
        <span className="error-message"> {message}</span>
      </div>
    </Fragment>
  );
};
export default ErrorNotification;

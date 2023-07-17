import React, { Fragment, useEffect, useState } from "react";

const ErrorNotification = ({ message }) => {
  return (
    <Fragment>
      <div className="error-alert">
        <span className="error-message"> {message}</span>
        <button className="close-btn">&times;</button>
      </div>
    </Fragment>
  );
};
export default ErrorNotification;

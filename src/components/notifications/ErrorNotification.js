import React, { Fragment, useEffect, useState } from "react";

const ErrorNotification = ({ message }) => {
  return (
    <Fragment>
      <div class="error-alert">
        <span class="error-message"> {message}</span>
        <button class="close-btn">&times;</button>
      </div>
    </Fragment>
  );
};
export default ErrorNotification;

import React, { Fragment, useEffect, useState } from "react";

const ErrorNotification = () => {
  return (
    <Fragment>
      <div class="error-alert">
        <span class="error-message">Error Message</span>
        <button class="close-btn">&times;</button>
      </div>
    </Fragment>
  );
};
export default ErrorNotification;

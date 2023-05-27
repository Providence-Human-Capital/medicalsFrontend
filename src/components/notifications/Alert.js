import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../redux_store/ui-store";

const Alert = ({ message }) => {
  const dispatch = useDispatch();

  const closeAlert = () => {
    dispatch(
      uiActions.setAlert({
        setAlert: false,
      })
    );
  };

  return (
    <Fragment>
      <div class="alert success">
        <span class="closebtn" onClick={closeAlert}>
          &times;
        </span>
        {message}
      </div>
    </Fragment>
  );
};

export default Alert;

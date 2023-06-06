import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux_store/ui-store";

const DeleteConfirmationModal = () => {
  const dispatch = useDispatch();

  const showDeleteConfirmation = useSelector(
    (state) => state.ui.showDeleteConfirmation
  );

  const handleDelete = () => {
    dispatch(uiActions.deleteItem());
  };

  const handleClose = () => {
    dispatch(uiActions.hideDeleteConfirmation());
  };

  return (
    <>
      <div
        // className={`modal ${showDeleteConfirmation ? "show" : ""}`}
        className=""
        tabIndex="-1"
        role="dialog"
      >
        <h1>Hello</h1>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;

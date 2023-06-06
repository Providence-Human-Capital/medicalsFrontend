import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../../../components/modal/DeleteConfirmationModal";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../redux_store/ui-store";
import Swal from "sweetalert2";
import { API } from "../../../config";
import { tobaccoActions } from "../../../redux_store/tobacco-store";

const TobaccoItem = ({ tobacco }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API}/tobacco/delete/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log(response);
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });

          dispatch(tobaccoActions.deleteTobacco({ id }));
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the item.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the item.",
          icon: "error",
        });
      }
    }
  };

  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{tobacco.id}</td>
        <td> {tobacco.name}</td>
        <td class="text-end">
          <Link
            to={`/tobacco/${tobacco.id}/edit`}
            class="waves-effect waves-light btn btn-primary-light btn-circle mx-5"
          >
            <span class="icon-Write">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
          </Link>
          <a
            class="waves-effect waves-light btn btn-primary-light btn-circle"
            onClick={() => handleDelete(tobacco.id)}
          >
            <span class="icon-Trash1 fs-18">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
          </a>
        </td>
      </tr>
    </Fragment>
  );
};

export default TobaccoItem;

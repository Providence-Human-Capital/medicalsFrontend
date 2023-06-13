import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { handleDeleteSkinCondition } from "../../../services/api";

const SkinConditionItem = ({ skin_condition }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    handleDeleteSkinCondition(skin_condition.id, dispatch);
  };

  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{skin_condition.id}</td>
        <td> {skin_condition.name}</td>
        <td class="text-end">
          <Link
            to={`/illnesses/${skin_condition.id}/edit`}
            class="waves-effect waves-light btn btn-primary-light btn-circle mx-5"
          >
            <span class="icon-Write">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
          </Link>
          <a
            class="waves-effect waves-light btn btn-primary-light btn-circle"
            onClick={onDelete}
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

export default SkinConditionItem;

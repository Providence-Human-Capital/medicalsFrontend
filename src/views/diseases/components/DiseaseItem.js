import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleDeleteDisease } from "../../../services/api";

const DiseaseItem = ({ disease }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    handleDeleteDisease(disease.id, dispatch);
  };
  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{disease.id}</td>
        <td> {disease.name}</td>
        <td class="text-end">
          <Link
            to={`/illnesses/${disease.id}/edit`}
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

export default DiseaseItem;
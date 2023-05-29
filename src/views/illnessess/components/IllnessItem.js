import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IllnessItem = ({ illness }) => {
  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{illness.id}</td>
        <td> {illness.illness_name}</td>
        <td class="text-end">
            <Link
              to={"/illness"}
              class="waves-effect waves-light btn btn-primary-light btn-circle"
            >
              <span class="icon-Settings-1 fs-18">
                <span class="path1"></span>
                <span class="path2"></span>
              </span>
            </Link>
            <Link
             to={`/illnesses/${illness.id}/edit`}
              class="waves-effect waves-light btn btn-primary-light btn-circle mx-5"
            >
              <span class="icon-Write">
                <span class="path1"></span>
                <span class="path2"></span>
              </span>
            </Link>
            <Link
              href="#"
              class="waves-effect waves-light btn btn-primary-light btn-circle"
            >
              <span class="icon-Trash1 fs-18">
                <span class="path1"></span>
                <span class="path2"></span>
              </span>
            </Link>
          </td>
        {/* <td>
          <div className="btn-group">
            <Link
              className="hover-primary dropdown-toggle no-caret"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-ellipsis-h"></i>
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" href="#">
                View Details
              </Link>
              <Link
                className="dropdown-item"
                to={`/illnesses/${illness.id}/edit`}
              >
                Edit
              </Link>
              <Link className="dropdown-item" href="#">
                Delete
              </Link>
            </div>
          </div>
        </td> */}
      </tr>
    </Fragment>
  );
};

export default IllnessItem;

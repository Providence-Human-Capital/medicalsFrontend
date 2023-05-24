import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IllnessItem = ({ illness }) => {
  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{illness.id}</td>
        <td> {illness.illness_name}</td>
        <td>
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
        </td>
      </tr>
    </Fragment>
  );
};

export default IllnessItem;

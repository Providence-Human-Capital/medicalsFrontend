import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TobaccoItem = ({ tobacco }) => {
  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{tobacco.id}</td>
        <td> {tobacco.name}</td>
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
            to={`/tobacco/${tobacco.id}/edit`}
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
      </tr>
    </Fragment>
  );
};

export default TobaccoItem;

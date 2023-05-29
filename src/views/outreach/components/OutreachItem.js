import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const OutreachItem = ({ patient }) => {
  const styles = {
    attendeeStyles: {
      cursor: "pointer",
    },
  };

  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{patient.id}</td>
        <td>{patient.swab_number}</td>
        <td>{patient.first_name}</td>
        <td>{patient.last_name}</td>
        <td>{patient.company}</td>
        <td>{patient.age}</td>
        <td>{patient.gender}</td>

        <td class="text-end">
          <Link
            to={"/"}
            class="waves-effect waves-light btn btn-primary-light btn-circle"
          >
            <span class="icon-Settings-1 fs-18">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
          </Link>
          <Link
            to={`/`}
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

export default OutreachItem;

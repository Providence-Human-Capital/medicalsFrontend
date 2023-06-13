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

        <td className="text-end">
          <Link
            to={"/"}
            className="waves-effect waves-light btn btn-primary-light btn-circle"
          >
            <span className="icon-Settings-1 fs-18">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </Link>
          <Link
            to={`/`}
            className="waves-effect waves-light btn btn-primary-light btn-circle mx-5"
          >
            <span className="icon-Write">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </Link>
          <Link
            href="#"
            className="waves-effect waves-light btn btn-primary-light btn-circle"
          >
            <span className="icon-Trash1 fs-18">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </Link>
        </td>
      </tr>
    </Fragment>
  );
};

export default OutreachItem;

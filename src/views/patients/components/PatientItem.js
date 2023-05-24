import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const PatientItem = ({ patient }) => {
  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{patient.id}</td>
        <td>{patient.first_name}</td>
        <td>{patient.last_name}</td>
        <td>{patient.company}</td>
        <td>{patient.company_email}</td>
        <td>{patient.date_of_birth}</td>
        <td>{patient.phone_number}</td>
        <td>{patient.employee_number}</td>
        <td>
          {" "}
          {!patient.swab_result ? (
            <span className="badge badge-danger-light">PENDING</span>
          ) : (
            <span className="badge badge-danger-light">DONE</span>
          )}{" "}
        </td>
        {!patient.last_x_ray ? <td>N/A</td> : <td>{patient.last_x_ray}</td>}
        <td>
          <span className="badge badge-danger-light">PENDING</span>
        </td>

        <td>
          <div className="btn-group">
            <Link
              className="hover-primary dropdown-toggle no-caret"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-ellipsis-h"></i>
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to={`${patient.id}`}>
                View Details
              </Link>
              <Link className="dropdown-item" to={"edit"}>
                Edit
              </Link>
              <Link className="dropdown-item">Delete</Link>
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default PatientItem;

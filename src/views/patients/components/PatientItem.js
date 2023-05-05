import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const PatientItem = ({ patient }) => {
  const {
    id,
    first_name,
    last_name,
    company,
    company_email,
    date_of_birth,
    phone_number,
    employee_number,
    last_x_ray,
    certificate_status,
    swab_status,
  } = patient;
  return (
    <Fragment>
      <tr class="hover-primary">
        <td>{id}</td>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{company}</td>
        <td>{company_email}</td>
        <td>{date_of_birth}</td>
        <td>{phone_number}</td>
        <td>{employee_number}</td>
        <td>
          {" "}
          <span class="badge badge-danger-light">{swab_status}</span>{" "}
        </td>
        <td>{last_x_ray}</td>
        <td>
          <span class="badge badge-danger-light">{certificate_status}</span>
        </td>

        <td>
          <div class="btn-group">
            <Link
              class="hover-primary dropdown-toggle no-caret"
              data-bs-toggle="dropdown"
            >
              <i class="fa fa-ellipsis-h"></i>
            </Link>
            <div class="dropdown-menu">
              <Link class="dropdown-item" to={`${id}`}>
                View Details
              </Link>
              <Link class="dropdown-item" to={"edit"}>
                Edit
              </Link>
              <Link class="dropdown-item">Delete</Link>
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default PatientItem;

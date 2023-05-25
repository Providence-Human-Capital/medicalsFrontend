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
        <td>{ patient.id }</td>
        <td>{ patient.swab_number }</td>
        <td>{ patient.first_name }</td>
        <td>{ patient.last_name }</td>
        <td>{ patient.company }</td>
        <td>{ patient.age }</td>
        <td>{ patient.gender}</td>

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
              <Link className="dropdown-item" to={`/companies/1/edit`}>
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


export default OutreachItem

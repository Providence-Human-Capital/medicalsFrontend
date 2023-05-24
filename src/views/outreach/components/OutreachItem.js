import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const OutreachItem = ({}) => {
  const styles = {
    attendeeStyles: {
      cursor: "pointer",
    },
  };

  return (
    <Fragment>
      <tr className="hover-primary">
        <td>1</td>
        <td>21</td>
        <td>Tafadzwa</td>
        <td>Gashira</td>
        <td>Colcom</td>
        <td>24</td>
        <td>Male</td>

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

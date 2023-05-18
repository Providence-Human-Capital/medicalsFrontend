import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const CompanyItem = ({ company }) => {
  const styles = {
    attendeeStyles: {
      cursor: "pointer",
    },
  };

  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{company.id}</td>
        <td>{company.company_name}</td>
        <td>{company.address}</td>
        <td>{company.site_telephone}</td>
        <td>{company.company_email}</td>
        <td>{company.contact_person}</td>
        <td>{company.province}</td>
        <td>{company.designation}</td>
        <td>{company.contact_number}</td>
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
                to={`/companies/${company.id}/edit`}
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

export default CompanyItem;

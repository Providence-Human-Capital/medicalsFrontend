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
             to={`/companies/${company.id}/edit`}
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
                to={`/companies/${company.id}/edit`}
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

export default CompanyItem;

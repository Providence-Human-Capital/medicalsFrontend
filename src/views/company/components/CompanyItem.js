import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { companyActions } from "../../../redux_store/company-store";
import { SwalDeleted } from "../../../hooks/constants";
import { API } from "../../../config";
import Swal from "sweetalert2";

const CompanyItem = ({ company, index }) => {
  const styles = {
    attendeeStyles: {
      cursor: "pointer",
    },
  };

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API}/company/delete/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log(response);
          Swal.fire(SwalDeleted);

          dispatch(companyActions.deleteCompany({ id }));
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the item.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the item.",
          icon: "error",
        });
      }
    }
  };

  return (
    <Fragment>
      <tr className="hover-primary" style={{
            overflow: "auto"
          }}>
        <td>{index + 1}</td>
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
          <a
            class="waves-effect waves-light btn btn-primary-light btn-circle"
            onClick={() => handleDelete(company.id)}
          >
            <span class="icon-Trash1 fs-18">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
          </a>
        </td>
      </tr>
    </Fragment>
  );
};

export default CompanyItem;

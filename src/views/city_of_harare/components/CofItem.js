import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { formatDate } from "../../../helpers/helpers";
import { handleDelete } from "../../../services/api";
import SwabResultDropdown from "../../patients/components/SwabResultDropdown";
import { Link } from "react-router-dom";

const CofItem = ({ patient }) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    handleDelete(patient.id, dispatch);
  };
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
          {patient.swabs.length !== 0 ? (
            <SwabResultDropdown
              patientId={patient.id}
              initialSwabResult={`${patient.swabs[0].status}`}
            />
          ) : (
            <SwabResultDropdown
              patientId={patient.id}
              initialSwabResult={"PENDING"}
            />
          )}
        </td>

        {(patient.last_x_ray === "N/A") | (patient.last_x_ray === null) ? (
          <td>N/A</td>
        ) : (
          <td>
            <strong>{formatDate(patient.last_x_ray)}</strong>
          </td>
        )}
        <td>
          <span className="badge badge-danger">PENDING</span>
        </td>

        <td class="text-end">
          <Link
            to={`${patient.id}`}
            class="waves-effect waves-light btn btn-primary-light btn-circle"
          >
            <span class="icon-Settings-1 fs-18">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
          </Link>

          <a
            onClick={onDelete}
            class="waves-effect waves-light btn btn-primary-light btn-circle"
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

export default CofItem;

import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { PHYSICAL_EXAM, formatDate } from "../../../helpers/helpers";
import { handleDeletePatient } from "../../../services/api";
import { Link } from "react-router-dom";
import SwabResultDropdown from "../../patients/components/SwabResultDropdown";

const IndustryItem = ({ patient, index  }) => {
  const dispatch = useDispatch();
  
  const onDelete = () => {
    handleDeletePatient(patient.id, dispatch);
  };
  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{ index + 1}</td>
        <td>{patient.first_name}</td>
        <td>{patient.last_name}</td>
        <td>{patient.company}</td>
        <td>{patient.company_email}</td>
        <td>{patient.date_of_birth}</td>
        <td>{patient.phone_number}</td>
        <td>{patient.employee_number}</td>

        {/* <td>
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
        </td> */}

        {(patient.last_x_ray === "N/A") | (patient.last_x_ray === null) ? (
          <td>N/A</td>
        ) : (
          <td>
            <strong>{formatDate(patient.last_x_ray)}</strong>
          </td>
        )}
        <td>{PHYSICAL_EXAM(patient.certificate_status)}</td>

        <td class="text-end">
          <Link
            to={`/patients/${patient.id}`}
            class="waves-effect waves-light btn btn-primary-light btn-circle"
          >
            <span class="icon-Settings-1 fs-18">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
          </Link>

          <Link
            to={`/patients/edit/${patient.id}`}
            class="waves-effect waves-light btn btn-warning-light btn-circle mx-5"
          >
            <span class="icon-Write">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
          </Link>

          <a
            onClick={onDelete}
            class="waves-effect waves-light btn btn-danger-light btn-circle"
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

export default IndustryItem;

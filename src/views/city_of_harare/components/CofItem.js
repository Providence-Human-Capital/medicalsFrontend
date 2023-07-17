import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { formatDate } from "../../../helpers/helpers";
import { handleDeletePatient } from "../../../services/api";
import SwabResultDropdown from "../../patients/components/SwabResultDropdown";
import { Link } from "react-router-dom";

const CofItem = ({ patient }) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    handleDeletePatient(patient.id, dispatch);
  };

  const { certificate_status } = patient;

  const PHYSICAL_EXAM = () => {
    if (certificate_status === "PENDING") {
      return (
        <span className="badge badge-pill badge-primary">
          <strong>{certificate_status}</strong>
        </span>
      );
    } else if (certificate_status === "READY") {
      return (
        <span className="badge badge-pill badge-success">
          <strong>{certificate_status}</strong>
        </span>
      );
    } else if (certificate_status === "MONITORING") {
      return (
        <span className="badge badge-pill badge-warning">
          <strong>{certificate_status}</strong>
        </span>
      );
    } else {
      return (
        <span className="badge badge-pill badge-success">
          <strong>{certificate_status}</strong>
        </span>
      );
    }
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
        <td>{PHYSICAL_EXAM()}</td>

        <td className="text-end">
          <Link
            to={`/patients/${patient.id}`}
            className="waves-effect waves-light btn btn-primary-light btn-circle"
          >
            <span className="icon-Settings-1 fs-18">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </Link>

          <a
            onClick={onDelete}
            className="waves-effect waves-light btn btn-primary-light btn-circle"
          >
            <span className="icon-Trash1 fs-18">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </a>
        </td>
      </tr>
    </Fragment>
  );
};

export default CofItem;

// style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"

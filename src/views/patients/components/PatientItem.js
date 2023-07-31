import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { patientActions } from "../../../redux_store/patients-store";
import { API } from "../../../config";
import { attendeeActions } from "../../../redux_store/attendee-store";
import SwabResultDropdown from "./SwabResultDropdown";
import { PHYSICAL_EXAM } from "../../../helpers/helpers";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = "";
  if (dateString.length > 4) {
    month = date.toLocaleString("default", { month: "long" });
  }
  return `${month.toUpperCase()} ${year}`;
};

const PatientItem = ({ patient }) => {
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
        const response = await fetch(`${API}/patient/delete/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log(response);
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });

          dispatch(patientActions.deletePatient({ id }));
          dispatch(attendeeActions.deleteAttendee({ id }));
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
      <tr className="hover-primary">
        <td>{patient.id}</td>
        <td>{patient.first_name}</td>
        <td>{patient.last_name}</td>
        <td>{patient.company}</td>
        <td>{patient.national_id}</td>
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
        <td>{PHYSICAL_EXAM(patient.certificates[0].status)}</td>

        <td className="text-end">
          <Link
            to={`${patient.id}`}
            className="waves-effect waves-light btn btn-primary-light btn-circle"
          >
            <span className="icon-Settings-1 fs-18">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </Link>

          <a
            onClick={() => handleDelete(patient.id)}
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

export default PatientItem;

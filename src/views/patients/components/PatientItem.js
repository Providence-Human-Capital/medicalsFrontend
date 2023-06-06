import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { patientActions } from "../../../redux_store/patients-store";
import { API } from "../../../config";
import { attendeeActions } from "../../../redux_store/attendee-store";

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
        <td>{patient.company_email}</td>
        <td>{patient.date_of_birth}</td>
        <td>{patient.phone_number}</td>
        <td>{patient.employee_number}</td>
        <td>
          {" "}
          {!patient.swab_result ? (
            <span className="badge badge-danger-light">PENDING</span>
          ) : (
            <span className="badge badge-danger-light">DONE</span>
          )}{" "}
        </td>
        {!patient.last_x_ray ? <td>N/A</td> : <td>{patient.last_x_ray}</td>}
        <td>
          <span className="badge badge-danger-light">PENDING</span>
        </td>

        <td>
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
            <Link
              to={"edit"}
              class="waves-effect waves-light btn btn-primary-light btn-circle mx-5"
            >
              <span class="icon-Write">
                <span class="path1"></span>
                <span class="path2"></span>
              </span>
            </Link>
            <a
              onClick={() => handleDelete(patient.id)}
              class="waves-effect waves-light btn btn-primary-light btn-circle"
            >
              <span class="icon-Trash1 fs-18">
                <span class="path1"></span>
                <span class="path2"></span>
              </span>
            </a>
          </td>
        </td>
      </tr>
    </Fragment>
  );
};

export default PatientItem;

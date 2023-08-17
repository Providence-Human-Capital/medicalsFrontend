import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { API } from "../../../config";
import Swal from "sweetalert2";
import { patientActions } from "../../../redux_store/patients-store";
import { attendeeActions } from "../../../redux_store/attendee-store";

const AttendeeItem = ({ attendee }) => {
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
        const response = await fetch(`${API}/attendee/delete/${id}`, {
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

  const [showPopup, setShowPopup] = useState(false);
  const [xRayStatus, setXRayStatus] = useState("DONE");

  const handlePopupClick = (status) => {
    setXRayStatus(status);
    setShowPopup(false);
  };

  const timeOfEntry = attendee.time_of_entry;
  const formattedTime = new Date(timeOfEntry).toLocaleTimeString([], {
    timeStyle: "short",
  });

  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{attendee.id}</td>
        <td>{attendee.swab_number}</td>
        <td>{attendee.company.company_name}</td>
        <td>{attendee.first_name}</td>
        <td>{attendee.last_name}</td>
        <td>
          {attendee.x_ray_status === "PENDING" ? (
            <span class="badge badge-danger">
              <strong>{attendee.x_ray_status}</strong>
            </span>
          ) : (
            <span class="badge badge-success">
              <strong>{attendee.x_ray_status}</strong>
            </span>
          )}
        </td>
        <td> {formattedTime}</td>

        <td>{attendee.age}</td>
        <td>{attendee.gender}</td>
        <td>{attendee.national_id}</td>
        <td>{attendee.phone_number}</td>
        <td class="text-end">
          <Link
            to={`/patients/${attendee.id}`}
            class="waves-effect waves-light btn btn-primary-light btn-circle"
          >
            <span class="icon-Settings-1 fs-18">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
          </Link>
          <Link
            to={`/`}
            class="waves-effect waves-light btn btn-primary-light btn-circle mx-5"
          >
            <span class="icon-Write">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
          </Link>
          <a
            onClick={() => handleDelete(attendee.id)}
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

export default AttendeeItem;

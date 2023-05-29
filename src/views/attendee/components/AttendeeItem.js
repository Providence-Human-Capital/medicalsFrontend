import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const AttendeeItem = ({ attendee }) => {
  const styles = {
    attendeeStyles: {
      cursor: "pointer",
    },
  };

  const [showPopup, setShowPopup] = useState(false);
  const [xRayStatus, setXRayStatus] = useState("DONE");

  const handlePopupClick = (status) => {
    setXRayStatus(status);
    setShowPopup(false);
  };

  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{attendee.id}</td>
        <td>{attendee.swab_number}</td>
        <td>{attendee.company.company_name}</td>
        <td>{attendee.first_name}</td>
        <td>{attendee.last_name}</td>
        <td>
          <span class="badge badge-success-light">{attendee.x_ray_status}</span>
        </td>
        <td>{attendee.time_of_entry}</td>

        <td>{attendee.age}</td>
        <td>{attendee.gender}</td>
        <td>{attendee.national_id}</td>
        <td>{attendee.phone_number}</td>
        <td class="text-end">
            <Link
              to={"/"}
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
      </tr>
    </Fragment>
  );
};

export default AttendeeItem;

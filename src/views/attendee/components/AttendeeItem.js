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
        <td>
          <div class="btn-group">
            <Link
              class="hover-primary dropdown-toggle no-caret"
              data-bs-toggle="dropdown"
            >
              <i class="fa fa-ellipsis-h"></i>
            </Link>
            <div class="dropdown-menu">
              <Link class="dropdown-item" href="#">
                View Details
              </Link>
              <Link class="dropdown-item" href="#">
                Edit
              </Link>
              <Link class="dropdown-item" href="#">
                Delete
              </Link>
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default AttendeeItem;

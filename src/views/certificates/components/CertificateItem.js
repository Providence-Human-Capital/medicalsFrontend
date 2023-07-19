import React, { Fragment } from "react";
import { API } from "../../../config";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const CertificateItem = ({ item }) => {
  const deleteBatchItem = async (batchItemId) => {
    try {
      const response = await fetch(`${API}/batch/item/${batchItemId}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: responseData.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "An error occurred",
        icon: "error",
      });
    }
  };

  const handleDeleteBatchItem = (batchItemId) => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete this batch item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBatchItem(batchItemId);
      }
    });
  };
  return (
    <Fragment>
      <tr>
        <td>{item.id}</td>
        <td>{item.patient.attendee.first_name}</td>
        <td>{item.patient.attendee.last_name}</td>
        <td>{item.patient.attendee.gender}</td>
        <td>
          <span class="badge badge-warning">{item.status}</span>
        </td>
        <td>{item.patient.exam_purpose}</td>
        <td>{item.patient.attendee.national_id}</td>
        <td>
          <span class="badge badge-success">
            {item.patient.attendee.phone_number}
          </span>
        </td>
        <td>{item.patient.referral === 0 ? "NO" : "YES"}</td>
        <td>{item.validity} Year</td>
        <td>
          <a
            onClick={() => handleDeleteBatchItem(item.id)}
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

export default CertificateItem;

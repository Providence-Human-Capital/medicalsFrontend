import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { patientActions } from "../../../redux_store/patients-store";
import { API } from "../../../config";
import { attendeeActions } from "../../../redux_store/attendee-store";
import SwabResultDropdown from "./SwabResultDropdown";
import { PHYSICAL_EXAM } from "../../../helpers/helpers";
import {
  doctorManualCertificateUpdate,
  getAllPatients,
} from "../../../services/api";
import moment from "moment";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = "";
  if (dateString.length > 4) {
    month = date.toLocaleString("default", { month: "long" });
  }
  return `${month.toUpperCase()} ${year}`;
};

const PatientItem = ({ patient, index }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const updateCertificateStatus = async (certificateId) => {
    Swal.fire({
      title: "UPDATE CERTIFICATE STATUS",
      width: "700px",
      html: `
        <div class="form-floating">
          <select id="status-select" class="form-select">
            <option value="PENDING">PENDING</option>
            <option value="MONITORING">MONITORING</option>
            <option value="READY">READY</option>
            <option value="RELEASED">RELEASED</option>
            <option value="FAILED">FAILED</option>
          </select>
          <label htmlFor="status-select">Status</label>
        </div>
        <div class="form-floating sep">
          <textarea id="update-reason" class="form-control update-reason" placeholder="Update Reason"></textarea>
          <label htmlFor="update-reason">UPDATE REASON</label>
        </div>
        <div class="form-floating sep">
          <input type="password" id="password-input" class="form-control" placeholder="Password" />
          <label htmlFor="password-input">USER PASSWORD</label>
        </div>
        <p><strong>NB</strong>: Enter Password for a successful status update!</p>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        const selectElement = document.getElementById("status-select");
        const selectedValue =
          selectElement.options[selectElement.selectedIndex].value;

        const updateReasonElement = document.getElementById("update-reason");
        const updateReason = updateReasonElement.value;

        const passwordElement = document.getElementById("password-input");
        const password = passwordElement.value;

        console.log(
          "selectedValue   " + selectedValue,
          "updateReason   " + updateReason,
          "password    " + password
        );

        return { selectedValue, updateReason, password };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { selectedValue, updateReason, password } = result.value;
        // Perform the necessary actions with the selectedValue, updateReason, and password
        doctorManualCertificateUpdate(
          certificateId,
          selectedValue,
          updateReason,
          password,
          token
        ).then((data) => {
          console.log(data);
          const fetchAllPatients = async () => {
            const allPatients = await getAllPatients();
            console.log(
              "allPatients from Certificate Update",
              JSON.stringify(allPatients)
            );
            dispatch(
              patientActions.setPatients({
                patients: [...allPatients],
              })
            );
          };
          fetchAllPatients();
        });
      } else {
        handleCancel();
      }
    });
  };

  const handleCancel = () => {
    Swal.close();
  };

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

  useEffect(() => {
    console.log("patient" + JSON.stringify(patient.category));
    console.log(
      "STATUS",
      patient.certificates[patient.certificates.length - 1].status
    );
  }, []);

  return (
    <Fragment>
      <tr
        className={
          patient.physical_records?.length > 0
            ? "hover-primary table-primary bolden-font"
            : "hover-primary table-warning bolden-font"
        }
      >
        <td>{index + 1}</td>
        <td>
          {patient?.certificates?.[0]?.created_at
            ? moment(patient.certificates[0].created_at).format(
                "dddd D MMMM YYYY [at] h:mm A"
              )
            : "—"}
        </td>

        <td
          style={{
            cursor: "pointer",
          }}
        >
          <Link to={`/patients/${patient.id}`}>{patient.first_name}</Link>
        </td>
        <td
          style={{
            cursor: "pointer",
          }}
        >
          <Link to={`/patients/${patient.id}`}>{patient.last_name}</Link>
        </td>
        <td>{patient.company}</td>
        <td>{patient.national_id}</td>
        <td>
          {patient.certificates[patient.certificates.length - 1]
            .certificate_location === "HARARE" ? (
            <>
              <span className="badge badge-pill badge-primary">
                {
                  patient.certificates[patient.certificates.length - 1]
                    .certificate_location
                }
              </span>
            </>
          ) : (
            <>
              <span className="badge badge-pill badge-warning">
                {
                  patient.certificates[patient.certificates.length - 1]
                    .certificate_location
                }
              </span>
            </>
          )}
        </td>
        <td>{patient.phone_number}</td>
        <td>{patient.employee_number}</td>

        {patient.category === "In House" ||
        patient.category === "Food Handler (COH)" ? (
          <td>
            {patient.swabs.length !== 0 ? (
              <SwabResultDropdown
                patientId={patient.id}
                initialSwabResult={`${
                  patient.swabs[patient.swabs.length - 1].status
                }`}
              />
            ) : (
              <SwabResultDropdown
                patientId={patient.id}
                initialSwabResult={"PENDING"}
              />
            )}
          </td>
        ) : (
          <td></td>
        )}

        {(patient.last_x_ray === "N/A") | (patient.last_x_ray === null) ? (
          <td>N/A</td>
        ) : (
          <td>
            <strong>{formatDate(patient.last_x_ray)}</strong>
          </td>
        )}
        <td>
          {/* <span
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              updateCertificateStatus(
                patient.certificates[patient.certificates.length - 1].id
              )
            }
          >
            {PHYSICAL_EXAM(
              patient.certificates[patient.certificates.length - 1].status
            )}
          </span> */}
          <span
            style={{
              cursor: "pointer",
            }}
          >
            {PHYSICAL_EXAM(
              patient.certificates[patient.certificates.length - 1].status
            )}
          </span>
        </td>

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
            onClick={() => handleDelete(patient.id)}
            className="waves-effect waves-light btn btn-danger-light btn-circle"
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

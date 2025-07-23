import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { patientActions } from "../../../redux_store/patients-store";
import { API } from "../../../config";
import { attendeeActions } from "../../../redux_store/attendee-store";
import SwabResultDropdown from "./SwabResultDropdown";
import { PHYSICAL_EXAM } from "../../../helpers/helpers";
import { doctorManualCertificateUpdate } from "../../../services/api";
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

const getAllPatients = async (
  searchTerm = "",
  location = "",
  company = "",
  swabStatus = "",
  certificateStatus = "",
  token = ""
) => {
  const queryParams = new URLSearchParams({
    search: searchTerm,
    location: location,
    company: company,
    swab_status: swabStatus,
    certificate_status: certificateStatus,
  });

  try {
    const response = await fetch(
      `${API}/patientsraw?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return {
      patients: responseData || [],
    };
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw new Error(`Failed to fetch patients: ${error.message}`);
  }
};

const PatientItem = ({ patient, index, invalidatePatients }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [swabStatus, setSwabStatus] = useState("");
  const [certificateStatus, setCertificateStatus] = useState("");
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const startNewConsultation = (patientId) => {
    Swal.fire({
      title: "START NEW CONSULTATION",
      width: "700px",
      html: `
      <div class="form-floating">
        <select id="medical-category-select" class="form-select">
          <option value="Food Handler (COH)">Food Handler</option>
          <option value="Pneumoconiosis">Pneumoconiosis</option>
          <option value="Pre-Employement">Pre-Employment</option>
          <option value="Exit-Pneumoconiosis">Exit (Pneumoconiosis)</option>
          <option value="Exit-Employment">Exit-Employment</option>
        </select>
        <label htmlFor="medical-category-select">Medical Category</label>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Start",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        const selectElement = document.getElementById(
          "medical-category-select"
        );
        const selectedValue =
          selectElement.options[selectElement.selectedIndex].value;

        console.log("Selected Medical Category: " + selectedValue);

        return { selectedValue };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { selectedValue } = result.value;

        // Show loader
        Swal.fire({
          title: "Processing...",
          html: "Please wait while we start the new medical examination.",
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        // Perform the necessary actions with the selectedValue
        renewMedicalCertificate(patientId, selectedValue)
          .then((data) => {
            console.log(data);
            // Hide loader and show success message
            Swal.close();
            Swal.fire({
              icon: "success",
              title: "Consultation Started",
              text: "The consultation has been initiated successfully.",
            });

            // Refetch patients after successful renewal
            refetchPatients();
            invalidatePatients();
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
            // Hide loader and show error message
            Swal.close();
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "There was a problem starting the consultation.",
            });
          });
      } else {
        handleCancel();
      }
    });
  };

  // Function to renew medical certificate and update category
  const renewMedicalCertificate = async (patientId, medicalCategory) => {
    try {
      const response = await fetch(`${API}/medical/${patientId}/renewal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Assuming you have a token for authentication
        },
        body: JSON.stringify({
          medicalCategory,
          certificateLocation: user?.location,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  };

  // Example function to handle cancel action

  // Example function to handle cancel action
  const handleCancel = () => {
    console.log("Consultation initiation cancelled");
    Swal.close(); // Close the SweetAlert2 modal
  };

  const refetchPatients = async () => {
    try {
      const patients = await getAllPatients(
        searchTerm,
        location,
        company,
        swabStatus,
        certificateStatus,
        token
      );
      dispatch(patientActions.setPatients(patients.patients));
    } catch (error) {
      console.error("Error refetching patients:", error);
    }
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
    // console.log("patient" + JSON.stringify(patient.category));
    // console.log(
    //   "STATUS",
    //   patient.certificates[patient.certificates.length - 1].status
    // );
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
          {patient?.latest_certificate?.created_at
            ? moment(patient.latest_certificate?.created_at).format(
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
          {patient.latest_certificate?.certificate_location === "HARARE" ? (
            <>
              <span className="badge badge-pill badge-primary">
                {patient.latest_certificate?.certificate_location}
              </span>
            </>
          ) : (
            <>
              <span className="badge badge-pill badge-warning">
                {patient.latest_certificate?.certificate_location}
              </span>
            </>
          )}
        </td>
        <td>{patient.phone_number}</td>
        <td>{patient.employee_number}</td>
        <td>{patient.category}</td>

        {(patient.last_x_ray === "N/A") | (patient.last_x_ray === null) ? (
          <td>N/A</td>
        ) : (
          <td>
            <strong>{formatDate(patient.last_x_ray)}</strong>
          </td>
        )}
        <td>{PHYSICAL_EXAM(patient.latest_certificate?.status)}</td>

        <td>
          <button
            onClick={() => startNewConsultation(patient.id)}
            className="btn btn-primary"
            title="Start new consultation"
            style={{
              borderRadius: "15px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            RENEW MEDICAL
          </button>
        </td>

        <td className="text-end space-x-2">
          {/* New Consultation */}

          {/* View Patient */}
          <Link
            to={`/patients/${patient.id}`}
            className="waves-effect waves-light btn btn-primary-light btn-circle"
            title="View Patient"
          >
            <span className="icon-Settings-1 fs-18">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </Link>

          {/* Edit Patient */}
          <Link
            to={`/patients/edit/${patient.id}`}
            className="waves-effect waves-light btn btn-warning-light btn-circle"
            title="Edit Patient"
          >
            <span className="icon-Write">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </Link>

          {/* Delete Patient */}
          <button
            onClick={() => handleDelete(patient.id)}
            className="waves-effect waves-light btn btn-danger-light btn-circle"
            title="Delete Patient"
          >
            <span className="icon-Trash1 fs-18">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default PatientItem;

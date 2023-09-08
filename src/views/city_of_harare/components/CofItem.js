import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { PHYSICAL_EXAM, formatDate } from "../../../helpers/helpers";
import {
  automaticallyAddCertificatesToDnoteAPI,
  getCityOfHarareDnoteNoneDispatched,
  handleDeletePatient,
} from "../../../services/api";
import SwabResultDropdown from "../../patients/components/SwabResultDropdown";
import { Link } from "react-router-dom";
import { API } from "../../../config";
import { certificateActions } from "../../../redux_store/certificates-store";

const CofItem = ({ patient, index }) => {
  const cityDnote =
    useSelector((state) => state.certificate.cityOfHarareDnotes) || [];
  const dispatch = useDispatch();
  const onDelete = () => {
    handleDeletePatient(patient.id, dispatch);
  };

  const { certificate_status } = patient;

  const addItemToDNote = async (certificateId) => {
    const certificateIDArray = Array.isArray(certificateId)
      ? certificateId
      : [certificateId];

    if (cityDnote) {
      Swal.fire({
        title: "Select D-Note",
        html: `
        <select id="status-select" class="form-select"> 
        <option value="">Select D NOTE</option> 
        ${cityDnote
          .map(
            (dnote) => `<option value="${dnote.name}">${dnote.name}</option>`
          )
          .join("")} 
        `,
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        focusConfirm: false,
        preConfirm: () => {
          const selectElement = document.getElementById("status-select");
          const selectedValue =
            selectElement.options[selectElement.selectedIndex].value;
          return selectedValue;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedValue = result.value;
          automaticallyAddCertificatesToDnoteAPI(
            selectedValue,
            certificateIDArray
          );
        } else {
          handleCancel();
        }
      });
    }
  };

  const handleCancel = () => {
    Swal.close();
  };
  useEffect(() => {
    getCityOfHarareDnoteNoneDispatched().then((cityDnote) => {
      dispatch(certificateActions.setCityOfHarareDnotes([...cityDnote]));
    });
  }, []);

  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{index + 1}</td>
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
        <td>
          {patient.certificates && (
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => addItemToDNote(patient.certificates[0].id)}
            >
              {PHYSICAL_EXAM(certificate_status)}
            </span>
          )}
        </td>

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

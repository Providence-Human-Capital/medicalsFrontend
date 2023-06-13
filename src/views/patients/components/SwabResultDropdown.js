import React, { Fragment, useState } from "react";
import { API } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../redux_store/ui-store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../components/loader/Loading";
import { getAllPatients } from "../../../services/api";
import Swal from "sweetalert2";

import { patientActions } from "../../../redux_store/patients-store";

const SwabResultDropdown = ({ patientId, initialSwabResult }) => {
  const [swabStatus, setSwabStatus] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);

  const getAllPatients = async () => {
    const patiencesResponse = await fetch(`${API}/patient`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const responseData = await patiencesResponse.json();
    console.log("All Patients", responseData.data);
    const patients = responseData.data;

    dispatch(
      patientActions.setPatients({
        patients: [...patients],
      })
    );
  };

  const handleSave = async (selectedValue) => {
    dispatch(
      uiActions.setLoadingSpinner({
        isLoading: true,
      })
    );
    try {
      console.log("Swab Status", swabStatus);
      const response = await fetch(`${API}/patients/${patientId}/swab/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: selectedValue }),
      });
      if (response.ok) {
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        );
        getAllPatients();
        Swal.fire("Success!", "Status updated successfully.", "success");
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error) {
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: false,
        })
      );
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleCancel = () => {
    Swal.close();
  };

  const handleUpdateStatusClick = () => {
    Swal.fire({
      title: "Update Status",
      html: `
       <select id="status-select" class="form-select"> 
          <option value="PENDING">PENDING</option> 
          <option value="DONE">DONE</option> 
        </select> 
       `,

      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        const selectElement = document.getElementById("status-select");
        const selectedValue =
          selectElement.options[selectElement.selectedIndex].value;
        console.log("HELLO", selectedValue);
        return selectedValue; // return the selected value directly
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedValue = result.value; // get the selected value from the result
        handleSave(selectedValue); // pass the selected value directly to handleSave
      } else {
        handleCancel();
      }
    });
  };

  return (
    <Fragment>
      <span
        className={`badge  cursor-style ${
          initialSwabResult === "PENDING" ? "badge-danger" : "badge-success"
        }`}
        onClick={handleUpdateStatusClick}
      >
        {initialSwabResult}
      </span>
    </Fragment>
  );
};
export default SwabResultDropdown;
import { API } from "../config";

import Swal from "sweetalert2";
import { patientActions } from "../redux_store/patients-store";
import { attendeeActions } from "../redux_store/attendee-store";
import { uiActions } from "../redux_store/ui-store";

export const getPatientPhysicalExamResults = async (patientId) => {
  const responseData = await fetch(`${API}/patient/illnesses/${patientId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await responseData.json();

  return response;
};

export const getAllPatients = async () => {
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
  return patients;
};

export const getPneumoPatients = async () => {
  const patiencesResponse = await fetch(`${API}/patients/pneumoconiosis`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await patiencesResponse.json();
  console.log("Pneumo Patients", responseData.data);

  const patients = responseData.data;
  return patients;
};

export const getCofHPatients = async () => {
  const patiencesResponse = await fetch(`${API}/patients/cityofharare`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await patiencesResponse.json();
  console.log("City of Harare", responseData.data);

  const patients = responseData.data;
  return patients;
};

export const getIndustryPatients = async () => {
  const patiencesResponse = await fetch(`${API}/patients/industry`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await patiencesResponse.json();
  console.log("Industry", responseData.data);

  const patients = responseData.data;
  return patients;
};

export const getPatient = async (patientId) => {
  try {
    const responseData = await fetch(`${API}/patient/illnesses/${patientId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const response = await responseData.json();
    console.log("Get Patient", response.data);

    if (responseData.ok) {
      return response.data;
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const handleDelete = async (id, dispatch) => {
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

import { API } from "../config";

import Swal from "sweetalert2";
import { patientActions } from "../redux_store/patients-store";
import { attendeeActions } from "../redux_store/attendee-store";
import { uiActions } from "../redux_store/ui-store";
import { illnessActions } from "../redux_store/illness-store";

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

export const getPatientMedicalRecords = async (patientId) => {
  const recordsResponse = await fetch(`${API}/patient/${patientId}/medical/record`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await recordsResponse.json();
  console.log("Patient Records", responseData.data);

  const records = responseData.data;
  return records; 
}

export const getAllAttendees = async () => {
  const attendeesResponse = await fetch(`${API}/attendee`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await attendeesResponse.json();
  console.log("All Attendees: " + responseData);
  const attendees = responseData.data;
  return attendees;
};

export const getIndustryPatientDetails = async (patientId) => {
  const patientDetailResponse = await fetch(
    `${API}/patient/${patientId}/industry`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await patientDetailResponse.json();
  const patientDetail = responseData;
  return patientDetail;
};
export const getPneumoPatientDetails = async (patientId) => {
  const patientDetailResponse = await fetch(
    `${API}/patient/${patientId}/pneumoconiosis`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await patientDetailResponse.json();
  const patientDetail = responseData;
  return patientDetail;
};
export const getFoodHandlerPatientDetails = async (patientId) => {
  const patientDetailResponse = await fetch(
    `${API}/patient/${patientId}/foodhandler`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await patientDetailResponse.json();
  const patientDetail = responseData;
  return patientDetail;
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

export const getCompanies = async () => {
  const companiesResponse = await fetch(`${API}/company`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await companiesResponse.json();

  const companies = responseData.data;
  return companies;
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

export const handleDeletePatient = async (id, dispatch) => {
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

export const getSkinConditions = async () => {
  const skinConditionsResponseData = await fetch(`${API}/skin_conditions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await skinConditionsResponseData.json();
  const skin_conditions = responseData.data;
  console.log("Skin Conditions", skin_conditions);
  return skin_conditions;
};

export const getDiseases = async () => {
  const diseasesResponseData = await fetch(`${API}/diseases`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await diseasesResponseData.json();
  const disease = responseData.data;
  return disease;
};

export const getAuscultates = async () => {
  const auscultatesResponseData = await fetch(`${API}/auscultates`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await auscultatesResponseData.json();
  const auscultate = responseData.data;
  return auscultate;
};

export const getIllnesses = async () => {
  const illnessesResponseData = await fetch(`${API}/illness`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await illnessesResponseData.json();
  const illnesses = responseData.data;
  return illnesses;
};
const DELETE_CONFIRMATION = {
  title: "Are you sure?",
  text: "You will not be able to recover this item!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel",
  reverseButtons: true,
};

const API_ROUTES = {
  illness: `${API}/illness/delete/`,
  skinCondition: `${API}/skin_condition/delete/`,
  disease: ` ${API}/diseases/delete/ `,
  auscultate: `${API}/auscultate/delete/`,
};

const handleDelete = async (id, dispatch, type) => {
  const result = await Swal.fire(DELETE_CONFIRMATION);
  if (result.isConfirmed) {
    try {
      const response = await fetch(API_ROUTES[type] + id, {
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

        dispatch(
          illnessActions[
            `delete${type.charAt(0).toUpperCase() + type.slice(1)}`
          ]({ id })
        );
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

export const handleDeleteIllness = async (id, dispatch) => {
  handleDelete(id, dispatch, "illness");
};

export const handleDeleteSkinCondition = async (id, dispatch) => {
  handleDelete(id, dispatch, "skinCondition");
};

export const handleDeleteDisease = async (id, dispatch) => {
  handleDelete(id, dispatch, "disease");
};

export const handleDeleteAuscultates = async (id, dispatch) => {
  handleDelete(id, dispatch, "auscultate");
};

export const getPatientsIllnessStatistics = async (year) => {
  try {
    const response = await fetch(`${API}/patient-counts/illness/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllTobaccos = async () => {
  const tobaccoResponse = await fetch(`${API}/tobacco`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await tobaccoResponse.json();
  const tobaccos = responseData.data;
  return tobaccos;
};
export const getPatientsTobaccouseStatistics = async (year) => {
  try {
    const response = await fetch(`${API}/patient-counts/tobacco/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPatientsAuscultateStatistics = async (year) => {
  try {
    const response = await fetch(`${API}/patient-counts/auscultate/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPatientsDiseasesStatistics = async (year) => {
  try {
    const response = await fetch(`${API}/patient-counts/disease/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPatientStatistics = async (year) => {
  try {
    const response = await fetch(`${API}/patient-counts/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Patient Statistics", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getActivityByDay = async () => {
  try {
    const response = await fetch(`${API}/activity-by-day`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const activityData = await response.json();
    return activityData;
  } catch (error) {
    console.log(error);
  }
};

export const getPatientReportByDay = async () => {
  try {
    const response = await fetch(`${API}/activity-by-day/report`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const patientReportData = await response.json();
    return patientReportData;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentPatientRemarks = async (patientId) => {
  try {
    const response = await fetch(`${API}/patients/${patientId}/latest-remark`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLatestPatientXray = async (patientId) => {
  try {
    const response = await fetch(`${API}/patients/${patientId}/latest-xray`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Xray Data", data);
    return data.latest_xray;
  } catch (error) {
    console.log(error);
  }
};

//Certificate Batch Methods
export const createCertificateBatch = async (companyId) => {
  try {
    const response = await fetch(
      `${API}/certificate/batch/${companyId}/create`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

// Add Item to Batch

export const addCertificateToBatch = async (batchId, certificateId) => {
  try {
    const response = await fetch(
      `${API}/certificate/batch/${batchId}/${certificateId}/add`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCertificateBatch = async (batchId) => {
  try {
    const response = await fetch(`${API}/certificate/batch/${batchId}/get`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const dispatchCertificateBatch = async (batchId) => {
  try {
    const response = await fetch(
      `${API}/certificate/batch/${batchId}/dispatch`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const calculateDaysLeftForCertificateValidity = async (patientId) => {
  try {
    const response = await fetch(`${API}/certificate/${patientId}/days/left`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const companiesWithCertificateBatches = async () => {
  try {
    const response = await fetch(`${API}/company/with/batches`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const chechCertificatesStatusUpdate = async (patientId) => {
  try {
    const response = await fetch(
      `${API}/patient/${patientId}/certificate/status`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLatestClients = async () => {
  try {
    const response = await fetch(`${API}/latest/patients`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    } else {
      throw new Error("Failed to fetch latest patients");
    }
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const getClientsDueForMedicals = async () => {
  try {
    const response = await fetch(`${API}/due/medicals`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    } else {
      throw new Error("Failed to fetch latest patients");
    }
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};
export const getCompanyClientsDueForMedicals = async (companyId) => {
  try {
    const response = await fetch(`${API}/company/due/medicals/${companyId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    } else {
      throw new Error("Failed to fetch latest patients");
    }
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const getCompanyAttendanceStats = async (companyId, year) => {
  try {
    const response = await fetch(
      `${API}/company/${companyId}/clients/stats/${year}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error("Failed to fetch stats");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllCompanyClients = async (companyId) => {
  try {
    const response = await fetch(`${API}/company/${companyId}/clients`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    } else {
      throw new Error("Failed to fetch stats");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGeneralCompanyStats = async (companyId) => {
  try {
    const response = await fetch(`${API}/company/${companyId}/general/stats`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getClientsCountByExamType = async (companyId, year) => {
  try {
    const response = await fetch(
      `${API}/company/${companyId}/clients/purpose/${year}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const companyBloodPressureStats = async (companyId, year) => {
  try {
    const response = await fetch(
      `${API}/company/${companyId}/bloodpressure/${year}/stats`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const companyBMIStats = async (companyId, year) => {
  try {
    const response = await fetch(
      `${API}/company/${companyId}/bmi/${year}/stats`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCityOfHarareDNote = async () => {
  try {
    const response = await fetch(`${API}/latest/cofh/dnote`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllDnotes = async () => {
  try {
    const response = await fetch(`${API}/dnotes/get/all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCityOfHarareDnoteNoneDispatched = async () => {
  try {
    const response = await fetch(`${API}/dnotes/non/dispatch/coh`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTexasDnoteNonDispatched = async () => {
  try {
    const response = await fetch(`${API}/dnotes/non/dispatch/texas`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSimbisaNonDispatchedDnote = async () => {
  try {
    const response = await fetch(`${API}/dnotes/non/dispatch/simbisa`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const automaticallyAddCertificatesToDnoteAPI = async (
  dnoteName,
  certificateIds
) => {
  const requestData = {
    certificate_ids: certificateIds,
  };
  try {
    const response = await fetch(`${API}/dnote/${dnoteName}/add/certificates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log(responseData);
      Swal.fire("Success!", "Adding to Dnote successfully.", "success");
    }
  } catch (error) {
    console.log(error);
    Swal.fire("Something went wrong!", error.message, "error");
  }
};

export const doctorManualCertificateUpdate = async (
  certificateId,
  selectedValue,
  reason,
  password,
  token
) => {
  const requestBody = {
    status: selectedValue,
    password: password,
    update_reason: reason,
  };
  try {
    const response = await fetch(
      `${API}/certificates/${certificateId}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Replace 'token' with your actual token value
        },
        body: JSON.stringify(requestBody),
      }
    );
    const responseData = await response.json();
    console.log(responseData)
    if (response.ok) {
      Swal.fire("Success!", responseData.message, "success");
      getAllPatients();
    } else {
      Swal.fire("Error whilst trying to update!", responseData.error, "error");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

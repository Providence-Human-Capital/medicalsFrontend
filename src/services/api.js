import { API } from "../config";

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


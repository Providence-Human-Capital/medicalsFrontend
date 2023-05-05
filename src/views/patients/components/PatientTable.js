import React, { Fragment, useEffect, useState } from "react";
import PatientItem from "./PatientItem";
import { API } from "../../../config";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);

  const getAllPatients = async () => {
    const patiencesResponse = await fetch(`${API}/patient`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const responseData = await patiencesResponse.json();
    setPatients(responseData.data);
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <Fragment>
      <table class="table border-no" id="example1">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company</th>
            <th>Company Email</th>
            <th>Date Of Birth</th>
            <th>Phone Number</th>
            <th>Employee Number</th>
            <th>Swab Status</th>
            <th>Last X-Ray</th>
            <th>Certificate Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {patients &&
            patients.map((patient) => (
              <PatientItem key={patient.id} patient={patient} />
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default PatientTable;

import React, { Fragment, useEffect, useState } from "react";
import PatientItem from "./PatientItem";
import { API } from "../../../config";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { patientActions } from "../../../redux_store/patients-store";

const PatientTable = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;

  const allPatients = useSelector((state) => state.patient.patients) || []

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

    const patients = responseData.data

    dispatch(
      patientActions.setPatients({
        patients: [...patients]
      })
    )
  };

  useEffect(() => {
    getAllPatients();
    console.log("All Patients......")
  }, []);

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allPatients.slice(startIndex, endIndex);
  }

  return (
    <Fragment>
      <table className="table border-no" id="example1">
        <thead>
          <tr>
            <th>ID</th>
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
          { allPatients &&
            getCurrentPageData().map((patient) => (
              <PatientItem key={patient.id} patient={patient} />
            ))}
        </tbody>
      </table>
      <div className="paginate-position">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(allPatients.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(allPatients) => {
            setPageNumber(allPatients.selected);
          }}
          containerClassName={"pagination"}
          activeClassName={"active-paginate"}
        />
      </div>
    </Fragment>
  );
};

export default PatientTable;

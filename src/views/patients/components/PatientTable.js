import React, { Fragment, useEffect, useState } from "react";
import PatientItem from "./PatientItem";
import { API } from "../../../config";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { patientActions } from "../../../redux_store/patients-store";
import * as XLSX from "xlsx";
import Alert from "../../../components/notifications/Alert";
import ErrorNotification from "../../../components/notifications/ErrorNotification";

function exportToExcel(data) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
  XLSX.writeFile(workbook, "Patients.xlsx");
}


const PatientTable = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 9;

  const allPatients = useSelector((state) => state.patient.patients) || [];
  const addedNew = useSelector((state) => state.ui.showAlert);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [isSortAscending, setIsSortAscending] = useState(true);

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

  useEffect(() => {
    getAllPatients();
    console.log("All Patients......");
  }, []);

  const sortPatients = (column) => {
    if (sortColumn === column) {
      setIsSortAscending(!isSortAscending);
    } else {
      setSortColumn(column);
      setIsSortAscending(true);
    }
  };

  const sortedPatients =
    allPatients &&
    [...allPatients].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (isSortAscending) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const filteredPatients = sortedPatients.filter((patient) => {
    const regex = new RegExp(searchTerm, "gi");
    return (
      patient.first_name.match(regex) ||
      patient.last_name.match(regex) ||
      patient.company.match(regex)
    );
  });

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPatients.slice(startIndex, endIndex);
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPageNumber(0);
  };


  const handleExportClick = () => {
    exportToExcel(filteredPatients);
  };

  return (
    <Fragment>
      
      <button className="btn btn-success" onClick={handleExportClick}>
        Export to Excel
      </button>
      {addedNew && (
        <Alert message={"New Patient Has Been  Successfully Added!"} />
      )}
      <form className="form-inline custom-size mt-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="search-input"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by Company Name, First Name, Or Last name"
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="fa fa-search"></i>
            </span>
          </div>
        </div>
      </form>
      <table className="table border-no" id="example1">
        <thead>
          <tr>
            <th onClick={() => sortPatients("id")} className="pointer-style">
              ID
            </th>
            <th
              onClick={() => sortPatients("first_name")}
              className="pointer-style"
            >
              First Name
            </th>
            <th
              onClick={() => sortPatients("last_name")}
              className="pointer-style"
            >
              Last Name
            </th>
            <th
              onClick={() => sortPatients("company")}
              className="pointer-style"
            >
              Company
            </th>
            <th>Company Email</th>
            <th>Date Of Birth</th>
            <th>Phone Number</th>
            <th>Employee Number</th>
            <th>Swab Status</th>
            <th>Last X-Ray</th>
            <th>Certificate Status</th>
            <th className="fw-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPatients &&
            getCurrentPageData().map((patient) => (
              <PatientItem key={patient.id} patient={patient} />
            ))}
        </tbody>
      </table>
      <div className="table-spacing"></div>
      <div className="paginate-position">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(sortedPatients.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(sortedPatients) => {
            setPageNumber(sortedPatients.selected);
          }}
          containerClassName={"pagination"}
          activeClassName={"active-paginate"}
        />
      </div>
    </Fragment>
  );
};

export default PatientTable;

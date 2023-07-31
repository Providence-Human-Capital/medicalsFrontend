import React, { Fragment, useEffect, useState } from "react";
import PatientItem from "./PatientItem";
import { API } from "../../../config";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { patientActions } from "../../../redux_store/patients-store";
import * as XLSX from "xlsx";
import Alert from "../../../components/notifications/Alert";
import ErrorNotification from "../../../components/notifications/ErrorNotification";
import EmptyTable from "../../../components/EmptyTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../../../components/SearchBox";
import { getAllPatients } from "../../../services/api";
import {
  sortPatients,
  filterPatients,
  getCurrentPageData,
} from "../../../helpers/helpers";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";
import Loading from "../../../components/loader/Loading";

const exportToExcel = (data, setLoading) => {
  setLoading(true);
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
    XLSX.writeFile(workbook, "Patients.xlsx", () => {
      setLoading(false);
    });
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

const PatientTable = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;
  const [loading, setLoading] = useState(false);
  const allPatients = useSelector((state) => state.patient.patients) || [];
  const addedNew = useSelector((state) => state.ui.showAlert);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [isSortAscending, setIsSortAscending] = useState(true);

  useEffect(() => {
    const fetchAllPatients = async () => {
      const allPatients = await getAllPatients();
      dispatch(
        patientActions.setPatients({
          patients: [...allPatients],
        })
      );
    };
    fetchAllPatients();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setIsSortAscending(!isSortAscending);
    } else {
      setSortColumn(column);
      setIsSortAscending(true);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPageNumber(0);
  };

  const sortedPatients = sortPatients(allPatients, sortColumn, isSortAscending);
  const filteredPatients = filterPatients(sortedPatients, searchTerm);
  const currentPageData = getCurrentPageData(
    filteredPatients,
    pageNumber,
    itemsPerPage
  );

  const handleExportClick = () => {
    exportToExcel(filteredPatients, setLoading);
  };

  useEffect(() => {}, []);

  return (
    <>
      {allPatients.length === 0 ? (
        <EmptyTable />
      ) : (
        <Fragment>
          <div className="spacing">
            {loading ? (
              <Loading />
            ) : (
              <ExportExcelButton onClick={handleExportClick} />
            )}
          </div>

          <SearchBox
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            placeholderText={"Search by Company Name, First Name, Or Last name"}
          />

          <table className="table border-no" id="example1">
            <thead>
              <tr>
                <th onClick={() => handleSort("id")} className="pointer-style">
                  ID
                </th>
                <th
                  onClick={() => handleSort("first_name")}
                  className="pointer-style"
                >
                  First Name
                </th>
                <th
                  onClick={() => handleSort("last_name")}
                  className="pointer-style"
                >
                  Last Name
                </th>
                <th
                  onClick={() => handleSort("company")}
                  className="pointer-style"
                >
                  Company
                </th>
                <th>National_ID</th>
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
                currentPageData.map((patient) => (
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
      )}
    </>
  );
};

export default PatientTable;

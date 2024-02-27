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
import AdvancedSearchBox from "../../../components/AdvancedSearchBox";

const exportToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Define column widths
  const columnWidths = [];
  Object.keys(data[0]).forEach((key) => {
    columnWidths.push({ wch: 20 }); // You can adjust the width as needed
  });
  worksheet['!cols'] = columnWidths;

  const workbook = XLSX.utils.book_new();
  const headerStyle = {
    font: { bold: true },
    fill: { fgColor: { rgb: "FFFF00" } }, // Yellow background color
  };

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
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
  const [isSortAscending, setIsSortAscending] = useState(false);

  useEffect(() => {
    const fetchAllPatients = async () => {
      const allPatients = await getAllPatients();
      console.log("allPatients", JSON.stringify(allPatients));
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

  const flattenPatientsForReport = (filteredData) => {
    return filteredData.map((item) => {
      const flattendedItem = {
        "EMPLOYEE NUMBER": item.employee_number,
        "FIRST NAME": item.first_name,
        SURNAME: item.last_name,
        "NATIONAL ID": item.national_id,
        COMPANY: item.company,
        "DATE OF BIRTH": item.date_of_birth,
        AGE: item.age,
        "PHONE NUMBER": item.phone_number,
        "EXAMINATION TYPE": item.category,
      };

      return flattendedItem;
    });
  };

  const data = flattenPatientsForReport(filteredPatients);

  const handleExportClick = () => {
    exportToExcel(data, "patients.xlsx");
  };

  

  useEffect(() => {}, []);

  return (
    <>
      {allPatients.length === 0 ? (
        <EmptyTable />
      ) : (
        <Fragment>
          <div className="d-md-flex align-items-center justify-content-between mb-20">
            <SearchBox
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              placeholderText={
                "Search by Company Name, First Name, Or Last name"
              }
            />

            <div className="spacing">
              {loading ? (
                <Loading />
              ) : (
                <ExportExcelButton onClick={handleExportClick} />
              )}
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("id")}
                    className="pointer-style"
                    style={{
                      cursor: "pointer",
                    }}
                  >
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
                  currentPageData.map((patient, index) => (
                    <PatientItem
                      key={patient.id}
                      patient={patient}
                      index={index}
                    />
                  ))}
              </tbody>
            </table>
          </div>

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

import React, { Fragment, useState } from "react";
import PatientItem from "./PatientItem";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import { useQuery } from "react-query";
// import { getAllPatients } from "../../../services/api";
import {
  sortPatients,
  filterPatients,
  getCurrentPageData,
} from "../../../helpers/helpers";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";
import Loading from "../../../components/loader/Loading";
import ErrorNotification from "../../../components/notifications/ErrorNotification";
import SearchBox from "../../../components/SearchBox";
import AdvancedSearchBox from "../../../components/AdvancedSearchBox";
import EmptyTable from "../../../components/EmptyTable";
import { API } from "../../../config";

// export const getAllPatients = async (pageNumber = 1) => {
//   const patiencesResponse = await fetch(`${API}/patient?page=${pageNumber}`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });

//   const responseData = await patiencesResponse.json();
//   console.log("All Patients", responseData.data);

//   const patients = responseData.data;
//   return patients;
// };

// const getAllPatients = async (pageNumber = 1) => {
//   const response = await fetch(`${API}/patient?page=${pageNumber}`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });

//   console.log('Patients Table Response .............')
//   const responseData = await response.json();
//   console.log("All Patients", responseData);

//   // Return both patients and pagination info
//   return {
//     patients: responseData.data,
//     total: responseData?.meta?.total,
//     perPage: responseData.per_page,
//     currentPage: responseData.current_page,
//   };
// };

const getAllPatients = async (pageNumber = 1, searchTerm = "") => {
  const response = await fetch(
    `${API}/patient?page=${pageNumber}&search=${searchTerm}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await response.json();
  console.log("All Patients", responseData);

  return {
    patients: responseData.data,
    total: responseData?.meta?.total,
    perPage: responseData.per_page,
    currentPage: responseData.current_page,
  };
};

const exportToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Define column widths
  const columnWidths = [];
  Object.keys(data[0]).forEach((key) => {
    columnWidths.push({ wch: 20 }); // You can adjust the width as needed
  });
  worksheet["!cols"] = columnWidths;

  const workbook = XLSX.utils.book_new();
  const headerStyle = {
    font: { bold: true },
    fill: { fgColor: { rgb: "FFFF00" } }, // Yellow background color
  };

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
};

const PatientTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 8;
  const [selectedCompany, setSelectedCompany] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [isSortAscending, setIsSortAscending] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError, error } = useQuery(
    ["patients", pageNumber, searchTerm],
    () => getAllPatients(pageNumber, searchTerm),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000,
    }
  );

  const allPatients = data?.patients || [];
  const totalPatients = data?.total || 0;
  const currentPage = data?.currentPage || 1;
  const pageCount = Math.ceil(totalPatients / itemsPerPage);

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
    setPageNumber(1); // Reset to the first page on new search
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

  const flattenedData = flattenPatientsForReport(filteredPatients);

  const handleExportClick = () => {
    exportToExcel(flattenedData, "patients.xlsx");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorNotification message={error.message} />;
  }

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

          {/* {JSON.stringify(allPatients[0])} */}
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
                  <th>Location</th>
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
                  allPatients.map((patient, index) => (
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
            {/* <ReactPaginate
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
            /> */}

            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(selectedItem) => {
                setPageNumber(selectedItem.selected + 1); // Adjust for 1-indexed page number
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

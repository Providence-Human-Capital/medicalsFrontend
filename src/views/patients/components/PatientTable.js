import React, { Fragment, useEffect, useState } from "react";
import PatientItem from "./PatientItem";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import { useQuery } from "@tanstack/react-query";
import {
  sortPatients,
  filterPatients,
  getCurrentPageData,
} from "../../../helpers/helpers";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";
import ErrorNotification from "../../../components/notifications/ErrorNotification";
import SearchBox from "../../../components/SearchBox";
import AdvancedSearchBox from "../../../components/AdvancedSearchBox";
import EmptyTable from "../../../components/EmptyTable";
import { API } from "../../../config";
import { useSelector } from "react-redux";

const getAllCompanies = async () => {
  try {
    const response = await fetch(`${API}/company`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return responseData.data || [];
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw new Error("Failed to fetch companies. Please try again later.");
  }
};

const getAllPatients = async (
  searchTerm = "",
  location = "",
  company = "",
  swabStatus = "",
  certificateStatus = "",
  token = ""
) => {
  const queryParams = new URLSearchParams({
    search: searchTerm,
    location: location,
    company: company,
    swab_status: swabStatus,
    certificate_status: certificateStatus,
  });

  try {
    const response = await fetch(`${API}/patient?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return {
      patients: responseData?.data || [],
    };
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw new Error(`Failed to fetch patients: ${error.message}`);
  }
};

const exportToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const columnWidths = [];

  Object.keys(data[0]).forEach(() => {
    columnWidths.push({ wch: 20 });
  });

  worksheet["!cols"] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
};

const PatientTable = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [swabStatus, setSwabStatus] = useState("");
  const [certificateStatus, setCertificateStatus] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [isSortAscending, setIsSortAscending] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const {
    data: patientsData,
    isError: isPatientsError,
    error: patientsError,
    isFetching, // Use isFetching to track loading state
  } = useQuery({
    queryKey: [
      "patients",
      searchTerm,
      location,
      company,
      swabStatus,
      certificateStatus,
      token,
    ],
    queryFn: () =>
      getAllPatients(
        searchTerm,
        location,
        company,
        swabStatus,
        certificateStatus,
        token
      ),
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });

  const {
    data: companiesData,
    isError: isCompaniesError,
    error: companiesError,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getAllCompanies,
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    setIsLoading(isFetching); // Update loading state based on isFetching
  }, [isFetching]);

  const allPatients = patientsData?.patients || [];
  const totalPatients = allPatients.length;
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
    setPageNumber(0);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setPageNumber(0);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
    setPageNumber(0);
  };

  const handleSwabStatusChange = (e) => {
    setSwabStatus(e.target.value);
    setPageNumber(0);
  };

  const handleCertificateStatusChange = (e) => {
    setCertificateStatus(e.target.value);
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
    return filteredData.map((item) => ({
      "EMPLOYEE NUMBER": item.employee_number,
      "FIRST NAME": item.first_name,
      SURNAME: item.last_name,
      "NATIONAL ID": item.national_id,
      COMPANY: item.company,
      "DATE OF BIRTH": item.date_of_birth,
      AGE: item.age,
      "PHONE NUMBER": item.phone_number,
      "EXAMINATION TYPE": item.category,
    }));
  };

  const flattenedData = flattenPatientsForReport(filteredPatients);

  const handleExportClick = () => {
    exportToExcel(flattenedData, "patients.xlsx");
  };

  const handleRefresh = () => {
    setPageNumber(0);
    setSearchTerm("");
    setLocation("");
    setCompany("");
    setSwabStatus("");
    setCertificateStatus("");
  };

  useEffect(() => {
    if (searchTerm) {
      console.log("Search term changed:", searchTerm);
    }
  }, [searchTerm]);

  if (isPatientsError || isCompaniesError) {
    return (
      <ErrorNotification message={(patientsError || companiesError).message} />
    );
  }

  return (
    <Fragment>
      <div>
        <div className="d-md-flex align-items-center justify-content-between mb-20">
          <div className="col-md-10">
            <SearchBox
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              placeholderText={"Search by Last Name"}
            />
          </div>
          <div className="col-md-2 text-md-end">
            <ExportExcelButton onClick={handleExportClick} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="location"
                value={location}
                onChange={handleLocationChange}
              >
                <option value="">All Locations</option>
                <option value="HARARE">HARARE</option>
                <option value="MUTARE">MUTARE</option>
                <option value="BULAWAYO">BULAWAYO</option>
                <option value="PICKSTONE">PICKSTONE</option>
                <option value="EUREKA">EUREKA</option>
              </select>
              <label htmlFor="location">Location</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="company"
                value={company}
                onChange={handleCompanyChange}
              >
                <option value="">All Companies</option>
                {companiesData?.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.company_name}
                  </option>
                ))}
              </select>
              <label htmlFor="company">Company</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="swabStatus"
                value={swabStatus}
                onChange={handleSwabStatusChange}
              >
                <option value="">All Swab Status</option>
                <option value="PENDING">PENDING</option>
                <option value="DONE">DONE</option>
              </select>
              <label htmlFor="swabStatus">Swab Status</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="certificateStatus"
                value={certificateStatus}
                onChange={handleCertificateStatusChange}
              >
                <option value="">All Certificate Status</option>
                <option value="PENDING">PENDING</option>
                <option value="MONITORING">MONITORING</option>
                <option value="READY">READY</option>
                <option value="RELEASED">RELEASED</option>
                <option value="FAILED">FAILED</option>
              </select>
              <label htmlFor="certificateStatus">Certificate Status</label>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th onClick={() => handleSort("id")} className="pointer-style">
                  ID
                </th>
                <th>Last Medical Date</th>
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
              {isLoading ? (
                <tr>
                  <td colSpan={13} className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                currentPageData.map((patient, index) => (
                  <PatientItem
                    key={patient.id}
                    patient={patient}
                    index={index}
                  />
                ))
              )}
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
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => {
              setPageNumber(data.selected);
            }}
            containerClassName={"pagination"}
            activeClassName={"active-paginate"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default PatientTable;

import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import {
  sortPatients,
  filterPatients,
  getCurrentPageData,
  exportToExcel,
} from "../../../helpers/helpers";
import { useQuery } from "@tanstack/react-query";
import { getIndustryPatients } from "../../../services/api";
import { patientActions } from "../../../redux_store/patients-store";
import EmptyTable from "../../../components/EmptyTable";
import SearchBox from "../../../components/SearchBox";
import IndustryItem from "./IndustryItem";
import ReactPaginate from "react-paginate";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";
import Loading from "../../../components/loader/Loading";

const IndustryTable = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [isSortAscending, setIsSortAscending] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["industryPatients"],
    queryFn: getIndustryPatients,
    onSuccess: (data) => {
      dispatch(patientActions.setIndustryPatients({ industryPatients: data }));
    },
  });

  const industryPatients = data || [];

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

  const handleExportClick = () => {
    exportToExcel(filteredPatients, "Industry.xlsx");
  };

  const sortedPatients = sortPatients(
    industryPatients,
    sortColumn,
    isSortAscending
  );
  const filteredPatients = filterPatients(sortedPatients, searchTerm);
  const currentPageData = getCurrentPageData(
    filteredPatients,
    pageNumber,
    itemsPerPage
  );

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="alert alert-danger d-flex align-items-center"
        role="alert"
      >
        <i className="fas fa-exclamation-triangle me-2"></i>
        <div>
          <strong>Error:</strong> {error.message}
        </div>
      </div>
    );
  }

  return (
    <>
      {industryPatients.length === 0 ? (
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
              <ExportExcelButton onClick={handleExportClick} />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("id")}
                    className="pointer-style bb-2"
                  >
                    ID
                  </th>
                  <th
                    onClick={() => handleSort("first_name")}
                    className="pointer-style bb-2"
                  >
                    First Name
                  </th>
                  <th
                    onClick={() => handleSort("last_name")}
                    className="pointer-style bb-2"
                  >
                    Last Name
                  </th>
                  <th
                    onClick={() => handleSort("company")}
                    className="pointer-style bb-2"
                  >
                    Company
                  </th>
                  <th className="bb-2">Company Email</th>
                  <th className="bb-2">Date Of Birth</th>
                  <th className="bb-2">Phone Number</th>
                  <th className="bb-2">Employee Number</th>
                  <th className="bb-2">Last X-Ray</th>
                  <th className="bb-2">Certificate Status</th>
                  <th className="bb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((patient, index) => (
                  <IndustryItem
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
              pageCount={Math.ceil(filteredPatients.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(data) => {
                setPageNumber(data.selected);
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

export default IndustryTable;

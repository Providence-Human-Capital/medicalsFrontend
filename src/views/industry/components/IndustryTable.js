import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import {
  sortPatients,
  filterPatients,
  getCurrentPageData,
  exportToExcel,
} from "../../../helpers/helpers";
import { getIndustryPatients } from "../../../services/api";
import { patientActions } from "../../../redux_store/patients-store";
import EmptyTable from "../../../components/EmptyTable";
import SearchBox from "../../../components/SearchBox";
import IndustryItem from "./IndustryItem";
import ReactPaginate from "react-paginate";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";

const IndustryTable = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;

  const industryPatients = useSelector(
    (state) => state.patient.industryPatients
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [isSortAscending, setIsSortAscending] = useState(false);

  useEffect(() => {
    const fetchIndustryPatients = async () => {
      const industryPatients = await getIndustryPatients();
      dispatch(
        patientActions.setIndustryPatients({
          industryPatients: industryPatients,
        })
      );
    };
    fetchIndustryPatients();
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
                  <th className="bb-2">Swab Status</th>
                  <th className="bb-2">Last X-Ray</th>
                  <th className="bb-2">Certificate Status</th>
                  <th className="bb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {industryPatients &&
                  currentPageData.map((patient, index) => (
                    <IndustryItem key={patient.id} patient={patient} index={index} />
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

export default IndustryTable;

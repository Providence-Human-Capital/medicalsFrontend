import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PneumoItem from "./PneumoItem";
import * as XLSX from "xlsx";
import SearchBox from "../../../components/SearchBox";
import EmptyTable from "../../../components/EmptyTable";
import { patientActions } from "../../../redux_store/patients-store";
import { API } from "../../../config";
import { getPneumoPatients } from "../../../services/api";
import {
  sortPatients,
  filterPatients,
  getCurrentPageData,
  exportToExcel,
} from "../../../helpers/helpers";
import ReactPaginate from "react-paginate";
import ExportExcelButton from "../../../components/buttons/ExportExcelButton";

const PneumoTable = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;

  const pneumoPatients =
    useSelector((state) => state.patient.pneumoPatients) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [isSortAscending, setIsSortAscending] = useState(false);

  useEffect(() => {
    const fetchPneumoPatients = async () => {
      const pneumoPatients = await getPneumoPatients();
      dispatch(
        patientActions.setPneumoPatients({
          pneumoPatients: pneumoPatients,
        })
      );
    };
    fetchPneumoPatients();
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
    exportToExcel(filteredPatients, "Pneumo_Patients.xlsx");
  };

  const sortedPatients = sortPatients(
    pneumoPatients,
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
      {pneumoPatients.length === 0 ? (
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
                {pneumoPatients &&
                  currentPageData.map((patient, index) => (
                    <PneumoItem key={patient.id} patient={patient} index={index} />
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

export default PneumoTable;

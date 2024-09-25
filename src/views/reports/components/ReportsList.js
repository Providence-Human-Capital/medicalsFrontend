import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportListItem from "./ReportListItem";
import ReactPaginate from "react-paginate";
import { getCurrentPageData } from "../../../helpers/helpers";

const ReportsList = ({ reportsData }) => {
  const patients = useSelector((state) => state.patient.patients) || [];
  const dispatch = useDispatch();
  const itemsPerPage = 8;

  // Retrieve the saved page number from localStorage or default to 0 if not found
  const [pageNumber, setPageNumber] = useState(
    parseInt(localStorage.getItem("visualReportsSelectedPage")) || 0
  );

  const currentPageData = getCurrentPageData(
    reportsData,
    pageNumber,
    itemsPerPage
  );

  useEffect(() => {
    // Save the selected page to localStorage whenever it changes
    localStorage.setItem("visualReportsSelectedPage", pageNumber);
  }, [pageNumber]);

  return (
    <div className="col-12">
      <div className="box">
        <div className="box-header">
          <h4 className="box-title align-items-start flex-column">
            Daily Patient Reports - Page {pageNumber + 1}
            {patients && (
              <small className="subtitle">
                {patients.length} Total Patients
              </small>
            )}
          </h4>
        </div>
        <div className="box-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th
                    style={{
                      minWidth: "20px",
                    }}
                    className="text-center bb-2"
                  >
                    No.
                  </th>
                  <th
                    style={{
                      minWidth: "80px",
                    }}
                    className="px-12 bb-2"
                  >
                    Date Of Entry
                  </th>
                  <th
                    style={{
                      minWidth: "150px",
                    }}
                    className="text-center bb-2"
                  >
                    Pneumoconiosis Stats
                  </th>
                  <th
                    style={{
                      minWidth: "150px",
                    }}
                    className="text-center bb-2"
                  >
                    FoodHandler Stats
                  </th>
                  <th
                    style={{
                      minWidth: "150px",
                    }}
                    className="text-center bb-2"
                  >
                    Pre-Employment Stats
                  </th>
                  <th
                    style={{
                      minWidth: "150px",
                    }}
                    className="text-center bb-2"
                  >
                    Exit-Employement Stats
                  </th>
                  <th
                    style={{
                      minWidth: "150px",
                    }}
                    className="text-center bb-2"
                  >
                    Exit-Pneumoconiosis Stats
                  </th>
                  <th
                    style={{
                      minWidth: "120px",
                    }}
                    className="text-center bb-2"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {reportsData &&
                  currentPageData.map((report, index) => (
                    <ReportListItem
                      key={report.id}
                      report={report}
                      index={index}
                    />
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
                pageCount={Math.ceil(reportsData.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(patients) => {
                  setPageNumber(patients.selected); // Update the page number on change
                }}
                containerClassName={"pagination"}
                activeClassName={"active-paginate"}
                forcePage={pageNumber} // Force the current page to the persisted page number
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsList;

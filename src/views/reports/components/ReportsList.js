import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportListItem from "./ReportListItem";
import ReactPaginate from "react-paginate";
import { getCurrentPageData } from "../../../helpers/helpers";

const ReportsList = ({ reportsData }) => {
  const patients = useSelector((state) => state.patient.patients) || [];

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;


  const currentPageData = getCurrentPageData(reportsData, pageNumber, itemsPerPage)

  useEffect(() => {}, []);
  return (
    <div className="col-12">
      <div className="box">
        <div className="box-header">
          <h4 className="box-title align-items-start flex-column">
            Daily Patient Reports
            {patients && (
              <small className="subtitle">{patients.length} Total Patients</small>
            )}
          </h4>
        </div>
        <div className="box-body">
          <div className="table-responsive">
            <table className="table no-border">
              <thead>
                <tr className="text-uppercase bg-lightest">
                  <th
                    style={{
                      minWidth: "80px",
                    }}
                   
                  >
                    <span className="text-dark">Date  Of Entry</span>
                  </th>
                  <th
                    style={{
                      minWidth: "150px",
                    }}
                    className="text-center"
                  >
                    <span className="text-fade">Pneumoconiosis Stats</span>
                  </th>
                  <th
                    style={{
                      minWidth: "150px",
                    }}
                    className="text-center"
                  >
                    <span className="text-fade">City Of Harare Stats </span>
                  </th>
                  <th
                    style={{
                      minWidth: "150px",
                    }}
                    className="text-center"
                  >
                    <span className="text-fade">Industries & Other Stats</span>
                  </th>
                  {/* <th
                    style={{
                      minWidth: "100px",
                    }}
                  >
                    <span className="text-fade">status</span>
                  </th> */}
                  <th
                    style={{
                      minWidth: "120px",
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {reportsData &&
                  currentPageData.map((report) => (
                    <ReportListItem key={report.id}  report={report} />
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
              pageCount={Math.ceil(patients.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(patients) => {
                setPageNumber(patients.selected);
              }}
              containerClassName={"pagination"}
              activeClassName={"active-paginate"}
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsList;

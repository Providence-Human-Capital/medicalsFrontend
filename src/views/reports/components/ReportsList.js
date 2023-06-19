import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReportListItem from "./ReportListItem";

const ReportsList = ({ reportsData }) => {
  const patients = useSelector((state) => state.patient.patients) || [];

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
                    <span className="text-dark">Date</span>
                  </th>
                  <th
                    style={{
                      minWidth: "150px",
                    }}
                  >
                    <span className="text-fade">Pneumoconiosis Stats</span>
                  </th>
                  <th
                    style={{
                      minWidth: "150px",
                    }}
                  >
                    <span className="text-fade">City Of Harare Stats </span>
                  </th>
                  <th
                    style={{
                      minWidth: "150px",
                    }}
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
                  reportsData.map((report) => (
                    <ReportListItem key={report.id}  report={report} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsList;
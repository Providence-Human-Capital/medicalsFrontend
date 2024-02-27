import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { PHYSICAL_EXAM } from "../../../helpers/helpers";
import { Link } from "react-router-dom";

const ReportsListBox = ({ year, month }) => {
  const reportsFilteredResults =
    useSelector((state) => state.patient.reportsFilteredResults) || [];

  const flattenedReportsData = (reportsFilteredResults) => {
    return reportsFilteredResults.map((item) => {
      const flattenedItem = {
        EMPLOYEE_NUMBER: item.attendee.employee_number,
        FIRST_NAME: item.attendee.first_name,
        LAST_NAME: item.attendee.last_name,
        DATE_OF_BIRTH: item.attendee.date_of_birth,
        GENDER: item.attendee.gender,
        PHONE_NUMBER: item.attendee.phone_number,
        NATIONAL_ID: item.attendee.national_id,
        COMPANY: item.attendee.company.company_name,
        X_RAY_STATUS: item.attendee.x_ray_status,
        CERTIFICATE_STATUS: item.certificate_status,
        EXAMINATION_TYPE: item.exam_purpose,
        MEDICAL_CATEGORY: item.category,
      };

      return flattenedItem;
    });
  };

  const reportData = flattenedReportsData(reportsFilteredResults);
  const convertJsonToExcel = (flatData) => {
    const ws = XLSX.utils.json_to_sheet(flatData);
    const columnWidths = [];
    Object.keys(flatData[0]).forEach((key) => {
      columnWidths.push({ wch: 20 }); // You can adjust the width as needed
    });
    ws["!cols"] = columnWidths;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const currentDate = new Date();
    const dateString = currentDate.toISOString().slice(0, 19).replace(/:/g, "-");
    const fileName = `Report_${dateString}.xlsx`;
    saveAs(blob, fileName);
  };

  const saveAs = (blob, fileName) => {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };
  const handleDownloadExcel = () => {
    convertJsonToExcel(reportData);
  };

  return (
    <>
      <div className="box">
        <div className="row">
          <div className="col-md-9">
            <div className="box-header no-border">
              <h4 className="box-title">
                GENERATED RESULTS: - {"  "}
                <span className="badge badge-pill badge-warning">
                  {reportsFilteredResults.length}
                </span>
              </h4>
            </div>
          </div>
          <div className="col-md-3">
            <div
              style={{
                margin: "2rem",
              }}
            >
              <button
                className="cssbuttons-io-button"
                style={{
                  width: "fit-content",
                  borderRadius: "10px",
                }}
                onClick={handleDownloadExcel}
              >
                DOWNLOAD EXCEL (xlsx) 
              </button>
            </div>
          </div>
        </div>

        <div className="box-body pt-0">
          <div className="row mt-25">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="bb-2">First Name</th>
                    <th className="bb-2">Last Name</th>
                    <th className="bb-2">Gender </th>

                    <th className="bb-2">Company</th>
                    <th className="bb-2">Category</th>
                    <th className="bb-2">Phone Number</th>
                    <th className="bb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsFilteredResults &&
                    reportsFilteredResults.map((client, index) => (
                      <tr key={client.id}>
                        <td>{client.attendee.first_name}</td>
                        <td>{client.attendee.last_name}</td>
                        <td>{client.attendee.gender}</td>

                        <td>{client.attendee.company.company_name}</td>
                        <td>{client.category}</td>
                        <td>{client.attendee.phone_number}</td>
                        <td>
                          <Link
                            to={`/patients/${client.id}`}
                            className="waves-effect waves-light btn btn-primary-light btn-circle"
                          >
                            <span className="icon-Settings-1 fs-18">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsListBox;

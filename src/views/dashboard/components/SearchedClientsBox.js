import React from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { PHYSICAL_EXAM } from "../../../helpers/helpers";
import { Link } from "react-router-dom";
import DownloadButton from "../../../components/buttons/DownloadButton";

const SearchedClientsBox = () => {
  const searchedClients =
    useSelector((state) => state.patient.searchResults) || [];

  // Your data structure

  const flatttenedSearchedData = (searchedClients) => {
    return searchedClients.map((item) => {
      const flattenedItem = {
        EMPLOYEE_NUMBER: item.attendee.employee_number,
        FIRST_NAME: item.attendee.first_name,
        LAST_NAME: item.attendee.last_name,
        DATE_OF_BIRTH: item.attendee.date_of_birth,
        GENDER: item.attendee.gender,
        PHONE_NUMBER: item.attendee.phone_number,
        NATIONAL_ID: item.attendee.national_id,
        COMPANY: item.company.company_name,
        X_RAY_STATUS: item.attendee.x_ray_status,
        CERTIFICATE_STATUS: item.certificates[0].status,
        EXAMINATION_TYPE: item.exam_purpose,
        MEDICAL_CATEGORY: item.category,
      };

      return flattenedItem;
    });
  };
  const flatSearchData = flatttenedSearchedData(searchedClients);

  const convertJsonToExcel = (flatData) => {
    const ws = XLSX.utils.json_to_sheet(flatData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = "MedicalSearchResult.xlsx";
    saveAs(blob, fileName);
  };

  const saveAs = (blob, fileName) => {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const handleDownloadExcel = () => {
    convertJsonToExcel(flatSearchData);
  };

  return (
    <>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">
            Searched Clients:{" "}
            <span className="badge badge-pill badge-warning">
              {searchedClients.length}
            </span>
          </h4>
        </div>

        <div className="box-body pt-0">
          <div className="row mt-25">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="bb-2">First Name</th>
                    <th className="bb-2">Last Name</th>
                    <th className="bb-2">Company</th>
                    <th className="bb-2">Category</th>
                    <th className="bb-2">Phone Number</th>
                    <th className="bb-2">Certificate</th>
                    <th className="bb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchedClients &&
                    searchedClients.map((client, index) => (
                      <tr key={client.id}>
                        <td>{client.attendee.first_name}</td>
                        <td>{client.attendee.last_name}</td>
                        <td>{client.company.company_name}</td>
                        <td>{client.category}</td>
                        <td>{client.attendee.phone_number}</td>
                        <td>{PHYSICAL_EXAM(client.certificates[0].status)}</td>
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

        <div
          style={{
            margin: "2rem",
          }}
        >
          <button
            className="cssbuttons-io-button"
            style={{
              width: "fit-content",
            }}
            onClick={handleDownloadExcel}
          >
            Download CSV
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchedClientsBox;

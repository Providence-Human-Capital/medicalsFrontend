import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumb from "../../components/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import { convertToDateWord } from "../../helpers/helpers";
import * as XLSX from "xlsx";

const SingleReportPage = () => {
  const { day } = useParams();
  const reportByDayData = useSelector((state) => state.patient.reportByDay);
  const [singleDayReport, setSingleDayReport] = useState([]);

  useEffect(() => {
    const filteredData = reportByDayData.filter((obj) => obj.day === day);
    setSingleDayReport(filteredData);
  }, [day, reportByDayData]);

  // Function to export data to Excel
  const exportToExcel = () => {
    if (singleDayReport.length === 0) return;

    const dataToExport = [];

    // Loop through different categories and prepare the data for Excel
    const categories = [
      "Pneumoconiosis",
      "Food Handler (COH)",
      "Pre-Employement",
      "Exit-Employment",
      "Exit-Pneumoconiosis",
    ];

    categories.forEach((category) => {
      if (singleDayReport[0][category].length > 0) {
        singleDayReport[0][category].forEach((patient) => {
          dataToExport.push({
            Category: category,
            "First Name": patient.first_name,
            "Last Name": patient.last_name,
            "Date Of Birth": patient.date_of_birth,
            Gender: patient.gender,
            "National ID": patient.national_id,
            "Phone Number": patient.phone_number,
            Company: patient.company,
          });
        });
      }
    });

    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SingleDayReport");

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `Single_Report_${convertToDateWord(day)}.xlsx`);
  };

  return (
    <>
      <BreadCrumb title={"Single Report"} activeTab={"Report Overview"} />
      <section className="content">
        <div style={{ paddingBottom: "20px" }}></div>
        <div className="row">
          {singleDayReport.length > 0 && (
            <div className="col-xl-12 col-12">
              <div className="box">
                <div className="box-header no-border">
                  <h4 className="box-title">
                    {convertToDateWord(day)} Daily Report
                  </h4>
                  <button
                    className="btn btn-success"
                    onClick={exportToExcel}
                    style={{
                      float: "right",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                     
                    }}
                  >
                    Export to Excel
                  </button>
                </div>
                <div className="box-body">
                  {/* Pneumoconiosis Data */}
                  {singleDayReport[0]["Pneumoconiosis"].length > 0 && (
                    <Fragment>
                      <h4 style={{ textTransform: "uppercase" }}>
                        Pneumoconiosis{" "}
                        <span className="badge badge-primary-light badge-lg">
                          {singleDayReport[0]["Pneumoconiosis"].length}{" "}
                          {singleDayReport[0]["Pneumoconiosis"].length <= 1
                            ? "Patient"
                            : "Patients"}
                        </span>
                      </h4>

                      <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Date Of Birth</th>
                            <th scope="col">Gender</th>
                            <th scope="col">National ID</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Company</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {singleDayReport[0].Pneumoconiosis.map(
                            (patient, index) => (
                              <tr key={index}>
                                <td>{patient.first_name}</td>
                                <td>{patient.last_name}</td>
                                <td>{patient.date_of_birth}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.national_id}</td>
                                <td>{patient.phone_number}</td>
                                <td>{patient.company}</td>
                                <td className="text-end">
                                  <Link
                                    to={`/patients/edit/${patient.patient_id}`}
                                    class="waves-effect waves-light btn btn-warning-light btn-circle mx-5"
                                  >
                                    <span class="icon-Write">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                    </span>
                                  </Link>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </Fragment>
                  )}

                  {singleDayReport[0]["Food Handler (COH)"].length > 0 && (
                    <Fragment>
                      <h4 style={{ textTransform: "uppercase" }}>
                        Food Handler (COH){" "}
                        <span className="badge badge-primary-light badge-lg">
                          {singleDayReport[0]["Food Handler (COH)"].length}{" "}
                          {singleDayReport[0]["Food Handler (COH)"].length <= 1
                            ? "Patient"
                            : "Patients"}
                        </span>
                      </h4>

                      <div className="table-responsive">
                      <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Date Of Birth</th>
                            <th scope="col">Gender</th>
                            <th scope="col">National ID</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Company</th>
                            <th scope="col text-end">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {singleDayReport[0]["Food Handler (COH)"].map(
                            (patient, index) => (
                              <tr key={index}>
                                <td>{patient.first_name}</td>
                                <td>{patient.last_name}</td>
                                <td>{patient.date_of_birth}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.national_id}</td>
                                <td>{patient.phone_number}</td>
                                <td>{patient.company}</td>
                                <td className="text-end">
                                  <Link
                                    to={`/patients/edit/${patient.patient_id}`}
                                    class="waves-effect waves-light btn btn-warning-light btn-circle mx-5"
                                  >
                                    <span class="icon-Write">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                    </span>
                                  </Link>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      </div>
                     
                    </Fragment>
                  )}

                  {singleDayReport[0]["Pre-Employement"].length > 0 && (
                    <Fragment>
                      <h4 style={{ textTransform: "uppercase" }}>
                        Pre-Employment{" "}
                        <span className="badge badge-primary-light badge-lg">
                          {singleDayReport[0]["Pre-Employement"].length}{" "}
                          {singleDayReport[0]["Pre-Employement"].length <= 1
                            ? "Patient"
                            : "Patients"}
                        </span>
                      </h4>
                      <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Date Of Birth</th>
                            <th scope="col">Gender</th>
                            <th scope="col">National ID</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Company</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {singleDayReport[0]["Pre-Employement"].map(
                            (patient, index) => (
                              <tr key={index}>
                                <td>{patient.first_name}</td>
                                <td>{patient.last_name}</td>
                                <td>{patient.date_of_birth}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.national_id}</td>
                                <td>{patient.phone_number}</td>
                                <td>{patient.company}</td>
                                <td className="text-end">
                                  <Link
                                    to={`/patients/edit/${patient.patient_id}`}
                                    class="waves-effect waves-light btn btn-warning-light btn-circle mx-5"
                                  >
                                    <span class="icon-Write">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                    </span>
                                  </Link>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </Fragment>
                  )}

                  {singleDayReport[0]["Exit-Employment"].length > 0 && (
                    <Fragment>
                      <h4 style={{ textTransform: "uppercase" }}>
                        Exit-Employment{" "}
                        <span className="badge badge-primary-light badge-lg">
                          {singleDayReport[0]["Exit-Employment"].length}{" "}
                          {singleDayReport[0]["Exit-Employment"].length <= 1
                            ? "Patient"
                            : "Patients"}
                        </span>
                      </h4>
                      <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Date Of Birth</th>
                            <th scope="col">Gender</th>
                            <th scope="col">National ID</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Company</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {singleDayReport[0]["Exit-Employment"].map(
                            (patient, index) => (
                              <tr key={index}>
                                <td>{patient.first_name}</td>
                                <td>{patient.last_name}</td>
                                <td>{patient.date_of_birth}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.national_id}</td>
                                <td>{patient.phone_number}</td>
                                <td>{patient.company}</td>
                                <td className="text-end">
                                  <Link
                                    to={`/patients/edit/${patient.patient_id}`}
                                    class="waves-effect waves-light btn btn-warning-light btn-circle mx-5"
                                  >
                                    <span class="icon-Write">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                    </span>
                                  </Link>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </Fragment>
                  )}

                  {singleDayReport[0]["Exit-Pneumoconiosis"].length > 0 && (
                    <Fragment>
                      <h4 style={{ textTransform: "uppercase" }}>
                        Exit-Pneumoconiosis{" "}
                        <span className="badge badge-primary-light badge-lg">
                          {singleDayReport[0]["Exit-Pneumoconiosis"].length}{" "}
                          {singleDayReport[0]["Exit-Pneumoconiosis"].length <= 1
                            ? "Patient"
                            : "Patients"}
                        </span>
                      </h4>
                      <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Date Of Birth</th>
                            <th scope="col">Gender</th>
                            <th scope="col">National ID</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Company</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {singleDayReport[0]["Exit-Pneumoconiosis"].map(
                            (patient, index) => (
                              <tr key={index}>
                                <td>{patient.first_name}</td>
                                <td>{patient.last_name}</td>
                                <td>{patient.date_of_birth}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.national_id}</td>
                                <td>{patient.phone_number}</td>
                                <td>{patient.company}</td>
                                <td className="text-end">
                                  <Link
                                    to={`/patients/edit/${patient.patient_id}`}
                                    class="waves-effect waves-light btn btn-warning-light btn-circle mx-5"
                                  >
                                    <span class="icon-Write">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                    </span>
                                  </Link>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </Fragment>
                  )}

                  {/* Repeat the same structure for other categories */}
                  {/* Food Handler (COH), Pre-Employement, Exit-Employment, Exit-Pneumoconiosis */}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SingleReportPage;

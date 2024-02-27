import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumb from "../../components/BreadCrumb";
import { PDFViewer } from "@react-pdf/renderer";
import ReportDocument from "./components/ReportDocument";
import "./ReportsCss.css";

import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadButton from "../../components/buttons/DownloadButton";
import { useParams } from "react-router-dom";
import { convertToDateWord } from "../../helpers/helpers";

const SingleReportPage = () => {
  const { day } = useParams();
  const reportByDayData = useSelector((state) => state.patient.reportByDay);
  const [singleDayReport, setSingleDayReport] = useState([]);

  useEffect(() => {
    const filteredData = reportByDayData.filter((obj) => obj.day === day);
    setSingleDayReport(filteredData);

    console.log("Single day report", singleDayReport);
  }, [day]);

  return (
    <>
      <BreadCrumb title={"Single Report"} activeTab={"Report Overview"} />

      <section className="content">
        <div
          style={{
            paddingBottom: "20px",
          }}
        ></div>
        <div className="row">
          {singleDayReport.length > 0 && (
            <div className="col-xl-12 col-12">
              <div className="box">
                <div className="box-header no-border">
                  <h4 className="box-title">
                    {convertToDateWord(day)} Daily Report
                  </h4>
                </div>
                <div className="box-body">
                  {singleDayReport[0]["Pneumoconiosis"] && (
                    <Fragment>
                      <h4>
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
                          </tr>
                        </thead>
                        <tbody>
                          {singleDayReport[0].Pneumoconiosis &&
                            singleDayReport[0].Pneumoconiosis.map((patient) => (
                              <tr>
                                <td>{patient.first_name}</td>
                                <td>{patient.last_name}</td>
                                <td>{patient.date_of_birth}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.national_id}</td>
                                <td>{patient.phone_number}</td>
                                <td>{patient.company}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </Fragment>
                  )}

                  <h4 className="mt-4">
                    City Of Harare{" "}
                    <span className="badge badge-primary-light badge-lg">
                      {singleDayReport[0]["Food Handler (COH)"].length}{" "}
                      {singleDayReport[0]["Food Handler (COH)"].length <= 1
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
                      </tr>
                    </thead>
                    <tbody>
                      {singleDayReport[0]["Food Handler (COH)"] &&
                        singleDayReport[0]["Food Handler (COH)"].map(
                          (patient, index) => (
                            <tr key={index}>
                              <td>{patient.first_name}</td>
                              <td>{patient.last_name}</td>
                              <td>{patient.date_of_birth}</td>
                              <td>{patient.gender}</td>
                              <td>{patient.national_id}</td>
                              <td>{patient.phone_number}</td>
                              <td>{patient.company}</td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>

                  <h4 className="mt-4">
                    Pre-Employement{" "}
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
                      </tr>
                    </thead>
                    <tbody>
                      {singleDayReport[0]["Pre-Employement"] &&
                        singleDayReport[0]["Pre-Employement"].map((patient) => (
                          <tr>
                            <td>{patient.first_name}</td>
                            <td>{patient.last_name}</td>
                            <td>{patient.date_of_birth}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.national_id}</td>
                            <td>{patient.phone_number}</td>
                            <td>{patient.company}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <h4 className="mt-4">
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
                      </tr>
                    </thead>
                    <tbody>
                      {singleDayReport[0]["Exit-Employment"] &&
                        singleDayReport[0]["Exit-Employment"].map((patient) => (
                          <tr>
                            <td>{patient.first_name}</td>
                            <td>{patient.last_name}</td>
                            <td>{patient.date_of_birth}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.national_id}</td>
                            <td>{patient.phone_number}</td>
                            <td>{patient.company}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <h4 className="mt-4">
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
                        <th scope="col">Last Name</th>
                        <th scope="col">Date Of Birth</th>
                        <th scope="col">Gender</th>
                        <th scope="col">National ID</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Company</th>
                      </tr>
                    </thead>
                    <tbody>
                      {singleDayReport[0]["Exit-Pneumoconiosis"] &&
                        singleDayReport[0]["Exit-Pneumoconiosis"].map(
                          (patient) => (
                            <tr>
                              <td>{patient.first_name}</td>
                              <td>{patient.last_name}</td>
                              <td>{patient.date_of_birth}</td>
                              <td>{patient.gender}</td>
                              <td>{patient.national_id}</td>
                              <td>{patient.phone_number}</td>
                              <td>{patient.company}</td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          <div className="col-xl-6 col-12">
            <div className="pdf-container">
              {/* <PDFViewer className="pdf-viewer">
                <ReportDocument />
              </PDFViewer> */}
            </div>
          </div>{" "}
        </div>
      </section>
    </>
  );
};

export default SingleReportPage;

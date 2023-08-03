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
  }, [day]);

  return (
    <>
      <BreadCrumb title={"Single Report"} activeTab={"Generate Report"} />

      <PDFDownloadLink
        document={<ReportDocument singleReport={singleDayReport[0]} />}
        fileName="my-document.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <DownloadButton text={"Loading Document"} />
          ) : (
            <DownloadButton text={"Download now!"} />
          )
        }
      </PDFDownloadLink>
      <div
        style={{
          paddingBottom: "20px",
        }}
      ></div>
      <div className="row">
        {singleDayReport.length > 0 && (
          <div className="col-xl-6 col-12">
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
                          <th scope="col">Last Name</th>
                          <th scope="col">Exam Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {singleDayReport[0].Pneumoconiosis &&
                          singleDayReport[0].Pneumoconiosis.map((patient) => (
                            <tr>
                              <td>{patient.first_name}</td>
                              <td>{patient.last_name}</td>
                              <td>{patient.exam_purpose}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </Fragment>
                )}

                <h4 className="mt-4">
                  City Of Harare{" "}
                  <span className="badge badge-primary-light badge-lg">
                    {singleDayReport[0]["City Of Harare"].length}{" "}
                    {singleDayReport[0]["City Of Harare"].length <= 1
                      ? "Patient"
                      : "Patients"}
                  </span>
                </h4>
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Exam Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {singleDayReport[0]["City Of Harare"] &&
                      singleDayReport[0]["City Of Harare"].map((patient) => (
                        <tr>
                          <td>{patient.first_name}</td>
                          <td>{patient.last_name}</td>
                          <td>{patient.exam_purpose}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <h4 className="mt-4">
                  Industry & Other{" "}
                  <span className="badge badge-primary-light badge-lg">
                    {singleDayReport[0]["Industry"].length}{" "}
                    {singleDayReport[0]["Industry"].length <= 1
                      ? "Patient"
                      : "Patients"}
                  </span>
                </h4>
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Exam Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {singleDayReport[0]["Industry"] &&
                      singleDayReport[0]["Industry"].map((patient) => (
                        <tr>
                          <td>{patient.first_name}</td>
                          <td>{patient.last_name}</td>
                          <td>{patient.exam_purpose}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        <div className="col-xl-6 col-12">
          <div className="pdf-container">
            <PDFViewer className="pdf-viewer">
              <ReportDocument />
            </PDFViewer>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default SingleReportPage;

import React, { Fragment, useMemo } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import { convertToDateWord } from "../../helpers/helpers";
import * as XLSX from "xlsx";
import { useQuery } from "@tanstack/react-query";
import { getPatientReportByDay } from "../../services/api";
import Loading from "../../components/loader/Loading";
import "./SingleReportPage.css";

const SingleReportPage = () => {
  const { day } = useParams();

  const {
    data: reportByDayData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reportByDay"],
    queryFn: getPatientReportByDay,
  });

  const singleDayReport = useMemo(() => {
    return reportByDayData.filter((obj) => obj.day === day);
  }, [reportByDayData, day]);

  const exportToExcel = () => {
    if (singleDayReport.length === 0) return;

    const dataToExport = [];
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

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SingleDayReport");
    XLSX.writeFile(workbook, `Single_Report_${convertToDateWord(day)}.xlsx`);
  };

  const renderCategoryTable = (categoryName) => {
    const data = singleDayReport[0]?.[categoryName] || [];
    if (!data.length) return null;

    return (
      <Fragment>
        <h4 style={{ textTransform: "uppercase" }}>
          {categoryName}{" "}
          <span className="badge badge-primary-light badge-lg">
            {data.length} {data.length === 1 ? "Patient" : "Patients"}
          </span>
        </h4>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>First Name</th>
                <th>Surname</th>
                <th>Date Of Birth</th>
                <th>Gender</th>
                <th>National ID</th>
                <th>Phone Number</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((patient, index) => (
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
                      className="btn btn-warning d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: "48px",
                        height: "48px",
                        fontSize: "20px",
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  };

  const renderCompanyCards = () => {
    const companyCounts = {};
    const categories = [
      "Pneumoconiosis",
      "Food Handler (COH)",
      "Pre-Employement",
      "Exit-Employment",
      "Exit-Pneumoconiosis",
    ];

    categories.forEach((category) => {
      if (singleDayReport[0][category] && singleDayReport[0][category].length > 0) {
        singleDayReport[0][category].forEach((patient) => {
          if (companyCounts[patient.company]) {
            companyCounts[patient.company]++;
          } else {
            companyCounts[patient.company] = 1;
          }
        });
      }
    });

    return (
      <div className="company-cards" style={{
        marginBottom: "2rem"
      }}>
        {Object.keys(companyCounts).map((company, index) => (
          <div
            key={index}
            className="company-card"
            style={{
              backgroundColor: `hsl(${(index * 40) % 360}, 70%, 50%)`,
              color: "white",
              padding: "1em",
              margin: "0.5em",
              borderRadius: "8px",
              width: "calc(20% - 1em)", // Adjust width to fit 5 cards per row
              cursor: "pointer"
            }}
          >
            <h5 className="card-title">{company}</h5>
            <p className="card-text">{companyCounts[company]} Patients</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <BreadCrumb title={"Single Report"} activeTab={"Report Overview"} />
      <section className="content">
        <div style={{ paddingBottom: "20px" }}></div>
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="box">
              <div className="box-header no-border">
                <h4
                  className="box-title"
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#2c3e50",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    textTransform: "uppercase",
                  }}
                >
                  <i
                    className="fas fa-calendar-day"
                    style={{ color: "#16a085" }}
                  ></i>
                  {convertToDateWord(day)} Daily Report
                </h4>
                {singleDayReport.length > 0 && (
                  <button
                    className="btn btn-success d-flex align-items-center gap-2 fw-bold text-uppercase float-end px-4 py-2 fs-6"
                    onClick={exportToExcel}
                    style={{
                      fontFamily: "Poppins",
                      margin: "2px 3px",
                      borderRadius: "12px",
                    }}
                  >
                    <i className="fas fa-file-excel fs-5"></i>
                    Export to Excel
                  </button>
                )}
              </div>
              <div className="box-body">
                {isLoading ? (
                  <Loading />
                ) : isError ? (
                  <div className="alert alert-danger" role="alert">
                    Failed to load report data.
                  </div>
                ) : singleDayReport.length === 0 ? (
                  <p className="text-muted">
                    No reports available for this day.
                  </p>
                ) : (
                  <div className="">
                    {renderCompanyCards()}
                    <div className="row">
                      <div className="col-12">
                        {renderCategoryTable("Pneumoconiosis")}
                        {renderCategoryTable("Food Handler (COH)")}
                        {renderCategoryTable("Pre-Employement")}
                        {renderCategoryTable("Exit-Employment")}
                        {renderCategoryTable("Exit-Pneumoconiosis")}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleReportPage;
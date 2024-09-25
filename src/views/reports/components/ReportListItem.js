import React from "react";
import { convertToDateWord } from "../../../helpers/helpers";
import { Link } from "react-router-dom";

const ReportListItem = ({ report, index }) => {
  return (
    <tr style={{ cursor: "pointer" }}>
      <>
        {/* Row index */}
        <td className="align-middle text-center">
          <span className="fw-bold">{index + 1}</span>
        </td>

        {/* Date and patient count */}
        <td className="align-middle">
          <div className="d-flex flex-column justify-content-center">
            <span className="text-uppercase fw-bold text-primary fs-6">
              {convertToDateWord(report.day)}
            </span>
            <small className="text-muted mt-1">
              Total Patients: {report.patients_count}
            </small>
          </div>
        </td>

        {/* Categories Section */}
        <td colSpan={5} className="align-middle">
          <div className="row">
            {/* Pneumoconiosis */}
            <div className="col text-center">
              <span className="fw-bold d-block text-secondary">
                Pneumoconiosis
              </span>
              <span className="badge bg-warning text-dark px-3 py-2 mt-1">
                {report.Pneumoconiosis.length} Patients
              </span>
            </div>

            {/* Food Handler (COH) */}
            <div className="col text-center">
              <span className="fw-bold d-block text-secondary">
                Food Handler (COH)
              </span>
              <span className="badge bg-warning text-dark px-3 py-2 mt-1">
                {report["Food Handler (COH)"]?.length || 0} Patients
              </span>
            </div>

            {/* Pre-Employment */}
            <div className="col text-center">
              <span className="fw-bold d-block text-secondary">
                Pre-Employment
              </span>
              <span className="badge bg-warning text-dark px-3 py-2 mt-1">
                {report["Pre-Employement"]?.length || 0} Patients
              </span>
            </div>

            {/* Exit-Employment */}
            <div className="col text-center">
              <span className="fw-bold d-block text-secondary">
                Exit-Employment
              </span>
              <span className="badge bg-warning text-dark px-3 py-2 mt-1">
                {report["Exit-Employement"]?.length || 0} Patients
              </span>
            </div>

            {/* Exit-Pneumoconiosis */}
            <div className="col text-center">
              <span className="fw-bold d-block text-secondary">
                Exit-Pneumoconiosis
              </span>
              <span className="badge bg-warning text-dark px-3 py-2 fw500 mt-1">
                {report["Exit-Pneumoconiosis"]?.length || 0} Patients
              </span>
            </div>
          </div>
        </td>

        {/* Action button */}
        <td className="align-middle text-end">
          <Link
            to={`/report/single/${report.day}`}
            className="btn btn-primary btn-sm"
          >
            View <i className="bi bi-arrow-right"></i>
          </Link>
        </td>
      </>
    </tr>
  );
};

export default ReportListItem;

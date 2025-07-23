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
            <div className="col text-center" style={cardStyle}>
              <span style={titleStyle}>
                <i className="fas fa-lungs me-2 text-secondary"></i>
                Pneumoconiosis
              </span>
              <span style={badgeStyle}>
                {report.Pneumoconiosis?.length || 0} Patients
              </span>
            </div>

            {/* Food Handler (COH) */}
            <div className="col text-center" style={cardStyle}>
              <span style={titleStyle}>
                <i className="fas fa-utensils me-2 text-secondary"></i>
                Food Handler (COH)
              </span>
              <span style={badgeStyle}>
                {report["Food Handler (COH)"]?.length || 0} Patients
              </span>
            </div>

            {/* Pre-Employment */}
            <div className="col text-center" style={cardStyle}>
              <span style={titleStyle}>
                <i className="fas fa-briefcase me-2 text-secondary"></i>
                Pre-Employment
              </span>
              <span style={badgeStyle}>
                {report["Pre-Employement"]?.length || 0} Patients
              </span>
            </div>

            {/* Exit-Employment */}
            <div className="col text-center" style={cardStyle}>
              <span style={titleStyle}>
                <i className="fas fa-door-open me-2 text-secondary"></i>
                Exit-Employment
              </span>
              <span style={badgeStyle}>
                {report["Exit-Employement"]?.length || 0} Patients
              </span>
            </div>

            {/* Exit-Pneumoconiosis */}
            <div className="col text-center" style={cardStyle}>
              <span style={titleStyle}>
                <i className="fas fa-user-slash me-2 text-danger"></i>
                Exit-Pneumoconiosis
              </span>
              <span style={badgeStyle}>
                {report["Exit-Pneumoconiosis"]?.length || 0} Patients
              </span>
            </div>
          </div>
        </td>

        {/* Action button */}
        <td className="align-middle text-end">
          <Link
            to={`/report/single/${report.day}`}
            className="btn btn-sm btn-primary d-inline-flex align-items-center gap-1 px-4 py-2 rounded"
          >
            View Report <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </td>
      </>
    </tr>
  );
};

// Inline styles for reusability
const cardStyle = {
  padding: "1rem",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  margin: "5px"
};

const titleStyle = {
  fontSize: "1rem",
  fontWeight: 600,
  color: "#6c757d",
  marginBottom: "0.5rem",
  display: "inline-block",
};

const badgeStyle = {
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
  borderRadius: "20px",
  backgroundColor: "#ffc107",
  color: "#212529",
  fontWeight: 500,
  display: "inline-block",
};

export default ReportListItem;

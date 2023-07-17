import React from "react";
import "./BatchItem.css";
import { Link } from "react-router-dom";
import { formatDate, options } from "../../../utils/dateConverter";

const BatchItem = ({ batch }) => {
  return (
    <>
      <div className="d-flex align-items-center mb-30">
        <div className="me-15 bg-primary-light h-50 w-50 l-h-60 rounded text-center">
          <span className="icon-Library fs-24">
            <span className="path1"></span>
            <span className="path2"></span>
          </span>
          <span
            className="badge"
            style={{
              position: "absolute",
              top: "-9px",
              right: "-9px",
              backgroundColor: batch.certificate_batch_items.length >= 1 ? "red" : "#4caf50",
              color: "#FFFFFF",
              borderRadius: "50%",
              padding: "4px 8px",
              fontSize: "12px",
            }}
          >
            {batch.certificate_batch_items.length}
          </span>
        </div>
        <div className="d-flex flex-column fw-500">
          <Link
            to={`/batch/list/${batch.id}`}
            className="text-dark hover-primary mb-1 fs-16"
          >
            {batch.name}
          </Link>

          <span className="text-fade">
            { formatDate(batch.created_at, options)}
          </span>
        </div>
      </div>
    </>
  );
};

export default BatchItem;

import React from "react";
import "./Skeleton.css";

const PatientSkeleton = () => {
  return (
    <section className="content">
      <div className="patient-skeleton">
        <div className="patient-skeleton-header">
          <div className="patient-skeleton-avatar"></div>
          <div className="patient-skeleton-name"></div>
        </div>
        <div className="patient-skeleton-details">
          <div className="col-md-8 col-12">
            <div className="patient-skeleton-detail"></div>
            <div className="patient-skeleton-detail"></div>
            <div className="patient-skeleton-detail"></div>
            <div className="patient-skeleton-detail"></div>
            <div className="patient-skeleton-detail"></div>
            <div className="patient-skeleton-detail-full" 
            style={{
              marginTop: "3rem"
            }}
            ></div>
            <div className="patient-skeleton-detail-full"></div>
          </div>
          <div
            className="col-md-4 col-12"
            style={{
              padding: "5px",
            }}
          >
            <div className="patient-skeleton-detail-full"></div>
            <div className="patient-skeleton-detail-full"></div>
            <div className="patient-skeleton-detail-full"></div>
            <div className="patient-skeleton-detail-full"></div>
          </div>
        </div>
        <div
          className="patient-skeleton-column"
          style={{
            marginTop: "20px",
          }}
        >
          <div className="patient-skeleton-detail"></div>
          <div className="patient-skeleton-detail"></div>
        </div>
      </div>
    </section>
  );
};

export default PatientSkeleton;

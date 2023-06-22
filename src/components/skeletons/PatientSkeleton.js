import React from "react";
import './Skeleton.css'

const PatientSkeleton = () => {
  return (
    <div className="patient-skeleton">
      <div className="patient-skeleton-header">
        <div className="patient-skeleton-avatar"></div>
        <div className="patient-skeleton-name"></div>
      </div>
      <div className="patient-skeleton-details">
        <div className="patient-skeleton-detail"></div>
        <div className="patient-skeleton-detail"></div>
        <div className="patient-skeleton-detail"></div>
        <div className="patient-skeleton-detail"></div>
      </div>
      <div className="patient-skeleton-column" 
      style={{
        marginTop: "20px",
      }}
      >
          <div className="patient-skeleton-detail"></div>
          <div className="patient-skeleton-detail"></div>
        </div>
    </div>
  );
};

export default PatientSkeleton;

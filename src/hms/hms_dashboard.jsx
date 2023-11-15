import React, { useEffect } from "react";
import CalendarCardComponent from "./components/calendar_card";
import HospitalityStatus from "./components/hospitality_status";

const HospitalManagementDashboard = () => {
  return (
    <>
      <div className="row g-4 mb-3">
        <CalendarCardComponent />
        <HospitalityStatus />
      </div>
    </>
  );
};

export default HospitalManagementDashboard;

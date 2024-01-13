import React, { useEffect } from "react";
import CalendarCardComponent from "./components/calendar_card";
import HospitalityStatus from "./components/hospitality_status";
import { useGetRolesQuery } from "../redux_store/api/apiSlice";
import { useGetCompaniesQuery } from "../redux_store/api/companySlice";

const HospitalManagementDashboard = () => {
  const { data: rls } = useGetRolesQuery();
  const { data: cmps } = useGetCompaniesQuery();

  useEffect(() => {
   
  }, []);

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

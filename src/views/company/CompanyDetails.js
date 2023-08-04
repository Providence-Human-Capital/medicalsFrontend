import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useParams } from "react-router-dom";
import CompanyDueBox from "./components/CompanyDueBox";
import StatsSummaryCard from "./components/StatsSummaryCard";
import CompanyAttendanceStats from "./components/CompanyAttendanceStats";
import { getCompanyAttendanceStats } from "../../services/api";
import UserCardSkeleton from "../../components/skeletons/UserCardSkeleton";
import CompanyClientsBox from "./components/CompanyClientsBox";
import StatsByExamPurpose from "./components/StatsByExamPurpose";
import CompanyBloodPressureStats from "./components/CompanyBloodPressureStats";
import CompanyBMIStats from "./components/CompanyBMIStats";

const CompanyDetails = () => {
  const { companyName, companyId } = useParams();

  const year = 2023;
  const [attendanceStats, setAttendanceStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const attendanceStats = await getCompanyAttendanceStats(
          companyId,
          year
        );
        setAttendanceStats(attendanceStats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <BreadCrumb title={"Company"} activeTab={`${companyName}`} />
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <StatsSummaryCard companyId={companyId} />
            <div className="row">
              <div className="col-md-12">
                <CompanyAttendanceStats data={attendanceStats} />
                <div className="row">
                  <div className="col-md-6">
                    <StatsByExamPurpose companyId={companyId} />
                  </div>
                  <div className="col-md-6">
                    <CompanyBloodPressureStats companyId={companyId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-12">
            <CompanyDueBox companyId={companyId} companyName={companyName} />
            <CompanyBMIStats companyId={companyId} />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 col-12">
            <CompanyClientsBox companyId={companyId} />
          </div>
          <div className="col-xl-4 col-12"></div>
        </div>
      </section>
    </>
  );
};

export default CompanyDetails;

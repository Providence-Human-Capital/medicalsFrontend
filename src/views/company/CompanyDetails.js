import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useParams } from "react-router-dom";
import CompanyDueBox from "./components/CompanyDueBox";
import StatsSummaryCard from "./components/StatsSummaryCard";
import CompanyAttendanceStats from "./components/CompanyAttendanceStats";
import {
  getCompanyAttendanceStats,
  getGeneralCompanyStats,
} from "../../services/api";
import UserCardSkeleton from "../../components/skeletons/UserCardSkeleton";
import CompanyClientsBox from "./components/CompanyClientsBox";
import StatsByExamPurpose from "./components/StatsByExamPurpose";
import CompanyBloodPressureStats from "./components/CompanyBloodPressureStats";
import CompanyBMIStats from "./components/CompanyBMIStats";

const CompanyDetails = () => {
  const { companyName, companyId } = useParams();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({});

  const fetchStats = async (year) => {
    try {
      const attendanceStats = await getCompanyAttendanceStats(companyId, year);
      setAttendanceStats(attendanceStats);
    } catch (error) {
      console.log(error);
    }
  };

  const handleYearChange = async (year) => {
    setSelectedYear(year);
    console.log("Selected year:", year);
    fetchStats(year);
  };

  const [generalStats, setgeneralStats] = useState({});
  const fetcGeneralStats = async () => {
    try {
      const generalStats = await getGeneralCompanyStats(companyId);
      setgeneralStats(generalStats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2023; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
    fetchStats(yearsArray[yearsArray.length - 1]);
    fetcGeneralStats();
  }, []);

  return (
    <>
      <BreadCrumb title={"Company"} activeTab={`${companyName}`} />

      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="row mb-4">
              <div className="col-md-10">
                <h4
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  PLEASE SELECT THE YEAR IN WHICH YOU WANT THE STATISTICS
                </h4>
              </div>
              <div className="col-md-2">
                <select
                  className="form-select"
                  style={{
                    height: "50px",
                  }}
                  onChange={(e) => handleYearChange(e.target.value)}
                  value={selectedYear}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div class="d-flex align-items-center mb-15 mb-lg-0">
                  <div class="me-15 bg-primary w-60 h-60 rounded-circle text-center l-h-70">
                    <i class="fs-24 fa fa-user"></i>
                  </div>
                  <div>
                    <p class="text-fade fs-16 mb-0">Total Company Employees</p>
                    <h3 class="fw-500 my-0">
                      {generalStats.totalPatients
                        ? generalStats.totalPatients
                        : 0}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <StatsSummaryCard companyId={companyId} />
              </div>
            </div>
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

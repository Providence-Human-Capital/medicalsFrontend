import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { ActivityCalendar } from "activity-calendar-react";
import { useQuery } from "@tanstack/react-query";
import { getActivityByDay, getPatientReportByDay } from "../../services/api";
import ReportsList from "./components/ReportsList";
import Loading from "../../components/loader/Loading";

const Reports = () => {
  const styles = {
    containerStyles: {
      minHeight: "70vh",
      overflow: "hidden",
      minWidth: "100%",
    },
  };

  const colorCustomization = {
    activity0: "#dadada",
    activity1: "#0e4429",
    activity2: "#006d32",
    activity3: "#26a641",
    activity4: "#39d353",
  };

  // Fetch activity data
  const {
    data: activityByDayData = [],
    isLoading: isLoadingActivity,
    isError: isErrorActivity,
  } = useQuery({
    queryKey: ["activityByDay"],
    queryFn: getActivityByDay,
  });

  // Fetch report data
  const {
    data: reportByDayData = [],
    isLoading: isLoadingReport,
    isError: isErrorReport,
  } = useQuery({
    queryKey: ["reportByDay"],
    queryFn: getPatientReportByDay,
  });

  return (
    <>
      <BreadCrumb title="Reports" activeTab="Reports" />

      <div style={{ paddingLeft: "24px" }}>
        {isLoadingActivity ? (
          <p className="text-gray-600">
            <p>Loading Activity Calendar ____</p>
          </p>
        ) : isErrorActivity ? (
          <div className="flex items-center gap-3 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded shadow-sm max-w-md">
            <i className="fas fa-exclamation-circle text-red-600 text-xl"></i>
            <p className="m-0 text-sm font-medium">
              Failed to load activity data.
            </p>
          </div>
        ) : (
          <ActivityCalendar
            sampleData={activityByDayData}
            colorCustomization={colorCustomization}
            showMonth={true}
          />
        )}
      </div>

      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="d-md-flex align-items-center justify-content-between mb-20"></div>
            <div className="box">
              <div className="box-body">
                <div
                  className="table-responsive rounded card-table"
                  style={styles.containerStyles}
                >
                  {isLoadingReport ? (
                    <Loading />
                  ) : isErrorReport ? (
                    <p className="text-danger">Failed to load report data.</p>
                  ) : (
                    <ReportsList
                      reportsData={reportByDayData.slice().reverse()}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reports;

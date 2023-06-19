import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { ActivityCalendar } from "activity-calendar-react";
import { useDispatch, useSelector } from "react-redux";
import { patientActions } from "../../redux_store/patients-store";
import { getActivityByDay, getPatientReportByDay } from "../../services/api";
import ReportsList from "./components/ReportsList";

const Reports = () => {
  const activityByDayData = useSelector((state) => state.patient.activityByDay);
  const reportByDayData = useSelector((state) => state.patient.reportByDay);

  const dispatch = useDispatch();

  const styles = {
    containerStyles: {
      minHeight: "70vh",
      overflow: "hidden",
      minWidth: "100%",
    },
  };
  const sampleData = [
    {
      day: "2023-01-01",
      activity: 5,
    },
    {
      day: "2023-01-02",
      activity: 1,
    },
  ];
  const colorCustomization = {
    activity0: "#dadada",
    activity1: "#0e4429",
    activity2: "#006d32",
    activity3: "#26a641",
    activity4: "#39d353",
  };

  useEffect(() => {
    const fetchActivityByDayData = async () => {
      try {
        const data = await getActivityByDay();
        dispatch(
          patientActions.setActivityByDay({
            activityByDay: data,
          })
        );

        const reportData = await getPatientReportByDay();
        dispatch(
          patientActions.setReportByDay({
            reportByDay: reportData,
          })
        );
      } catch (error) {
        console.log("There was an error while fetching stats ", error);
        dispatch(
          patientActions.isError({
            error: error,
          })
        );
      }
    };

    fetchActivityByDayData();
  }, []);

  return (
    <>
      <BreadCrumb title={"Reports"} activeTab={"Reports"} />
      <div
        className=""
        style={{
          paddingLeft: "24px",
        }}
      >
        <ActivityCalendar
          sampleData={activityByDayData}
          colorCustomization={colorCustomization}
          showMonth={true}
        />
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
                  <ReportsList reportsData={reportByDayData} />
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

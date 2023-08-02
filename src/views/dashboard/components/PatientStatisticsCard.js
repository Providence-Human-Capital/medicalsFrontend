import React, { Fragment, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const PatientStatisticsCard = () => {
  const patientStatistics = useSelector(
    (state) => state.patient.patientStatistics
  );
  const [patientsData, setPatientsData] = useState({
    options: {
      chart: {
        id: "patients-chart",
      },
      xaxis: {
        categories: patientStatistics.map((data) => data.month),
      },
    },
    series: [
      {
        name: "Patients",
        data: patientStatistics.map((data) => data.patient_count),
      },
      {
        name: "Referrals",
        data: patientStatistics.map((data) => data.referral_count),
      },
      {
        name: "Radiology",
        data: patientStatistics.map((data) => data.radiology_count),
      },
    ],
  });
  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4
            className="box-title"
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Patient Statistics
          </h4>
        </div>
        <div className="box-body">
          <Chart
            options={patientsData.options}
            series={patientsData.series}
            type="line"
            height={400}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default PatientStatisticsCard;

import React, { Fragment, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { PatientsData } from "../DummyData";
import { useSelector } from "react-redux";

const PatientStatisticsCard = () => {
  const patientStatistics = useSelector(
    (state) => state.patient.patientStatistics
  );
  const [patientsData, setPatientsData] = useState({
    labels: patientStatistics.map((data) => data.month),
    datasets: [
      {
        label: "Patients",
        data: patientStatistics.map((data) => data.patient_count),
      },
      {
        label: "Referrals",
        data: patientStatistics.map((data) => data.referral_count),
      },
      {
        label: "Radiology",
        data: patientStatistics.map((data) => data.radiology_count),
      },
    ],
  });
  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">Patient Statistics</h4>
        </div>
        <div className="box-body">
          <Line data={patientsData} />
        </div>
      </div>
    </Fragment>
  );
};

export default PatientStatisticsCard;
 